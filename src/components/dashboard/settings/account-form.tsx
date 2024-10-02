"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  changeEmailFormSchema,
  changeNameFormSchema,
  changePasswordFormSchema,
  deleteAccountSchema,
} from "~/lib/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { client } from "~/lib/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

type Props = {
  user: User;
};

export const AccountForm: FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const nameForm = useForm<z.infer<typeof changeNameFormSchema>>({
    resolver: zodResolver(changeNameFormSchema),
    defaultValues: {
      name: user.name,
    },
  });
  const emailForm = useForm<z.infer<typeof changeEmailFormSchema>>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      email: user.email,
    },
  });
  const passwordForm = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { mutateAsync: updateName } = client.user.updateName.useMutation({
    onSuccess: (data) => {
      toast("Success", {
        description: data.message,
      });
    },
    onError: (error) => {
      toast("Error", {
        description: error.message,
      });
    },
  });
  const { mutateAsync: updateEmail } = client.user.updateEmail.useMutation({
    onSuccess: (data) => {
      toast("Success", {
        description: data.message,
      });
    },
    onError: (error) => {
      toast("Error", {
        description: error.message,
      });
    },
  });
  const { mutateAsync: updatePassword } =
    client.user.updatePassword.useMutation({
      onSuccess: (data) => {
        toast("Success", {
          description: data.message,
        });
      },
      onError: (error) => {
        toast("Error", {
          description: error.message,
        });
      },
    });
  const { mutateAsync: deleteAccount } = client.user.deleteUser.useMutation({
    onSuccess: (data) => {
      toast("Success", {
        description: data.message,
      });
    },
    onError: (error) => {
      toast("Error", {
        description: error.message,
      });
    },
  });

  const handleNameForm = async (data: z.infer<typeof changeNameFormSchema>) => {
    try {
      setLoading(true);

      await updateName(data);

      router.refresh();
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleEmailForm = async (
    data: z.infer<typeof changeEmailFormSchema>,
  ) => {
    try {
      setLoading(true);

      await updateEmail(data);

      router.refresh();
      signOut({
        callbackUrl: "/",
      });
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordForm = async (
    data: z.infer<typeof changePasswordFormSchema>,
  ) => {
    try {
      setLoading(true);

      await updatePassword(data);

      router.refresh();
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteAccount = async (
    data: z.infer<typeof deleteAccountSchema>,
  ) => {
    try {
      setLoading(true);

      await deleteAccount(data);

      toast("Success", {
        description: "Your account has been deleted",
      });

      signOut({
        callbackUrl: "/",
      });
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 mb-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Display Name</CardTitle>
          <CardDescription>
            Please enter your full name, or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <Form {...nameForm}>
          <form onSubmit={nameForm.handleSubmit(handleNameForm)}>
            <CardContent>
              <FormField
                disabled={loading}
                name="name"
                control={nameForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-2 bg-secondary justify-between">
              <div className="text-sm">
                Please use 32 characters at maximum.
              </div>
              <div className="ml-auto">
                <Button type="submit" disabled={loading}>
                  Save
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Email</CardTitle>
          <CardDescription>
            Please enter the email address you want to use to log in with Blog
            Vacancy.
          </CardDescription>
        </CardHeader>
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(handleEmailForm)}>
            <CardContent>
              <FormField
                disabled={loading}
                name="email"
                control={emailForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="Enter your new email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-2 bg-secondary justify-between">
              <div className="text-sm">
                We will email you to verify the change.
              </div>
              <div className="ml-auto">
                <Button type="submit" disabled={loading}>
                  Save
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Password</CardTitle>
          <CardDescription>
            Please enter your current password and a new password.
          </CardDescription>
        </CardHeader>
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(handlePasswordForm)}>
            <CardContent className="space-y-5">
              <FormField
                disabled={loading}
                name="currentPassword"
                control={passwordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Enter your current password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={loading}
                name="newPassword"
                control={passwordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Enter your new password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={loading}
                name="confirmNewPassword"
                control={passwordForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="Re-Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-2 bg-secondary justify-between">
              <div className="text-sm">
                Please use a password with at least 8 characters.
              </div>
              <div className="ml-auto">
                <Button type="submit" disabled={loading}>
                  Save
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-xl">Delete Account</CardTitle>
          <CardDescription>
            Permanently remove your Personal Account and all of its contents
            from the Blog Vacancy platform. This action is not reversible, so
            please continue with caution.
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-t border-red-200 px-6 py-2 bg-red-100/50 justify-end">
          <div className="ml-auto">
            <Button
              variant="destructive"
              onClick={() => handleDeleteAccount({ id: user.id })}
            >
              Delete Personal Account
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

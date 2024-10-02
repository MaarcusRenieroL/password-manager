"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { client } from "~/lib/trpc/client";
import { addNewPasswordSchema } from "~/lib/types/zod-schema";
import { generateRandomPassword } from "~/lib/utils";
import { CopyIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Check } from "lucide-react";
import { Loader } from "~/components/loader";
import { Group } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useRouter } from "next/navigation";

type Props = {
  groups: Group[];
};

export const AddNewPasswordModal: FC<Props> = ({ groups }) => {
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof addNewPasswordSchema>>({
    mode: "onChange",
    resolver: zodResolver(addNewPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
      groupId: "",
      websiteUrl: "https://",
      websiteName: "",
    },
  });

  const { mutateAsync: addNewPassword } =
    client.password.addNewPassword.useMutation({
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

  const handleSubmit = async (data: z.infer<typeof addNewPasswordSchema>) => {
    try {
      setLoading(true);

      await addNewPassword(data);

      router.refresh();
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const password = form.getValues("password");

    if (password) {
      setIsCopying(true);
      navigator.clipboard.writeText(password).then((r) => r);
      toast("Password copied to clipboard", {
        description: "You can now paste it wherever you want.",
      });
      setTimeout(() => {
        setShowCopied(true);
        setIsCopying(false);
      }, 2000);
    } else {
      toast("No password to copy", {
        description: "Generate a password first.",
      });
    }
  };

  const handleGeneratePassword = () => {
    setIsGenerating(true);
    form.setValue("password", generateRandomPassword(20));
    setTimeout(() => setIsGenerating(false), 1000); // Simulate delay
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Password</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <DialogHeader>
              <DialogTitle>Add New Password</DialogTitle>
              <DialogDescription>
                Fill out the form to add new password
              </DialogDescription>
            </DialogHeader>
            <FormField
              name="websiteName"
              disabled={loading}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Website Name</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Website Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="websiteUrl"
              disabled={loading}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Website Url</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Website Url"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              disabled={loading}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Email</Label>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="userName"
              control={form.control}
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Username</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="groupId"
              control={form.control}
              disabled={loading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Category</Label>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {groups.map((group) => (
                          <SelectItem value={group.groupId}>
                            {group.groupName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end justify-between w-full gap-5">
              <FormField
                name="password"
                disabled={loading}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      <Label>Password</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        type={showPassword ? "text" : "password"}
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                size="icon"
                className="p-2"
                onClick={handleCopy}
                disabled={isCopying}
                type="button"
              >
                {isCopying ? (
                  <Loader />
                ) : showCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="p-2"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOpenIcon className="h-4 w-4" />
                ) : (
                  <EyeClosedIcon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleGeneratePassword}
                disabled={isGenerating}
                type="button"
              >
                {isGenerating ? <Loader /> : "Generate new password"}
              </Button>
            </div>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button disabled={loading} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit">
                {loading ? <Loader /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

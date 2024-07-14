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
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { client } from "~/lib/trpc/client";
import { addNewPasswordSchema } from "~/lib/types/zod-schema";

export const AddNewPasswordModal: FC = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof addNewPasswordSchema>>({
    mode: "onChange",
    resolver: zodResolver(addNewPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      userName: "",
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
    } catch (error: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
              name="password"
              disabled={loading}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Label>Password</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button disabled={loading} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

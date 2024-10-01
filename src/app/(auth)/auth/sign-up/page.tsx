"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { registerSchema } from "~/lib/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "~/lib/trpc/client";
import {
  Form,
  FormLabel,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: ""
    },
  });

  const router = useRouter();

  const { mutateAsync: addNewUser } = client.user.addUser.useMutation({
    onSuccess: () => {
      toast("Success", {
        description: "User created successfully",
      });
    },
    onError: (error) => {
      toast("Error", {
        description: "Error creating user",
      });
      console.log(error);
    },
  });

  const handleSignUp = async (data: z.infer<typeof registerSchema>) => {
    await addNewUser(data);
    router.push("/auth/sign-in");
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="w-full h-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-3/4 gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Create an account
              </p>
            </div>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignUp)}>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Label>Name</Label>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Label>Email</Label>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Label>Password</Label>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <Label>Confirm Password</Label>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Re-enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="w-full mt-5">Sign in</Button>
                </form>
              </Form>
            </div>
            <div className="space-y-3 flex flex-col items-center justify-center">
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/sign-in" className="underline">
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/assets/placeholder.png"
            alt="Image"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

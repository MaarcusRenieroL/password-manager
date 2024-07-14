"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";
import Logo from "../../../favicon.ico";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { loginSchema } from "~/lib/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);

  async function handlecredentialLogin(
    values: z.infer<typeof loginSchema>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    router: AppRouterInstance,
  ) {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (response) {
        if (response.error) {
          toast("Error logging in", {
            description: response.error,
          });
          return null;
        }
        toast("Logged in successfully", {
          description: "Redirecting you to your dashboard",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      toast("Error logging in", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
    return false;
  }

  const handleSignIn = async (data: z.infer<typeof loginSchema>) => {
    await handlecredentialLogin(data, setLoading, router);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="p-10">
        <CardHeader className="flex flex-col justify-center items-center space-y-4 text-center">
          <Image src={Logo} alt="Logo" width={25} height={25} />
          <CardTitle>Sign in to your task management app</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  disabled={loading}
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
                  disabled={loading}
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
              </div>
              <Button className="w-full mt-5" type="submit" disabled={loading}>
                Sign in
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="p-0 flex items-center justify-center w-full mt-5">
          Don&apos;t have an account?{" "}
          <span className="ml-3">
            <Link href="/auth/sign-up">
              <Button variant="link" className="hover:underline">
                Sign up
              </Button>
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}

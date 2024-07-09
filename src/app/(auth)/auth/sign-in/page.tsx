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
import {
  Form,
  FormField,
  FormMessage,
  FormControl,
  FormItem,
  FormLabel,
} from "~/components/ui/form";

export default function SignInPage() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <Card className="p-10">
        <CardHeader className="flex flex-col justify-center items-center space-y-4 text-center">
          <Image src={Logo} alt="Logo" width={25} height={25} />
          <CardTitle>Sign in to your password app</CardTitle>
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
              </div>
              <Button className="w-full mt-5">Sign in</Button>
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

import { Check } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const LoginBanner = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Start Securing Your Passwords Today
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Join millions of users who trust SecurePass to keep their online
              accounts safe. Sign up now and take control of your digital
              security.
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>30-day free trial</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>No credit card required</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Cancel anytime</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm space-y-2">
              <form className="flex flex-col space-y-4">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit" className="w-full">
                  Get Started
                </Button>
              </form>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By signing up, you agree to our{" "}
                <Link
                  href="#"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


"use client";

import { CircleHelp } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { InputPassword } from "@/components/refine-ui/form/input-password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLink, useLogin } from "@refinedev/core";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const Link = useLink();
  const { mutate: login, isPending } = useLogin();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSignIn = (values: SignInFormValues) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  return (
      <div className="min-h-screen grid lg:grid-cols-2">

        {/* LEFT — BRAND PANEL (hidden on mobile) */}
        <div className="hidden lg:flex items-center justify-center bg-muted/40 p-10">
          <div className="max-w-sm text-center space-y-6">
            <img
                src="https://img.freepik.com/free-vector/vector-education-logo_779267-2083.jpg"
                className="w-40 mx-auto mix-blend-multiply"
                alt="logo"
            />
            <h2 className="text-2xl font-semibold">Education Portal</h2>
            <p className="text-muted-foreground">
              Manage classes, students and departments from one dashboard.
            </p>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div className="flex items-center justify-center p-4 sm:p-8">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>
                Welcome back — enter your credentials
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSignIn)}
                    className="space-y-5"
                >
                  <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@email.com" {...field} />
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <InputPassword {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />

                  <div className="flex items-center justify-between text-sm">
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(v) =>
                                      field.onChange(v === "indeterminate" ? false : v)
                                  }
                              />
                              <span>Remember me</span>
                            </div>
                        )}
                    />

                    <Link
                        to="/forgot-password"
                        className="flex items-center gap-1 text-muted-foreground hover:text-primary"
                    >
                      Forgot
                      <CircleHelp size={16} />
                    </Link>
                  </div>

                  <Button className="w-full" size="lg" disabled={isPending}>
                    {isPending ? "Signing in..." : "Sign in"}
                  </Button>

                  {/* -------- SOCIAL LOGIN — COMMENTED OUT -------- */}

                  {/*
                <div className="relative my-6">
                  <Separator />
                  <span className="absolute inset-x-0 -top-3 mx-auto w-fit bg-background px-2 text-xs text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">Google</Button>
                  <Button variant="outline">GitHub</Button>
                </div>
                */}

                </form>
              </Form>
            </CardContent>

            <Separator />

            <CardFooter className="justify-center text-sm">
              No account?
              <Link to="/register" className="ml-2 font-medium text-primary">
                Sign up
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
  );
};

SignInForm.displayName = "SignInForm";

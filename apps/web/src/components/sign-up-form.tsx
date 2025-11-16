import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "./ui/use-toast"; // Assuming use-toast is now in ui folder
import gsap from "gsap";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import z from "zod";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: -30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );

      const inputs = cardRef.current.querySelectorAll(".input-field");
      gsap.fromTo(
        inputs,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },

    // this code is writen to handle the form submission for sign up using zod for validation
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
      // here i use authClient to sign up the user
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            navigate("/dashboard");
            toast({
              title: "Success!",
              description:
                "Your account has been created. Welcome to EduCloud Notes!",
            });
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error.error.message || error.error.statusText,
              variant: "destructive",
            });
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z
          .string()
          .min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card ref={cardRef} className="w-full max-w-md shadow-royal-lg border-2">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="font-playfair text-3xl">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Join thousands of students already using EduCloud Notes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field name="name">
              {(field) => (
                <div className="input-field space-y-2">
                  <Label htmlFor={field.name}>Full Name</Label>
                  <Input
                    id={field.name}
                    type="text"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="transition-smooth"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <div className="input-field space-y-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    id={field.name}
                    type="email"
                    placeholder="you@student.edu"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="transition-smooth"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="input-field space-y-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="transition-smooth"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="confirmPassword">
              {(field) => (
                <div className="input-field space-y-2">
                  <Label htmlFor={field.name}>Confirm Password</Label>
                  <Input
                    id={field.name}
                    type="password"
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="transition-smooth"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-red-500">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Subscribe>
              {(state) => (
                <Button
                  type="submit"
                  className="w-full shadow-royal-md hover:scale-105 transition-smooth"
                  size="lg"
                  disabled={!state.canSubmit || state.isSubmitting}
                >
                  {state.isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>
              )}
            </form.Subscribe>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;

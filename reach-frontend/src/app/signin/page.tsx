"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorNotificationUi from "@/components/ui/errorNotification";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle, FcPrevious } from "react-icons/fc";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const formSchema = z.object({
  emailId: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignInValues = z.infer<typeof formSchema>;

export default function SignInForm() {
  const [role, setRole] = useState<string>("employee");

  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";
  const urlInfo = searchParams.get("error");
  // setPreviousPath(previousPath)

  const form = useForm<SignInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailId: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInValues) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/user/signin?path=${from}&userRole=${role}`,
         data,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(response.data);
    } catch (error: any) {
    } finally {
    }
    // Submit to backend here
  };
  async function handleClick() {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/google/login?path=${from}&userRole=${role}`;
    } catch (error: any) {}
  }
  return (
    <div className="  w-ful h-screen flex justify-center bg-[] p-3 items-center">
      <ErrorNotificationUi prop={{ message: urlInfo }} />

      <div className=" w-md mx-auto mt-10 bg-[#f7f9f4] p-6 rounded-sm shadow-md border border-gray-300 space-y-6">
        <h2 className="text-2xl font-bold text-start">Sign In</h2>

        {/* Role Toggle */}
        <ToggleGroup
          type="single"
          value={role}
          onValueChange={(val) => val && setRole(val as "employee" | "manager")}
          className=" w-full justify-center gap-1.5  outline-0 "
        >
          <ToggleGroupItem
            className={` h-12 ${
              role === "employee" ? " bg-indigo-700" : "bg-gray-400"
            } rounded-xl text-white  bg-indigo-800 `}
            value="employee"
            aria-label="Login as Employee"
          >
            Employee
          </ToggleGroupItem>
          <ToggleGroupItem
            className={` h-12 ${
              role === "manager" ? " bg-indigo-700" : "bg-gray-400"
            } text-white  bg-indigo-800 rounded-xl `}
            value="manager"
            aria-label="Login as Manager"
          >
            Manager
          </ToggleGroupItem>
        </ToggleGroup>

        {/* Email + Password Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-teal-700  hover:text-black text-gray-50"
            >
              Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <Separator className="my-4" />
          <p className="text-center text-sm text-muted-foreground absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2">
            or continue with
          </p>
        </div>

        {/* Google Auth Button */}
        <Button
          className="w-full flex items-center gap-2 border-[0.5px]  h-12 bg-slate-100 border-black/45 "
          onClick={() => handleClick()}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

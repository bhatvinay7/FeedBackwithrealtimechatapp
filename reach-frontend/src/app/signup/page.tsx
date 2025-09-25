"use client";
import { Lilita_One } from "next/font/google";
import { axiosPrivate } from "@/lib/axios";
const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita",
});
import ErrorNotification from "@/components/ui/errorNotification";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Header from "@/components/ui/header";
import SuccessfulNotificatinUi from "@/components/ui/notificatinUi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SignupNotification from "@/components/ui/SuccessNotification";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  emailId: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignUpFormValues = z.infer<typeof formSchema>;
export default function SignUpForm() {
  const [show, setShow] = useState<boolean>(false);
  const [response, setResponse] = useState<{ message: string }>({
    message: "",
  });

   const [errorResponse, setErrorResponse] = useState<{ message: string }>({
    message: "",
  });


  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      emailId: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      console.log(values);
      const response = await axiosPrivate.post("/api/user/signup", values);
      setResponse(response?.data as { message: string });
    } catch (error: any) {

      setErrorResponse(error.response.data)
    } finally {
      setTimeout(() => {
        setShow(false);
           setErrorResponse({message:""})
      }, 4000);
    }
  };

  return (
    <div className=" flex w-full h-screen bg-[#e5ebf1] justify-center items-center">
      <Header prop={{ hide: true }} />

      <SuccessfulNotificatinUi
        prop={{
          message: response.message,
          show: show,
          setShow: () => setShow(!show),
        }}
      />
     <ErrorNotification
       prop={{
          message: errorResponse.message,
        }}
     />

      <div className=" w-md mx-auto p-6  rounded-sm bg-blue-50 border-[0.5px] border-black/12 ">
        <h2
          className={` ${lilita.className} text-2xl text-left mb-6 font-bold text-violet-700 `}
        >
          Sign Up
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-12 transition-colors delay-300 " variant="default">
              Create Account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

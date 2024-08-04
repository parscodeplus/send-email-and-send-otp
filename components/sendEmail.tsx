"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { mail_sender } from "@/action";

const formSchema = z.object({
  to: z.string().email().default("parscodeplus@gmail.com"),
  nameto: z.string(),
  nameSender: z.string(),
  from: z.string().email().default("info@timeyad.ir"),
  subject: z.string(),
  message: z.string()
});

export default function SendEmail() {
  const { isPending, execute, data, error } = useServerAction(mail_sender);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: "parscodeplus@gmail.com",
      nameto: "parscode",
      nameSender: "timeyad",
      from: "info@timeyad.ir",
      subject: "test",
      message: "in yek test ast"
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const [data, err] = await execute(values);

    if (err) {
      // show a toast or something
      console.error("Error:", err);
      return;
    }

    form.reset();
  }

  return (
    <Card className="not-prose">
      <CardHeader>
        <CardTitle>Form Example</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email To</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name To</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipient Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nameSender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name Sender</FormLabel>
                  <FormControl>
                    <Input placeholder="Sender Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Sender</FormLabel>
                  <FormControl>
                    <Input placeholder="sender@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input placeholder="Your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Sending..." : "Send"}
            </Button>
          </form>
        </Form>
        {data && <div>Message: {JSON.stringify(data)}</div>}
        {error && <div>Error: {JSON.stringify(error)}</div>}
      </CardContent>
    </Card>
  );
}

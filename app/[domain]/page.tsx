
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { verifyOTPToken } from "@/utils/jwt";
import { sendMailOtp } from "@/action/sendOtp";
import Countdown from "@/components/countdown";
import { useServerAction } from "zsa-react";
import { up_manifest } from "@/action/up-manifest";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "رمز یکبار مصرف شما باید 6 کاراکتر باشد.",
  }),
});

export default function InputOTPForm({
  params,
}: {
  params: { domain: string };
}) {
  // const domain = decodeURIComponent(params.domain);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOTP] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [resetKey, setResetKey] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const { data, err, token, code } = await sendMailOtp("parscodeplus@gmail.com");
      if (err) {
        toast({
          title: "خطا",
          description: "ارسال OTP ناموفق بود. لطفا دوباره تلاش کنید.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      setToken((await token).toString());
      setOTP(code.toString());
      setResetKey((prevKey) => prevKey + 1); // بازنشانی تایمر
      setIsCountdownActive(true); // شروع تایمر
      toast({
        title: "موفقیت",
        description: "OTP با موفقیت ارسال شد.",
      });
    } catch (err) {
      console.error("خطا در ارسال OTP:", err);
      toast({
        title: "خطا",
        description: "خطایی در حین ارسال OTP رخ داد. لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleCountdownComplete = () => {
    toast({
      title: "خطا",
      description: "زمان به پایان رسید! لطفا درخواست OTP جدیدی بدهید.",
      variant: "destructive",
    });
    setOTP("");
    setIsCountdownActive(false); // توقف تایمر
  };
  const { execute , isPending} = useServerAction(up_manifest)

  async function onSubmit(datas: z.infer<typeof FormSchema>) {
    setIsCountdownActive(false); // توقف تایمر
    const [data,err]= await execute({
      name:params.domain.split('.')[0],
      scope:"/",
      short_name:"تایم"+params.domain.split('.')[0],
      start_url:params.domain.replace("%3A",":")
    })
    try {
      const isValid = await verifyOTPToken(token, parseInt(datas.otp));
      if (isValid) {
        toast({
          title: "موفقیت",
          description: "OTP با موفقیت تایید شد.",
        });
        
      } else {
        setOTP("");
        toast({
          title: "خطا",
          description: "OTP نامعتبر است. لطفا دوباره تلاش کنید.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("خطا در اعتبارسنجی OTP:", err);
      toast({
        title: "خطا",
        description: "خطایی در حین اعتبارسنجی OTP رخ داد. لطفا دوباره تلاش کنید.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div>{params.domain.replace("%3A",":")}</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 flex flex-wrap items-center justify-center m-auto"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رمز یکبار مصرف</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  لطفا رمز یکبار مصرف ارسال شده به ایمیل خود را وارد کنید.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <Button type="submit">ارسال</Button>
            {!isCountdownActive && (
              <Button variant={"link"} onClick={handleSendOtp} disabled={isLoading}>
                {isLoading ? "در حال ارسال..." : "ارسال مجدد"}
              </Button>
            )}
            {isCountdownActive && (
              <Countdown
                duration={60}
                onComplete={handleCountdownComplete}
                active={isCountdownActive}
                resetTrigger={resetKey}
              />
            )}
          </div>
        </form>
      </Form>
    </>
  );
}

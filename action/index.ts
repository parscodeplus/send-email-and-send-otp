"use server"

import z, { string } from "zod"
import { createServerAction } from "zsa"
import { sendEmail } from "@/utils/mail.util";

export const mail_sender = createServerAction()
  .input(
    z.object({
      to: z.string().email().default("parscodeplus@gmail.com"),
      nameto:z.string(),
      nameSender:z.string(),
      from:z.string().email().default("info@timeyad.ir"),
      subject:z.string(),
      message:z.string()
    })
  )
  .handler(async ({ input }) => {
  
    const sender = {
        name: input.nameSender,
        address: input.from,
      };
    
      const receipients = [
        {
          name: input.nameto,
          address: input.to,
        },
      ];
      try {
        const result = await sendEmail({
          sender,
          receipients,
          subject: input.subject,
          message: input.message,
        });
        return {
          accepted: result.accepted, status: 200 
        };
      } catch (error) {
        return { message: "Unable to", status: 500 };
      }
  })
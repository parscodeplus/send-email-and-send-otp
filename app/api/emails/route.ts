import { sendEmail } from "@/utils/mail.util";

export async function POST() {
  const sender = {
    name: "My App",
    address: "info@timeyad.ir",
  };

  const receipients = [
    {
      name: "John Doe",
      address: "parscodeplus@gmail.com",
    },
  ];
  try {
    const result = await sendEmail({
      sender,
      receipients,
      subject: "Welcome to our website!",
      message: "You are wekcome to our ",
    });
    return Response.json({
      accepted: result.accepted,
    });
  } catch (error) {
    return Response.json({ message: "Unable to", status: 500 });
  }
}

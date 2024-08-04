import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerifyOTPProps {
  validationCode?: number;
}

export const VerifyOTP = ({ validationCode }: VerifyOTPProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Body className="font-sans bg-gray-50">
        <Container className="bg-white border border-gray-200 rounded-lg shadow-md mt-8 mx-auto p-8">
          <div className="flex flex-col items-center">
            <Img
              src={`https://assets.awwwards.com/awards/images/2012/12/best-logo-2013-3.jpg`}
              width={88}
              height={88}
              alt="Company Logo"
              className="my-4"
            />
            <Text className="text-blue-500 text-xs font-bold tracking-wide uppercase mb-2">
              سلام [نام کاربر] عزیز،
            </Text>
            <Heading className="text-gray-800 text-2xl font-medium text-center mb-4">
              ما خوشحالیم که شما را در [نام شرکت] داریم! برای تکمیل فرآیند ورود/ثبت‌نام خود، لطفاً کد تأیید زیر را وارد کنید:
            </Heading>
          </div>
          <Section className="bg-gray-100 rounded-md px-4 py-6 flex items-center justify-center mb-6">
            <Text className="text-4xl font-bold text-gray-800 tracking-wide">
              {validationCode}
            </Text>
          </Section>
          <Text className="text-gray-600 text-base font-normal leading-6 text-center">
            این کد تا 10 دقیقه معتبر است. اگر شما این درخواست را انجام نداده‌اید، لطفاً این ایمیل را نادیده بگیرید یا با پشتیبانی ما تماس بگیرید.
            <br />
            اگر به کمک نیاز دارید، با کمال میل آماده‌ی پاسخگویی به شما هستیم.
            <br />
            با تشکر از شما،
            <br />
            تیم پشتیبانی [نام شرکت]
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

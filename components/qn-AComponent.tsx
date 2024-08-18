"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function QnAComponent() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const content = [
    {
      question: "سلام ارزش خریدن هم هست",
      answer: "بله، خیلی زیبا و کاربردیه",
      author: "نفیسه احمدی",
    },
    {
      question: "کیفیت ساخت چطوره؟",
      answer: "خیلی خوبه و مقاومه",
      author: "علی رضایی",
    },
    {
      question: "آیا این محصول گارانتی دارد؟",
      answer: "بله، دارای 2 سال گارانتی است",
      author: "محمد حسینی",
    },
    // می‌توانید مقادیر بیشتری اضافه کنید
  ];

  return (
    <div>
      <Carousel direction="rtl" setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {content.map((item, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex flex-col aspect-square justify-between p-6 ">
                  <div>
                    <span className="flex flex-row gap-2 text-xl font-semibold">
                      <FileQuestion color="blue" />
                      {item.question}
                    </span>
                    <span className="flex flex-row gap-2 text-sm mt-4">
                      <span className="text-sm text-muted-foreground">
                        {" "}
                        پاسخ :
                      </span>
                      {item.answer}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground text-right mt-auto">
                    {item.author}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}

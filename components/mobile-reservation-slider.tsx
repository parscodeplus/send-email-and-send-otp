"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import FlickeringGrid from "@/components/magicui/flickering-grid";
import DotPattern from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "./magicui/animated-grid-pattern";
export function MobileReservationSlider() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    // بررسی اینکه اگر عرض صفحه کمتر از 768px باشد (موبایل)
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const isFirstVisit = localStorage.getItem("firstVisit");
      if (!isFirstVisit) {
        setShowSlider(true);
        localStorage.setItem("firstVisit", "true");
      }
    }
  }, []);

  useEffect(() => {
    if (api) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });
    }
  }, [api]);

  if (!showSlider) return null;

  return (
    
    <div className="relative flex h-full  w-full  overflow-hidden   items-center justify-center bg-background ">
      {/* <DotPattern className="absolute top-0 left-0 w-full z-10" height={1000} /> */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-0%] h-full w-full  skew-y-12",
        )}
      />
      <div className="relative h-full max-w-xs mx-auto z-20 ">
        <Carousel setApi={setApi} direction="rtl">
          <CarouselContent>
            {/* اسلاید 1 */}
            <CarouselItem key={0}>
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6 text-center ">
                  <Image
                    src="/IMG_20240818_020655.jpg"
                    alt="alt"
                    width={200}
                    height={400}
                  />
                  <span className="text-2xl font-semibold mb-2">
                    به سایت رزرو ما خوش آمدید!
                  </span>
                  <p className="text-sm">
                    به راحتی اقامت خود را در بهترین هتل‌ها رزرو کنید.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
            {/* اسلاید 2 */}
            <CarouselItem key={1}>
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6 text-center">
                  <span className="text-2xl font-semibold mb-2">
                    مقایسه قیمت‌ها
                  </span>
                  <p className="text-sm">
                    بهترین پیشنهادها را از بیش از ۲۰,۰۰۰ اقامتگاه فعال پیدا
                    کنید.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
            {/* اسلاید 3 */}
            <CarouselItem key={2}>
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6 text-center">
                  <span className="text-2xl font-semibold mb-2">
                    رابط کاربری آسان
                  </span>
                  <p className="text-sm">
                    به سرعت سایت را مرور کرده و محل اقامت دلخواهتان را رزرو
                    کنید.
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* دایره‌های نشان‌دهنده تعداد اسلایدها */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={`rounded-full transition-all duration-300 ${
                current === index ? "w-2 h-2 bg-black" : "w-2 h-2 bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
        {/* دکمه بستن اسلایدر */}
        <button
          onClick={() => setShowSlider(false)}
          className="mt-4 w-full py-2 text-white bg-blue-500 rounded"
        >
          بستن
        </button>
      </div>
    </div>
  );
}

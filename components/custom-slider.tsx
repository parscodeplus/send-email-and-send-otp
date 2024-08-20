"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

export function CustomSlider() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (api) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });
    }
  }, [api]);

  if (isDesktop) return null;

  return (
    <AnimatePresence>
      <div className={cn("container mx-auto max-w-screen-xl px-4 py-4")}>
        <Carousel
          setApi={setApi}
          showArrows={false}
          opts={{
            align: "start",
          }}
          direction="rtl"
          className="w-full max-w-xs"
        >
          <CarouselContent className="h-full w-full">
            {/* Slide 1 */}
            <CarouselItem key={0} className="h-full w-full flex items-center justify-center">
              <Card className="border-none rounded-none shadow-none h-full w-full flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="relative flex items-center justify-center">
                    {/* دایره برای تصویر */}
                    <div className="w-36 h-36 rounded-full overflow-hidden">
                      <Image
                        src="/path/to/your/image1.jpg" // مسیر تصویر شما
                        alt="ساعت هوشمند"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* نشان زنده */}
                    <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      زنده
                    </div>
                  </div>
                  <span className="text-xl font-semibold mb-2">ساعت هوشمند</span>
                  <p className="text-sm">فروش ویژه ساعت‌های هوشمند.</p>
                  <p className="text-sm">ساعت 21:00</p>
                </CardContent>
              </Card>
            </CarouselItem>

            {/* Slide 2 */}
            <CarouselItem key={1} className="h-full w-full flex items-center justify-center">
              <Card className="border-none rounded-none shadow-none h-full w-full flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="relative flex items-center justify-center">
                    {/* دایره برای تصویر */}
                    <div className="w-36 h-36 rounded-full overflow-hidden">
                      <Image
                        src="/path/to/your/image2.jpg" // مسیر تصویر شما
                        alt="کره بادام زمینی"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-xl font-semibold mb-2">رژیم از شنبه!</span>
                  <p className="text-sm">محصولات رژیمی و سالم.</p>
                  <p className="text-sm">ساعت 20:00</p>
                </CardContent>
              </Card>
            </CarouselItem>

            {/* Slide 3 */}
            <CarouselItem key={2} className="h-full w-full flex items-center justify-center">
              <Card className="border-none rounded-none shadow-none h-full w-full flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="relative flex items-center justify-center">
                    {/* دایره برای تصویر */}
                    <div className="w-36 h-36 rounded-full overflow-hidden">
                      <Image
                        src="/path/to/your/image3.jpg" // مسیر تصویر شما
                        alt="کوله پشتی"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <span className="text-xl font-semibold mb-2">برای شروع مدرسه</span>
                  <p className="text-sm">کوله‌پشتی‌های جدید.</p>
                  <p className="text-sm">ساعت 19:00</p>
                </CardContent>
              </Card>
            </CarouselItem>

            {/* Slide 4 */}
            <CarouselItem key={3} className="h-full w-full flex items-center justify-center">
              <Card className="border-none rounded-none shadow-none h-full w-full flex items-center justify-center">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <div className="relative flex items-center justify-center">
                    {/* دایره برای تصویر */}
                    <div className="w-36 h-36 rounded-full overflow-hidden">
                      <Image
                        src="/path/to/your/image4.jpg" // مسیر تصویر شما
                        alt="روتین پوستی"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* نشان زنده */}
                    <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      زنده
                    </div>
                  </div>
                  <span className="text-xl font-semibold mb-2">روتین پوستی ضدجوش</span>
                  <p className="text-sm">محصولات مراقبت پوستی.</p>
                  <p className="text-sm">در حال پخش</p>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </AnimatePresence>
  );
}

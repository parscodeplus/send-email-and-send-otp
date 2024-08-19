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
import AnimatedGridPattern from "./magicui/animated-grid-pattern";
import MaxWidthWrapper from "./max-width-wrapper";
import { cn } from "@/lib/utils";
import Globe from "./magicui/globe";
import Meteors from "./magicui/meteors";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "./ui/separator";
import PulsatingButton from "./ui/pulsating-button";
import { useMediaQuery } from "@/hooks/use-media-query"
export function MobileReservationSlider() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [showSlider, setShowSlider] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    if (!isDesktop) {
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
      setCurrent(api.selectedScrollSnap(

      ));

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });
    }
  }, [api]);

  //  if (!showSlider || isDesktop) return null;

  return (
    <AnimatePresence>
    <div
      className={cn(
        "container mx-auto max-w-screen-xl px-4 py-4 sm:px-4 lg:px-4"
      )}
    >
      {/* <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className="absolute inset-0 skew-y-12 w-screen/2"
      /> */}
      <Carousel
        setApi={setApi}
        showArrows={false}
        opts={{
          align: "start",
        }}
        direction="rtl"
        className=" w-full max-w-xs "
      >
        <CarouselContent className="h-full w-full">
          {/* Slide 1 */}
          <CarouselItem
            key={0}
            className=" h-full w-full flex items-center justify-center"
          >
            <Card className="border-none rounded-none shadow-none h-full w-full flex items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                <Image
                  src="/IMG_20240818_020655.jpg"
                  alt="alt"
                  width={200}
                  height={200}
                />
                <span className="text-xl font-semibold mb-2">متن اسلاید 1</span>
                <p className="text-sm">توضیحات برای اسلاید 1.</p>
              </CardContent>
            </Card>
          </CarouselItem>
          {/* Slide 2 */}
          <CarouselItem
            key={1}
            className="h-full w-full flex items-center justify-center"
          >
            <Card className="border-none rounded-none shadow-none h-full w-full flex items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
              <span className="pointer-events-none pb-4 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                    Globe
                  </span>
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  // exit={{ opacity: 0, scale: 0.1 }}
                  className="relative flex  w-full max-w-xs items-center justify-center overflow-hidden mx-8 pb-28 pt-8 "
                >
                  
                  <Globe className="top-1 " />
                  {/* <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" /> */}
                </motion.div>
                <p className="pt-4  px-8">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ipsam voluptatibus, unde totam quia laborum voluptas dolores
                  blanditiis inventore ipsum animi, explicabo, quo sapiente esse
                  placeat. Ullam cumque perspiciatis optio quasi.
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
          {/* Slide 3 */}
          <CarouselItem
            key={2}
            className="h-full w-full flex items-center justify-center"
          >
            <Card className="border-none rounded-none shadow-none h-full w-full flex items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                {/* <div className="relative flex px-12 w-full flex-col items-center justify-center overflow-hidden">
                  <Meteors number={30} />
                  <span className="pointer-events-none space-x-4 mx-4 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
                    Meteors
                  </span>
                </div> */}
                <span className="text-xl font-semibold mb-2">
                  عنوان اسلاید 3
                </span>
                <p className="text-sm">توضیحات برای اسلاید 3.</p>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* Pagination Dots */}
      <div
        dir="rtl"
        className="absolute bottom-[70px] right-0 left-0 w-full flex justify-center items-center"
      >
        <div className="flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <span
              key={index}
              className={`rounded-full transition-all duration-700 ${
                current === index ? "w-5 h-3 bg-black" : "w-3 h-3 bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
      <Separator />

      {/* Close Button */}
      <PulsatingButton
        onClick={() => setShowSlider(false)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs mx-auto py-2  text-center"
      >
        بستن
      </PulsatingButton>
    </div>
    </AnimatePresence>
  );
}

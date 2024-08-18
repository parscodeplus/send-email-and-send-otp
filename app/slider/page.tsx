import React from "react";
import { MobileReservationSlider } from "@/components/mobile-reservation-slider";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function HomePage() {
  return (
    <MaxWidthWrapper>
      <MobileReservationSlider />
    </MaxWidthWrapper>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  
} from "@heroicons/react/24/outline";
import Link from "next/link";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import GetStartedSection from "./GetStartedSection";
import AboutSection from "./AboutSection";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <main className="flex-1 pt-16">
        <HeroSection/>
        <AboutSection/>
        <FeaturesSection/>
        <GetStartedSection/>
      </main>
    </div>
  );
}





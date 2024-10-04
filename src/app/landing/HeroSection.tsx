"use client";

import { motion } from "framer-motion";
import {
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { FaGithub } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="w-full py-12  md:py-16 lg:pt-20 pb-20 md:mb-8 lg:mb-10 relative overflow-hidden mx-auto max-w-[1500px]">
      <div className="xs:px-5 px-8 md:px-10 lg:pl-16 lg:pr-[3.5rem] xl:pr-16 relative z-10">
        <div className="flex gap-x-12 xs:gap-y-7 gap-y-10  items-center lg:flex-row flex-col ">
          <motion.div
            initial={{ opacity: 0, x:10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="xs:space-y-4 space-y-6 w-full lg:w-1/2 relative"
          >
            <h1 className="
                xs:text-5xl text-6xl 
                font-bold xs:font-[750] text-center lg:text-start
                bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 
              ">
                VocabApp
              </h1>
            <p className="text-gray-500 text-lg md:text-xl lg:text-xl text-center lg:text-start">
              VocabAppはすべての英語学習者のための英単語学習ツールです
            </p>

            <div className="flex xs:justify-center gap-4 items-center justify-center lg:justify-start xs:px-1 ">
              <Link
                href="/signup"
                className="
                    w-full text-center lg:w-fit max-w-[300px]
                    px-4 py-[0.65rem] rounded-md font-medium 
                    bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300
                     flex items-center justify-center group"
              >
                今すぐ始める
                <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="https://github.com/taiyo914/vocab-app-next.js"
                target="_blank"
                rel="noopener noreferrer"
                className="
                    w-full lg:w-fit max-w-[300px] 
                    px-4 py-[0.65rem] rounded-md font-medium 
                    bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 
                    flex items-center justify-center group"
              >
                詳細を見る
                <FaGithub className="text-[1.1rem] ml-1 group-hover:-translate-y-[3px] transition-transform"/>
                
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-full lg:w-1/2 shadow-2xl xs:shadow-xl rounded-xl max-w-[620px] relative"
          >
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              effect={"fade"}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, EffectFade]}
              className="rounded-xl"
            >
              <SwiperSlide>
              <div className="max-w-full lg:w-[620px]">
                <Image
                  src="/images/table_screen.jpeg"
                  alt="アプリのスクリーンショット"
                  layout="responsive"
                  width={400}
                  height={900}
                />
              </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="max-w-full lg:w-[620px]">
                  <Image
                    src="/images/cards_screen.jpeg"
                    alt="アプリのスクリーンショット"
                    layout="responsive"
                    width={400}
                    height={300}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="max-w-full lg:w-[620px]">
                  <Image
                    src="/images/review_screen.jpeg"
                    alt="アプリのスクリーンショット"
                    layout="responsive"
                    width={400}
                    height={300}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

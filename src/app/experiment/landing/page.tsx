"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  DevicePhoneMobileIcon,
  Bars3Icon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import 'swiper/css/effect-fade';
import "swiper/css/pagination";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-16 lg:py-32 relative overflow-hidden">
          <div className="xs:px-5 px-8 md:px-10 lg:pl-16 lg:pr-12 xl:pr-16 relative z-10">
            <div className="flex gap-x-12 xs:gap-y-7 gap-y-10  items-center lg:flex-row flex-col ">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="xs:space-y-4 space-y-7 w-full lg:w-1/2"
              >
                <h1
                  className="
                  xs:text-4xl text-5xl font-bold xs:font-[750] lg:text-start
                  tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 
                  xs:space-y-2 space-y-4 lg:space-y-5
                  flex items-baseline flex-col justify-center"
                >
                  <div className="w-full text-center lg:text-start">しっかりまとめて</div>
                  <div className="w-full text-center lg:text-start">サクッと復習</div>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl lg:text-xl text-center lg:text-start">
                  VocabAppはすべての英語学習者のための英単語学習ツールです。
                </p>

                <div className="flex xs:justify-center gap-4 items-center justify-center lg:justify-start xs:px-1 ">
                  <Link href="#" className="
                        w-full text-center lg:w-fit max-w-[300px]
                        px-4 py-2 rounded-md font-medium
                        bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300
                    ">
                      今すぐ始める
                  </Link>
                  <Link href="#" className="
                    w-full lg:w-fit max-w-[300px]
                    px-4 py-2 rounded-md font-medium 
                    bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 
                    flex items-center justify-center group">
                      詳細を見る
                      <ArrowRightIcon className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full lg:w-1/2 shadow-2xl rounded-xl max-w-[620px]"
              >
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  effect={'fade'}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay, Pagination, EffectFade]}
                  className="rounded-xl"
                >
                  <SwiperSlide>
                    <Image
                      src="/images/table_screen_shot.png"
                      alt="アプリのスクリーンショット"
                      layout="responsive"
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/images/cards_screen_shot.png"
                      alt="アプリのスクリーンショット"
                       layout="responsive"
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src="/images/review_screen_shot.png"
                      alt="アプリのスクリーンショット"
                      layout="responsive"
                      width={500}
                      height={500}
                    />
                  </SwiperSlide>
                </Swiper>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              主な機能
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 bg-blue-50 dark:bg-gray-700 rounded-lg shadow-lg transform -rotate-2"
              >
                <DevicePhoneMobileIcon className="h-12 w-12 mb-4 text-blue-500" />
                <h3 className="text-lg font-bold">モバイルフレンドリー</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  いつでもどこでも学習できます
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 bg-purple-50 dark:bg-gray-700 rounded-lg shadow-lg transform rotate-2"
              >
                <CheckCircleIcon className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-lg font-bold">進捗トラッキング</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">学習の進み具合を可視化</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 bg-indigo-50 dark:bg-gray-700 rounded-lg shadow-lg transform -rotate-1"
              >
                <ArrowDownTrayIcon className="h-12 w-12 mb-4 text-indigo-500" />
                <h3 className="text-lg font-bold">オフライン学習</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  インターネット接続なしで学習可能
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <section
          id="how-to-use"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900 relative overflow-hidden"
        >
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              使い方
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-4 transform -rotate-12">
                  1
                </div>
                <h3 className="text-lg font-bold">アプリをダウンロード</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  App StoreまたはGoogle Playからインストール
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4 transform rotate-12">
                  2
                </div>
                <h3 className="text-lg font-bold">単語リストを作成</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">学習したい単語を追加</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold mb-4 transform -rotate-6">
                  3
                </div>
                <h3 className="text-lg font-bold">学習を開始</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  クイズや復習機能で効率的に学習
                </p>
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10 -z-10"></div>
        </section>
        <section
          id="download"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-500 to-purple-600 text-white"
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  今すぐダウンロード
                </h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  単語マスターを使って、効率的に語彙力を向上させましょう。
                </p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    className="max-w-lg flex-1 bg-white/10 text-white placeholder:text-blue-200"
                    placeholder="メールアドレス"
                    type="email"
                  />
                  <button type="submit" className="bg-white text-blue-500 hover:bg-blue-50">
                    登録
                  </button>
                </form>
                <p className="text-xs text-blue-200">
                  登録すると、最新情報やアップデートをお知らせします。
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/20 transform rotate-3 rounded-3xl"></div>
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="アプリのスクリーンショット"
                  width={300}
                  height={300}
                  className="relative z-10 rounded-2xl shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 単語マスター. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link
              className="text-xs hover: underline underline-offset-4 text-gray-500 dark:text-gray-400"
              href="#"
            >
              利用規約
            </Link>
            <Link
              className="text-xs hover: underline underline-offset-4 text-gray-500 dark:text-gray-400"
              href="#"
            >
              プライバシーポリシー
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

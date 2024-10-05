"use client";

import { motion } from "framer-motion";
import {
  ArrowDownTrayIcon,
  DevicePhoneMobileIcon,
  SpeakerWaveIcon,
  CodeBracketIcon,
  ViewColumnsIcon
} from "@heroicons/react/24/outline";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full xs:py-16 py-12 md:py-20 lg:py-24 pb-20 md:pb-24"
    >
      <div className="mx-auto xs:px-5 px-8 md:px-10 lg:px-16 max-w-[1500px]">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-center mb-10 md:mb-12 lg:mb-16  bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 ">
          豊富な機能で
          <div className="sm:hidden h-4 xs:h-3"></div>
          学習をサポート
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <FeatureCard
            icon={<DevicePhoneMobileIcon className="h-10 w-10 text-blue-600" />}
            title="完全モバイル対応"
            description="スマートフォンでもPCと同じ操作感"
          />
          <FeatureCard
            icon={<ViewColumnsIcon className="h-10 w-10 text-blue-600" />}
            title="2つの学習ビュー"
            description="カードビューとテーブルビューで柔軟な学習"
          />
          <FeatureCard
            icon={<SpeakerWaveIcon className="h-10 w-10 text-blue-600" />}
            title="音声読み上げ"
            description="米国・英国・豪州の発音に対応"
          />
          <FeatureCard
            icon={<ArrowDownTrayIcon className="h-10 w-10 text-blue-600" />}
            title="データインポート"
            description="TSV/CSVから単語を一括登録"
          />
          <FeatureCard
            icon={<CodeBracketIcon className="h-10 w-10 text-blue-600" />}
            title="マークダウン記法"
            description="太字や下線で重要ポイントを強調"
          />
          <FeatureCard
            // icon={<SparklesIcon className="h-10 w-10 text-blue-600" />}
            icon={
              <svg
                width="2500"
                height="2500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke-width="1.5"
                className="h-10 w-10 text-blue-500"
                viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"
              >
                <text x="-9999" y="-9999">
                  ChatGPT
                </text>
                <path
                  d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
                  fill="currentColor"
                />
              </svg>
            }
            title="ChatGPTと連携"
            description="ChatGPTと連携し学習効率を最大化"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100"
    >
      <div className="mb-4 p-3 rounded-full bg-blue-50">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
}

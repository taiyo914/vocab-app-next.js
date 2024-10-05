"use client";
import Link from "next/link";
import { useState, useEffect, FormEvent, ChangeEvent, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import useUserStore from "@/store/userStore";
import {
  ArrowUturnLeftIcon,
  ArrowDownTrayIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";
import CustomSlider from "@/components/CustomSlider";
import useNotificationStore from "@/store/useNotificationStore";
import Spinner from "@/components/Spiner";

import usePromptStore from "@/store/promptStore";

import ChatGPTButton from "./ChatGPTButton";
import Modal from "@/components/Modal";

interface FormData {
  word: string;
  meaning: string;
  example: string;
  example_translation: string;
  memo: string;
  index: number;
}

const initialValue = {
  word: "",
  meaning: "",
  example: "",
  example_translation: "",
  memo: "",
  index: 0,
};

export default function AddNewWord() {
  const supabase = createClient();
  const [formData, setFormData] = useState<FormData>(initialValue);
  const { userId, fetchUserId, fetchWords } = useUserStore();
  const router = useRouter();
  const showNotification = useNotificationStore((state) => state.showNotification);
  const [initialAddAndContinue, setInitialAddAndContinue] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { prompts, fetchPrompts, updatePrompts } = usePromptStore();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [localPrompts, setLocalPrompts] = useState({
    word: "",
    meaning: "",
    example: "",
    example_sentence: "",
    memo: "",
  });

  useEffect(() => {
    if (isModalOpen) {
      setLocalPrompts(prompts);
    }
  }, [isModalOpen, prompts]);

  const handleCloseModal = () => {
    closeModal();
    setLocalPrompts(prompts);
  };
  const handleSavePrompts = async () => {
    if (userId) {
      const error = await updatePrompts(userId, localPrompts); //updateはlocalPromptsを代入するようにして、それが成功したらsetPromptsに代入するようにする
      if (error) {
        showNotification(`プロンプトを更新できませんでした...エラー:${error.message}`, "error");
      } else {
        setIsModalOpen(false);
      }
    }
  };

  useEffect(() => {
    fetchUserId(); // キャッシュ済みなら何もしない
  }, [fetchUserId]);

  useEffect(() => {
    if (!userId) return;
    const loadPrompts = async () => {
      const error = await fetchPrompts(userId); //もしユーザーidがあれば、proptsを取得し、セット
      if (error) {
        showNotification(`プロンプトを取得できませんでした...エラー:${error.message}`, "error");
      }
    };
    loadPrompts();
  }, [userId, fetchPrompts]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.word.trim() &&
      !formData.meaning.trim() &&
      !formData.example.trim() &&
      !formData.example_translation.trim() &&
      !formData.memo.trim()
    ) {
      showNotification("最低1つは入力してください", "error")
      return; 
    }

    setAddLoading(true);
    const error = await saveDataToDatabase(formData);
    if (!error) {
      await fetchWords();
      showNotification("単語を追加しました", "success");
      router.push("/");
    }
    setAddLoading(false);
  };

  const handleSubmitAndContinue = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      !formData.word.trim() &&
      !formData.meaning.trim() &&
      !formData.example.trim() &&
      !formData.example_translation.trim() &&
      !formData.memo.trim()
    ) {
      showNotification("最低1つは入力してください", "error")
      return; 
    }
    const error = await saveDataToDatabase(formData);
    if (!error) {
      setFormData(initialValue);
      showNotification("単語を追加しました", "success");
    }
    setInitialAddAndContinue(true);
  };

  const saveDataToDatabase = async (data: FormData) => {
    const { error: insertError } = await supabase
      .from("words")
      .insert([{ user_id: userId, ...data }]);
    if (insertError) {
      showNotification(
        `単語の追加に失敗しました...エラーメッセージ: ${insertError.message}`,
        "error"
      );
      return insertError;
    }
  };

  const handleBack = async () => {
    if (initialAddAndContinue) {
      await fetchWords();
    }
    router.push("/");
  };

  return (
    <div>
      <div className="px-5 xs:p-0 mt-4 mx-auto max-w-2xl">
        <div className="flex justify-between items-center mb-6 xs:mb-5 px-0.5 xs:pr-5 xs:pl-3">
          <div
            onClick={handleBack}
            className="
              text-gray-500 cursor-pointer notxs:-mb-2
              p-2 rounded-full
              hover:text-gray-700 hover:bg-gray-100 transition duration-200 
              flex items-center space-x-1"
          >
            <ArrowUturnLeftIcon className="h-4" />
            <div>戻る</div>
          </div>
          <Link
            href="new/import"
            className="
              px-4 py-2.5 text-black
              border rounded-lg bg-gray-100 hover:border-gray-300
              font-[450] hover:bg-gray-300 transition-all duration-300 
             "
          >
            <ArrowDownTrayIcon className="h-5 xs:h-4 inline -mt-1" />
            <span className="xs:text-sm"> {"TSV/CSV"}からインポート</span>
            
          </Link>
        </div>
        <form onSubmit={handleSubmit}  autoComplete="off">
          <div className="p-8 sm:p-10 lg:px-12 lg:py-11 xs:py-2 xs:px-5 border xs:border-none bg-white rounded-xl shadow-lg xs:shadow-none">
            <div className="xs:mb-5 mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 font-bold ml-1 " htmlFor="word">
                    単語
                  </label>
                  <SpeekerButton word={formData.word}/>
                </div>
                <ChatGPTButton
                  label="単語"
                  input={formData.word}
                  prompt={prompts.word}
                  openModal={openModal}
                />
              </div>
              <input
                type="text"
                name="word"
                id="word"
                value={formData.word}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  transition-colors
                  focus:outline-blue-400"
                autoComplete="off"
                placeholder="例: apple"
              />
            </div>

            <div className="xs:mb-5 mb-9">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-bold ml-1" htmlFor="meaning">
                  意味
                </label>
                <ChatGPTButton
                  label="意味"
                  input={formData.meaning}
                  prompt={prompts.meaning}
                  openModal={openModal}
                />
              </div>
              <input
                type="text"
                name="meaning"
                id="meaning"
                value={formData.meaning}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-blue-400 transition-colors"
                autoComplete="off"
                placeholder="例: りんご"
              />
            </div>

            <div className="xs:mb-5 mb-7">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <label className="block text-gray-700 font-bold ml-1 " htmlFor="example">
                    例文
                  </label>
                  <SpeekerButton word={formData.example}/>
                </div>
                <ChatGPTButton
                  label="例文"
                  input={formData.example}
                  prompt={prompts.example}
                  openModal={openModal}
                />
              </div>
              <textarea
                name="example"
                id="example"
                value={formData.example}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-blue-400 transition-colors
                  h-20"
                autoComplete="off"
                placeholder={`例: An **apple** a day keeps the doctors away`}
              ></textarea>
            </div>

            <div className="xs:mb-5 mb-7">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-bold ml-1" htmlFor="example_translation">
                  例文訳
                </label>
                <ChatGPTButton
                  label="例文訳"
                  input={formData.example_translation}
                  prompt={prompts.example_sentence}
                  openModal={openModal}
                />
              </div>
              <textarea
                name="example_translation"
                id="example_translation"
                value={formData.example_translation}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-blue-400 transition-colors
                  h-20"
                autoComplete="off"
                placeholder="例: 1日1個のりんごで__医者いらず__"
              ></textarea>
            </div>

            <div className="xs:mb-5 mb-7">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 font-bold ml-1" htmlFor="memo">
                  メモ
                </label>
                <ChatGPTButton
                  label="メモ"
                  input={formData.memo}
                  prompt={prompts.memo}
                  openModal={openModal}
                />
              </div>
              <textarea
                name="memo"
                id="memo"
                value={formData.memo}
                onChange={handleChange}
                className="
                  w-full px-3 py-2 
                  border rounded-lg 
                  text-gray-800 
                  focus:outline-blue-400 transition-colors 
                  h-20"
                autoComplete="off"
                placeholder="例: ウェールズ地方由来のことわざ"
              ></textarea>
            </div>

            <div className="xs:mb-5 mb-6">
              <div className="flex">
                <label className="block text-gray-700 font-bold mb-1 ml-1">優先度 </label>
                <div className="text-gray-500  pl-2">{formData.index}</div>
              </div>
              <div className="flex w-full px-0.5">
                <CustomSlider
                  sliderValue={formData.index}
                  onChange={(value) => setFormData({ ...formData, index: value })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 xs:my-4 my-6 xs:px-5">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-700 text-white font-bold rounded-full transition duration-300
                flex items-center justify-center gap-1"
            >
              {addLoading && <Spinner borderWeight="border-[0.23rem]" props="invisible" />}追 加
              {addLoading && (
                <Spinner
                  borderWeight="border-[0.23rem]"
                  size="xs:h-4 xs:w-4 h-5 w-5"
                  borderColor="border-gray-300 border-t-white border-r-white"
                  props="opacity-80"
                />
              )}
            </button>
            <button
              type="button"
              onClick={handleSubmitAndContinue}
              className="w-full py-3 px-4 bg-gray-300 hover:bg-gray-400 text-black font-bold rounded-full transition duration-300
                flex items-center justify-center gap-1"
            >
              追加 & 新規作成
            </button>
          </div>
        </form>
        
        <HowToUse/>
        <div className="h-80"></div>
       
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} width="w-3/5 max-w-lg">
        <h3 className="text-center font-bold text-2xl mb-2 mt-4 flex items-center justify-center gap-1">
          <PencilSquareIcon className="h-6 w-6" />
          質問の編集
        </h3>
        <p className="text-center text-gray-500 mb-10 text-sm md:text-base">
          {"{input}"}に入力した内容が入ります
        </p>
        <div className="flex flex-col gap-6">
          <label>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 font-semibold ml-1">単語の質問</div>
              <div className="text-gray-500 text-xs hidden md:block">
                {"{input}"}には入力した単語が入ります
              </div>
            </div>
            <textarea
              className="rounded-lg h-[6rem] text-gray-900 focus:outline-blue-400 w-full border py-2 px-3 rounded "
              placeholder="{input}を使って単語の質問を入力"
              value={localPrompts.word}
              onChange={(e) => setLocalPrompts({ ...localPrompts, word: e.target.value })}
            />
          </label>
          <label>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 font-semibold ml-1">意味の質問</div>
              <div className="text-gray-500 text-xs hidden md:block">
                {"{input}"}には入力した意味が入ります
              </div>
            </div>
            <textarea
              className="rounded-lg h-[6rem] text-gray-900 focus:outline-blue-400 w-full border py-2 px-3 rounded "
              placeholder="{input}を使って意味の質問を入力"
              value={localPrompts.meaning}
              onChange={(e) => setLocalPrompts({ ...localPrompts, meaning: e.target.value })}
            />
          </label>
          <label>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 font-semibold ml-1">例文の質問</div>
              <div className="text-gray-500 text-xs hidden md:block">
                {"{input}"}には入力した例文が入ります
              </div>
            </div>
            <textarea
              className="rounded-lg h-[6rem] text-gray-900 focus:outline-blue-400 w-full border py-2 px-3 rounded "
              placeholder="{input}を使って例文の質問を入力"
              value={localPrompts.example}
              onChange={(e) => setLocalPrompts({ ...localPrompts, example: e.target.value })}
            />
          </label>
          <label>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 font-semibold ml-1">例文訳の質問</div>
              <div className="text-gray-500 text-xs hidden md:block">
                {"{input}"}には入力した例文訳が入ります
              </div>
            </div>
            <textarea
              className="rounded-lg h-[6rem] text-gray-900 focus:outline-blue-400 w-full border py-2 px-3 rounded "
              placeholder="{input}を使って例文訳の質問を入力"
              value={localPrompts.example_sentence}
              onChange={(e) =>
                setLocalPrompts({ ...localPrompts, example_sentence: e.target.value })
              }
            />
          </label>
          <label>
            <div className="flex justify-between items-center">
              <div className="text-gray-700 font-semibold ml-1">メモの質問</div>
              <div className="text-gray-500 text-xs hidden md:block">
                {"{input}"}には入力したメモが入ります
              </div>
            </div>
            <textarea
              className="rounded-lg h-[6rem] text-gray-900 focus:outline-blue-400 w-full border py-2 px-3 rounded "
              placeholder="{input}を使ってメモの質問を入力"
              value={localPrompts.memo}
              onChange={(e) => setLocalPrompts({ ...localPrompts, memo: e.target.value })}
            />
          </label>
        </div>

        {/* <div className="py-2 px-4 rounded-lg bg-blue-500 text-white hover:opacity-70 cursor-pointer text-center" onClick={handleSavePrompts}>保存</div> */}
        <div className="flex gap-3 mt-7 mb-4">
          <div
            onClick={handleSavePrompts}
            className="py-2 border rounded-xl text-white w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 font-semibold text-center cursor-pointer"
          >
            保 存
          </div>
          <div
            onClick={handleCloseModal}
            className="cursor-pointer text-center py-2 border rounded-xl text-white w-full bg-gray-500 hover:bg-gray-600 transition-colors duration-300 font-semibold cursor-pointer"
          >
            閉じる
          </div>
        </div>
      </Modal>
    </div>
  );
}

import { handleSpeak } from "@/components/SpeechButton";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

function SpeekerButton({word}:{word:string} ) {
  const [isOpen, setIsOpen]=useState<boolean>(false);
  return(<>
    <div
      className="relative inline-block text-black"
      onMouseEnter={()=>setIsOpen(true)}
      onMouseLeave={()=>setIsOpen(false)}
    >
      <button className="text-gray-500 flex justify-end w-full">
        <SpeakerWaveIcon className="h-5 cursor-pointer" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 -top-2  bg-white border rounded-xl border-gray-300 shadow-lg "
          >
            <div
              onClick={() => handleSpeak(word, "en-US")}
              className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-t-xl"
            >
              <SpeakerWaveIcon className="h-[1.2rem]" />
              US
            </div>
            <div
              onClick={() => handleSpeak(word, "en-GB")}
              className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150             "
            >
              <SpeakerWaveIcon className="h-[1.2rem]" />
              UK
            </div>
            <div
              onClick={() => handleSpeak(word, "en-AU")}
              className="flex items-center gap-1 w-20 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-b-xl"
            >
              <SpeakerWaveIcon className="h-[1.2rem]" />
              AUS
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </>)
}

import { GoDotFill } from "react-icons/go";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
function HowToUse(){

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 xs:px-5 text-black">
      <h1 className="text-2xl font-bold mb-6 mt-12 flex items-center gap-1 text-gray-700">
        <QuestionMarkCircleIcon className="h-7"/>
        使い方
      </h1>
        <AccordionItem  title="太字と下線" >
          <div className="space-y-5 ml-2 mt-4">
            <p>マークダウン記法で文字を太字にしたり、下線を引いたりできます。スタイルはテーブルビューと復習画面で適用されます。</p>
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-[550]"><GoDotFill className="min-w-4"/> **{"(半角アスタリスク2個)"}で囲むと太字になります。</p>
              <p className="ml-6  text-gray-600 ">例 : This is an **apple** <br className="notxs:hidden "/><ArrowRightIcon className="h-4 inline-block mx-1"/> This is an <span className="font-semibold">apple</span></p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-[550]"><GoDotFill className="min-w-4"/> __{"(半角アンダーバー2個)"}で囲むと下線になります。</p>
              <p className="ml-6  text-gray-600">例 : This is an __apple__ <br className="notxs:hidden "/><ArrowRightIcon className="h-4 inline-block mx-1"/> This is an <span className="underline underline-offset-2">apple</span></p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-[550]"><GoDotFill className="min-w-4"/> 太字と下線を組み合わせることもできます。</p>
              <p className="ml-6  text-gray-600 ">例 : This is __an **apple**__  <br className="notxs:hidden "/><ArrowRightIcon className="h-4 inline-block mx-1"/> This is <span className="underline underline-offset-2">an <span className="font-semibold">apple</span></span></p>
            </div>
            <div className="space-y-1 pb-1">
              <p className="flex items-center gap-2"><AiOutlineExclamationCircle className="min-w-4"/> 単語と意味はデフォルトで太字のため、**で囲んでも変わりません。</p>
            </div>
        
          </div>
        </AccordionItem>

        <AccordionItem  title="ChatGPTとの連携" >
          <div className="space-y-5 ml-2 mt-4">
            <div><SparklesIcon className="h-4 inline mb-1"/>のアイコンから入力された内容を使って質問（プロンプト）を生成し、すぐにChatGPTに質問できます。 </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-[550]"><GoDotFill className="min-w-4"/>「ChatGPTに質問する」</p>
              <p className="ml-6  text-gray-600 ">対応するラベルの質問をクリップボードにコピーしてChatGPTを新しいタブで開きます。</p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-[550]"><GoDotFill className="min-w-4"/>「〇〇の質問をコピー」</p>
              <p className="ml-6  text-gray-600">対応するラベルの質問のみをコピーし、ChatGPTには移動しません。</p>
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-[550]"><GoDotFill className="min-w-4"/> 「ChatGPTに移動」</p>
              <p className="ml-6  text-gray-600 ">質問をコピーせず、ChatGPTのタブを新たに開きます。</p>
            </div>
            <div className="space-y-1 ">
              <p className="flex items-center gap-2 font-[550]"><GoDotFill className="min-w-4"/> 「質問を編集」</p>
              <p className="ml-6  text-gray-600 ">質問は自由に設定することができます。{"{input}"}で入力された内容が使えます。</p>
              <p className="ml-6 font-[550] mt-2 text-gray-800">例 : 単語の意味を質問したいとき</p>
              <div className="text-gray-500 space-y-1.5 mt-1 ml-6 ">
                <p>1. 編集画面から「単語の質問」を<span className="font-[600]">「{"{input}"}の意味を教えて」</span>などと編集します。</p> 
                <p>2. 単語の入力欄に<span className="font-[600]">「apple」</span>と入力します。</p>
                <p>3. 単語の入力欄右上の<SparklesIcon className="h-4 inline mb-1"/>のアイコンから「ChatGPTに質問する」または「単語の質問をコピー」をクリックします。</p>
                <p>4. 質問の{"{input}"}に"apple"が代入され、<span className="font-[600]">「appleの意味を教えて」</span>という質問が生成され、クリップボードにコピーされます。
                </p>
              </div>
            </div>
        
          </div>
        </AccordionItem>
    </div>
  );
}

import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

function AccordionItem({ title, children }: {title:string, children:React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);

  // アコーディオンの内容のアニメーション設定
  const variants = {
    open: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  return (
    <div className="mb-4 border border-gray-300 rounded-lg overflow-hidden p-4">
      <div
        className="w-full text-left cursor-pointer focus:outline-none text-xl font-[550]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ?<ChevronDownIcon className="h-6 w-6 inline -mt-1 mr-1"/>: <ChevronRightIcon className="h-6 w-6 inline -mt-1 mr-1"/> }
        {title}
      </div>

      {/* アコーディオン内容 */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'collapsed'}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
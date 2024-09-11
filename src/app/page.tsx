import BottomButton from "./BottomButtons";
import Display from "./display/Display";
import Footer from "./Footer";
import Header from "./header/Header";
import SettingsModal from "./SettingsModal";
import TopButtons from "./TopButtons";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <TopButtons />
      <Display />
      <SettingsModal/>
      <BottomButton />
      <Footer />
    </div>
  );
}

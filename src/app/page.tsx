"use server";

import Header from "./header/Header";
import TopButtons from "./TopButtons";

export default async function Home() {
  return (
    <>
      <Header/>
      <TopButtons/>
    </>
  );
}

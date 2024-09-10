"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Tabs from "./Tabs";
import SearchInput from "./SearchInput";
import SettingsButton from "./SettingsButton";

const DisplayHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <Tabs/>
      <div className="flex ">
        <SearchInput/>
        <SettingsButton/>
      </div>
    </div>
  );
};

export default DisplayHeader;

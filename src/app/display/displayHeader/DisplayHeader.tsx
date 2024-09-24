"use client";
import { useEffect, useState } from "react";
import Tabs from "./Tabs";
import SearchInput from "./SearchInput";
import SettingsButton from "./SettingsButton";
import MobileSearchInput from "./MobileSearchInput";
import { isMobile } from 'react-device-detect';

const DisplayHeader = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile); 
  }, []);
  return (<>
    <div className="flex items-center justify-between">
      <Tabs/>
      <div className="flex">
        {isMobileDevice
          ? <MobileSearchInput/>
          : <SearchInput/>
        }
        <SettingsButton/>
      </div>
    </div>
  </>);
};

export default DisplayHeader;

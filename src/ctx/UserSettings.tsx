"use client";
import React, { createContext, useState, useEffect } from "react";
import { UserSettings } from "@/types/user";

// import { requestDetailsSchema as zReq } from "@/types/user";

type UserSettingsContextType = {
  userSettings: UserSettings;
  encodedSettings?: string;
  setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
  updateSetting: (key: string, value: string | string[]) => void;
  calculateProgress: () => number;
  resetSettings: () => void;
};

export const UserSettingsContext = createContext<UserSettingsContextType>({
  userSettings: {
    startTime: "",
    homeFeatures: [],
    squareFootage: "",
    inspectionReason: "",
    bedrooms: "",
    bathrooms: "",
    city: "",
    name: "",
    email: "",
    propertyTypes: "",
    otherInfo: "",
    phone: "",
    startDates: [],
    preferContactTimes: [],
  },
  encodedSettings: "",
  setUserSettings: () => {},
  updateSetting: () => {},
  calculateProgress: () => 0,
  resetSettings: () => {},
});

export const UserSettingsProvider = ({ children }: React.PropsWithChildren) => {
  const initSetting = () => {
    const encodedSettings = localStorage.getItem("userSettings");
    if (encodedSettings) {
      const curData = JSON.parse(atob(encodedSettings));
      return curData;
    } else {
      return {
        startTime: "",
        homeFeatures: [],
        squareFootage: "",
        inspectionReason: "",
        bedrooms: "",
        bathrooms: "",
        city: "",
        name: "",
        email: "",
        propertyTypes: "",
        otherInfo: "",
        phone: "",
        startDates: [],
        preferContactTimes: [],
      };
    }
  };

  const [userSettings, setUserSettings] = useState<UserSettings>({
    startTime: "",
    homeFeatures: [],
    squareFootage: "",
    inspectionReason: "",
    bedrooms: "",
    bathrooms: "",
    city: "",
    name: "",
    email: "",
    propertyTypes: "",
    otherInfo: "",
    phone: "",
    startDates: [],
    preferContactTimes: [],
  });

  useEffect(() => {
    setUserSettings(initSetting());
    // setFirstRun(false);
  }, []);

  const encodeSettings = (settings: UserSettings) => {
    return btoa(JSON.stringify(settings));
  };

  const calculateProgress = () => {
    let count = 0;
    if (userSettings.startTime && userSettings.startTime !== "") count++;
    if (userSettings.homeFeatures && userSettings.homeFeatures.length > 0)
      count++;
    if (userSettings.squareFootage && userSettings.squareFootage !== "")
      count++;
    if (userSettings.inspectionReason && userSettings.inspectionReason !== "")
      count++;
    if (userSettings.bedrooms && userSettings.bedrooms !== "") count++;
    if (userSettings.bathrooms && userSettings.bathrooms !== "") count++;
    if (userSettings.city && userSettings.city !== "") count++;
    if (userSettings.name && userSettings.name !== "") count++;
    if (userSettings.email && userSettings.email !== "") count++;
    if (userSettings.propertyTypes && userSettings.propertyTypes !== "")
      count++;
    if (userSettings.phone && userSettings.phone !== "") count++;
    if (userSettings.startDates && userSettings.startDates.length > 0) count++;
    if (
      userSettings.preferContactTimes &&
      userSettings.preferContactTimes.length > 0
    )
      count++;
    return count;
  };

  const updateSetting = (key: string, value: string | string[]) => {
    if (!Object.keys(userSettings).includes(key)) return;
    setUserSettings((prev) => {
      const updatedSetting = { ...prev, [key]: value };
      localStorage.setItem("userSettings", encodeSettings(updatedSetting));
      return updatedSetting;
    });
  };

  const resetSettings = () => {
    //reset user settings except for city
    setUserSettings((prev) => {
      const updatedSetting = {
        ...prev,
        startTime: "",
        homeFeatures: [],
        squareFootage: "",
        inspectionReason: "",
        bedrooms: "",
        bathrooms: "",
        name: "",
        email: "",
        propertyTypes: "",
        otherInfo: "",
        phone: "",
        startDates: [],
        preferContactTimes: [],
      };
      localStorage.setItem("userSettings", encodeSettings(updatedSetting));
      return updatedSetting;
    });
  };

  return (
    <UserSettingsContext.Provider
      value={{
        userSettings,
        setUserSettings,
        updateSetting,
        calculateProgress,
        resetSettings,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
};

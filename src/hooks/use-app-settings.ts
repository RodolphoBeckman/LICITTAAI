"use client";

import { useState, useEffect, useCallback } from "react";

const APP_NAME_KEY = "appName";
const LOGO_SRC_KEY = "logoSrc";
const SIDEBAR_IMAGE_SRC_KEY = "sidebarImageSrc";
const DEFAULT_APP_NAME = "LICITA-IA";

type AppSettings = {
  appName: string;
  logoSrc: string | null;
  sidebarImageSrc: string | null;
};

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>({
    appName: DEFAULT_APP_NAME,
    logoSrc: null,
    sidebarImageSrc: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedAppName = localStorage.getItem(APP_NAME_KEY);
      const storedLogoSrc = localStorage.getItem(LOGO_SRC_KEY);
      const storedSidebarImageSrc = localStorage.getItem(SIDEBAR_IMAGE_SRC_KEY);

      setSettings({
        appName: storedAppName || DEFAULT_APP_NAME,
        logoSrc: storedLogoSrc || null,
        sidebarImageSrc: storedSidebarImageSrc || null,
      });
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSettings = useCallback(
    (newSettings: Partial<AppSettings>) => {
      try {
        const updatedSettings = { ...settings, ...newSettings };

        if (newSettings.appName !== undefined) {
          localStorage.setItem(APP_NAME_KEY, newSettings.appName);
        }
        
        if (newSettings.logoSrc !== undefined) {
          if (newSettings.logoSrc) {
            localStorage.setItem(LOGO_SRC_KEY, newSettings.logoSrc);
          } else {
            localStorage.removeItem(LOGO_SRC_KEY);
          }
        }

        if (newSettings.sidebarImageSrc !== undefined) {
          if (newSettings.sidebarImageSrc) {
            localStorage.setItem(SIDEBAR_IMAGE_SRC_KEY, newSettings.sidebarImageSrc);
          } else {
            localStorage.removeItem(SIDEBAR_IMAGE_SRC_KEY);
          }
        }

        setSettings(updatedSettings);
      } catch (error) {
        console.error("Failed to save settings to localStorage", error);
      }
    },
    [settings]
  );

  return { ...settings, isLoading, saveSettings };
}

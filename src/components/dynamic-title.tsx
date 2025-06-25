'use client';
import {useEffect} from 'react';
import {useAppSettings} from '@/hooks/use-app-settings';

export default function DynamicTitle() {
  const {appName} = useAppSettings();

  useEffect(() => {
    if (appName) {
      document.title = appName;
    }
  }, [appName]);

  return null;
}

import { useState, useEffect } from 'react';
import { initBringgDriverSDKIfNeeded } from './initBringgDriverSDKIfNeeded';

// initializes the SDK if needed and returns isInitialized
export function useInitializeBringgDriverSDK(): boolean {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const initialize = async () => {
      try {
        await initBringgDriverSDKIfNeeded();
        setIsInitialized(true);
      } catch (error) {
        console.error('SDK init failed', { error });
      }
    };
    initialize();
  }, [isInitialized]);
  return isInitialized;
}

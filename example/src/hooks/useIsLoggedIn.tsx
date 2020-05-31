import { useState, useEffect } from 'react';
import { useInitializeBringgDriverSDK } from './useInitializeBringgDriverSDK';
import { activeCustomerManager } from '@bringg/react-native-bringg-driver-sdk';

export function useIsLoggedIn(): boolean {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isInitialized = useInitializeBringgDriverSDK();
  useEffect(() => {
    if (!isInitialized) {
      setIsLoggedIn(false);
      return;
    }
    let subscription = activeCustomerManager.isLoggedIn.subscribe(
      setIsLoggedIn
    );
    return () => subscription.unsubscribe();
  }, [isInitialized]);
  return isLoggedIn;
}

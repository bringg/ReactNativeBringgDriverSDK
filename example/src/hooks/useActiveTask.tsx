import {
  Task,
  activeCustomerManager,
} from '@bringg/react-native-bringg-driver-sdk';
import { useState, useEffect } from 'react';
import { useInitializeBringgDriverSDK } from './useInitializeBringgDriverSDK';

export function useActiveTask(): Task | null {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const isInitialized = useInitializeBringgDriverSDK();
  useEffect(() => {
    const subscribeToActiveCustomer = async () => {
      if (!isInitialized) {
        setActiveTask(null);
        return;
      }
      let subscription = activeCustomerManager.activeTask.subscribe(
        setActiveTask
      );
      return () => subscription.unsubscribe();
    };
    subscribeToActiveCustomer();
  }, [isInitialized]);
  return activeTask;
}

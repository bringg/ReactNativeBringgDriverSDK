import { NativeModules, NativeEventEmitter } from 'react-native';
import { taskFromJSONString } from './models/task';
export function getIOSNativeModule() {
  const {
    BringgDriverSdk,
    ActiveCustomerManager
  } = NativeModules;
  const activeCustomerManagerEventEmitter = new NativeEventEmitter(ActiveCustomerManager);
  const initBringgDriverSDK = BringgDriverSdk.initBringgDriverSDK;
  const activeCustomerManager = { ...ActiveCustomerManager,
    isLoggedIn: async () => {
      const isLoggedInNumberValue = await ActiveCustomerManager.isLoggedIn();
      return isLoggedInNumberValue === 1 ? true : false;
    },
    updateWaypointETA: eta => {
      const etaString = eta.toISOString();
      return ActiveCustomerManager.updateWaypointETA(etaString);
    },
    getActiveTask: async () => {
      const taskString = await ActiveCustomerManager.getActiveTask();
      return taskFromJSONString(taskString);
    },
    addListenerToActiveTask: listener => {
      return activeCustomerManagerEventEmitter.addListener('activeCustomerManagerActiveTaskDidUpdate', listener);
    },
    addListenerToLogout: listener => {
      return activeCustomerManagerEventEmitter.addListener('activeCustomerManagerDidLogout', listener);
    }
  };
  return {
    initBringgDriverSDK,
    activeCustomerManager
  };
}
//# sourceMappingURL=ios.js.map
import { NativeModules, NativeEventEmitter } from 'react-native';
import { taskFromJSONString } from './models/task';
export function getAndroidNativeModule() {
  const {
    BringgDriverSdk
  } = NativeModules;
  const bringgDriverSDKEventEmitter = new NativeEventEmitter(BringgDriverSdk);
  const bringgDriverSDK = { ...BringgDriverSdk,
    addListenerToActiveTask: async listener => {
      await BringgDriverSdk.observeActiveTask();
      return bringgDriverSDKEventEmitter.addListener('activeTask', taskString => {
        listener(taskFromJSONString(taskString));
      });
    },
    addListenerToIsLoggedIn: async listener => {
      await BringgDriverSdk.observeLoginState();
      return bringgDriverSDKEventEmitter.addListener('isLoggedIn', listener);
    }
  };
  return bringgDriverSDK;
}
//# sourceMappingURL=android.js.map
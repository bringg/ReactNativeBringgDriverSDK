"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAndroidNativeModule = getAndroidNativeModule;

var _reactNative = require("react-native");

var _task = require("./models/task");

function getAndroidNativeModule() {
  const {
    BringgDriverSdk
  } = _reactNative.NativeModules;
  const bringgDriverSDKEventEmitter = new _reactNative.NativeEventEmitter(BringgDriverSdk);
  const bringgDriverSDK = { ...BringgDriverSdk,
    addListenerToActiveTask: async listener => {
      await BringgDriverSdk.observeActiveTask();
      return bringgDriverSDKEventEmitter.addListener('activeTask', taskString => {
        listener((0, _task.taskFromJSONString)(taskString));
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
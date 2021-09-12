"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIOSNativeModule = getIOSNativeModule;

var _reactNative = require("react-native");

var _task = require("./models/task");

function getIOSNativeModule() {
  const {
    BringgDriverSdk,
    ActiveCustomerManager
  } = _reactNative.NativeModules;
  const activeCustomerManagerEventEmitter = new _reactNative.NativeEventEmitter(ActiveCustomerManager);
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
      return (0, _task.taskFromJSONString)(taskString);
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
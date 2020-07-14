import {
  initBringgDriverSDK,
  SDKInitializeFlag,
} from '@bringg/react-native-bringg-driver-sdk';

const state: {
  didInitialize: boolean;
  initializingPromise: Promise<void> | null;
} = { didInitialize: false, initializingPromise: null };

// initBringgDriverSDK should be called once.
// initBringgDriverSDK initializes the SDK including initializing the DB and updating its local state.
// You could call it on app startup but that might make startup time longer.
// If the sdk functionallity is only needed for specific parts of the hosting app, it should probably be called when those parts appear.
export function initBringgDriverSDKIfNeeded(): Promise<void> {
  if (state.didInitialize) {
    return Promise.resolve();
  }
  if (state.initializingPromise) {
    return state.initializingPromise;
  }

  console.log('initializing sdk');

  // Passing initialzation flags allows you to disable SDK features such as using bluetooth and motion
  // this allows you to show less permission prompts to the user.
  const initializingPromise = initBringgDriverSDK([
    SDKInitializeFlag.AvoidUsingBluetooth,
    SDKInitializeFlag.AvoidUsingMotion,
  ]);
  state.initializingPromise = initializingPromise;
  return initializingPromise;
}

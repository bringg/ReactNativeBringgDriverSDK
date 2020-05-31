import {
  NativeModules,
  EmitterSubscription,
  NativeEventEmitter,
} from 'react-native';
import { Task, taskFromJSONString } from './models/task';

export type BringgDriverSdkAndroidType = {
  init(): Promise<void>;
  loginWithToken(token: String, secret: String, region: String): Promise<void>;
  logout(): Promise<void>;

  startTask(id: number): Promise<void>;
  arriveAtWaypoint(): Promise<void>;
  leaveWaypoint(): Promise<void>;
  updateWaypointEta(eta: string): Promise<void>;

  setUserTransportType(transportType: number): Promise<void>;

  addListenerToActiveTask(
    listener: (task: Task | null) => void
  ): Promise<EmitterSubscription>;

  addListenerToIsLoggedIn(
    listener: (isLoggedIn: boolean) => void
  ): Promise<EmitterSubscription>;
};

export function getAndroidNativeModule(): BringgDriverSdkAndroidType {
  const { BringgDriverSdk } = NativeModules;
  const bringgDriverSDKEventEmitter = new NativeEventEmitter(BringgDriverSdk);

  const bringgDriverSDK: BringgDriverSdkAndroidType = {
    ...BringgDriverSdk,
    addListenerToActiveTask: async (listener): Promise<EmitterSubscription> => {
      await BringgDriverSdk.observeActiveTask();
      return bringgDriverSDKEventEmitter.addListener(
        'activeTask',
        (taskString: string) => {
          listener(taskFromJSONString(taskString));
        }
      );
    },
    addListenerToIsLoggedIn: async (listener): Promise<EmitterSubscription> => {
      await BringgDriverSdk.observeLoginState();
      return bringgDriverSDKEventEmitter.addListener('isLoggedIn', listener);
    },
  };

  return bringgDriverSDK;
}

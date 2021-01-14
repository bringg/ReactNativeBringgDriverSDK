import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';
import { Task, taskFromJSONString } from './models/task';
import { TransportType } from './models/transport_type';
import { SDKInitializeFlag } from './consts/SDKInitializeFlag';

type ActiveCustomerManagerIOSType = {
  // login related
  isLoggedIn(): Promise<boolean>;
  loginWithToken(token: string, secret: string, region: string): Promise<void>;
  logout(): Promise<void>;

  addListenerToLogout(listener: () => any): EmitterSubscription;

  // task related
  startTask(taskId: number): Promise<void>;
  arriveAtWaypoint(): Promise<void>;
  arriveAtWaypointWithCustomerVehicle(
    saveVehicle: boolean,
    licensePlate: String | null,
    color: String | null,
    model: String | null,
    parkingSpot: String | null
  ): Promise<void>;
  arriveAtWaypointWithCustomerVehicleAndVehicleId(
    vehicleId: number,
    saveVehicle: boolean,
    licensePlate: String | null,
    color: String | null,
    model: String | null,
    parkingSpot: String | null
  ): Promise<void>;
  leaveWaypoint(): Promise<void>;
  updateWaypointETA(eta: Date): Promise<void>;

  getActiveTask(): Promise<Task | null>;

  addListenerToActiveTask(listener: () => any): EmitterSubscription;

  setUserTransportType(transportType: TransportType): Promise<void>;
};

export type BringgDriverSdkIosType = {
  initBringgDriverSDK(flags: SDKInitializeFlag[] | null): Promise<void>;
  activeCustomerManager: ActiveCustomerManagerIOSType;
};

export function getIOSNativeModule(): BringgDriverSdkIosType {
  const { BringgDriverSdk, ActiveCustomerManager } = NativeModules;
  const activeCustomerManagerEventEmitter = new NativeEventEmitter(
    ActiveCustomerManager
  );

  const initBringgDriverSDK: (
    flags: SDKInitializeFlag[] | null
  ) => Promise<void> = BringgDriverSdk.initBringgDriverSDK;

  const activeCustomerManager: ActiveCustomerManagerIOSType = {
    ...ActiveCustomerManager,
    isLoggedIn: async (): Promise<boolean> => {
      const isLoggedInNumberValue: number = await ActiveCustomerManager.isLoggedIn();
      return isLoggedInNumberValue === 1 ? true : false;
    },
    updateWaypointETA: (eta: Date): Promise<void> => {
      const etaString = eta.toISOString();
      return ActiveCustomerManager.updateWaypointETA(etaString);
    },
    getActiveTask: async (): Promise<Task | null> => {
      const taskString = await ActiveCustomerManager.getActiveTask();
      return taskFromJSONString(taskString);
    },
    addListenerToActiveTask: (listener) => {
      return activeCustomerManagerEventEmitter.addListener(
        'activeCustomerManagerActiveTaskDidUpdate',
        listener
      );
    },
    addListenerToLogout: (listener) => {
      return activeCustomerManagerEventEmitter.addListener(
        'activeCustomerManagerDidLogout',
        listener
      );
    },
  };

  return {
    initBringgDriverSDK,
    activeCustomerManager,
  };
}

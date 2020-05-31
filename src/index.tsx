import { getIOSNativeModule } from './ios';
import { getAndroidNativeModule } from './android';
import { Platform } from 'react-native';
import { Task } from './models/task';
import { BehaviorSubject } from 'rxjs';
import { TransportType } from './models/transport_type';
import { iosAPIToPublicAPITransform } from './ios-api-to-public-api-transform';
import { androidAPIToPublicAPITransform } from './android-api-to-public-api-transform';

let bringgDriverSDK: BringgDriverSDKType;

if (Platform.OS === 'ios') {
  bringgDriverSDK = iosAPIToPublicAPITransform(getIOSNativeModule());
} else if (Platform.OS === 'android') {
  bringgDriverSDK = androidAPIToPublicAPITransform(getAndroidNativeModule());
} else {
  throw new Error('BringgDriverSDK supports iOS and Android only');
}

const { initBringgDriverSDK, activeCustomerManager } = bringgDriverSDK;

export type ActiveCustomerManagerType = {
  // login related
  isLoggedIn: BehaviorSubject<boolean>;
  loginWithToken(token: string, secret: string, region: string): Promise<void>;
  logout(): Promise<void>;

  // task related
  startTask(taskId: number): Promise<void>;
  arriveAtWaypoint(): Promise<void>;
  leaveWaypoint(): Promise<void>;
  updateWaypointETA(eta: Date): Promise<void>;

  activeTask: BehaviorSubject<Task | null>;

  setUserTransportType(transportType: TransportType): Promise<void>;
};

export type BringgDriverSDKType = {
  initBringgDriverSDK: () => Promise<void>;
  activeCustomerManager: ActiveCustomerManagerType;
};

export { Task, TaskStatus } from './models/task';
export { Waypoint } from './models/waypoint';
export { Contact } from './models/contact';
export { Customer } from './models/customer';
export { TaskInventory } from './models/task_inventory';
export { TaskNote } from './models/task_note';
export { TransportType } from './models/transport_type';
export { initBringgDriverSDK, activeCustomerManager };

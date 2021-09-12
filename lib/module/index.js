import { getIOSNativeModule } from './ios';
import { getAndroidNativeModule } from './android';
import { Platform } from 'react-native';
import { iosAPIToPublicAPITransform } from './ios-api-to-public-api-transform';
import { androidAPIToPublicAPITransform } from './android-api-to-public-api-transform';
let bringgDriverSDK;

if (Platform.OS === 'ios') {
  bringgDriverSDK = iosAPIToPublicAPITransform(getIOSNativeModule());
} else if (Platform.OS === 'android') {
  bringgDriverSDK = androidAPIToPublicAPITransform(getAndroidNativeModule());
} else {
  throw new Error('BringgDriverSDK supports iOS and Android only');
}

const {
  initBringgDriverSDK,
  activeCustomerManager
} = bringgDriverSDK;
export { Task, TaskStatus } from './models/task';
export { Waypoint } from './models/waypoint';
export { Contact } from './models/contact';
export { Customer } from './models/customer';
export { TaskInventory } from './models/task_inventory';
export { TaskNote } from './models/task_note';
export { TransportType } from './models/transport_type';
export { SDKInitializeFlag } from './consts/SDKInitializeFlag';
export { initBringgDriverSDK, activeCustomerManager };
//# sourceMappingURL=index.js.map
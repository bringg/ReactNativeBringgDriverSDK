import { BringgDriverSDKType, ActiveCustomerManagerType } from './index';
import { Task } from './models/task';
import { BehaviorSubject } from 'rxjs';
import { BringgDriverSdkAndroidType } from './android';

// Maps the Android api to the public api (BringgDriverSdkAndroidType -> BringgDriverSDKType)
export function androidAPIToPublicAPITransform(
  bringgDriverSdkAndroidType: BringgDriverSdkAndroidType
): BringgDriverSDKType {
  const {
    logout,
    startTask,
    loginWithToken,
    arriveAtWaypoint,
    leaveWaypoint,
    updateWaypointEta,
    addListenerToActiveTask,
    addListenerToIsLoggedIn,
    setUserTransportType,
  } = bringgDriverSdkAndroidType;

  const isLoggedInSubject = new BehaviorSubject<boolean>(false);
  const activeTaskSubject = new BehaviorSubject<Task | null>(null);

  const initBringgDriverSDK = async (): Promise<void> => {
    await bringgDriverSdkAndroidType.init();
    await addListenerToActiveTask((activeTask) =>
      activeTaskSubject.next(activeTask)
    );
    await addListenerToIsLoggedIn((isLoggedIn) => {
      isLoggedInSubject.next(isLoggedIn);
    });
  };

  const activeCustomerManager: ActiveCustomerManagerType = {
    isLoggedIn: isLoggedInSubject,
    loginWithToken,
    logout,
    startTask,
    arriveAtWaypoint,
    leaveWaypoint,
    updateWaypointETA: (eta: Date): Promise<void> => {
      const etaString = eta.toISOString();
      return updateWaypointEta(etaString);
    },
    activeTask: activeTaskSubject,
    setUserTransportType,
  };
  return { initBringgDriverSDK, activeCustomerManager };
}

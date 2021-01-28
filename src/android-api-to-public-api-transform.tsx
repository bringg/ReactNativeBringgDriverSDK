import { BringgDriverSDKType, ActiveCustomerManagerType } from './index';
import { Task } from './models/task';
import { BehaviorSubject } from 'rxjs';
import { BringgDriverSdkAndroidType } from './android';
import { SDKInitializeFlag } from './consts/SDKInitializeFlag';
import { CustomerVehicle } from './models/customer_vehicle';

// Maps the Android api to the public api (BringgDriverSdkAndroidType -> BringgDriverSDKType)
export function androidAPIToPublicAPITransform(
  bringgDriverSdkAndroidType: BringgDriverSdkAndroidType
): BringgDriverSDKType {
  const {
    logout,
    startTask,
    loginWithToken,
    arriveAtWaypoint,
    arriveAtWaypointWithCustomerVehicle,
    arriveAtWaypointWithCustomerVehicleAndVehicleId,
    leaveWaypoint,
    updateWaypointEta,
    addListenerToActiveTask,
    addListenerToIsLoggedIn,
    setUserTransportType,
  } = bringgDriverSdkAndroidType;

  const isLoggedInSubject = new BehaviorSubject<boolean>(false);
  const activeTaskSubject = new BehaviorSubject<Task | null>(null);

  const initBringgDriverSDK = async (
    flags?: SDKInitializeFlag[]
  ): Promise<void> => {
    console.log('init with flags ' + flags);
    await bringgDriverSdkAndroidType.init(flags ?? null);
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
    arriveAtWaypointWithCustomerVehicle: (
      customerVehicle: CustomerVehicle
    ): Promise<void> => {
      if (customerVehicle.id == null) {
        console.info(
          'Arrive at waypoint with customer vehicle (empty vehicle id)'
        );
        return arriveAtWaypointWithCustomerVehicle(
          customerVehicle.save_vehicle,
          customerVehicle.license_plate,
          customerVehicle.color,
          customerVehicle.model,
          customerVehicle.parking_spot
        );
      } else {
        console.info('Arrive at waypoint with customer vehicle');
        return arriveAtWaypointWithCustomerVehicleAndVehicleId(
          customerVehicle.id,
          customerVehicle.save_vehicle,
          customerVehicle.license_plate,
          customerVehicle.color,
          customerVehicle.model,
          customerVehicle.parking_spot
        );
      }
    },
  };
  return { initBringgDriverSDK, activeCustomerManager };
}

import { BehaviorSubject } from 'rxjs';
// Maps the Android api to the public api (BringgDriverSdkAndroidType -> BringgDriverSDKType)
export function androidAPIToPublicAPITransform(bringgDriverSdkAndroidType) {
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
    setUserTransportType
  } = bringgDriverSdkAndroidType;
  const isLoggedInSubject = new BehaviorSubject(false);
  const activeTaskSubject = new BehaviorSubject(null);

  const initBringgDriverSDK = async flags => {
    console.log('init with flags ' + flags);
    await bringgDriverSdkAndroidType.init(flags !== null && flags !== void 0 ? flags : null);
    await addListenerToActiveTask(activeTask => activeTaskSubject.next(activeTask));
    await addListenerToIsLoggedIn(isLoggedIn => {
      isLoggedInSubject.next(isLoggedIn);
    });
  };

  const activeCustomerManager = {
    isLoggedIn: isLoggedInSubject,
    loginWithToken,
    logout,
    startTask,
    arriveAtWaypoint,
    leaveWaypoint,
    updateWaypointETA: eta => {
      const etaString = eta.toISOString();
      return updateWaypointEta(etaString);
    },
    activeTask: activeTaskSubject,
    setUserTransportType,
    arriveAtWaypointWithCustomerVehicle: customerVehicle => {
      if (customerVehicle.id == null) {
        console.info('Arrive at waypoint with customer vehicle (empty vehicle id)');
        return arriveAtWaypointWithCustomerVehicle(customerVehicle.save_vehicle, customerVehicle.license_plate, customerVehicle.color, customerVehicle.model, customerVehicle.parking_spot);
      } else {
        console.info('Arrive at waypoint with customer vehicle');
        return arriveAtWaypointWithCustomerVehicleAndVehicleId(customerVehicle.id, customerVehicle.save_vehicle, customerVehicle.license_plate, customerVehicle.color, customerVehicle.model, customerVehicle.parking_spot);
      }
    }
  };
  return {
    initBringgDriverSDK,
    activeCustomerManager
  };
}
//# sourceMappingURL=android-api-to-public-api-transform.js.map
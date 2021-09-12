"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iosAPIToPublicAPITransform = iosAPIToPublicAPITransform;

var _rxjs = require("rxjs");

// Maps the iOS api to the public api (BringgDriverSdkIosType -> BringgDriverSDKType)
function iosAPIToPublicAPITransform(bringgDriverSdkIosType) {
  const {
    addListenerToActiveTask,
    addListenerToLogout
  } = bringgDriverSdkIosType.activeCustomerManager;
  const isLoggedInSubject = new _rxjs.BehaviorSubject(false);
  const activeTaskSubject = new _rxjs.BehaviorSubject(null);

  const updateIsLoggedInSubject = async () => {
    const isLoggedInInitialValue = await bringgDriverSdkIosType.activeCustomerManager.isLoggedIn();
    isLoggedInSubject.next(isLoggedInInitialValue);
  };

  const updateActiveTaskSubject = async () => {
    const activeTask = await bringgDriverSdkIosType.activeCustomerManager.getActiveTask();
    activeTaskSubject.next(activeTask);
  };

  const initBringgDriverSDK = async flags => {
    await bringgDriverSdkIosType.initBringgDriverSDK(flags !== null && flags !== void 0 ? flags : null);
    await updateIsLoggedInSubject();
    await updateActiveTaskSubject();
    addListenerToLogout(() => {
      updateIsLoggedInSubject();
    });
    addListenerToActiveTask(() => {
      updateActiveTaskSubject();
    });
  };

  const activeCustomerManager = { ...bringgDriverSdkIosType.activeCustomerManager,
    activeTask: activeTaskSubject,
    isLoggedIn: isLoggedInSubject,
    loginWithToken: async (token, secrect, region) => {
      try {
        await bringgDriverSdkIosType.activeCustomerManager.loginWithToken(token, secrect, region);
        await updateIsLoggedInSubject();
      } catch (error) {
        await updateIsLoggedInSubject();
        throw error;
      }
    },
    arriveAtWaypointWithCustomerVehicle: async customerVehicle => {
      if (customerVehicle.id == null) {
        console.info('Arrive at waypoint with customer vehicle (empty vehicle id)');
        return bringgDriverSdkIosType.activeCustomerManager.arriveAtWaypointWithCustomerVehicle(customerVehicle.save_vehicle, customerVehicle.license_plate, customerVehicle.color, customerVehicle.model, customerVehicle.parking_spot);
      } else {
        console.info('Arrive at waypoint with customer vehicle');
        return bringgDriverSdkIosType.activeCustomerManager.arriveAtWaypointWithCustomerVehicleAndVehicleId(customerVehicle.id, customerVehicle.save_vehicle, customerVehicle.license_plate, customerVehicle.color, customerVehicle.model, customerVehicle.parking_spot);
      }
    }
  };
  return {
    initBringgDriverSDK,
    activeCustomerManager
  };
}
//# sourceMappingURL=ios-api-to-public-api-transform.js.map
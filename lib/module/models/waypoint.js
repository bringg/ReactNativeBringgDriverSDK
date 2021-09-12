import { parseISODateString } from '../utils/parseISODate';
export let AddressType;

(function (AddressType) {
  AddressType[AddressType["commercial"] = 1] = "commercial";
  AddressType[AddressType["residential"] = 2] = "residential";
  AddressType[AddressType["educational"] = 3] = "educational";
  AddressType[AddressType["government"] = 4] = "government";
  AddressType[AddressType["medical"] = 5] = "medical";
  AddressType[AddressType["industrial"] = 6] = "industrial";
})(AddressType || (AddressType = {}));

export let PickupDropoffOption;

(function (PickupDropoffOption) {
  PickupDropoffOption[PickupDropoffOption["none"] = -1] = "none";
  PickupDropoffOption[PickupDropoffOption["pickup"] = 0] = "pickup";
  PickupDropoffOption[PickupDropoffOption["dropoff"] = 1] = "dropoff";
  PickupDropoffOption[PickupDropoffOption["pickupAndDropoff"] = 2] = "pickupAndDropoff";
})(PickupDropoffOption || (PickupDropoffOption = {}));

export function waypointFromJSONObject(jsonObject) {
  const dateKeys = ['checkin_time', 'checkout_time', 'scheduled_at', 'has_to_leave_by', 'etl', 'eta', 'no_earlier_than', 'no_later_than'];
  const waypoint = { ...jsonObject
  };
  dateKeys.forEach(key => {
    waypoint[key] = parseISODateString(waypoint[key]);
  });
  return waypoint;
}
//# sourceMappingURL=waypoint.js.map
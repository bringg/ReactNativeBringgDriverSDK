import { Customer } from './customer';
import { Contact } from './contact';
import { parseISODateString } from '../utils/parseISODate';

export enum AddressType {
  commercial = 1,
  residential = 2,
  educational = 3,
  government = 4,
  medical = 5,
  industrial = 6,
}

export enum PickupDropoffOption {
  none = -1,
  pickup = 0,
  dropoff = 1,
  pickupAndDropoff = 2,
}

export type Waypoint = {
  // Ids
  id: number;
  task_id: number | null;

  // Location
  address: string | null;
  address_second_line: string | null;
  address_type: AddressType | null;
  location_name: string | null;
  lat: number | null;
  lng: number | null;
  zipcode: string | null;
  borough: string | null;
  city: string | null;
  street: string | null;
  house_number: number | null;
  district: string | null;
  neighborhood: string | null;
  state: string | null;

  // Times
  checkin_time: Date | null;
  checkout_time: Date | null;
  scheduled_at: Date | null;
  has_to_leave_by: Date | null;
  etl: Date | null;
  eta: Date | null;
  no_earlier_than: Date | null;
  no_later_than: Date | null;

  // State
  position: number | null;
  done: boolean;
  late: boolean;
  asap: boolean;
  rating: string | null;

  // Behaviour
  pickup_dropoff_option: PickupDropoffOption;
  silent: boolean;
  allow_editing_inventory: boolean;
  must_approve_inventory: boolean;
  phone_available: boolean;
  find_me: boolean;
  ui_data: { [key: string]: any } | { color?: string; number?: number } | null;

  // Contact
  phone: string | null;
  company_name: string | null;
  name: string | null;

  // Relationships
  customer: Customer | null;
  contacts: Contact[] | null;
  extra_customers: Customer[] | null;
};

export function waypointFromJSONObject(jsonObject: {
  [key: string]: any;
}): Waypoint {
  const dateKeys = [
    'checkin_time',
    'checkout_time',
    'scheduled_at',
    'has_to_leave_by',
    'etl',
    'eta',
    'no_earlier_than',
    'no_later_than',
  ];
  const waypoint = { ...jsonObject };
  dateKeys.forEach((key) => {
    waypoint[key] = parseISODateString(waypoint[key]);
  });
  return waypoint as Waypoint;
}

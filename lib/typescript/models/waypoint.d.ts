import { Customer } from './customer';
import { Contact } from './contact';
export declare enum AddressType {
    commercial = 1,
    residential = 2,
    educational = 3,
    government = 4,
    medical = 5,
    industrial = 6
}
export declare enum PickupDropoffOption {
    none = -1,
    pickup = 0,
    dropoff = 1,
    pickupAndDropoff = 2
}
export declare type Waypoint = {
    id: number;
    task_id: number | null;
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
    checkin_time: Date | null;
    checkout_time: Date | null;
    scheduled_at: Date | null;
    has_to_leave_by: Date | null;
    etl: Date | null;
    eta: Date | null;
    no_earlier_than: Date | null;
    no_later_than: Date | null;
    position: number | null;
    done: boolean;
    late: boolean;
    asap: boolean;
    rating: string | null;
    pickup_dropoff_option: PickupDropoffOption;
    silent: boolean;
    allow_editing_inventory: boolean;
    must_approve_inventory: boolean;
    phone_available: boolean;
    find_me: boolean;
    ui_data: {
        [key: string]: any;
    } | {
        color?: string;
        number?: number;
    } | null;
    phone: string | null;
    company_name: string | null;
    name: string | null;
    customer: Customer | null;
    contacts: Contact[] | null;
    extra_customers: Customer[] | null;
};
export declare function waypointFromJSONObject(jsonObject: {
    [key: string]: any;
}): Waypoint;

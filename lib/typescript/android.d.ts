import { EmitterSubscription } from 'react-native';
import { SDKInitializeFlag } from './consts/SDKInitializeFlag';
import { Task } from './models/task';
export declare type BringgDriverSdkAndroidType = {
    init(flags: SDKInitializeFlag[] | null): Promise<void>;
    loginWithToken(token: String, secret: String, region: String): Promise<void>;
    logout(): Promise<void>;
    startTask(id: number): Promise<void>;
    arriveAtWaypoint(): Promise<void>;
    arriveAtWaypointWithCustomerVehicle(saveVehicle: boolean, licensePlate: String | null, color: String | null, model: String | null, parkingSpot: String | null): Promise<void>;
    arriveAtWaypointWithCustomerVehicleAndVehicleId(vehicleId: number, saveVehicle: boolean, licensePlate: String | null, color: String | null, model: String | null, parkingSpot: String | null): Promise<void>;
    leaveWaypoint(): Promise<void>;
    updateWaypointEta(eta: string): Promise<void>;
    setUserTransportType(transportType: number): Promise<void>;
    addListenerToActiveTask(listener: (task: Task | null) => void): Promise<EmitterSubscription>;
    addListenerToIsLoggedIn(listener: (isLoggedIn: boolean) => void): Promise<EmitterSubscription>;
};
export declare function getAndroidNativeModule(): BringgDriverSdkAndroidType;

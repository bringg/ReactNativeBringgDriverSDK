import { EmitterSubscription } from 'react-native';
import { Task } from './models/task';
import { TransportType } from './models/transport_type';
import { SDKInitializeFlag } from './consts/SDKInitializeFlag';
declare type ActiveCustomerManagerIOSType = {
    isLoggedIn(): Promise<boolean>;
    loginWithToken(token: string, secret: string, region: string): Promise<void>;
    logout(): Promise<void>;
    addListenerToLogout(listener: () => any): EmitterSubscription;
    startTask(taskId: number): Promise<void>;
    arriveAtWaypoint(): Promise<void>;
    arriveAtWaypointWithCustomerVehicle(saveVehicle: boolean, licensePlate: String | null, color: String | null, model: String | null, parkingSpot: String | null): Promise<void>;
    arriveAtWaypointWithCustomerVehicleAndVehicleId(vehicleId: number, saveVehicle: boolean, licensePlate: String | null, color: String | null, model: String | null, parkingSpot: String | null): Promise<void>;
    leaveWaypoint(): Promise<void>;
    updateWaypointETA(eta: Date): Promise<void>;
    getActiveTask(): Promise<Task | null>;
    addListenerToActiveTask(listener: () => any): EmitterSubscription;
    setUserTransportType(transportType: TransportType): Promise<void>;
};
export declare type BringgDriverSdkIosType = {
    initBringgDriverSDK(flags: SDKInitializeFlag[] | null): Promise<void>;
    activeCustomerManager: ActiveCustomerManagerIOSType;
};
export declare function getIOSNativeModule(): BringgDriverSdkIosType;
export {};

import { TransportType } from '@bringg/react-native-bringg-driver-sdk';

export const AllowedTransportTypes: TransportType[] = [
  TransportType.Bicycle,
  TransportType.Driving,
  TransportType.PublicTransportation,
  TransportType.Walking,
];

export function transportTypeDisplayLabel(
  transportType: TransportType
): string {
  switch (transportType) {
    case TransportType.Bicycle:
      return 'Bicycle';
    case TransportType.Driving:
      return 'Driving';
    case TransportType.PublicTransportation:
      return 'PublicTransportation';
    case TransportType.Walking:
      return 'Walking';
    default:
      return 'Unsupported';
  }
}

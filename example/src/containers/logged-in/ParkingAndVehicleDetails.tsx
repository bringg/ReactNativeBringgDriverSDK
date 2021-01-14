import React, { SFC } from 'react';
import { CustomerVehicle } from 'react-native-bringg-driver-sdk';
import { Switch, TextInput, View } from 'react-native';
import { ActionButton } from '../../components/ActionButton';

interface Props {
  customerVehicle: CustomerVehicle,
  setCustomerVehicle: (customerVehicle: CustomerVehicle) => void;
  reportArriveAtWaypoint: (customerVehicle: CustomerVehicle) => void;
}

const ParkingAndVehicleDetails: SFC<Props> = (props) => {
  const { customerVehicle, setCustomerVehicle, reportArriveAtWaypoint } = props;
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40 }}
        placeholder='Vehicle Id (Numeric)'
        onChangeText={vehicleId => {
          let vehicleIdToUse: number | null
          if (vehicleId == null || vehicleId == "") {
            vehicleIdToUse == null
          } else {
            vehicleIdToUse = Number(vehicleId)
          }
          setCustomerVehicle({
            id: vehicleIdToUse,
            save_vehicle: customerVehicle.save_vehicle,
            license_plate: customerVehicle.license_plate,
            color: customerVehicle.color,
            model: customerVehicle.model,
            parking_spot: customerVehicle.parking_spot,
          });
        }}
        defaultValue={''}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='License Plate'
        onChangeText={licensePlate => {
          setCustomerVehicle({
            id: customerVehicle.id,
            save_vehicle: customerVehicle.save_vehicle,
            license_plate: licensePlate,
            color: customerVehicle.color,
            model: customerVehicle.model,
            parking_spot: customerVehicle.parking_spot,
          });
        }}
        defaultValue={''}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Color'
        onChangeText={color => {
          setCustomerVehicle({
            id: customerVehicle.id,
            save_vehicle: customerVehicle.save_vehicle,
            license_plate: customerVehicle.license_plate,
            color: color,
            model: customerVehicle.model,
            parking_spot: customerVehicle.parking_spot,
          });
        }}
        defaultValue={''}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Model'
        onChangeText={model => {
          setCustomerVehicle({
            id: customerVehicle.id,
            save_vehicle: customerVehicle.save_vehicle,
            license_plate: customerVehicle.license_plate,
            color: customerVehicle.color,
            model: model,
            parking_spot: customerVehicle.parking_spot,
          });
        }}
        defaultValue={''}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Parking Spot'
        onChangeText={parkingSpot => {
          setCustomerVehicle({
            id: customerVehicle.id,
            save_vehicle: customerVehicle.save_vehicle,
            license_plate: customerVehicle.license_plate,
            color: customerVehicle.color,
            model: customerVehicle.model,
            parking_spot: parkingSpot,
          });
        }}
        defaultValue={''}
      />
      <ActionButton
        key={'Submit Vehicle Details'}
        title={'Arrive'}
        onPress={() => {
          reportArriveAtWaypoint(customerVehicle);
        }}
        isShowHide={false}
      />
    </View>
  );
};

export default ParkingAndVehicleDetails;

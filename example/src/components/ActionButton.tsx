import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import {
  activeCustomerManager,
  TransportType,
} from '@bringg/react-native-bringg-driver-sdk';
import { HTTPService } from '../services/HttpService';
import React, { SetStateAction } from 'react';

enum ButtonType {
  Login = 'login',
  Logout = 'logout',
  StartTask = 'start task',
  ArriveAtWaypoint = 'arrive at waypoint',
  LeaveWaypoint = 'leave waypoint',
  ShowHideEditETA = 'show hide edit eta',
  SubmitETA = 'submit eta',
  ShowHideEditTransportType = 'show hide transport type',
  SubmitTransportType = 'submit transport type',
  ShowHideParkingAndVehicleDetails = 'show hide parking and vehicle details',
}

export type ButtonDef = {
  key: ButtonType;
  title: string;
  onPress: () => void;
  isShowHide?: boolean;
};

export const loginButtonDef = (
  isLoggingIn: boolean,
  setIsLoggingIn: (value: SetStateAction<boolean>) => void
): ButtonDef => {
  const performLogin = async () => {
    console.log('Performing login');
    const userToken = await HTTPService.shared.getUserToken();
    await activeCustomerManager.loginWithToken(
      userToken.access_token,
      userToken.secret,
      userToken.region
    );
    console.log('Finished login');
  };

  return {
    key: ButtonType.Login,
    title: isLoggingIn ? 'Logging in...' : 'Login',
    onPress: () => {
      setIsLoggingIn(true);
      performLogin().catch((error) => {
        console.warn(error);
        setIsLoggingIn(false);
      });
    },
  };
};

export const logoutButtonDef: ButtonDef = {
  key: ButtonType.Logout,
  title: 'logout',
  onPress: () => {
    activeCustomerManager.logout().catch(console.warn);
  },
};

export const showHideEditETAButtonDef = (
  isShowingEditETA: boolean,
  setIsShowingEditETA: (value: SetStateAction<boolean>) => void,
  setETA: (value: SetStateAction<Date | null>) => void
): ButtonDef => {
  return {
    key: ButtonType.ShowHideEditETA,
    title: isShowingEditETA
      ? 'Cancel setting eta to waypoint'
      : 'Set eta to waypoint',
    onPress: () => {
      setETA(null);
      setIsShowingEditETA(!isShowingEditETA);
    },
    isShowHide: true,
  };
};

export const submitETAButtonDef = (
  eta: Date,
  setETA: (value: SetStateAction<Date | null>) => void,
  setIsShowingEditETA: (value: SetStateAction<boolean>) => void
): ButtonDef => {
  return {
    key: ButtonType.SubmitETA,
    title: 'Submit ETA',
    onPress: () => {
      activeCustomerManager
        .updateWaypointETA(eta)
        .then(() => {
          setETA(null);
          setIsShowingEditETA(false);
        })
        .catch(console.warn);
    },
  };
};

export const showHideEditTransportTypeDef = (
  isShowingTransportType: boolean,
  setIsShowingTransportType: (value: SetStateAction<boolean>) => void,
  setTransportType: (value: SetStateAction<TransportType | null>) => void
): ButtonDef => {
  return {
    key: ButtonType.ShowHideEditTransportType,
    title: isShowingTransportType
      ? 'Cancel setting transport type'
      : 'Set transport type',
    onPress: () => {
      setTransportType(null);
      setIsShowingTransportType(!isShowingTransportType);
    },
    isShowHide: true,
  };
};

export const submitTransportTypeButtonDef = (
  transportType: TransportType,
  setTransportType: (value: SetStateAction<TransportType | null>) => void,
  setIsShowingTransportType: (value: SetStateAction<boolean>) => void
): ButtonDef => {
  return {
    key: ButtonType.SubmitTransportType,
    title: 'Submit transport type',
    onPress: () => {
      console.log(`Submitting transport type ${transportType}`);
      activeCustomerManager
        .setUserTransportType(transportType)
        .then(() => {
          setTransportType(null);
          setIsShowingTransportType(false);
          console.log(`Finished submitting transport type ${transportType}`);
        })
        .catch(console.warn);
    },
  };
};

export const startTaskButtonDef: ButtonDef = {
  key: ButtonType.StartTask,
  title: 'Start task',
  onPress: () => {
    const performStartTask = async () => {
      console.log('Performing start task');
      const taskId = await HTTPService.shared.getActiveTaskId();
      await activeCustomerManager.startTask(taskId);
      console.log('Finished start task');
    };

    performStartTask().catch(console.warn);
  },
};

export const arriveAtWaypointButtonDef: ButtonDef = {
  key: ButtonType.ArriveAtWaypoint,
  title: 'Arrive at waypoint',
  onPress: () => {
    console.log('Performing arrive at waypoint');
    activeCustomerManager
      .arriveAtWaypoint()
      .catch(console.warn)
      .then(() => console.log('Finished arrive at waypoint'));
  },
};

export const leaveWaypointButtonDef: ButtonDef = {
  key: ButtonType.LeaveWaypoint,
  title: 'Leave waypoint',
  onPress: () => {
    console.log('Performing leave waypoint');
    activeCustomerManager
      .leaveWaypoint()
      .catch(console.warn)
      .then(() => console.log('Finished leave waypoint'));
  },
};

export const showHideArriveAtWaypointWithParkingAndVehicleDetailsButtonDef = (
  isShowingParkingAndVehicleDetails: boolean,
  setIsShowingParkingAndVehicleDetails: (value: SetStateAction<boolean>) => void
): ButtonDef => {
  return {
    key: ButtonType.ShowHideParkingAndVehicleDetails,
    title:
      isShowingParkingAndVehicleDetails
        ? 'Cancel Set parking details'
        : 'Arrive at waypoint + parking details',
    onPress: () => {
      setIsShowingParkingAndVehicleDetails(!isShowingParkingAndVehicleDetails);
    },
    isShowHide: true,
  };
}




export function ActionButton(buttonDef: ButtonDef) {
  return (
    <TouchableHighlight
      style={[
        styles.actionButton,
        buttonDef.isShowHide && styles.showHideActionButton,
      ]}
      onPress={buttonDef.onPress}
      underlayColor="#fff"
    >
      <Text style={styles.actionButtonText}>{buttonDef.title}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  showHideActionButton: {
    backgroundColor: 'orange',
  },
  actionButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

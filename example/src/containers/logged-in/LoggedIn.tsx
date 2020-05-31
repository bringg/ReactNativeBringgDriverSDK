import { useActiveTask } from '../../hooks/useActiveTask';
import React, { useState, Fragment } from 'react';
import {
  TransportType,
  TaskStatus,
} from '@bringg/react-native-bringg-driver-sdk';
import {
  ButtonDef,
  showHideEditETAButtonDef,
  showHideEditTransportTypeDef,
  submitETAButtonDef,
  submitTransportTypeButtonDef,
  leaveWaypointButtonDef,
  startTaskButtonDef,
  logoutButtonDef,
  arriveAtWaypointButtonDef,
  ActionButton,
} from '../../components/ActionButton';
import { FlatList } from 'react-native';

import EditETAPicker from './EditETAPicker';
import EditTransportTypePicker from './EditTransportTypePicker';

export default function LoggedIn() {
  const activeTask = useActiveTask();

  const [isShowingEditETA, setIsShowingEditETA] = useState(false);
  const [eta, setETA] = useState<Date | null>(null);

  const [isShowingTransportType, setIsShowingTransportType] = useState(false);
  const [transportType, setTransportType] = useState<TransportType | null>(
    null
  );

  const isShowingEditorViews = isShowingEditETA || isShowingTransportType;

  const listData: ButtonDef[] = [];
  if (activeTask) {
    switch (activeTask.status) {
      case TaskStatus.onTheWay:
        if (!isShowingEditorViews) {
          // The task is started and on the way to the waypoint.
          // Should allow the customer to report arrival to the pickup point
          listData.push(arriveAtWaypointButtonDef);
        }

        if (!isShowingTransportType) {
          listData.push(
            // When a customer doesnt allow an app to track his location, we might want to
            // allow him/her to manually update the estimated time of arrival to the pickup location (waypoint)
            showHideEditETAButtonDef(
              isShowingEditETA,
              setIsShowingEditETA,
              setETA
            )
          );
        }
        if (!isShowingEditETA) {
          // If a customer allows location tracking, we might want to allow him/her to
          // manually update the transport type (cycling, walking...) for more accurate eta calculation
          listData.push(
            showHideEditTransportTypeDef(
              isShowingTransportType,
              setIsShowingTransportType,
              setTransportType
            )
          );
        }
        if (eta && isShowingEditETA) {
          listData.push(submitETAButtonDef(eta, setETA, setIsShowingEditETA));
        }
        if (transportType !== null && isShowingTransportType) {
          listData.push(
            submitTransportTypeButtonDef(
              transportType,
              setTransportType,
              setIsShowingTransportType
            )
          );
        }
        break;
      case TaskStatus.checkedIn:
        // The customer is already on location.
        // Depending on the flow (who should finish the task - the customer or the store), we will display the leave button.
        listData.push(leaveWaypointButtonDef);
        break;
      default:
        break;
    }
  } else {
    // When there is no active task, you need to fetch the task id you want to make active from your server
    // And call start task which starts the task and makes it active
    listData.push(startTaskButtonDef);
  }

  if (!isShowingEditorViews) {
    listData.push(logoutButtonDef);
  }

  return (
    <Fragment>
      <FlatList
        data={listData}
        renderItem={(renderItem) => {
          const { item } = renderItem;
          const buttonDef: ButtonDef = item;
          return ActionButton(buttonDef);
        }}
      />
      {isShowingEditETA && <EditETAPicker eta={eta} setETA={setETA} />}
      {isShowingTransportType && (
        <EditTransportTypePicker
          transportType={transportType}
          setTransportType={setTransportType}
        />
      )}
    </Fragment>
  );
}

import { BringgDriverSDKType, ActiveCustomerManagerType } from './index';
import { BringgDriverSdkIosType } from './ios';
import { Task } from './models/task';
import { BehaviorSubject } from 'rxjs';
import { SDKInitializeFlag } from './consts/SDKInitializeFlag';

// Maps the iOS api to the public api (BringgDriverSdkIosType -> BringgDriverSDKType)
export function iosAPIToPublicAPITransform(
  bringgDriverSdkIosType: BringgDriverSdkIosType
): BringgDriverSDKType {
  const {
    addListenerToActiveTask,
    addListenerToLogout,
  } = bringgDriverSdkIosType.activeCustomerManager;

  const isLoggedInSubject = new BehaviorSubject<boolean>(false);
  const activeTaskSubject = new BehaviorSubject<Task | null>(null);

  const updateIsLoggedInSubject = async (): Promise<void> => {
    const isLoggedInInitialValue = await bringgDriverSdkIosType.activeCustomerManager.isLoggedIn();
    isLoggedInSubject.next(isLoggedInInitialValue);
  };

  const updateActiveTaskSubject = async (): Promise<void> => {
    const activeTask = await bringgDriverSdkIosType.activeCustomerManager.getActiveTask();
    activeTaskSubject.next(activeTask);
  };

  const initBringgDriverSDK = async (
    flags?: SDKInitializeFlag[]
  ): Promise<void> => {
    await bringgDriverSdkIosType.initBringgDriverSDK(flags ?? null);
    await updateIsLoggedInSubject();
    await updateActiveTaskSubject();

    addListenerToLogout(() => {
      updateIsLoggedInSubject();
    });

    addListenerToActiveTask(() => {
      updateActiveTaskSubject();
    });
  };

  const activeCustomerManager: ActiveCustomerManagerType = {
    ...bringgDriverSdkIosType.activeCustomerManager,
    activeTask: activeTaskSubject,
    isLoggedIn: isLoggedInSubject,
    loginWithToken: async (
      token: string,
      secrect: string,
      region: string
    ): Promise<void> => {
      try {
        await bringgDriverSdkIosType.activeCustomerManager.loginWithToken(
          token,
          secrect,
          region
        );
        await updateIsLoggedInSubject();
      } catch (error) {
        await updateIsLoggedInSubject();
        throw error;
      }
    },
  };
  return { initBringgDriverSDK, activeCustomerManager };
}

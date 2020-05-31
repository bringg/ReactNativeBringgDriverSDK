import React, { useState } from 'react';
import { ActionButton, loginButtonDef } from '../../components/ActionButton';
import { useInitializeBringgDriverSDK } from '../../hooks/useInitializeBringgDriverSDK';
import LoadingSDK from './LoadingSDK';

export default function LoggedOut() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const isInitialized = useInitializeBringgDriverSDK();

  // This makes sure that no functionallity from the Bringg SDK is displayed before the SDK is initialized
  if (isInitialized) {
    return ActionButton(loginButtonDef(isLoggingIn, setIsLoggingIn));
  } else {
    return <LoadingSDK />;
  }
}

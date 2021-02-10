package com.reactnativebringgdriversdk

import androidx.lifecycle.Observer
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import driver_sdk.ActiveCustomerSdkFactory
import driver_sdk.BringgSdkActiveCustomerClient
import driver_sdk.connection.NetworkResult
import driver_sdk.content.ResultCallback
import driver_sdk.customer.CustomerVehicle
import driver_sdk.customer.SdkSettings
import driver_sdk.logging.BringgLog
import driver_sdk.models.TaskState
import driver_sdk.models.enums.LoginResult
import driver_sdk.models.enums.LogoutResult
import driver_sdk.models.enums.TransportType
import driver_sdk.runOnMainThread
import driver_sdk.tasks.ArriveWaypointResult
import driver_sdk.tasks.LeaveWaypointResult
import driver_sdk.tasks.UpdateOperationResult
import driver_sdk.tasks.start.StartTaskResult
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

enum class SDKInitializeFlag {
  avoidUsingMotion,
  avoidUsingBluetooth,
  enableAndroidLogcatLog
}

class BringgDriverSdkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private var activeCustomerClient: BringgSdkActiveCustomerClient? = null
  private val isInitialized get() = activeCustomerClient != null

  override fun getName() = "BringgDriverSdk"

  @ReactMethod
  fun init(flags: ReadableArray?, promise: Promise) {
    runOnMainThread {
      enableLogcatLogsIfNeeded(flags)
      activeCustomerClient = ActiveCustomerSdkFactory.init(reactApplicationContext, EmptyNotificationProvider(reactApplicationContext), SdkSettings.Builder().build())
      promise.resolve()
    }
  }

  private fun enableLogcatLogsIfNeeded(flags: ReadableArray?) {
    val size = flags?.size() ?: 0
    for (index in 0 until size) {
      flags?.getString(index).let { flag ->
        val optionalSdkInitializeFlag = SDKInitializeFlag.values().firstOrNull { it.toString() == flag }
        if (optionalSdkInitializeFlag == SDKInitializeFlag.enableAndroidLogcatLog) {
          BringgLog.enableLogcatLog()
        }
      }
    }
  }

  private val activeTaskObserver: Observer<TaskState> by lazy {
    Observer<TaskState> {
      val activeTaskJson = it.task?.let { task ->
        activeCustomerClient?.taskSerializer?.serializeToJson(task.getId())
      }
      emit("activeTask", activeTaskJson?.toString())
    }
  }

  private val isLoggedInObserver: Observer<Boolean> by lazy {
    Observer<Boolean> {
      emit("isLoggedIn", it)
    }
  }

  @ReactMethod
  fun observeActiveTask(promise: Promise) {
    runOnMainThread {
      activeCustomerClient?.activeTask()?.observeForever(activeTaskObserver)
      promise.resolve()
    }
  }

  @ReactMethod
  fun observeLoginState(promise: Promise) {
    runOnMainThread {
      activeCustomerClient?.isLoggedIn()?.observeForever(isLoggedInObserver)
      promise.resolve()
    }
  }

  @ReactMethod
  fun removeObservers(promise: Promise) {
    runOnMainThread {
      activeCustomerClient?.activeTask()?.removeObserver(activeTaskObserver)
      activeCustomerClient?.isLoggedIn()?.removeObserver(isLoggedInObserver)
      promise.resolve()
    }
  }

  @ReactMethod
  fun loginWithToken(token: String, secret: String, region: String, promise: Promise) {
      if (rejectIfNotInitialized(promise))
          return
      runOnMainThread {
          activeCustomerClient?.getActiveCustomerActions()?.login(token, secret, region, object : ResultCallback<LoginResult> {
                  override fun onResult(result: LoginResult) {
                      if (result.success())
                          promise.resolve()
                      else
                          promise.reject(RequestFailedException(result.name()))
                  }
              })
      }
  }

  @ReactMethod
  fun logout(promise: Promise) {
    if (rejectIfNotInitialized(promise))
      return

    runOnMainThread {
      activeCustomerClient?.getActiveCustomerActions()?.logout(object : ResultCallback<LogoutResult> {
        override fun onResult(result: LogoutResult) {
          if (result.success())
            promise.resolve()
          else
            promise.reject(RequestFailedException(result.name()))
        }
      })
    }
  }

  @ReactMethod
  fun startTask(id: Int, promise: Promise) {
    if (rejectIfNotInitialized(promise))
      return

    activeCustomerClient?.getActiveCustomerActions()?.startTask(id.toLong(), object : ResultCallback<StartTaskResult> {
      override fun onResult(result: StartTaskResult) {
        if (result.success())
          promise.resolve()
        else
          promise.reject(RequestFailedException(result.result.name()))
      }
    })
  }

  @ReactMethod
  fun arriveAtWaypoint(promise: Promise) {
    if (rejectIfNotInitialized(promise))
      return

    activeCustomerClient?.getActiveCustomerActions()?.arriveToWaypoint(object : ResultCallback<ArriveWaypointResult> {
      override fun onResult(result: ArriveWaypointResult) {
        if (result.success())
          promise.resolve()
        else
          promise.reject(RequestFailedException("Failed to arrive to waypoint " + result.resultCode))
      }
    })
  }

  @ReactMethod
  fun arriveAtWaypointWithCustomerVehicle(saveVehicle: Boolean, licensePlate: String?, color: String?, model: String?, parkingSpot: String?, promise: Promise) {
    if (rejectIfNotInitialized(promise))
      return
    val customerVehicle = CustomerVehicle(null, saveVehicle, licensePlate, color, model, parkingSpot)
    return arriveAtWaypointWithCustomerVehicle(customerVehicle, promise)
  }

  @ReactMethod
  fun arriveAtWaypointWithCustomerVehicleAndVehicleId(vehicleId: Double, saveVehicle: Boolean, licensePlate: String?, color: String?, model: String?, parkingSpot: String?, promise: Promise) {
    if (rejectIfNotInitialized(promise))
      return
    val customerVehicle = CustomerVehicle(vehicleId.toLong(), saveVehicle, licensePlate, color, model, parkingSpot)
    return arriveAtWaypointWithCustomerVehicle(customerVehicle, promise)
  }

  private fun arriveAtWaypointWithCustomerVehicle(customerVehicle: CustomerVehicle, promise: Promise)
  {
    if (rejectIfNotInitialized(promise))
      return
    activeCustomerClient?.getActiveCustomerActions()?.arriveToWaypoint(customerVehicle, object : ResultCallback<ArriveWaypointResult> {
      override fun onResult(result: ArriveWaypointResult) {
        if (result.success())
          promise.resolve()
        else
          promise.reject(RequestFailedException("Failed to arrive to waypoint " + result.resultCode))
      }
    })
  }

  @ReactMethod
  fun leaveWaypoint(promise: Promise) {
    if (rejectIfNotInitialized(promise))
      return

    activeCustomerClient?.getActiveCustomerActions()?.leaveWaypoint(object : ResultCallback<LeaveWaypointResult> {
      override fun onResult(result: LeaveWaypointResult) {
        if (result.success())
          promise.resolve()
        else
          promise.reject(RequestFailedException("Failed to leave waypoint " + result.resultCode))
      }
    })

  }

  @ReactMethod
  fun updateWaypointEta(eta: String, promise: Promise) {
    if (rejectIfNotInitialized(promise))
      return

    val date = eta.toDate()
    if (date == null) {
      promise.reject(IllegalArgumentException("unsupported date ($eta)"))
      return
    }

    activeCustomerClient?.getActiveCustomerActions()?.updateWaypointEta(Date(), object : ResultCallback<UpdateOperationResult> {
      override fun onResult(result: UpdateOperationResult) {
        if (result.isSuccessful)
          promise.resolve()
        else
          promise.reject(RequestFailedException(result.error?.name()))
      }
    })
  }

  @ReactMethod
  fun setUserTransportType(transportType: Int, promise: Promise) {
    if (rejectIfNotInitialized(promise))
      return

    val type = TransportType.values().find { it.value == transportType }
    if (type == null) {
      promise.reject(IllegalArgumentException("unsupported transport type ($transportType)"))
      return
    }

    activeCustomerClient?.getActiveCustomerActions()?.setUserTransportType(type, object : ResultCallback<NetworkResult> {
      override fun onResult(result: NetworkResult) {
        if (result.success())
          promise.resolve()
        else {
          promise.reject(RequestFailedException(result.error()?.name()))
        }
      }
    })
  }

  private fun rejectIfNotInitialized(promise: Promise) =
    if (isInitialized) {
      false
    } else {
      promise.reject(NotInitializedException())
      true
    }

  private fun emit(eventName: String, data: Any?) =
    reactApplicationContext.getJSModule(RCTDeviceEventEmitter::class.java).emit(eventName, data)
}

// extensions
fun Promise.resolve() = resolve(null)
fun String.toDate() = try {
  SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault()).parse(this)
} catch (e: Exception) {
  null
}

// errors
class NotInitializedException() : Exception("SDK not initialized. Please call init() before using any other apis")
class RequestFailedException(message: String?) : Exception(
        message?.replace('_', ' ')?.toLowerCase(Locale.US)?.capitalize() ?: "Request failed"
)

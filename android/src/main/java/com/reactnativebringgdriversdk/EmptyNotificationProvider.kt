package com.reactnativebringgdriversdk

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import driver_sdk.providers.NotificationProvider

class EmptyNotificationProvider(private val context: Context) : NotificationProvider {

  override fun getBackgroundLongProcessNotification(): Notification {
    return getShiftNotification()
  }

  override fun getShiftNotification(): Notification {
    val channelId = "default"
    val channelName = "Bringg"
    val notificationManager =
      context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager?
    if (notificationManager != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val channel = NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_DEFAULT)
      notificationManager.createNotificationChannel(channel)
    }

    return NotificationCompat.Builder(context, channelId).build()
  }
}

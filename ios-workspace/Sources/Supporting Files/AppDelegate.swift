//
//  AppDelegate.swift
//  BringgDriverSDKExample
//
//  Copyright (c) 2020 Bringg. All rights reserved.
//

import BringgDriverSDK
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        let mainViewController = UIViewController()
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = mainViewController
        window?.makeKeyAndVisible()

        return true
    }
}

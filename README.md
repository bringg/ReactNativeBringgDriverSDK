# react-native-bringg-driver-sdk

A React Native wrapper for the native (iOS and Android) Bringg driver SDKs (currently supporting the active customer use case)

## Installation

```sh
npm install @bringg/react-native-bringg-driver-sdk --save
```

or

```bash
yarn add @bringg/react-native-bringg-driver-sdk
```

### iOS specific installation

1. Change minimum iOS version to 12. This should be done in the `Podfile` and on the target in the project settings in `Xcode`.
2. Add `use_frameworks!` to `Podfile`.
   When adding `use_frameworks!`, if you are using `Flipper` you will need to either [disable](#removing-flipper) it or [change linking to static libraries](#static-library-linking-to-keep-flipper-and-use_frameworks).
3. Perform a `pod install`

```bash
cd ios && pod install && cd ..
```

4. [Add capabilities and privacy usage description](https://github.com/bringg/Bringg-iOS-DriverSDK#capabilities)
5. Set `BUILD_LIBRARY_FOR_DISTRIBUTION` for Pods required by the BringgDriverSDK

```
# All dependencies of the BringgDriverSDK needs to be built with the 'BUILD_LIBRARY_FOR_DISTRIBUTION' configuration set to 'YES'
BringgDriverSDKDependencies = [
  'Socket.IO-Client-Swift',
  'Starscream',
  'libPhoneNumber-iOS',
  'GzipSwift',
  'Alamofire',
  'XCGLogger',
  'RealmSwift',
  'ObjcExceptionBridging',
  'Kingfisher',
  'KeychainAccess',
  'DeviceKit'
]

post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      if BringgDriverSDKDependencies.include? target.name
        config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
      end
    end
  end
end

```

#### Removing Flipper

1. In the `Podfile` remove the following from your target

```ruby
  add_flipper_pods!
  post_install do |installer|
    flipper_post_install(installer)
  end
```

2. Remove initialization code of `Flipper` from `AppDelegate.m`.

#### Static library linking to keep `Flipper` and `use_frameworks!`

An example of how to keep `Flipper` working with `use_frameworks!` exists in `/example/ios/Podfile`

```ruby
$static_framework = [
  'FlipperKit',
  'Flipper',
  'Flipper-Folly',
  'CocoaAsyncSocket',
  'ComponentKit',
  'Flipper-PeerTalk',
  'Flipper-RSocket',
  'YogaKit',
  'CocoaLibEvent',
  'openssl-ios-bitcode',
  'boost-for-react-native'
]

pre_install do |installer|
  Pod::Installer::Xcode::TargetValidator.send(:define_method, :verify_no_static_framework_transitive_dependencies) {}
  installer.pod_targets.each do |pod|
    next unless $static_framework.include?(pod.name)

    def pod.build_type
      Pod::BuildType.static_library
    end
  end
end
```

### Android project configuration

1. Make sure to set the `minSdkVersion` to at least 21.
2. Make sure your app meets [Google Play's target API level requirements](https://developer.android.com/distribute/best-practices/develop/target-sdk.html).

## Running the example app

The example app has a basic implementation of expected use case flows.
To run it, clone the repo and then do:

```bash
yarn #prepares the sdk for the example app

cd example
yarn

# for ios
cd ios && pod install && cd ..
yarn ios

# for android
yarn android
```

## License

Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
[More details](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Running with xcode 11.3.1 (iOS)
The Native iOS SDK is precompiled - when using a swift version that is not the latest, you will need to do another step in order to use a native SDK that was compiled with the same Swift version that you are using.

In podfile add to your application target the following pods:
```ruby
  pod 'BringgDriverSDK', :git => 'https://github.com/bringg/Bringg-iOS-DriverSDK.git', :branch => '1.10.0-xcode-11.3.1'  
  pod 'BringgDriverSDKObjc', :git => 'https://github.com/bringg/Bringg-iOS-DriverSDK.git', :branch => '1.10.0-xcode-11.3.1'
```
You can see an example of this in `/Example/ios/Podfile`
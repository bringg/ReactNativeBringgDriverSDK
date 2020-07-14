#import "BringgDriverSdk.h"

@import BringgDriverSDKObjc;

@implementation BringgDriverSdk

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_REMAP_METHOD(initBringgDriverSDK,
                 initBringgDriverSDKWithFlags:(nullable NSArray<NSString *> *)flags
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTResponseErrorBlock)reject) {
    NSError *initError = [BringgObjc initializeSDKWithLogger:nil bringgSDKInitOptions:[BringgSDKInitOptions fromFlags:flags]];
    if (initError) {
        reject(initError);
    } else {
        resolve(nil);
    }
}

@end

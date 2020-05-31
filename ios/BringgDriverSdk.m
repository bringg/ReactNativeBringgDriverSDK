#import "BringgDriverSdk.h"

@import BringgDriverSDKObjc;

@implementation BringgDriverSdk

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_REMAP_METHOD(initBringgDriverSDK,
                 initBringgDriverSDKWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTResponseErrorBlock)reject) {
    NSError *initError = [BringgObjc initializeSDKWithLogger:nil];
    if (initError) {
        reject(initError);
    } else {
        resolve(nil);
    }
}

@end

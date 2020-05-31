#import "ActiveCustomerManager.h"
#import "Consts.h"

@import BringgDriverSDK;
@import BringgDriverSDKObjc;

@interface ActiveCustomerManager() <ActiveCustomerManagerDelegate>

@property (assign, nonatomic) BOOL isObserving;

@end

@implementation ActiveCustomerManager

- (instancetype)init {
    self = [super init];
    if (self) {
        self.isObserving = NO;
    }
    return self;
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
  return YES; // This is needed because we override `init`
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

// MARK: - Login related

RCT_REMAP_METHOD(isLoggedIn,
                 isLoggedInWithResolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    NSNumber *isLoggedIn = @(BringgObjc.shared.activeCustomerManager.isLoggedIn ? 1 : 0);
    resolve(isLoggedIn);
    
}

RCT_REMAP_METHOD(loginWithToken,
                 loginWithToken:(nonnull NSString *)token secret:(nonnull NSString *)secret region:(nonnull NSString *)region
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    [BringgObjc.shared.activeCustomerManager loginWithToken:token secret:secret region:region completion:OPTIONAL_ERROR_COMPLETION];

}

RCT_REMAP_METHOD(logout,
                 logoutWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    [BringgObjc.shared.activeCustomerManager logoutWithCompletion:^{
        resolve(nil);
    }];

}

// MARK: - Task related

RCT_REMAP_METHOD(startTask,
                 startTaskWithTaskId:(nonnull NSNumber *)taskId
                 resolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    [BringgObjc.shared.activeCustomerManager startTaskWith:taskId.integerValue completion:OPTIONAL_ERROR_COMPLETION];

}

RCT_REMAP_METHOD(arriveAtWaypoint,
                 arriveAtWaypointWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    [BringgObjc.shared.activeCustomerManager arriveAtWaypointWithCompletion:OPTIONAL_ERROR_COMPLETION];

}

RCT_REMAP_METHOD(leaveWaypoint,
                 leaveWaypointWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    [BringgObjc.shared.activeCustomerManager leaveWaypointWithCompletion:OPTIONAL_ERROR_COMPLETION];

}

RCT_REMAP_METHOD(updateWaypointETA,
                 updateWaypointETA:(nonnull NSDate *)eta
                 resolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    [BringgObjc.shared.activeCustomerManager updateWaypointETAWithEta:eta completion:OPTIONAL_ERROR_COMPLETION];

}

RCT_REMAP_METHOD(getActiveTask,
                 getActiveTaskWithResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    Task *activeTask = BringgObjc.shared.activeCustomerManager.activeTask;
    
    if (!activeTask) {
        resolve(nil);
        return;
    }

    NSDictionary<NSString *, id> *activeTaskDict = [activeTask getJSONDict];
    if ([NSJSONSerialization isValidJSONObject:activeTaskDict]) {
        NSError *jsonStringifyError = nil;
        NSData *activeTaskData = [NSJSONSerialization dataWithJSONObject:activeTaskDict options:0 error:&jsonStringifyError];

        if (jsonStringifyError) {
            reject(jsonStringifyError);
            return;
        }

        NSString *activeTaskJSONString = [[NSString alloc] initWithData:activeTaskData encoding:NSUTF8StringEncoding];
        resolve(activeTaskJSONString);
    } else {
        NSError *jsonStringifyError = [Consts jsonStringifyErrorWithMessage:@"Task json dict not a valid json object"];
        reject(jsonStringifyError);
    }

}

RCT_REMAP_METHOD(setUserTransportType,
                 setUserTransportType:(nonnull NSNumber *)transportType
                 resolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTResponseErrorBlock)reject) {

    REJECT_IF_SDK_NOT_INITIALIZED
    [BringgObjc.shared.activeCustomerManager setUserTransportType:(DriverActivityType)transportType.integerValue completion:OPTIONAL_ERROR_COMPLETION];

}

// MARK: - Event emitter

- (NSArray<NSString *> *)supportedEvents {
    return @[
        @"activeCustomerManagerDidLogout",
        @"activeCustomerManagerActiveTaskDidUpdate"
    ];
}

- (void)startObserving {
    self.isObserving = YES;
    [BringgObjc.shared.activeCustomerManager addDelegate:self];
}

- (void)stopObserving {
    self.isObserving = NO;
}

// MARK: - ActiveCustomerManagerDelegate

- (void)activeCustomerManagerDidLogout {
    if (!self.isObserving) { return; }
    [self sendEventWithName:@"activeCustomerManagerDidLogout" body:nil];
}

- (void)activeCustomerManagerActiveTaskUpdated:(id<ActiveCustomerManagerProtocol>)sender {
    if (!self.isObserving) { return; }
    [self sendEventWithName:@"activeCustomerManagerActiveTaskDidUpdate" body:nil];
}

@end

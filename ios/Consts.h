#import <Foundation/Foundation.h>

#define REJECT_IF_SDK_NOT_INITIALIZED           \
if (!BringgObjc.shared.activeCustomerManager) { \
    reject(Consts.sdkNotInitializedError);      \
    return;                                     \
}

#define OPTIONAL_ERROR_COMPLETION   \
^(NSError *error) {                 \
    if (error) {                    \
        reject(error);              \
    } else {                        \
        resolve(nil);               \
    }                               \
}

@interface Consts : NSObject

+ (NSError *)sdkNotInitializedError;
+ (NSError *)jsonStringifyErrorWithMessage:(NSString *)message;

@end

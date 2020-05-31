#import "Consts.h"

@implementation Consts

+ (NSError *)sdkNotInitializedError {
    NSString *message = @"SDK not initialized. Please call BringgDriverSDK.initBringgDriverSDK before using any other apis";
    return [[NSError alloc] initWithDomain:@"react-native-bringg-driver-sdk"
                                      code:1500
                                  userInfo:@{ NSLocalizedDescriptionKey: message }];
}

+ (NSError *)jsonStringifyErrorWithMessage:(NSString *)message {
    NSString *errorMessage = [NSString stringWithFormat:@"Failed to stringify type: %@", message];
    return [[NSError alloc] initWithDomain:@"react-native-bringg-driver-sdk"
                                      code:1501
                                  userInfo:@{ NSLocalizedDescriptionKey: errorMessage }];
}

@end

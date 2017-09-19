//
//  HttpHelper.h
//  FaceVerificationSDK
//
//  Created by jqshen on 5/1/15.
//  Copyright (c) 2015 YITU. All rights reserved.
//

#import <Foundation/Foundation.h>

@class OliveappAccessInfo;
@class TransactionId;

@interface OliveappHttpHelper : NSObject



+ (NSDictionary *)requestWithSignature:(NSURL*)url
                          withAccessId:(NSString *) accessId
                            withMethod:(NSString*) method
                      withRequestParam:(NSDictionary*)requestParam
    withConnectionTimeoutLimitMilliSec:(NSInteger)connectionTimeoutLimit
          withReadTimeoutLimitMilliSec:(NSInteger)readTimeoutLimit
                          withErrorRtn:(NSError **)errorCode;
@end

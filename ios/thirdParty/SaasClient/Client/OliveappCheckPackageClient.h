//
//  FacePairVerificationClient.h
//  LivenessDetector
//
//  Created by Xiaoyang Lin on 16/3/3.
//  Copyright © 2016年 Oliveapp. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "OliveappCheckPackageResult.h"

@interface OliveappCheckPackageClient : NSObject

@property NSURL * mCheckPackageUrl; //比对URL

@property NSNumber* mConnectionTimeoutMilliSec; // 连接超时时间
@property NSNumber* mReadTimeoutLimitMilliSec; // 响应超时时间


- (id) initWithUrl: (NSString *) url;


/**
 *  使用多幅照片加密数据包进行比对
 *
 *  @param imageContent 多幅照片加密数据包
 *  @param errorCode    错误类
 *
 *  @return 比对结果
 */
- (OliveappCheckPackageResult *) verifyByFullEncryptData: (NSData*) imageContent
                                       withErrorRtn: (NSError**) errorCode;
@end

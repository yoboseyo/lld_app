//
//  HttpHelper.m
//  FaceVerificationSDK
//
//  Created by jqshen on 5/1/15.
//  Copyright (c) 2015 YITU. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CommonCrypto/CommonDigest.h>

#import "OliveappHttpHelper.h"
#import "OliveappErrorHelper.h"
#import "OliveappDeviceHelper.h"
#import "OliveappEncryptionHelper.h"
#import "OliveappSignatureGenerator.h"
#import "OliveappErrorHelper.h"

@interface OliveappHttpHelper()
@end
/*
@implementation NSURLRequest(DataController)
+ (BOOL)allowsAnyHTTPSCertificateForHost:(NSString *)host {
    NSLog(@"allowsAnyHTTPSCertificateForHost is called, %@", host);
    if (([host rangeOfString:@"www.yitu-test.com"].location != NSNotFound)
        || ([host rangeOfString:@"www.yitutech.com"].location != NSNotFound)
        || ([host rangeOfString:@"api.yitutech.com"].location != NSNotFound)
        || ([host rangeOfString:@"umeng.com"].location != NSNotFound)
        || ([host rangeOfString:@"staging.yitutech.com"].location != NSNotFound)) {
        NSLog(@"allowsAnyHTTPSCertificateForHost YES");
        return YES;
    }
    else {
        NSLog(@"allowsAnyHTTPSCertificateForHost NO");
        return NO;
    }
}
@end*/


@implementation OliveappHttpHelper

+ (NSDictionary *)requestWithSignature:(NSURL*)url
                          withAccessId:(NSString *) accessId
                            withMethod:(NSString*) method
                      withRequestParam:(NSDictionary*)requestParam
    withConnectionTimeoutLimitMilliSec:(NSInteger)connectionTimeoutLimit
          withReadTimeoutLimitMilliSec:(NSInteger)readTimeoutLimit
                          withErrorRtn:(NSError *__autoreleasing *)errorCode
{
    NSLog(@"enter requestWithSignature");
    if (errorCode != nil) {
        *errorCode = nil;
    }
    // TODO optmize here
//    NSLog(@"try to get postData");
    
    NSData* postData = [[[NSString alloc] initWithData:[NSJSONSerialization dataWithJSONObject:requestParam options:0 error:errorCode] encoding:NSUTF8StringEncoding] dataUsingEncoding:NSUTF8StringEncoding allowLossyConversion:YES];
    NSLog(@"get postData successfully");
    if(*errorCode != nil)
    { 
        //dataWithJSONObject
        *errorCode = [OliveappErrorHelper newErrorWithDescription: @"Generate JSON data from a Foundation object  occurs an error." withErrorCode:DATA_WITH_JSON_OBJECT_ERROR];
    }
    
    NSLog(@"try to get signature");
    NSString *postLength = [NSString stringWithFormat:@"%lu", (unsigned long)[postData length]];
    NSMutableURLRequest* request = [[NSMutableURLRequest alloc] initWithURL:url cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval: (readTimeoutLimit + connectionTimeoutLimit) / 1000.0f];
    [request setURL: url];
    [request setHTTPMethod:method];
    [request setHTTPBody:postData];
    [request setValue:postLength forHTTPHeaderField:@"Content-Length"];
    [request setValue: accessId forHTTPHeaderField:@"x-access-id"];
    
    //获得公钥文件
    //md5 hash of publickey is ad93253ee347aa80624ddcc619ac498a
    NSString* publicKeyPath = [[NSBundle mainBundle] pathForResource:@"staging.public" ofType:@"der"];
    [request setValue: [OliveappSignatureGenerator generateSignature:publicKeyPath accessKey: @"1a7488784a47a7b6d2d4fb839bf8ae1c" bodyString :[[NSString alloc] initWithData:postData encoding:NSUTF8StringEncoding] userDefinedContent:@"userDefinedContent"] forHTTPHeaderField: @"x-signature"];
    
    NSLog(@"get signature successfully");
    
    [request setValue: [[UIDevice currentDevice] name] forHTTPHeaderField:@"x-device-id"];
    [request setValue: [OliveappDeviceHelper deviceName] forHTTPHeaderField:@"x-device-model"];
    [request setValue: [[UIDevice currentDevice] systemName] forHTTPHeaderField:@"x-os-version-release"];
    [request setValue: [[UIDevice currentDevice] systemVersion] forHTTPHeaderField:@"x-os-version-sdk"];
    [request setValue: @"Apple Inc." forHTTPHeaderField:@"x-device-brand"];
    [request setValue: @"Apple Inc." forHTTPHeaderField:@"x-device-manufacturer"];
    [request setValue: [NSString stringWithFormat: @"%@", [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"]] forHTTPHeaderField:@"x-app-vcode"];
    [request setValue: @"依图人脸验证" forHTTPHeaderField:@"x-app-vname"];
    [request setValue: @"1.6.e" forHTTPHeaderField:@"x-app-vcode"];
    NSURLResponse* response = nil;
    NSLog(@"request: %@", request);
    NSLog(@"set all request successfully");
    

    //获得request的大小
    long requestLength = [[request HTTPBody] length];
    
    NSData* data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:errorCode];
    
    //获得response大小,并计算总和
    long networkflow = [data length] + requestLength;
    
    NSLog(@"get response successfully,length is %ld",networkflow);
    if (response == nil)
    {
         *errorCode = [OliveappErrorHelper newErrorWithDescription: @"网络异常。" withErrorCode:NETWORK_ERROR];
        NSLog(@"errorCode: %@", *errorCode);
        return nil;
    }
    NSDictionary* dataDict;
    
    if (data) {
        dataDict = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:errorCode];
    } else {
        if(*errorCode!=nil) {
            *errorCode = [OliveappErrorHelper newErrorWithDescription: @"网络异常，返回值为空" withErrorCode:JSON_OBJECT_WITH_DATA_ERROR];
        }
    }
    if(*errorCode!=nil) {
        *errorCode = [OliveappErrorHelper newErrorWithDescription:@"网络异常，返回值不是合法Json" withErrorCode:JSON_OBJECT_WITH_DATA_ERROR];
    }
    return dataDict;
}

@end

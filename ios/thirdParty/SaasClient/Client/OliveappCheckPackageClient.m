//
//  FacePairVerificationClient.m
//  LivenessDetector
//
//  Created by Xiaoyang Lin on 16/3/3.
//  Copyright © 2016年 Oliveapp. All rights reserved.
//

#import "OliveappCheckPackageClient.h"
#import "OliveappBase64Helper.h"
#import "OliveappHttpHelper.h"
#import "OliveappErrorHelper.h"
#import "OliveappFileManager.h"
@implementation OliveappCheckPackageClient


- (id) init {
    if (self = [super init]) {
        _mCheckPackageUrl = [[NSURL alloc] initWithString:@"http://api-lanlingdai.yitutech.com/face/basic/check_image_package"];
    }
    _mConnectionTimeoutMilliSec = @(10000);
    _mReadTimeoutLimitMilliSec = @(5000);
    return self;
}

- (id) initWithUrl:(NSString *)verifyUrl {
    if (self = [super init]) {
      
      
        _mCheckPackageUrl = [[NSURL alloc] initWithString:verifyUrl];
    }
    _mConnectionTimeoutMilliSec = @(10000);
    _mReadTimeoutLimitMilliSec = @(5000);
    return self;
}


/**
 *  解密V3大礼包
 *
 *  @param imageContent 大礼包
 *  @param errorCode    错误码
 *
 *  @return <#return value description#>
 */
- (OliveappCheckPackageResult *) verifyByFullEncryptData: (NSData*) imageContent
                                            withErrorRtn: (NSError**) errorCode {
    
    //判断输入参数是否符合要求
    if (imageContent == nil){
        *errorCode = [OliveappErrorHelper newErrorWithDescription:@"查询大礼包为空" withErrorCode:FACE_VERIFICATION_PARAMETER_NIL];
        return nil;
    }
    
    NSString * queryImageContentBase64 = @"";
    
    NSMutableDictionary * requestParam = [[NSMutableDictionary alloc] init];
    
    //需要对图片进行Base64编码
    if (imageContent) {
        queryImageContentBase64 = [OliveappBase64Helper encode:imageContent];
        [requestParam setObject:queryImageContentBase64 forKey:@"query_image_package"];
    }
    
    // 默认判断大礼包中是否是同一个人
    [requestParam setObject:@YES forKey:@"query_image_package_check_same_person"];
    // 默认解析大礼包的图片
    [requestParam setObject:@YES forKey:@"query_image_package_return_image_list"];
    
    //是否开启屏幕翻拍
    [requestParam setObject:@YES forKey:@"query_image_package_check_anti_screen"];

    //是否开启光线昏暗检测
    [requestParam setObject:@YES forKey:@"query_image_package_check_dark_illumination"];
    
    //是否开启防照片检测
    [requestParam setObject:@YES forKey:@"query_image_package_check_anti_picture"];
    
    //是否开启眼部遮挡检测
    [requestParam setObject:@YES forKey:@"query_image_package_check_anti_eye_blockage"];
    
    //是否开启防孔洞检测
    [requestParam setObject:@YES forKey:@"query_image_package_check_anti_hole"];
    
    //是否返回防翻拍的图片
    [requestParam setObject:@YES forKey:@"anti_screen_image_content"];
    NSDictionary* responseDict = [OliveappHttpHelper requestWithSignature:_mCheckPackageUrl
                                                             withAccessId:@"13051"
                                                       withMethod:@"POST"
                                                 withRequestParam:requestParam
                               withConnectionTimeoutLimitMilliSec:[_mConnectionTimeoutMilliSec intValue]
                                     withReadTimeoutLimitMilliSec:[_mReadTimeoutLimitMilliSec intValue]
                                                     withErrorRtn:errorCode];
    
    NSLog(@"收到结果(response)是 %@", responseDict);
    
    // check response
    if (responseDict == nil) {
        NSLog(@"网络错误，没有收到response");
        return nil;
    }
    if ([responseDict objectForKey: @"rtn"] == nil) {
        return nil;
    }
    int rtn = [[responseDict objectForKey: @"rtn"] intValue];
    OliveappCheckPackageResult * result = [[OliveappCheckPackageResult alloc] init];
    result.rtn = rtn;
    result.message = [responseDict objectForKey:@"message"];
   
    NSDictionary * queryImagePackageResultDict = [responseDict objectForKey:@"query_image_package_result"];

    result.isAntiScreenCheckScore = [[queryImagePackageResultDict objectForKey:@"is_anti_screen_check_score"] doubleValue];
    result.isAntiScreenCheckPassed = [[queryImagePackageResultDict objectForKey:@"is_anti_screen_check_passed"] boolValue];
    result.customerDefinedContent = [queryImagePackageResultDict objectForKey:@"customer_defined_content"];
    result.isIlluminationCheckScore = [[queryImagePackageResultDict objectForKey:@"is_dark_illumination_check_score"] doubleValue];
    result.isIlluminationCheckPassed = [[queryImagePackageResultDict objectForKey:@"is_dark_illumination_check_passed"] boolValue];
    result.isSamePerson = [[queryImagePackageResultDict objectForKey:@"is_same_person"] boolValue];
    
    result.isAntiPictureCheckPassed = [[queryImagePackageResultDict objectForKey:@"is_anti_picture_check_passed"] boolValue];
    result.isAntiPictureCheckScore = [[queryImagePackageResultDict objectForKey:@"is_anti_picture_check_score"] doubleValue];
    
    result.isAntiEyeBlockageCheckPassed = [[queryImagePackageResultDict objectForKey:@"is_anti_eye_blockage_check_passed"] boolValue];
    result.isAntiEyeBlockageCheckScore = [[queryImagePackageResultDict objectForKey:@"is_anti_eye_blockage_check_score"] doubleValue];
    
    result.isAntiHoleCheckPassed = [[queryImagePackageResultDict objectForKey:@"is_anti_hole_check_passed"] boolValue];
    result.isAntiHoleCheckScore = [[queryImagePackageResultDict objectForKey:@"is_anti_hole_check_score"] doubleValue];
    
    NSArray * queryImageArray = [queryImagePackageResultDict objectForKey:@"query_image_contents"];
    NSMutableArray * base64DecodeArray = [[NSMutableArray alloc] init];
    
    if ([queryImageArray count] >= 2) {
        result.fanpaiImageContent = [OliveappBase64Helper decode:queryImageArray[0]];
    }
    //Base64解码
    NSLog(@"[OliveappFacePairVerification] 返回图片数组有%lu张",(unsigned long)[queryImageArray count]);
    for (int i = 1;i < [queryImageArray count];++i) {
        NSData * decodeImage = [OliveappBase64Helper decode:queryImageArray[i]];
        NSLog(@"Base64解码后长度为%lu",(unsigned long)[decodeImage length]);
        [base64DecodeArray addObject:decodeImage];
    }
    
    result.queryImageContents = base64DecodeArray;
    
    return result;
    
}
@end

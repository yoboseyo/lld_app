//
//  SignatureGenerator.m
//  YituFaceVerifiactionSDK
//
//  Created by Jiteng Hao on 15/11/2.
//  Copyright © 2015年 YITU. All rights reserved.
//

#import "OliveappSignatureGenerator.h"
#import "OliveappEncryptionHelper.h"
@implementation OliveappSignatureGenerator

//生成signatrue
+ (NSString *) generateSignature : (NSString *) publicKeyPath accessKey:(NSString *) accessKey bodyString: (NSString *) bodyString userDefinedContent: (NSString *) userDefinedContent
{
    //生成32位时间戳
    NSDate * localDate = [NSDate date];
    UInt32 timestamps = [localDate timeIntervalSince1970];
    
    //生成64位随机数
    UInt64 randnum = rand();
    randnum = (randnum << 32) | rand();
    NSMutableData * signature = [[NSMutableData alloc] init];
    
    //32位accessKey
    NSData * tmpData = [accessKey dataUsingEncoding:NSUTF8StringEncoding];
    Byte * tmpByte = (Byte *) [tmpData bytes];
    [signature appendBytes: tmpByte length:32];
    
    //32位md5加密的body
    tmpData = [[OliveappEncryptionHelper md5:bodyString] dataUsingEncoding:NSUTF8StringEncoding];
    tmpByte = (Byte *) [tmpData bytes];
    [signature appendBytes: tmpByte length:32];
    [signature appendBytes: &timestamps length:4];
    [signature appendBytes: &randnum length:8];
    
    //最多41位的用户自定义字符串
    tmpData = [userDefinedContent dataUsingEncoding:NSUTF8StringEncoding];
    tmpByte = (Byte *) [tmpData bytes];
    [signature appendBytes: &tmpByte length:[userDefinedContent length]];
    
    //RSA加密并转换成hex
    OliveappEncryptionHelper* rsaEncryptor = [OliveappEncryptionHelper shareInstance];
    [rsaEncryptor loadPublicKeyFromFile: publicKeyPath];
    NSData * resultData = [rsaEncryptor rsaEncryptData:signature];
    NSString * resultString = [OliveappEncryptionHelper hexStringFromData:resultData];
    return resultString;
}

@end

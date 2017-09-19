//
//  DeviceHelper.h
//  YituFaceVerifiactionSDK
//
//  Created by Jiteng Hao on 15/9/11.
//  Copyright (c) 2015年 YITU. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface OliveappDeviceHelper : NSObject

+ (NSString*) deviceName;
+ (NSString*)platformString: (NSString*) platform;
+ (BOOL) isiPhone7:(NSString*) platform;


/**
 拿到设备信息

 @return 拿到设备信息
 */
+ (NSDictionary *) getDeviceInfo;

/**
 拿到生产商名称

 @return 生产商名
 */
+ (NSString *) getManufacturer;

/**
 拿到型号
 
 @return 拿到型号
 */
+ (NSString *) getModel;

/**
 拿到系统名
 
 @return 系统名
 */
+ (NSString *) getOsname;

/**
 拿到系统版本
 
 @return 系统版本
 */
+ (NSString *) getOsversion;


#define IS_OS_5_OR_LATER    ([[[UIDevice currentDevice] systemVersion] floatValue] >= 5.0)
#define IS_OS_6_OR_LATER    ([[[UIDevice currentDevice] systemVersion] floatValue] >= 6.0)
#define IS_OS_7_OR_LATER    ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7.0)
#define IS_OS_8_OR_LATER    ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8.0)
#define IS_OS_9_OR_LATER    ([[[UIDevice currentDevice] systemVersion] floatValue] >= 9.0)
#define IS_OS_10_OR_LATER    ([[[UIDevice currentDevice] systemVersion] floatValue] >= 10.0)
@end

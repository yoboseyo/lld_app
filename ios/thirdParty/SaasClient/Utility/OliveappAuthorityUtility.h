//
//  OliveappAuthorityUtility.h
//  AppDemoPresale
//
//  Created by Xiaoyang Lin on 16/8/31.
//  Copyright © 2016年 Oliveapp. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface OliveappAuthorityUtility : NSObject

/**
 * 获取相机权限
 */
+ (BOOL) requestCameraAuthority :(BOOL)isFirtstLaunch;

/**
 *  获取相册权限
 */
- (void) requestAblumAuthority;

@end

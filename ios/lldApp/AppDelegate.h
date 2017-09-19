/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>
#import "GuidePages.h"
// 引入JPush功能所需头文件
#import "JPUSHService.h"
// iOS10注册APNs所需头文件
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

@interface AppDelegate : UIResponder <UIApplicationDelegate,GuideOverDelegate,JPUSHRegisterDelegate>

@property (nonatomic, strong) UIWindow *window;

// 创建一个原生的导航条
@property (nonatomic, strong) UINavigationController *nav;


@property (nonatomic, assign) BOOL isShowGuidePages;


@end

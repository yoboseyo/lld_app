/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <ZMCreditSDK/ALCreditService.h>
#import "SplashScreen.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "getUserInfo.h"
#import "RootViewController.h"
#import "SCLAlertView.h"
#import "recommendURL.h"
#import "IQKeyboardManager.h"
#import <UMMobClick/MobClick.h>
@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  
  IQKeyboardManager *manager = [IQKeyboardManager sharedManager];
  manager.enable = YES; // 控制整个功能是否启用。
  manager.shouldResignOnTouchOutside =YES; // 控制点击背景是否收起键盘
  manager.enableAutoToolbar =YES; // 控制是否显示键盘上的工具条
  manager.toolbarManageBehaviour =IQAutoToolbarByPosition; // 最新版的设置键盘的returnKey的关键字 ,可以点击键盘上的next键，自动跳转到下一个输入框，最后一个输入框点击完成，自动收起键盘。
  
    [[IQKeyboardManager sharedManager] setToolbarManageBehaviour:IQAutoToolbarBySubviews];
  
  //Required
  //notice: 3.0.0及以后版本注册可以这样写，也可以继续用之前的注册方式
  JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound;
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    // 可以添加自定义categories
    // NSSet<UNNotificationCategory *> *categories for iOS10 or later
    // NSSet<UIUserNotificationCategory *> *categories for iOS8 and iOS9
  }
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  
  UMConfigInstance.appKey = @"58d52ebe8f4a9d3760001c27";
  [MobClick startWithConfigure:UMConfigInstance];

  
  
  // Required
  // init Push
  // notice: 2.1.5版本的SDK新增的注册方法，改成可上报IDFA，如果没有使用IDFA直接传nil
  // 如需继续使用pushConfig.plist文件声明appKey等配置内容，请依旧使用[JPUSHService setupWithOption:launchOptions]方式初始化。
  [JPUSHService setupWithOption:launchOptions appKey:@"e985a7e931111edce9df9c97"
                        channel:@"App Store"

               apsForProduction:YES
          advertisingIdentifier:nil];
  
  
  [[getUserInfo sharedManager] getUserInfo];
  
  
  //注册芝麻信用
  [[ALCreditService sharedService]resgisterApp];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];

  // 测试的时候改变info 里的版本号就可以了
  self.isShowGuidePages = [GuidePages isShow];
  if (self.isShowGuidePages) {
    GuidePages *xt = [[GuidePages alloc] init];
    self.window.rootViewController = xt;
    xt.delegate = self;
    [xt guidePageControllerWithImages];
    [self.window makeKeyAndVisible];

  }else{
    [self clickToRootView];
  }


  return YES;
  
  
}




- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  //Optional
  NSLog(@"did Fail To Register For Remote Notifications With Error: %@", error);
}
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  
  /// Required - 注册 DeviceToken
  [JPUSHService registerDeviceToken:deviceToken];
  
  if (deviceToken&& ![[NSUserDefaults standardUserDefaults] objectForKey:@"PushDeviceInfo"]){
    
    NSString *deviceTokenStr = [[[[deviceToken description] stringByReplacingOccurrencesOfString:@"<"withString:@""]
                                 stringByReplacingOccurrencesOfString:@">" withString:@""]
                                stringByReplacingOccurrencesOfString:@" " withString:@""];

    
    
    
    [[NSUserDefaults standardUserDefaults]setObject:deviceTokenStr forKey:@"PushDeviceInfo"];
    
    
  }

}




// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  // Required
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
  }
  completionHandler(UNNotificationPresentationOptionAlert); // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以选择设置
}

// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  // Required
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
  }
  
  //判断应用是在前台还是后台
  if ([UIApplication sharedApplication].applicationState == UIApplicationStateActive) {
    [self gotoRecommandURL:userInfo];

    
  }else{
    
    [self gotoRecommandURL:userInfo];

  }
  completionHandler();  // 系统要求执行这个方法


}


-(void)gotoRecommandURL :(NSDictionary *)userInfo{

  double delayInSeconds = 0.8;
  dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(delayInSeconds * NSEC_PER_SEC));
  dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
    NSString *url =userInfo[@"url"];
    NSString *apnCount = userInfo[@"aps"][@"alert"];
    NSString *closeButtonTitle = @"取消";
    SCLAlertView *alert = [[SCLAlertView alloc] init];

    if (url) {
      [alert setHorizontalButtons:YES];
      [alert addButton:@"立即查看" actionBlock:^{
        recommendURL *vc = [[recommendURL alloc]init];
        vc.pushUrl = url;
        [self.nav pushViewController:vc animated:YES];
      }];
    }else{
      closeButtonTitle = @"确认";
    }
  
    
    UIColor *color = [UIColor colorWithRed:28/255.0 green:117/255.0 blue:225/255.0 alpha:1];
    [alert showCustom:self.window.rootViewController image:[UIImage imageNamed:@"logoB"] color:color title:@"提示" subTitle:apnCount closeButtonTitle:closeButtonTitle duration:0.0f];
  });
  
  

}
- (void)applicationWillResignActive:(UIApplication *)application {
  [JPUSHService setBadge:0];//重置JPush服务器上面的badge值。如果下次服务端推送badge传"+1",则会在你当时JPush服务器上该设备的badge值的基础上＋1；
  [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];//apple自己的接口，变更应用本地（icon）的badge值；
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  
  // Required, iOS 7 Support
  [JPUSHService handleRemoteNotification:userInfo];
  completionHandler(UIBackgroundFetchResultNewData);
  
 }

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  
  // Required,For systems with less than or equal to iOS6
  [JPUSHService handleRemoteNotification:userInfo];
}




-(void)clickToRootView{

  RootViewController *rootViewController = [RootViewController new];
  // 初始化Nav
  _nav = [[UINavigationController alloc]initWithRootViewController:rootViewController];
  _nav.navigationBarHidden = YES;
  self.window.rootViewController = _nav;
  
  [self.window makeKeyAndVisible];
  if (!self.isShowGuidePages) {
      [SplashScreen show];
  }
  

}
- (void)applicationDidBecomeActive:(UIApplication *)application {
  // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

@end

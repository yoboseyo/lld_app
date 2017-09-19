//
//  getUserInfo.h
//  lldApp
//
//  Created by edz on 2017/2/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <RCTBridgeModule.h>
#import <RCTBridge.h>
@interface getUserInfo : NSObject  <RCTBridgeModule>


@property(nonatomic,strong)NSMutableDictionary *dic;

@property(nonatomic,strong)NSMutableDictionary *DeviceAndRegistID;

//@property(nonatomic,assign)BOOL isShowPushMessage;
//@property(nonatomic,copy)NSString *pushMessage;
//@property(nonatomic,copy)NSString *recommandURL;





-(void)getUserInfo;

+ (getUserInfo *)sharedManager;


@end

//
//  inquireZhiMaCredit.m
//  lldApp
//
//  Created by edz on 2016/11/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "inquireZhiMaCredit.h"

@implementation inquireZhiMaCredit


//导出模块
RCT_EXPORT_MODULE();    //此处不添加参数即默认为这个OC类的名字

//导出方法，桥接到js的方法返回值类型必须是void
RCT_EXPORT_METHOD(startRequest:(int)userID)
{
  
  NSString *userIDString = [NSString stringWithFormat:@"%d",userID];
  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    
    [[NSNotificationCenter defaultCenter]postNotificationName:@"RNOpenOneZhiMaView" object:userIDString userInfo:nil];
    
  });
  
}




@end

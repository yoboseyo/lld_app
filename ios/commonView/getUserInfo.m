//
//  getUserInfo.m
//  lldApp
//
//  Created by edz on 2017/2/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "getUserInfo.h"
#import <UIKit/UIDevice.h>
#import "sys/utsname.h"
#import "JPUSHService.h"
@implementation getUserInfo{

  NSString *ipAddress;
}

//导出模块
RCT_EXPORT_MODULE();    //此处不添加参数即默认为这个OC类的名字



+ (getUserInfo *)sharedManager
{
  static getUserInfo *sharedAccountManagerInstance = nil;
  static dispatch_once_t predicate;
  dispatch_once(&predicate, ^{
    sharedAccountManagerInstance = [[self alloc] init];
  });
  return sharedAccountManagerInstance;
}



RCT_EXPORT_METHOD(CallbackUserInfo:(RCTResponseSenderBlock)callback)
{
  

  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    
    NSArray *events=@[[getUserInfo sharedManager].dic];
    callback(@[[NSNull null], events]);
  });

}

RCT_EXPORT_METHOD(CallbackDeviceAndRegistID:(RCTResponseSenderBlock)callback)
{
  
  
  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    [self getDeviceTokenAndRegistID];
    
    NSArray *events=@[[getUserInfo sharedManager].DeviceAndRegistID];
    callback(@[[NSNull null], events]);
  });
  
}


-(void)getDeviceTokenAndRegistID{


  if ([[NSUserDefaults standardUserDefaults] objectForKey:@"PushDeviceInfo"]) {
    NSString *PushDeviceInfo = [[NSUserDefaults standardUserDefaults] objectForKey:@"PushDeviceInfo"];
    [[getUserInfo sharedManager].DeviceAndRegistID setValue:PushDeviceInfo forKey:@"PushDeviceInfo"];
    
  }


  if ([JPUSHService registrationID]) {
        [[getUserInfo sharedManager].DeviceAndRegistID setValue:[JPUSHService registrationID] forKey:@"PushRegistInfo"];
  }
  
  NSLog(@"-----------%@",[getUserInfo sharedManager].DeviceAndRegistID);

}

-(void)getUserInfo{
  //获取设备名称
  
  
  UIDevice *currentDevice = [UIDevice currentDevice];
  NSString *deviceName = currentDevice.name;
  
  //获取系统版本号
  NSString *sysVersion = [[UIDevice currentDevice] systemVersion];
  
  //获取设备唯一标识符
  

  NSString *deviceUUID = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
  
  //获取设备的型号
  NSString *deviceModel = [[UIDevice currentDevice] model];
  
  _DeviceAndRegistID = [[NSMutableDictionary alloc]initWithCapacity:0];
//  _pushMessage = [NSString stringWithFormat:@""];
//  _isShowPushMessage = NO;
  _dic = [[NSMutableDictionary alloc]initWithCapacity:0];
  
  [_dic setValue:deviceName forKey:@"currentDevice"];
  [_dic setValue:sysVersion forKey:@"sysVersion"];
  [_dic setValue:deviceUUID forKey:@"deviceUUID"];
  [_dic setValue:[getUserInfo deviceModelName] forKey:@"deviceModel"];
  
  
//      NSString *urlStr = @"http://ipof.in/txt";
    //    1.设置请求路径
  NSString *urlStr=[NSString stringWithFormat:@"http://ipof.in/txt"];
  NSURL *url=[NSURL URLWithString:urlStr];
  
  //    2.创建请求对象
  NSURLRequest *request=[NSURLRequest requestWithURL:url];
  
  //    3.发送请求
  //3.1发送同步请求，在主线程执行
  //    NSData *data=[NSURLConnection sendSynchronousRequest:request returningResponse:nil error:nil];
  //（一直在等待服务器返回数据，这行代码会卡住，如果服务器没有返回数据，那么在主线程UI会卡住不能继续执行操作）
  
  //3.1发送异步请求
  //创建一个队列（默认添加到该队列中的任务异步执行）
  //    NSOperationQueue *queue=[[NSOperationQueue alloc]init];
  //获取一个主队列
  NSOperationQueue *queue=[NSOperationQueue mainQueue];
  [NSURLConnection sendAsynchronousRequest:request queue:queue completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
    //当请求结束的时候调用（有两种结果，一个是成功拿到数据，也可能没有拿到数据，请求失败）
//    NSLog(@"--block回调数据--%@---%@",data);
    NSString *ipAddress = [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];
    [_dic setValue:ipAddress forKey:@"ipAddress"];

  }];
  
   }
-(void)connection:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response{
  //    _tempData = [NSMutableData data];
}
-(void)connection:(NSURLConnection *)connection didReceiveData:(NSData *)data{
  


}
-(void)connectionDidFinishLoading:(NSURLConnection *)connection{
  
}
-(void)connection:(NSURLConnection *)connection didFailWithError:(NSError *)error{
  NSLog(@"%@",error);
}


+ (NSString*)deviceModelName
{
  struct utsname systemInfo;
  uname(&systemInfo);
  NSString *deviceModel = [NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding];
  
  //iPhone 系列
  if ([deviceModel isEqualToString:@"iPhone1,1"])    return @"iPhone 1G";
  if ([deviceModel isEqualToString:@"iPhone1,2"])    return @"iPhone 3G";
  if ([deviceModel isEqualToString:@"iPhone2,1"])    return @"iPhone 3GS";
  if ([deviceModel isEqualToString:@"iPhone3,1"])    return @"iPhone 4";
  if ([deviceModel isEqualToString:@"iPhone3,2"])    return @"Verizon iPhone 4";
  if ([deviceModel isEqualToString:@"iPhone4,1"])    return @"iPhone 4S";
  if ([deviceModel isEqualToString:@"iPhone5,1"])    return @"iPhone 5";
  if ([deviceModel isEqualToString:@"iPhone5,2"])    return @"iPhone 5";
  if ([deviceModel isEqualToString:@"iPhone5,3"])    return @"iPhone 5C";
  if ([deviceModel isEqualToString:@"iPhone5,4"])    return @"iPhone 5C";
  if ([deviceModel isEqualToString:@"iPhone6,1"])    return @"iPhone 5S";
  if ([deviceModel isEqualToString:@"iPhone6,2"])    return @"iPhone 5S";
  if ([deviceModel isEqualToString:@"iPhone7,1"])    return @"iPhone 6 Plus";
  if ([deviceModel isEqualToString:@"iPhone7,2"])    return @"iPhone 6";
  if ([deviceModel isEqualToString:@"iPhone8,1"])    return @"iPhone 6s";
  if ([deviceModel isEqualToString:@"iPhone8,2"])    return @"iPhone 6s Plus";
  if ([deviceModel isEqualToString:@"iPhone9,1"])    return @"iPhone 7 (CDMA)";
  if ([deviceModel isEqualToString:@"iPhone9,3"])    return @"iPhone 7 (GSM)";
  if ([deviceModel isEqualToString:@"iPhone9,2"])    return @"iPhone 7 Plus (CDMA)";
  if ([deviceModel isEqualToString:@"iPhone9,4"])    return @"iPhone 7 Plus (GSM)";
  
  //iPod 系列
  if ([deviceModel isEqualToString:@"iPod1,1"])      return @"iPod Touch 1G";
  if ([deviceModel isEqualToString:@"iPod2,1"])      return @"iPod Touch 2G";
  if ([deviceModel isEqualToString:@"iPod3,1"])      return @"iPod Touch 3G";
  if ([deviceModel isEqualToString:@"iPod4,1"])      return @"iPod Touch 4G";
  if ([deviceModel isEqualToString:@"iPod5,1"])      return @"iPod Touch 5G";
  
  //iPad 系列
  if ([deviceModel isEqualToString:@"iPad1,1"])      return @"iPad";
  if ([deviceModel isEqualToString:@"iPad2,1"])      return @"iPad 2 (WiFi)";
  if ([deviceModel isEqualToString:@"iPad2,2"])      return @"iPad 2 (GSM)";
  if ([deviceModel isEqualToString:@"iPad2,3"])      return @"iPad 2 (CDMA)";
  if ([deviceModel isEqualToString:@"iPad2,4"])      return @"iPad 2 (32nm)";
  if ([deviceModel isEqualToString:@"iPad2,5"])      return @"iPad mini (WiFi)";
  if ([deviceModel isEqualToString:@"iPad2,6"])      return @"iPad mini (GSM)";
  if ([deviceModel isEqualToString:@"iPad2,7"])      return @"iPad mini (CDMA)";
  
  if ([deviceModel isEqualToString:@"iPad3,1"])      return @"iPad 3(WiFi)";
  if ([deviceModel isEqualToString:@"iPad3,2"])      return @"iPad 3(CDMA)";
  if ([deviceModel isEqualToString:@"iPad3,3"])      return @"iPad 3(4G)";
  if ([deviceModel isEqualToString:@"iPad3,4"])      return @"iPad 4 (WiFi)";
  if ([deviceModel isEqualToString:@"iPad3,5"])      return @"iPad 4 (4G)";
  if ([deviceModel isEqualToString:@"iPad3,6"])      return @"iPad 4 (CDMA)";
  
  if ([deviceModel isEqualToString:@"iPad4,1"])      return @"iPad Air";
  if ([deviceModel isEqualToString:@"iPad4,2"])      return @"iPad Air";
  if ([deviceModel isEqualToString:@"iPad4,3"])      return @"iPad Air";
  if ([deviceModel isEqualToString:@"iPad5,3"])      return @"iPad Air 2";
  if ([deviceModel isEqualToString:@"iPad5,4"])      return @"iPad Air 2";
  if ([deviceModel isEqualToString:@"i386"])         return @"Simulator";
  if ([deviceModel isEqualToString:@"x86_64"])       return @"Simulator";
  
  if ([deviceModel isEqualToString:@"iPad4,4"]
      ||[deviceModel isEqualToString:@"iPad4,5"]
      ||[deviceModel isEqualToString:@"iPad4,6"])      return @"iPad mini 2";
  
  if ([deviceModel isEqualToString:@"iPad4,7"]
      ||[deviceModel isEqualToString:@"iPad4,8"]
      ||[deviceModel isEqualToString:@"iPad4,9"])      return @"iPad mini 3";
  
  return deviceModel;
}



@end

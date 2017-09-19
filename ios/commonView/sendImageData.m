//
//  sendImageData.m
//  lldApp
//
//  Created by edz on 2016/12/23.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "sendImageData.h"
@implementation sendImageData

RCT_EXPORT_MODULE();



- (instancetype)init
{
  self = [super init];
  if (self) {

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(sendImageData:)
                                                 name:@"getImageData"
                                               object:nil];
  }
  return self;
}

-(void)sendImageData:(NSNotification *)notification{
  
  if (notification.object) {
    
    [self sendEventWithName:@"sendImageData" body:notification.object];
    
      }
  
}



- (NSArray<NSString *> *)supportedEvents
{
  return @[@"sendImageData"];
}

@end

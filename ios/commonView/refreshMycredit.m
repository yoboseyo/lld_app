//
//  refreshMycredit.m
//  lldApp
//
//  Created by edz on 2016/11/30.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "refreshMycredit.h"

@implementation refreshMycredit


RCT_EXPORT_MODULE();



- (instancetype)init
{
  self = [super init];
  if (self) {
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(refreshMyCredit)
                                                 name:@"myCredit"
                                               object:nil];
    
    
    }
  return self;
}



-(void)refreshMyCredit{

  [self sendEventWithName:@"startRefresh" body:nil];
  

}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"startRefresh"];
}

@end

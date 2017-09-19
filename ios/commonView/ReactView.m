//
//  ReactView.m
//  lldApp
//
//  Created by edz on 2016/11/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ReactView.h"
#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "CodePush.h"

@implementation ReactView

- (instancetype)initWithFrame:(CGRect)frame
{
  
  
  if (self = [super initWithFrame:frame]) {
    NSURL *jsCodeLocation;
    
    
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"lldApp"
                                                 initialProperties:nil
                                                     launchOptions:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    rootView.frame = self.bounds;
    [self addSubview:rootView];
    
  }
  return self;
  

  
}

@end

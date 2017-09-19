//
//  GuidePages.h
//  lldApp
//
//  Created by edz on 2016/12/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@protocol GuideOverDelegate <NSObject>

@optional


-(void)clickToRootView;


@end


@interface GuidePages : UIViewController

@property(nonatomic,weak)id<GuideOverDelegate>delegate;


// 初始化引导页
- (void)guidePageControllerWithImages;
+ (BOOL)isShow;
@end

//
//  GuidePages.m
//  lldApp
//
//  Created by edz on 2016/12/2.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "GuidePages.h"
#import "OliveappAuthorityUtility.h"

#define SCREEN_W [UIScreen mainScreen].bounds.size.width
#define SCREEN_H [UIScreen mainScreen].bounds.size.height
#define VERSION_INFO_CURRENT @"currentversion"

@interface GuidePages () <UIScrollViewDelegate>
{
  UIScrollView*sc;
  
  UIPageControl*pageControl;
}



@end

@implementation GuidePages

- (void)guidePageControllerWithImages
{
  sc=[[UIScrollView alloc]initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.view.frame), CGRectGetHeight(self.view.frame))];
  sc.contentSize=CGSizeMake(SCREEN_W*3, 0);
  sc.bounces = NO;
  sc.showsHorizontalScrollIndicator = NO;
  sc.showsVerticalScrollIndicator = NO;
  sc.pagingEnabled=YES;
  [self.view addSubview:sc];
  
  for (int i=0; i<3; i++) {
    UIImageView*imageView=[[UIImageView alloc]initWithFrame:CGRectMake(i*SCREEN_W, 0, SCREEN_W, SCREEN_H)];
    
    
    NSString *path = [[NSBundle mainBundle] pathForResource:[NSString stringWithFormat:@"guide_%d",i+1] ofType:@"png"];
    imageView.image = [UIImage imageWithContentsOfFile:path];
    imageView.userInteractionEnabled=YES;

    [sc addSubview:imageView];
    if (i==2) {
      UIButton*button=[UIButton buttonWithType:UIButtonTypeCustom];
      button.frame = CGRectMake(0 , 0, 180, 40);
      button.center = CGPointMake(SCREEN_W / 2, SCREEN_H - SCREEN_H/5);
      [button addTarget:self action:@selector(buttonClick) forControlEvents:UIControlEventTouchUpInside];
      [imageView addSubview:button];
    }
  }
  
  //添加小白点
  pageControl=[[UIPageControl alloc]initWithFrame:CGRectMake(0, 0, SCREEN_W/2, 30)];
  pageControl.center = CGPointMake(SCREEN_W/2, SCREEN_H-70);
  pageControl.numberOfPages=3;
  //设置小白点的颜色
  pageControl.pageIndicatorTintColor=[UIColor grayColor];
  pageControl.currentPageIndicatorTintColor = [UIColor blackColor];
  //需要记住pageControl虽然是和scrollView连用的，但是并不加载在sc
  [self.view addSubview:pageControl];
  
  
  
  //kvo观察者模式 观察某一个对象其中的某一个值的变化，如果有新值变化，就通知你
  //需要注意的是观察者模式需要手动销毁，当前界面销毁，并不代表观察者模式也销毁了
  //sc观察的对象 self为响应的对象 path为观察sc其中的哪一个属性，使用字符串来表示这个属性，要求与属性名保持一致    options为观察值变化为有新的变化时候，通知我 context上下文
  
  [sc addObserver:self forKeyPath:@"contentOffset" options:NSKeyValueObservingOptionNew context:nil];
  
}

//kvo响应的方法
-(void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
  //keyPath为观察的那个key也就是属性   object为观察的那个对象    change为变化的值
  
  int x=sc.contentOffset.x/SCREEN_W;
  pageControl.currentPage=x;
  
}

+ (BOOL)isShow
{
  // 读取版本信息
  NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
  NSString *localVersion = [user objectForKey:VERSION_INFO_CURRENT];
  NSString *currentVersion =[[NSBundle mainBundle].infoDictionary objectForKey:@"CFBundleShortVersionString"];
//  if (localVersion == nil || ![currentVersion isEqualToString:localVersion]) {
    if (localVersion == nil) {

    [OliveappAuthorityUtility requestCameraAuthority:YES];

    return YES;
  }else
  {
    return NO;
  }
}
-(void)buttonClick{
  //引导结束，删除sc
  
  [sc removeObserver:self forKeyPath:@"contentOffset"];
  [sc removeFromSuperview];
  sc =nil ;
  [GuidePages saveCurrentVersion];

  [self clickToRootView];
  
}

-(void)dealloc
{
  
  
  if (sc) {
    [sc removeObserver:self forKeyPath:@"contentOffset"];
  }
  
  if (pageControl) {
    [pageControl removeFromSuperview];
    pageControl = nil;
  }
  
}



// 保存版本信息
+ (void)saveCurrentVersion
{
  NSString *version =[[NSBundle mainBundle].infoDictionary objectForKey:@"CFBundleShortVersionString"];
  NSUserDefaults *user = [NSUserDefaults standardUserDefaults];
  [user setObject:version forKey:VERSION_INFO_CURRENT];
  [user synchronize];
}


-(void)clickToRootView{
  if (self.delegate != nil && [self.delegate respondsToSelector:@selector(clickToRootView)]) {
    
      [self.delegate clickToRootView];
  }

}
@end

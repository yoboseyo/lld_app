//
//  recommendURL.m
//  lldApp
//
//  Created by edz on 2017/2/24.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "recommendURL.h"

@interface recommendURL ()
{

  UIWebView *_recommandURL;
}

@end

@implementation recommendURL

- (void)viewDidLoad {
    [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];

  _recommandURL = [[UIWebView alloc]initWithFrame:self.view.bounds];
  _recommandURL.backgroundColor = [UIColor whiteColor];
  [self.view addSubview: _recommandURL];
    // Do any additional setup after loading the view.
}



-(void)viewWillAppear:(BOOL)animated{

  [super viewWillAppear:animated];
  self.navigationController.navigationBarHidden = NO;

  self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
  UIBarButtonItem *returnButtonItem = [[UIBarButtonItem alloc] init];
  returnButtonItem.title = @"返回";
  self.navigationItem.backBarButtonItem = returnButtonItem;
  self.navigationController.navigationBar.barTintColor =  [UIColor colorWithRed:28/255.0 green:117/255.0 blue:225/255.0 alpha:1];
;
  NSURLRequest *request =[NSURLRequest requestWithURL:[NSURL URLWithString:_pushUrl]];
  [_recommandURL loadRequest:request];



}
-(void)viewWillDisappear:(BOOL)animated{
  
  [super viewWillDisappear:animated];
  self.navigationController.navigationBarHidden = YES;
  
  
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end

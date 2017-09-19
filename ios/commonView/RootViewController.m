//
//  RootViewController.m
//  lldApp
//
//  Created by edz on 2016/11/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RootViewController.h"
#import "ReactView.h"
#import "AFNetworking.h"
#import "AFHTTPSessionManager.h"
#import <ZMCreditSDK/ALCreditService.h>
#import "OliveappCaptureDatabaseImageViewController.h"
#import "OliveappCaptureIDCardPhotoViewController.h"
#import "OliveappOnDatabaseImageCapturedEventListener.h"
#import "OliveappIdcardCaptorViewController.h"
#import "OliveappIdcardCaptorResultDelegate.h"
#import "OliveappCaptureRecentPhotoViewController.h"
#import "OliveappAsyncIdcardCaptorDelegate.h"
#import "OliveappBase64Helper.h"
#import "OliveappLivenessDetectionViewController.h"
#import "OliveappCaptureDatabaseImageViewController.h"
#import "OliveappLivenessDataType.h"
#import "OliveappBase64Helper.h"
#import "LRMacroDefinitionHeader.h"
#import "OliveappCheckPackageClient.h"
#import "OliveappFileManager.h"
#import "OliveappAuthorityUtility.h"
//#import "SCLAlertView.h"
//#import "getUserInfo.h"
//#import "recommendURL.h"
static  NSString  *getParam =@"http://portal.lanlingdai.net/lld-service/user/authorizeZhimaApp.json";

static  NSString  *postCredit =@"http://portal.lanlingdai.net/lld-service/user/updateZhima.json";





@interface RootViewController () <OliveappOnDatabaseImageCapturedEventListener,OliveappIdcardCaptorResultDelegate,OliveappAsyncIdcardCaptorDelegate,OliveappLivenessResultDelegate>

@end

@implementation RootViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  ReactView * reactView = [[ReactView alloc] initWithFrame:CGRectMake(0, 0, CGRectGetWidth(self.view.bounds), CGRectGetHeight(self.view.bounds))];
  
  [self.view addSubview:reactView];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(doPushNotification:) name:@"RNOpenOneZhiMaView" object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(getIDCardPhoto:) name:@"RecognitionFace" object:nil];
  
  
  self.view.backgroundColor = [UIColor whiteColor];
  // Do any additional setup after loading the view.
}

/**
 *  捕获身份证算法的回调
 *  @param imgData 捕获到的身份证照，如需网络传输，请调用UIImageJPEGRepresentation(imageContent, 0.7)
 */
- (void) onDetectionSucc: (NSData *) imgData {
   UIImage * idcardImage = [UIImage imageWithData:imgData];
   NSData *zhuanmaData = UIImageJPEGRepresentation(idcardImage, 0.7);

  
  dispatch_sync(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{

    [self dismissViewControllerAnimated:YES completion:^{
      
      NSDictionary *dic =[[NSDictionary alloc]initWithObjectsAndKeys:[OliveappBase64Helper encode:zhuanmaData],@"picDataBaseFolw",@"0",@"picType",nil];
      [[NSNotificationCenter defaultCenter] postNotificationName:@"getImageData"
                                                          object:[self DataTOjsonString:dic]
                                                        userInfo:nil];

    }];
  });
}

//-(void)viewDidAppear:(BOOL)animated{
//  [super viewDidAppear:animated];
//  if ([getUserInfo sharedManager].isShowPushMessage) {
//    [getUserInfo sharedManager].isShowPushMessage = NO;
//
//    NSString *apnCount = [getUserInfo sharedManager].pushMessage;
//    NSString *url =[getUserInfo sharedManager].recommandURL;
//    SCLAlertView *alert = [[SCLAlertView alloc] init];
//    [alert setHorizontalButtons:YES];
//    [alert addButton:@"立即查看" actionBlock:^{
//      recommendURL *vc = [[recommendURL alloc]init];
//      vc.pushUrl = url;
//      [[UIApplication sharedApplication].keyWindow.rootViewController.navigationController pushViewController:vc animated:YES];
//    }];
//    
//    UIColor *color = [UIColor colorWithRed:28/255.0 green:117/255.0 blue:225/255.0 alpha:1];
//    [alert showCustom:self image:nil color:color title:@"提示1" subTitle:apnCount closeButtonTitle:@"取消" duration:0.0f];
//  }
//
//}

/**
 *  捕获到合格的登记照片时的回调函数
 *
 *  @param imageContent 图片内容。如需网络传输，请调用UIImageJPEGRepresentation(imageContent, 0.7)
 *  @param face 检测到的人脸信息。如果为nil表示未检测到或检测到多张人脸
 *  @param error 错误信息
 */
- (void) onDatabaseImageTaken: (UIImage*) imageContent
             withDetectedFace: (OliveappFaceRect*) face
                    withError: (NSError *) error {
  
  dispatch_sync(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    
    //显示翻拍照结果
    dispatch_async(dispatch_get_main_queue(), ^{
      
      NSLog(@"-----------------------成功了111");
      UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"成功了" message:nil delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
      [alert show];
      
    });
    
  });
}


/**
 *  身份证翻拍用户点击取消按钮后的响应事件
 */
- (void) onCancelCapture {
  [self dismissViewControllerAnimated:YES completion:nil];
}

/**
 *  身份证捕获界面取消的回调
 */
- (void) onIdcardCaptorCancel {
  [self dismissViewControllerAnimated:YES completion:nil];
}


-(void)getIDCardPhoto:(NSNotification *)note{
  
  if ([OliveappAuthorityUtility requestCameraAuthority:NO]) {
  
  if ([note.object isEqualToString:@"0"]) {
    //使用下面代码可以使用自动捕获身份证照
    UIStoryboard *board = [UIStoryboard storyboardWithName: @"IdcardCaptor" bundle: nil];
    OliveappIdcardCaptorViewController * idcardCaptorViewController = (OliveappIdcardCaptorViewController*) [board instantiateViewControllerWithIdentifier: @"idcardCaptorStoryboard"];
    
    //设置回调函数，记得将这个ViewController加上protocol <OliveappAsyncIdcardCaptorDelegate>
    
      // 身份证正面
      [idcardCaptorViewController setDelegate:self
                                 withCardType:FRONT_IDCARD
                              withCaptureMode:MIXED_MODE
                           withDurationSecond:10];
    [self presentViewController:idcardCaptorViewController animated:YES completion:nil];

  }else{
  
    //获取活体检测的storyboard和viewcontroller对象
    UIStoryboard *board = [UIStoryboard storyboardWithName: @"LivenessDetection" bundle: nil];
    
    OliveappLivenessDetectionViewController* livenessViewController = (OliveappLivenessDetectionViewController*) [board instantiateViewControllerWithIdentifier: @"LivenessDetectionStoryboard"];
    //以下样例代码展示了如何初始化活体检测
    __weak typeof(self) weakSelf = self;
    NSError *error;
    BOOL isSuccess;
    
    isSuccess = [livenessViewController setConfigLivenessDetection: weakSelf
                                                         withError: &error];
    //弹出活体检测界面，可用show,push
    [self presentViewController:livenessViewController animated:YES completion:nil];

  
  }
 
  }

}


- (void)doPushNotification:(NSNotification *)notification{
  if (notification.object) {
    NSMutableDictionary *dic = [[NSMutableDictionary alloc]initWithCapacity:0];
    [dic setValue:notification.object forKey:@"userId"];

  
  
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
      AFURLSessionManager *manager = [[AFHTTPSessionManager alloc]initWithSessionConfiguration:configuration];
    [manager setResponseSerializer:[AFHTTPResponseSerializer serializer]];
    NSMutableURLRequest *request = [[AFJSONRequestSerializer serializer]requestWithMethod:@"POST" URLString:getParam parameters:dic error:nil];
  
  
    NSURLSessionTask *task = [manager dataTaskWithRequest:request completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
      if (error) {
        NSLog(@"%@",error);
      }else{
  
  
        NSString *result = [[NSString alloc] initWithData:responseObject  encoding:NSUTF8StringEncoding];
        NSData *JsonData = [result dataUsingEncoding:NSUTF8StringEncoding];
        NSDictionary *dataDic = [NSJSONSerialization JSONObjectWithData:JsonData options:NSJSONReadingMutableLeaves error:nil];
  
  
        NSDictionary *entity = dataDic[@"entity"];
        NSString* appId = entity[@"appId"];
        NSString* sign = entity[@"sign"];
        NSString* params = entity[@"params"];
        self.navigationController.navigationBarHidden = NO;
    
        [[ALCreditService sharedService] queryUserAuthReq:appId sign:sign params:params extParams:nil selector:@selector(result:) target:self];
        
      }
      
    }];
    
    [task resume];
    
  }


}



- (void)result:(NSMutableDictionary*)dic{
  
  self.navigationController.navigationBarHidden = YES;

  
  if ([dic[@"authResult"] isEqualToString:@"success"]) {
    NSMutableDictionary *dic1 = [[NSMutableDictionary alloc]initWithCapacity:0];
    [dic1 setValue:dic[@"params"] forKey:@"params"];
    
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
    
    AFURLSessionManager *manager = [[AFHTTPSessionManager alloc]initWithSessionConfiguration:configuration];
    
    [manager setResponseSerializer:[AFHTTPResponseSerializer serializer]];
    NSMutableURLRequest *request = [[AFJSONRequestSerializer serializer]requestWithMethod:@"POST" URLString:postCredit parameters:dic error:nil];
    
    
    NSURLSessionTask *task = [manager dataTaskWithRequest:request completionHandler:^(NSURLResponse * _Nonnull response, id  _Nullable responseObject, NSError * _Nullable error) {
      if (error) {
        NSLog(@"%@",error);
      }else{
        
        
        NSString *result = [[NSString alloc] initWithData:responseObject  encoding:NSUTF8StringEncoding];
        NSLog(@"%@",response.URL);
        NSLog(@"%@",result);
        
        
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
          dispatch_async(dispatch_get_main_queue(), ^{
            [[NSNotificationCenter defaultCenter] postNotificationName:@"myCredit"
                                                                object:self
                                                              userInfo:nil];
          });
        });

        
      
      }
      
    }];
    
    [task resume];
  }
  
  
  
}



/**
 *  活体检测成功的回调
 *
 *  @param detectedFrame 返回检测到的图像
 */
- (void) onLivenessSuccess: (OliveappDetectedFrame*) detectedFrame {
  NSLog(@"活体检测成功");
  
  UIAlertView * alert = [[UIAlertView alloc] initWithTitle:nil message:@"请稍候" delegate:self cancelButtonTitle:nil otherButtonTitles: nil];
  [alert show];
  [self dismissViewControllerAnimated:YES completion:^{
    
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
      
      NSError * error;
      OliveappCheckPackageClient * client = [[OliveappCheckPackageClient alloc] init];
      OliveappCheckPackageResult * result = [client verifyByFullEncryptData:detectedFrame.verificationData withErrorRtn:&error];
      
      dispatch_async(dispatch_get_main_queue(), ^{
                UIImage * idcardImage = [UIImage imageWithData:result.fanpaiImageContent];
                NSData *zhuanmaData = UIImageJPEGRepresentation(idcardImage, 0.7);
        
        
        
                NSDictionary *dic =[[NSDictionary alloc]initWithObjectsAndKeys:[OliveappBase64Helper encode:zhuanmaData],@"picDataBaseFolw",@"1",@"picType",nil];
        
                [[NSNotificationCenter defaultCenter] postNotificationName:@"getImageData"
                                                                    object:[self DataTOjsonString:dic]
                                                                  userInfo:nil];
        
          dispatch_async(dispatch_get_main_queue(), ^() {
            [alert dismissWithClickedButtonIndex:0 animated:YES];
          });
      });
      
    });
    
  }];
  
}


/**
 *  活体检测失败的回调
 *
 *  @param sessionState  活体检测的返回状态
 *  @param detectedFrame 返回检测到的图像
 */
- (void) onLivenessFail: (int)sessionState withDetectedFrame: (OliveappDetectedFrame*)detectedFrame {
  NSLog(@"活体检测失败");
  
  UIAlertView * alert = [[UIAlertView alloc] initWithTitle:nil message:@"检测失败,请重试" delegate:self cancelButtonTitle:nil otherButtonTitles: nil];
  [alert show];
  
  [self dismissViewControllerAnimated:YES completion:^{
    dispatch_async(dispatch_get_global_queue(0, 0), ^{
      

      dispatch_async(dispatch_get_main_queue(), ^{
        
        dispatch_async(dispatch_get_main_queue(), ^() {
          [alert dismissWithClickedButtonIndex:0 animated:YES];
        });
      });
      
    });

  }];
}

/**
 *  取消按钮的操作方法
 */
- (void) onLivenessCancel {
  NSLog(@"取消");
  [self dismissViewControllerAnimated:YES completion:nil];
}



-(NSString*)DataTOjsonString:(id)object
{
  NSString *jsonString = nil;
  NSError *error;
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:object
                                                     options:NSJSONWritingPrettyPrinted // Pass 0 if you don't care about the readability of the generated string
                                                       error:&error];
  if (! jsonData) {
    NSLog(@"Got an error: %@", error);
  } else {
    jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  }
  return jsonString;
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end

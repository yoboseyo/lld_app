//
//  LivenessDetectionViewController.m
//  LivenessDetectionViewSDK
//
//  Created by Jiteng Hao on 16/1/11.
//  Copyright © 2016年 Oliveapp. All rights reserved.
//


#import <Foundation/Foundation.h>
#import "OliveappCameraPreviewController.h"
#import "OliveappViewUpdateEventDelegate.h"
#import "OliveappLivenessDetectionViewController.h"
#import "OliveappVerificationController.h"
#import "GifView.h"
#import "OliveappStructLivenessFrameResult.h"
#import "RMDisplayLabel.h"
#import "RMDownloadIndicator.h"
#import "OliveappLivenessDataType.h"
#import "OliveappViewUpdateEventDelegate.h"
#import "LRMacroDefinitionHeader.h"
#import "OliveappApplicationParameter.h"
#import "OliveappTimeUtility.h"
#import "OliveappFileManager.h"

/**
 * 如果需要自定义此ViewController，请参考定制文档
 */
@interface OliveappLivenessDetectionViewController() <AVAudioPlayerDelegate,OliveappViewUpdateEventDelegate>

#if !TARGET_IPHONE_SIMULATOR
// 相机预览
@property (weak, nonatomic) IBOutlet UIView *mCameraPreview;
// 步骤提示文本标签
@property (weak, nonatomic) IBOutlet UILabel *mStepHintTextLabel;
//音频
@property (strong, nonatomic) AVAudioPlayer * audioPlayer;
//结果回调
@property (weak) id<OliveappLivenessResultDelegate> mLivenessResultDelegate;
//摄像头对象
@property (strong) OliveappCameraPreviewController* mCameraController;
//流程控制器

@property (strong) OliveappVerificationController* mVerificationController;
//提示文字
@property (strong) NSDictionary *mActionHintTextDict;
//动作切换时的线程队列
@property NSOperationQueue * mAudioHandlerQueue;
//背景图
@property (weak, nonatomic) IBOutlet UIImageView *mBackgroundImageView;
//计时，用户提示
@property long long mLastTime;
//定时循环播放声音
@property (strong, nonatomic) NSTimer * mVoiceTimer;
//帧率显示，实际使用时可隐藏
@property (weak, nonatomic) IBOutlet UILabel *mFrameLabel;
//帧数，用于帧率计算
@property int mFrameNumber;
//用于统计帧率的计时器
@property long long mFrameTimer;
@end

@implementation OliveappLivenessDetectionViewController


////////// View Controller Event /////////////
- (void) viewDidLoad {
    [super viewDidLoad];
    if (_mCameraController == nil) {
        _mCameraController = [[OliveappCameraPreviewController alloc] init];
    }

    //读取提示文字plist
    NSString *textConstantsFilePath = [[NSBundle bundleForClass:[self class]] pathForResource: @"TextConstants"
                                                                                       ofType: @"plist"];
    _mActionHintTextDict = [NSDictionary dictionaryWithContentsOfFile:textConstantsFilePath];
    
    // 绑定APP切回事件，切出APP被认为是取消活体检测。活体检测过程中不允许APP切出切回，否则用户可以换人Hack算法
    UIApplication *app = [UIApplication sharedApplication];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(applicationDidBecomeActive:)
                                                 name:UIApplicationDidBecomeActiveNotification
                                               object:app];

    //初始化消息队列
    _mAudioHandlerQueue = [[NSOperationQueue alloc] init];
    [_mAudioHandlerQueue setMaxConcurrentOperationCount:1];
    _mFrameNumber = 0;
}

- (void) viewWillAppear:(BOOL)animated {
    NSLog(@"[PROFILE] LivenessDetectionViewController.viewWillAppear");
    [super viewWillAppear:animated];
    
    /**
     * 这里设置屏幕分辨率，默认是全屏16:9
     */
    [_mCameraController startCamera:AVCaptureDevicePositionFront
                     withResolution:AVCaptureSessionPresetHigh];

    NSLog(@"[PROFILE] LivenessDetectionViewController.viewWillAppear finish");
}

- (void) viewDidAppear:(BOOL)animated {
    NSLog(@"[BEGIN][LivenessDetectionViewController viewDidAppear]");
    NSError * error;
    [self startDetection:&error];
    [self playHintVoice];
    _mVoiceTimer = [NSTimer scheduledTimerWithTimeInterval:6 target:self selector:@selector(playHintVoice) userInfo:nil repeats:YES];
    NSLog(@"[END][LivenessDetectionViewController viewDidAppear]");
}


/**
 播放音频
 */
- (void) playHintVoice {
    [self playBackgroundSoundEffect:@"oliveapp_step_hint_eyeclose"];
}

- (void)viewDidLayoutSubviews {
    NSLog(@"[BEGIN][LivenessDetectionViewController] viewDidLayoutSubviews");
    [super viewDidLayoutSubviews];
    [_mCameraController setupPreview: _mCameraPreview];
    NSLog(@"[END][LivenessDetectionViewController] viewDidLayoutSubviews");
}

- (void) viewWillDisappear:(BOOL)animated {
    [_mAudioHandlerQueue cancelAllOperations];
    [_audioPlayer stop];
    _audioPlayer = nil;
    [_mVoiceTimer invalidate];
    _mVoiceTimer = nil;
}

- (void) viewDidDisappear:(BOOL)animated {
    NSLog(@"[BEGIN][LivenessDetectionViewController] viewDidDisappear");
    [super viewDidDisappear:animated];
        // 当界面消失时析构所有对象
    [_mCameraController stopCamera];
    [_mVerificationController unInit];
    _mVerificationController = nil;
    [self removeNotification];
    NSLog(@"[END][LivenessDetectionViewController] viewDidDisappear");
}

// 重要
- (void)applicationDidBecomeActive:(NSNotification *)notification {
    NSLog(@"applicationDidBecomeActive...");
    // 用户切出APP又切回，切出APP我们认为是取消活体检测
    [_mLivenessResultDelegate onLivenessCancel];
}

- (void) removeNotification {
    // 失败后不再监听APP活跃事件，否则会造成ViewController被两次dismiss，现象是UIAlert无法消除
    UIApplication *app = [UIApplication sharedApplication];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:UIApplicationDidBecomeActiveNotification object:app];
}


#pragma mark -
#pragma mark -- 活体检测相关
////////// Liveness Detection Related ////////

// 设置配置活性检测
- (BOOL) setConfigLivenessDetection: (id<OliveappLivenessResultDelegate>) delegate
                          withError: (NSError **) error {
    // 设置参数
    _mLivenessResultDelegate = delegate;
    return YES;
}


- (void) startDetection:(NSError **) error {
    
    //初始化VerificationController
    _mVerificationController = [OliveappVerificationController new];
    
    OliveappSessionManagerConfig* config = [OliveappSessionManagerConfig new];
    [config usePredefinedConfig: 6]; // 使用默认的配置
    
    //初始化算法模块
    [_mVerificationController setConfig:config
                           withDelegate:self
                              withError:error];
    
    //这里设置了检测人脸框的坐标和宽高，详细请参考定制文档
    [_mVerificationController setFaceLocation:0.15 withYpercent:0.25 withWidthPercent:0.7f withHeightPercent:0.5f];
    
    //设置摄像头回调
    [_mCameraController setCameraPreviewDelegate: _mVerificationController];
    
    // 启动活体检测，可以使用下面这段代码来实现“开始”按钮功能
    if ([_mVerificationController getCurrentStep] == STEP_READY) {
        NSLog(@"启动检测");
        [_mVerificationController nextVerificationStep];
    }
}

// 异步启动验证委托
// 重启验证事件处理

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
////////////// AsyncPrestartValidatorDelegate ///////////////////
////////////// Handle PrestartValidator Event ///////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**
 *  预检成功回调
 *
 *  @param detectedFrame 捕获到的图片
 */
- (void) onPrestartSuccess: (OliveappDetectedFrame*) detectedFrame {
    assert([NSThread isMainThread] == 1);
    // 预检成功
    NSLog(@"预检成功");
    //使用以下方法进入活体检测
    [_mVerificationController enterLivenessDetection];
}

/**
 *  预检失败回调
 */
- (void) onPrestartFail {
    assert([NSThread isMainThread] == 1);
    // 处理预检失败事件(一般为超时)
    NSAssert(false, @"预检失败，现在的实现不应该运行到这里");
}

/**
 *  单帧回调
 *
 *  @param remainingTimeoutMilliSecond 剩余时间
 */
- (void) onFrameDetected: (int) remainingTimeoutMilliSecond
withErrorCodeOfInActionArray:(NSArray *)errorCodeOfInAction{
    assert([NSThread isMainThread] == 1);
    
    if ([OliveappTimeUtility getTimeStampInMilliSec] - _mLastTime > 500) {
        _mLastTime = [OliveappTimeUtility getTimeStampInMilliSec];
        NSString * hint;
        if (errorCodeOfInAction.count > 0) {
            hint = [_mActionHintTextDict objectForKey: [NSString stringWithFormat:@"hinttext_inactionerror_%@", errorCodeOfInAction[0]]];
            [_mBackgroundImageView setImage:[UIImage imageNamed:@"oliveapp_background_warning.png"]];
        } else {
            [_mBackgroundImageView setImage:[UIImage imageNamed:@"oliveapp_background_normal.png"]];
        }
        [_mStepHintTextLabel setText:hint];
    }
    
    {
        //计算帧率的代码
        ++_mFrameNumber;
        long long delta = [OliveappTimeUtility getTimeStampInMilliSec] - _mFrameTimer;
        if (delta > 1000) {
            [_mFrameLabel setText:[NSString stringWithFormat:@"帧率:%lld",_mFrameNumber * 1000 / delta]];
            _mFrameNumber = 0;
            _mFrameTimer = [OliveappTimeUtility getTimeStampInMilliSec];
        }
    }
}


// 异步委托的活性检测
// 事件处理的活性检测

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
////////////// AsyncLivenessDetectorDelegate ////////////////////
////////////// Handle LivenessDetector Event ////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/**
 *  活体检测成功的回调
 *
 *  @param detectedFrame 活体检测抓取的图片
 */
- (void) onLivenessSuccess: (OliveappDetectedFrame*) detectedFrame {
    assert([NSThread isMainThread] == 1);
    assert(detectedFrame.frameData == nil);
    
    // 失败后不再监听APP活跃事件，否则会造成ViewController被两次dismiss，现象是UIAlert无法消除
    [self removeNotification];
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1.5 * NSEC_PER_SEC), dispatch_get_main_queue(), ^() {
        //回调给用户
        [_mLivenessResultDelegate onLivenessSuccess:detectedFrame];
    });
    
}

/**
 *  活体检测失败的回调
 *
 *  @param sessionState  session状态，用于区别超时还是动作不过关
 *  @param detectedFrame 活体检测抓取的图片
 */
- (void) onLivenessFail: (int) sessionState
      withDetectedFrame: (OliveappDetectedFrame *) detectedFrame{
    assert([NSThread isMainThread] == 1);
    NSLog(@"LivenessDetectionViewController::onLivenessFail");
    // 失败后不再监听APP活跃事件，否则会造成ViewController被两次dismiss，现象是UIAlert无法消除
    [self removeNotification];
    
    // 回调给用户
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 1.5 * NSEC_PER_SEC), dispatch_get_main_queue(), ^() {
        // 回调给用户
        [_mLivenessResultDelegate onLivenessFail:sessionState withDetectedFrame:detectedFrame];
    });
}



/**
 *  通知每帧处理完毕后活体检测session的情况
 *
 *  @return
 */
- (void) onFrameDetected: (int)currentActionType
         withActionState: (int)actionState
        withSessionState: (int)sessionState
        withRemainingTimeoutMilliSecond: (int)remainingTimeoutMilliSecond
withErrorCodeOfInActionArray:(NSArray *)errorCodeOfInAction{
    assert([NSThread isMainThread] == 1);
    
    
    if ([OliveappTimeUtility getTimeStampInMilliSec] - _mLastTime > 500) {
        _mLastTime = [OliveappTimeUtility getTimeStampInMilliSec];
        NSString * hint;
        if (errorCodeOfInAction.count > 0) {
            hint = [_mActionHintTextDict objectForKey: [NSString stringWithFormat:@"hinttext_inactionerror_%@", errorCodeOfInAction[0]]];
            [_mBackgroundImageView setImage:[UIImage imageNamed:@"oliveapp_background_warning.png"]];
        } else {
            [_mBackgroundImageView setImage:[UIImage imageNamed:@"oliveapp_background_normal.png"]];
        }
        [_mStepHintTextLabel setText:hint];
    }
    
    
    {
        //计算帧率的代码
        ++_mFrameNumber;
        long long delta = [OliveappTimeUtility getTimeStampInMilliSec] - _mFrameTimer;
        if (delta > 1000) {
            [_mFrameLabel setText:[NSString stringWithFormat:@"帧率:%lld",_mFrameNumber * 1000 / delta]];
            _mFrameNumber = 0;
            _mFrameTimer = [OliveappTimeUtility getTimeStampInMilliSec];
        }
    }
}

////////////// UI Event /////////////

/**
 *  点击取消按钮，退出界面
 *
 *  @param sender <#sender description#>
 */
- (IBAction)onCancelClicked:(id)sender {
    // 失败后不再监听APP活跃事件，否则会造成ViewController被两次dismiss，现象是UIAlert无法消除
    [self removeNotification];

    [_mLivenessResultDelegate onLivenessCancel];
}

/**
 *  播放音频
 *
 *  @param resource 音频名字
 */
- (void) playBackgroundSoundEffect: (NSString*) resource {
    
    NSString *soundFilePath = [[NSBundle mainBundle] pathForResource: resource ofType: @"mp3"];
    NSURL *fileURL = [[NSURL alloc] initFileURLWithPath: soundFilePath];
    
    @synchronized (_audioPlayer) {
        if ([_audioPlayer isPlaying]) {
            [_audioPlayer stop];
        }
        _audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL: fileURL error:nil];
        [_audioPlayer play];
    }
}



//================废弃的回调接口==========================//
- (void) onActionChanged: (int)lastActionType
    withLastActionResult: (int)lastActionResult
       withNewActionType: (int)newActionType
  withCurrentActionIndex: (int)currentActionIndex {
}

- (void) onInitializeSucc {
    assert([NSThread isMainThread] == 1);
    NSLog(@"活体检测初始化成功");
    
}

- (void) onInitializeFail:(NSError*) error {
    assert([NSThread isMainThread] == 1);
    NSLog(@"活体检测初始化失败，错误信息: %@", [error localizedDescription]);
}
#endif
@end







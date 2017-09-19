//
//  OliveappCheckPackageResult.h
//  LivenessDetector
//
//  Created by Xiaoyang Lin on 16/9/2.
//  Copyright © 2016年 Oliveapp. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface OliveappCheckPackageResult : NSObject

@property int rtn;//请求处理结果的错误代码
@property NSString * message;//请求处理结果的错误信息，会对错误的rtn值进行解释

// 比对数据包
@property NSString *customerDefinedContent; // 客户定制数据内容
@property NSArray *queryImageContents; // 身份比对数据包中保存的图像

// 翻拍照
@property NSData *fanpaiImageContent; // 翻拍照
// 翻拍相关数据
@property BOOL isAntiScreenCheckPassed;
@property double isAntiScreenCheckScore;

// 昏暗相关
@property BOOL isIlluminationCheckPassed;
@property double isIlluminationCheckScore;

//防照片的判断结果是否有效，若无效则以下两个字段结果无效
@property BOOL isAntiPictureCheckValid;
@property BOOL isAntiPictureCheckPassed;
@property double isAntiPictureCheckScore;

//防眼部遮挡的结果是否有效,若无效则以下两个字段结果无效
@property BOOL isAntiEyeBlockageCheckValid;
@property BOOL isAntiEyeBlockageCheckPassed;
@property double isAntiEyeBlockageCheckScore;

//防孔洞检测结果是否有效,若无效则以下两个字段结果无效
@property BOOL isAntiHoleCheckValid;
@property BOOL isAntiHoleCheckPassed;
@property double isAntiHoleCheckScore;

@property BOOL isSamePerson;
@end

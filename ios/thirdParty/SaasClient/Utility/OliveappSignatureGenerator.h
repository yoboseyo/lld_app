//
//  SignatureGenerator.h
//  YituFaceVerifiactionSDK
//
//  Created by Jiteng Hao on 15/11/2.
//  Copyright © 2015年 YITU. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface OliveappSignatureGenerator : NSObject

+ (NSString *) generateSignature : (NSString *) publicKeyPath accessKey:(NSString *) accessKey bodyString: (NSString *) bodyString userDefinedContent: (NSString *) userDefinedContent;
@end

//
//  EncryptionHelper.h
//  Encryption
//
//  Created by  carson on 11/1/15.
//  Copyright © 2015 Apress. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface OliveappEncryptionHelper : NSObject

#pragma mark - Instance Methods

-(void) loadPublicKeyFromFile: (NSString*) derFilePath;
-(void) loadPublicKeyFromData: (NSData*) derData;

-(void) loadPrivateKeyFromFile: (NSString*) p12FilePath password:(NSString*)p12Password;
-(void) loadPrivateKeyFromData: (NSData*) p12Data password:(NSString*)p12Password;

-(SecKeyRef) getPublicKey;
-(SecKeyRef) getPrivateKey;

-(Byte*) rsaEncryptString:(NSString*)string;
-(NSData*) rsaEncryptData:(NSData*)data ;

-(NSString*) rsaDecryptBytesArray:(Byte*)bytesArray;
-(NSData*) rsaDecryptData:(NSData*)data;

+ (NSString *) md5:(NSString *) input;
+ (NSString *) hexStringFromData:(NSData *)data;

#pragma mark - Class Methods

+ (id) shareInstance;

@end

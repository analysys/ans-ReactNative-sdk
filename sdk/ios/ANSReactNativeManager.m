//
//  ANSReactNativeManager.m
//  rn
//
//  Created by xiao xu on 2020/12/1.
//

#import "ANSReactNativeManager.h"
#import <React/RCTUIManager.h>

@implementation ANSReactNativeManager

+ (UIView *)viewWithReactTag:(NSNumber *)reactTag {
    RCTRootView *rootView = [self rootView];
    RCTUIManager *manager = rootView.bridge.uiManager;
    return [manager viewForReactTag:reactTag];
}

+ (RCTRootView *)rootView {
    // RCTRootView 只能是 UIViewController 的 view，不能作为其他 View 的 SubView 使用
    UIViewController *root = [[[UIApplication sharedApplication] keyWindow] rootViewController];
    UIView *view = [root view];
    // 不是混编 React Native 项目时直接获取 RootViewController 的 view
    if ([view isKindOfClass:RCTRootView.class]) {
        return (RCTRootView *)view;
    }
    Class utils = NSClassFromString(@"ANSControllerUtils");
    if (!utils) {
        return nil;
    }
    SEL currentCallerSEL = NSSelectorFromString(@"currentViewController");
    if (![utils respondsToSelector:currentCallerSEL]) {
        return nil;
    }

    // 混编 React Native 项目时获取当前显示的 UIViewController 的 view
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
    UIViewController *caller = [utils performSelector:currentCallerSEL];
#pragma clang diagnostic pop

    if (![caller.view isKindOfClass:RCTRootView.class]) {
        return nil;
    }
    return (RCTRootView *)caller.view;
}

@end

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
    RCTUIManager *manager = nil;
    @try {
        RCTRootView *rootView = [self rootView];
        manager = rootView.bridge.uiManager;
    } @catch (NSException *exception) {
        
    }
    
    if(manager) {
        return [manager viewForReactTag:reactTag];
    } else {
        return nil;
    }
}


+ (RCTRootView *)rootView {
    UIViewController *root = [[[UIApplication sharedApplication] keyWindow] rootViewController];
    RCTRootView *rootView = [self findRootViewFromController:root];
    // 如果当前 RootViewController 中有 RCTRootView，就直接返回查找到的 RCTRootView
    if (rootView) {
        return rootView;
    }
    // 混编 React Native 项目时获取当前显示的 UIViewController 中的 RCTRootView
    UIViewController *current = [self currentViewController];
    return [self findRootViewFromController:current];
}


+ (RCTRootView *)findRootViewFromController:(UIViewController *)controller {
    if (!controller) {
        return nil;
    }
    if ([controller.view isKindOfClass:RCTRootView.class]) {
        return (RCTRootView *)controller.view;
    }
    for (UIView *subview in controller.view.subviews) {
        if ([subview isKindOfClass:RCTRootView.class]) {
            return (RCTRootView *)subview;
        }
    }
    return nil;
}


+ (void)performBlockOnMainThread:(DISPATCH_NOESCAPE dispatch_block_t)block {
    if (NSThread.isMainThread) {
        block();
    } else {
        dispatch_sync(dispatch_get_main_queue(), block);
    }
}

+ (UIViewController *)currentViewController {
    __block UIViewController *currentViewController = nil;
    void (^ block)(void) = ^{
        UIViewController *rootViewController = UIApplication.sharedApplication.keyWindow.rootViewController;
        currentViewController = [ANSReactNativeManager findCurrentViewControllerFromRootViewController:rootViewController isRoot:YES];
    };

    [self performBlockOnMainThread:block];
    return currentViewController;
}

+ (UIViewController *)findCurrentViewControllerFromRootViewController:(UIViewController *)viewController isRoot:(BOOL)isRoot {
    if (viewController.presentedViewController && ![viewController.presentedViewController isKindOfClass:UIAlertController.class]) {
         return [self findCurrentViewControllerFromRootViewController:viewController.presentedViewController isRoot:NO];
     }

    if ([viewController isKindOfClass:[UITabBarController class]]) {
        return [self findCurrentViewControllerFromRootViewController:[(UITabBarController *)viewController selectedViewController] isRoot:NO];
    }

    if ([viewController isKindOfClass:[UINavigationController class]]) {
        // 根视图为 UINavigationController
        UIViewController *topViewController = [(UINavigationController *)viewController topViewController];
        return [self findCurrentViewControllerFromRootViewController:topViewController isRoot:NO];
    }

    if (viewController.childViewControllers.count > 0) {
        if (viewController.childViewControllers.count == 1 && isRoot) {
            return [self findCurrentViewControllerFromRootViewController:viewController.childViewControllers.firstObject isRoot:NO];
        } else {
            __block UIViewController *currentViewController = viewController;
            //从最上层遍历（逆序），查找正在显示的 UITabBarController 或 UINavigationController 类型的
            // 是否包含 UINavigationController 或 UITabBarController 类全屏显示的 controller
            [viewController.childViewControllers enumerateObjectsWithOptions:NSEnumerationReverse usingBlock:^(__kindof UIViewController *_Nonnull obj, NSUInteger idx, BOOL *_Nonnull stop) {
                // 判断 obj.view 是否加载，如果尚未加载，调用 obj.view 会触发 viewDidLoad，可能影响客户业务
                if (obj.isViewLoaded) {
                    CGPoint point = [obj.view convertPoint:CGPointZero toView:nil];
                    CGSize windowSize = obj.view.window.bounds.size;
                   // 正在全屏显示
                    BOOL isFullScreenShow = !obj.view.hidden && obj.view.alpha > 0 && CGPointEqualToPoint(point, CGPointZero) && CGSizeEqualToSize(obj.view.bounds.size, windowSize);
                   // 判断类型
                    BOOL isStopFindController = [obj isKindOfClass:UINavigationController.class] || [obj isKindOfClass:UITabBarController.class];
                    if (isFullScreenShow && isStopFindController) {
                        currentViewController = [self findCurrentViewControllerFromRootViewController:obj isRoot:NO];
                        *stop = YES;
                    }
                }
            }];
            return currentViewController;
        }
    } else if ([viewController respondsToSelector:NSSelectorFromString(@"contentViewController")]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        UIViewController *tempViewController = [viewController performSelector:NSSelectorFromString(@"contentViewController")];
#pragma clang diagnostic pop
        if (tempViewController) {
            return [self findCurrentViewControllerFromRootViewController:tempViewController isRoot:NO];
        }
    }
    return viewController;
}

@end

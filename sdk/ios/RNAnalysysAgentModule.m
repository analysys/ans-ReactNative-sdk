//
//  AnalysysReact.m
//  AnalysysReactDemo
//
//  Created by analysys on 2018/8/30.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RNAnalysysAgentModule.h"
#import <AnalysysAgent/AnalysysAgent.h>
#import <React/RCTConvert.h>

@interface RCTConvert (RNNetworkType)
@end

// 数据网络上传策略
@implementation RCTConvert (RNNetworkType)
RCT_ENUM_CONVERTER(AnalysysNetworkType, (@{ @"networkNONE" : @(AnalysysNetworkNONE),
                                            @"networkWWAN" : @(AnalysysNetworkWWAN),
                                            @"networkWIFI" : @(AnalysysNetworkWIFI),
                                            @"networkALL"  : @(AnalysysNetworkALL)}),
                      AnalysysNetworkNONE, integerValue)
@end


@implementation RNAnalysysAgentModule

RCT_EXPORT_MODULE(RNAnalysysAgentModule)

- (NSDictionary *)constantsToExport {
  return @{ @"networkNONE" : @(AnalysysNetworkNONE),
            @"networkWWAN" : @(AnalysysNetworkWWAN),
            @"networkWIFI" : @(AnalysysNetworkWIFI),
            @"networkALL"  : @(AnalysysNetworkALL)};
};

#pragma mark *** 基本配置 ***

/**
 SDK版本信息
 
 React-Native示例：
 let SDKVersion = RNAnalysysAgentModule.SDKVersion()
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(SDKVersion) {
  return [AnalysysAgent SDKVersion];
}


/// 设置数据网络上传策略
/// 默认只要存在网络即会上传，不区分移动网络即WIFI网络
///
/// /// React-Native示例：
/// RNAnalysysAgentModule.setUploadNetworkType(RNAnalysysAgentModule.networkALL)
///
/// @param networkType 网络类型
RCT_EXPORT_METHOD(setUploadNetworkType:(AnalysysNetworkType)networkType) {
  [AnalysysAgent setUploadNetworkType:networkType];
}

/// 清除本地所有已缓存数据
///
/// React-Native示例：
/// RNAnalysysAgentModule.cleanDBCache()
RCT_EXPORT_METHOD(cleanDBCache) {
  [AnalysysAgent cleanDBCache];
}

/// 手动上传本地数据
///
/// React-Native示例：
/// RNAnalysysAgentModule.flush()
RCT_EXPORT_METHOD(flush) {
  [AnalysysAgent flush];
}

/// 自动采集页面黑名单
///
/// React-Native示例：
/// RNAnalysysAgentModule.setPageViewBlackListByPages(["PageA", "pageB"])
///
/// @param controllers (NSSet<NSString *> *)页面标识集合
RCT_EXPORT_METHOD(setPageViewBlackListByPages:(NSSet *)controllers) {
  [AnalysysAgent setPageViewBlackListByPages:controllers];
}

#pragma mark *** 事件跟踪 ***

/**
 页面跟踪
 
 React-Native示例：
 RNAnalysysAgentModule.pageView("活动页", {"commodityName":"iPhone","commodityPrice":"5000"})

 @param pageName 页面名称
 @param properties 页面属性
 */
RCT_EXPORT_METHOD(pageViewWithArgs:(NSString *)pageName properties:(NSDictionary *)properties) {
  [AnalysysAgent pageView:pageName properties:properties];
}

RCT_EXPORT_METHOD(pageView:(NSString *)pageName) {
  [AnalysysAgent pageView:pageName];
}


/**
 事件跟踪
 
 React-Native示例：
 RNAnalysysAgentModule.track("buy", {"ptype":"iPhone","model":"Apple iPhone8"})

 @param event 事件名称
 @param properties 事件属性
 */
RCT_EXPORT_METHOD(trackWithArgs:(NSString *)event properties:(NSDictionary *)properties) {
  [AnalysysAgent track:event properties:properties];
}

RCT_EXPORT_METHOD(track:(NSString *)event) {
  [AnalysysAgent track:event];
}


#pragma mark *** 通用属性 ***

/**
 注册单个通用属性
 
 React-Native示例：
 RNAnalysysAgentModule.registerSuperProperty("member","VIP")

 @param superPropertyName 属性名称
 @param superPropertyValue 属性值
 */
RCT_EXPORT_METHOD(registerSuperProperty:(NSString *)superPropertyName value:(id)superPropertyValue) {
  [AnalysysAgent registerSuperProperty:superPropertyName value:superPropertyValue];
}

/**
 注册多个通用属性
 
 React-Native示例：
 RNAnalysysAgentModule.registerSuperProperties({"platform":"TX","age":"20"})
 
 @param superProperties 属性信息
 */
RCT_EXPORT_METHOD(registerSuperProperties:(NSDictionary *)superProperties) {
  [AnalysysAgent registerSuperProperties:superProperties];
}

/**
 删除单个通用属性
 
 React-Native示例：
 RNAnalysysAgentModule.unRegisterSuperProperty("age")
 
 @param superPropertyName 属性key
 */
RCT_EXPORT_METHOD(unRegisterSuperProperty:(NSString *)superPropertyName) {
  [AnalysysAgent unRegisterSuperProperty:superPropertyName];
}

/**
 清除所有通用属性
 
 React-Native示例：
 RNAnalysysAgentModule.clearSuperProperties()
 */
RCT_EXPORT_METHOD(clearSuperProperties) {
  [AnalysysAgent clearSuperProperties];
}

/**
 获取某个通用属性
 
 React-Native示例：
 let superProperty = RNAnalysysAgentModule.getSuperProperty("member")
 
 @param superPropertyName 属性key
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getSuperProperty:(NSString *)superPropertyName) {
  return [AnalysysAgent getSuperProperty:superPropertyName];
}

/**
 获取已注册通用属性
 
 React-Native示例：
 let superProperties = RNAnalysysAgentModule.getSuperProperties()
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getSuperProperties) {
  return [AnalysysAgent getSuperProperties];
}


#pragma mark *** 用户属性 ***

/**
 用户ID设置，长度大于0且小于255字符
 
 React-Native示例：
 RNAnalysysAgentModule.identify("zhangsan")
 
 @param distinctId 用户ID
 */
RCT_EXPORT_METHOD(identify:(NSString *)distinctId) {
  [AnalysysAgent identify:distinctId];
}

/**
 用户关联，长度大于0且小于255字符
 
 React-Native示例：
 RNAnalysysAgentModule.alias("userID");
 
 @param aliasId 用户标识
 */
RCT_EXPORT_METHOD(alias:(NSString *)aliasId) {
  [AnalysysAgent alias:aliasId];
}

/**
 匿名ID获取
 
 React-Native示例：
 RNAnalysysAgentModule.getDistinctId();
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getDistinctId) {
  return [AnalysysAgent getDistinctId];
}

/**
 设置用户属性
 
 React-Native示例：
 RNAnalysysAgentModule.profileSet({"Email":"yonghu@163.com","WeChatID":"weixinhao"});
 
 @param property 属性信息
 */
RCT_EXPORT_METHOD(profileSet:(NSDictionary *)property) {
  [AnalysysAgent profileSet:property];
}

/**
 设置用户固有属性
 
 React-Native示例：
 RNAnalysysAgentModule.profileSetOnce({"birthday":"1995-10-01"});
 
 @param property 属性信息
 */
RCT_EXPORT_METHOD(profileSetOnce:(NSDictionary *)property) {
  [AnalysysAgent profileSetOnce:property];
}

/**
 设置用户属性相对变化值
 
 React-Native示例：
 RNAnalysysAgentModule.profileIncrement({"gameLevel": 1});
 
 @param property 属性信息
 */
RCT_EXPORT_METHOD(profileIncrement:(NSDictionary *)property) {
  [AnalysysAgent profileIncrement:property];
}

/**
 增加列表类型的属性
 
 React-Native示例：
 RNAnalysysAgentModule.profileAppend({"Hobby":"Football", "Sports":"Run"});
 
 @param property 属性信息
 */
RCT_EXPORT_METHOD(profileAppend:(NSDictionary *)property) {
  [AnalysysAgent profileAppend:property];
}

/**
 删除某个用户属性
 
 React-Native示例：
 RNAnalysysAgentModule.profileUnset("Hobby");
 
 @param property 属性名称
 */
RCT_EXPORT_METHOD(profileUnset:(NSString *)propertyName) {
  [AnalysysAgent profileUnset:propertyName];
}

/**
 删除当前用户的所有属性
 
 React-Native示例：
 RNAnalysysAgentModule.profileDelete();
 */
RCT_EXPORT_METHOD(profileDelete) {
  [AnalysysAgent profileDelete];
}

/**
 获取预置属性
 
 React-Native示例：
 let superProperties = RNAnalysysAgentModule.getPresetProperties()
 */
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getPresetProperties) {
  return [AnalysysAgent getPresetProperties];
}


#pragma mark *** 清除本地设置 ***

/**
 清除本地设置（distinctID、aliasID、superProperties）
 
 React-Native示例：
 RNAnalysysAgentModule.reset()
 */
RCT_EXPORT_METHOD(reset) {
  [AnalysysAgent reset];
}





@end





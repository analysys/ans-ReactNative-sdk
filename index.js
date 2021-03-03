import { NativeModules } from 'react-native';

const { RNAnalysysAgentModule } = NativeModules;


//pragma mark *** 基本配置 ***

/**
 * SDK版本信息
 */
function SDKVersion () {
  if (RNAnalysysAgentModule && RNAnalysysAgentModule.SDKVersion) {
    return new Promise(function (resolve, reject) {
      RNAnalysysAgentModule.SDKVersion().then(
        (result) => {
          resolve(result);
        }
      ).catch((msg, error) => {
        reject(msg, error);
      });
    }
    )
  };
}

/**
 * 设置数据网络上传策略
 * @param networkType 网络类型，类型 枚举
 *       networkNONE 无网络
 *       networkWWAN 移动网络
 *       networkWIFI wifi网络
 *       networkALL 不指定网络
 * 如：RNAnalysysAgentModule.setUploadNetworkType(RNAnalysysAgentModule.networkALL)
 */
function setUploadNetworkType (networkType) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.setUploadNetworkType && RNAnalysysAgentModule.setUploadNetworkType(networkType);
}

/**
 * 清除本地所有已缓存数据
 */
function cleanDBCache () {
  RNAnalysysAgentModule && RNAnalysysAgentModule.cleanDBCache && RNAnalysysAgentModule.cleanDBCache();
}

/**
 * 手动上传本地数据
 */
function flush () {
  RNAnalysysAgentModule && RNAnalysysAgentModule.flush && RNAnalysysAgentModule.flush();
}

/**
 * 自动采集页面黑名单
 * @param pageNames 页面名称集合，类型 []
 */
function setPageViewBlackListByPages (pageNames) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.setPageViewBlackListByPages && RNAnalysysAgentModule.setPageViewBlackListByPages(pageNames);
}


//pragma mark *** 事件跟踪 ***

/**
 * 页面跟踪
 * @param pageName 页面标识，类型 String
 * @param properties 页面属性信息，类型 {}
 */
function pageViewWithArgs (pageName, properties) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.pageViewWithArgs && RNAnalysysAgentModule.pageViewWithArgs(pageName, properties);
}

/**
 * 页面跟踪
 * @param pageName 页面标识，类型 String
 */
function pageView (pageName) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.pageView && RNAnalysysAgentModule.pageView(pageName);
}

/**
 * 追踪事件
 * @param event 事件名称，类型 String
 * @param properties 事件属性，类型 {}
 */
function trackWithArgs (event, properties) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.trackWithArgs && RNAnalysysAgentModule.trackWithArgs(event, properties);
}

/**
 * 追踪事件
 * @param event 事件名称，类型 String
 */
function track (event) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.track && RNAnalysysAgentModule.track(event);
}


//#pragma mark *** 通用属性 ***

/**
 * 注册单个通用属性
 * @param superPropertyName 属性名称，类型 String
 * @param superPropertyValue 属性值 String/Number/Boolean/JSON/内部元素为String的Array；若为字符串，则取值长度 1 - 255字符；若为 Array 或 JSON，则最多包含 100条，且 key 约束条件与属性名称一致，value 取值长度 1 - 255字符
 */
function registerSuperProperty (superPropertyName, superPropertyValue) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.registerSuperProperty && RNAnalysysAgentModule.registerSuperProperty(superPropertyName, superPropertyValue);
}

/**
 * 注册多个通用属性
 * @param superProperties 属性信息，类型 {}
 */
function registerSuperProperties (superProperties) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.registerSuperProperties && RNAnalysysAgentModule.registerSuperProperties(superProperties);
}

/**
 * 删除单个通用属性
 * @param superPropertyName 通用属性名称，类型 String
 */
function unRegisterSuperProperty (superPropertyName) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.unRegisterSuperProperty && RNAnalysysAgentModule.unRegisterSuperProperty(superPropertyName);
}

/**
 * 清除所有通用属性
 */
function clearSuperProperties () {
  RNAnalysysAgentModule && RNAnalysysAgentModule.clearSuperProperties && RNAnalysysAgentModule.clearSuperProperties();
}

/**
 * 获取某个通用属性值
 * @param superPropertyName 属性key值，类型 String
 */
function getSuperProperty (superPropertyName) {
  if (RNAnalysysAgentModule && RNAnalysysAgentModule.getSuperProperty) {
    return new Promise(function (resolve, reject) {
      RNAnalysysAgentModule.getSuperProperty(superPropertyName).then(
        (result) => {
          resolve(result);
        }
      ).catch((msg, error) => {
        reject(msg, error);
      });
    }
    )
  };
}

/**
 * 获取已注册通用属性
 */
function getSuperProperties () {
  if (RNAnalysysAgentModule && RNAnalysysAgentModule.getSuperProperties) {
    return new Promise(function (resolve, reject) {
      RNAnalysysAgentModule.getSuperProperties().then(
        (result) => {
          resolve(result);
        }
      ).catch((msg, error) => {
        reject(msg, error);
      });
    }
    )
  };
}

//#pragma mark *** 用户属性 ***

/**
 * 用户ID设置，长度大于0且小于255字符
 * @param distinctId 身份标识，类型 String
 */
function identify (distinctId) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.identify && RNAnalysysAgentModule.identify(distinctId);
}

/** 
 * 用户关联，长度大于0且小于255字符
 * @param aliasId 关联的用户ID，类型 String
 */
function alias (aliasId) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.alias && RNAnalysysAgentModule.alias(aliasId);
}

/**
 * 获取用户通过identify接口设置或自动生成的id
 */
function getDistinctId () {
  if (RNAnalysysAgentModule && RNAnalysysAgentModule.getDistinctId) {
    return new Promise(function (resolve, reject) {
      RNAnalysysAgentModule.getDistinctId().then(
        (result) => {
          resolve(result);
        }
      ).catch((msg, error) => {
        reject(msg, error);
      });
    }
    )
  };
}


/**
 * 设置用户属性
 * @param property 属性信息，类型 {}
 */
function profileSet (property) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.profileSet && RNAnalysysAgentModule.profileSet(property);
}

/**
 * 设置用户固有属性
 * @param property 属性信息，类型 {}
 */
function profileSetOnce (property) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.profileSetOnce && RNAnalysysAgentModule.profileSetOnce(property);
}

/**
 * 设置用户属性相对变化值
 * @param property 属性信息，类型 {}，value必须为Number类型
 */
function profileIncrement (property) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.profileIncrement && RNAnalysysAgentModule.profileIncrement(property);
}

/** 
 * 增加列表类型的属性
 * @param property 属性信息，类型 {}
 */
function profileAppend (property) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.profileAppend && RNAnalysysAgentModule.profileAppend(property);
}

/**
 * 删除某个用户属性
 * @param propertyName key值，类型 String
 */
function profileUnset (propertyName) {
  RNAnalysysAgentModule && RNAnalysysAgentModule.profileUnset && RNAnalysysAgentModule.profileUnset(propertyName);
}

/**
 * 删除当前用户的所有属性
 */
function profileDelete () {
  RNAnalysysAgentModule && RNAnalysysAgentModule.profileDelete && RNAnalysysAgentModule.profileDelete();
}

/**
 * 获取预置属性
 **/
function getPresetProperties () {
  if (RNAnalysysAgentModule && RNAnalysysAgentModule.getPresetProperties) {
    return new Promise(function (resolve, reject) {
      RNAnalysysAgentModule.getPresetProperties().then(
        (result) => {
          resolve(result);
        }
      ).catch((msg, error) => {
        reject(msg, error);
      });
    }
    )
  };
}


//#pragma mark *** 清除本地设置 ***

/**
 * 清除本地设置（distinctID、aliasID、superProperties）
 */
function reset () {
  RNAnalysysAgentModule && RNAnalysysAgentModule.reset && RNAnalysysAgentModule.reset();
}



export default {
  SDKVersion,
  setUploadNetworkType,
  cleanDBCache,
  flush,
  setPageViewBlackListByPages,
  pageViewWithArgs,
  pageView,
  trackWithArgs,
  track,
  registerSuperProperty,
  registerSuperProperties,
  unRegisterSuperProperty,
  clearSuperProperties,
  getSuperProperty,
  getSuperProperties,
  identify,
  alias,
  getDistinctId,
  profileSet,
  profileSetOnce,
  profileIncrement,
  profileAppend,
  profileUnset,
  profileDelete,
  getPresetProperties,
  reset,
  analysys: RNAnalysysAgentModule
};


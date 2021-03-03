declare type PropType = string | number | boolean | Array<string>;

declare type PropObjType = { [key: string]: PropertiesType }

declare type IncrementPropObjType = { [key: string]: number }

declare type AppendPropObjType = { [key: string]: Array<string> }

declare module 'react-native-analysys' {
    /**
     * SDK版本信息
     */
    export function SDKVersion (): Promise<string>;

    /**
     * 
     * @param networkType 网络类型，类型 枚举
     *       networkNONE 无网络
     *       networkWWAN 移动网络
     *       networkWIFI wifi网络
     *       networkALL 不指定网络
     */
    export function setUploadNetworkType (networkType: string): void;

    /**
    * 清除本地所有已缓存数据
    */
    export function cleanDBCache (): void;

    /**
     * 手动上传本地数据
     */
    export function flush (): void;

    /**
     * 自动采集页面黑名单
     * @param pageNames 页面名称集合
     */
    export function setPageViewBlackListByPages (pageNames: Array<string>): void;


    /**
     * 页面跟踪
     * @param pageName 页面标识
     * @param properties 页面属性信息
     */
    export function pageViewWithArgs (pageName: string, properties?: PropObjType): void;

    /**
     * 页面跟踪
     * @param pageName 页面标识，类型 String
     */
    export function pageView (pageName: string): void;

    /**
     * 追踪事件
     *
     * @param event 事件名称
     * @param properties 事件属性
     */
    export function track (event: string): void;

    /**
     * 追踪事件
     * @param event 事件名称
     * @param properties 事件属性
     */
    export function trackWithArgs (event: string, properties?: PropObjType): void;

    /**
     * 注册单个通用属性
     * @param superPropertyName 
     * @param superPropertyValue 
     */
    export function registerSuperProperty (superPropertyName: string, superPropertyValue: PropType): void;


    /**
     * 注册多个通用属性
     * @param superProperties 属性信息
     */
    export function registerSuperProperties (superProperties: PropObjType): void;

    /**
     * 删除单个通用属性
     * @param superPropertyName 通用属性名称
     */
    export function unRegisterSuperProperty (superPropertyName: string): void;

    /**
     * 清除所有通用属性
     */
    export function clearSuperProperties (): void;

    /**
     * 获取某个通用属性值
     * @param superPropertyName 属性key值
     * @return 对应的通用属性
     */
    export function getSuperProperty (superPropertyName: string): Promise<PropType>;

    /**
     * 获取所有已注册通用属性
     */
    export function getSuperProperties (): Promise<PropObjType>;

    /**
     * 用户ID设置，长度大于0且小于255字符
     * @param distinctId 身份标识
     */
    export function identify (distinctId: string): void;

    /** 
     * 用户关联，长度大于0且小于255字符
     * @param aliasId 关联的用户ID，类型 String
     */
    export function alias (aliasId: string): void;

    /**
     * 获取用户通过identify接口设置或自动生成的id
     */
    export function getDistinctId (): Promise<string>;

    /**
     * 设置用户属性
     *
     * @param profile 用户属性
     */
    export function profileSet (profile: PropObjType): void

    /**
     * 设置用户固有属性
     *
     * @param profile 用户属性
     */
    export function profileSetOnce (profile: PropObjType): void

    /**
     * 设置用户属性相对变化值
     *
     * @param profile 用户属性
     */
    export function profileIncrement (profile: IncrementPropObjType): void

    /**
     * 增加列表类型的属性
     *
     * @param profile 用户属性
     */
    export function profileAppend (profile: AppendPropObjType): void

    /**
     * 删除某个用户属性
     *
     * @param propertyName 用户属性名称
     */
    export function profileUnset (propertyName: string): void

    /**
     * 删除当前用户的所有属性
     *
     */
    export function profileDelete (): void

    /**
     * 获取预置属性
     *
     */
    export function getPresetProperties (): Promise<PropObjType>;

    /**
     * 清除本地设置
     *
     */
    export function reset (): void;

}
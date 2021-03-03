# Analysys ReactNative SDK [![License](https://img.shields.io/github/license/analysys/react-native-analysys.svg)](https://github.com/analysys/react-native-analysys/blob/master/LICENSE) [![GitHub release](https://img.shields.io/github/release/analysys/react-native-analysys.svg)](https://github.com/analysys/react-native-analysys/releases)


========

This is the official ReactNative SDK for Analysys.

# ReactNative SDK 基础说明：

react-native-analysys SDK，封装了易观 Android & iOS SDK 常用 API ，使用此模块，可以在 React Native 开发的 App 中完成埋点的统计上报。

## 快速集成
如果您是第一次使用易观方舟产品，可以通过阅读本文快速了解此产品

## npm模块安装

### 模块安装

```base
npm install react-native-analysys
```

### 链接SDK RN模块
注意：React Native 0.60 及以上版本会 autolinking，不需要执行下边的 react-native link 命令。

```base
react-native link react-native-analysys
```

### 配置 package.json
在 React Native 项目里的 package.json 文件的 script 模块里增加如下配置

```base
"scripts": {
      "postinstall": "node node_modules/react-native-analysys/ansHook.js -run"
}
```
### 执行 npm  命令

```base
npm install
```

## 详细文档请参考：[https://docs.analysys.cn/integration/sdk/reactnative-sdk](https://docs.analysys.cn/integration/sdk/reactnative-sdk)

## License

[gpl-3.0](https://www.gnu.org/licenses/gpl-3.0.txt)

# 讨论
* 微信号：nlfxwz
* 钉钉群：30099866
* 邮箱：nielifeng@analysys.com.cn
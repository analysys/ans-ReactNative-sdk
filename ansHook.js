#! node option
// 系统变量
var path = require("path"),
    fs = require("fs"),
    dir = path.resolve(__dirname, "..");
var version = "4.5.1"

var reactNativeRenderer6X = [
    dir + "/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js",
    dir + "/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-dev.js",
    dir + "/react-native/Libraries/Renderer/oss/ReactNativeRenderer-dev.js",
    dir + "/react-native/Libraries/Renderer/oss/ReactNativeRenderer-prod.js",
    dir + "/react-native/Libraries/Renderer/ReactNativeRenderer-dev.js",
    dir + "/react-native/Libraries/Renderer/ReactNativeRenderer-prod.js",
    dir + "/react-native/Libraries/Renderer/ReactNativeFiber-prod.js",
    dir + "/react-native/Libraries/Renderer/ReactNativeFiber-dev.js",
    dir + "/react-native/Libraries/Renderer/src/renderers/shared/shared/event/EventPluginHub.js", // 0.45
    dir + "/react-native/Libraries/Renderer/src/renderers/native/ReactNativeComponentTree.js",
    dir + "/react-native/Libraries/Renderer/src/renderers/shared/stack/event/EventPluginHub.js", // 0.42
    dir + "/react-native/Libraries/ReactNative/UIManagerStatTracker.js", // 0.37
    dir + "/react-native/Libraries/Components/Touchable/Touchable.js",
    dir + "/react-native/Libraries/vendor/react_contrib/interactions/Touchable/Touchable.js", //
    dir + "/react-native/Libraries/ReactNative/ReactNativeBaseComponent.js" // 0.11
]
var reactNavigationPath = [
    dir + '/@react-navigation/core/src/BaseNavigationContainer.tsx'
]
var ansClickHookCode = `
    (function(){
    try{
        var ReactNative = require('react-native');
        var isActiveEvent = false
        var ansNativeTag = stateNode._nativeTag
        if (registrationName === 'onStartShouldSetResponderCapture' && ReactNative.ansModelEventMap &&ReactNative.ansModelEventMap[ansNativeTag]&&ReactNative.ansModelEventMap[ansNativeTag]['isClick'] === true) {
            var ReactNative = require('react-native');
            var ansModule = ReactNative.NativeModules.RNAnalysysAgentModule
            ansModule && ansModule.viewClicked && ansModule.viewClicked(ansNativeTag);
        }

    }catch(e){
    }
})()
    /* ANALYSYSAGENT HOOK */
    `
var ansEventMapHookCode = `
    (function(){
        try {
            var ReactNative = require('react-native');
            if(!ReactNative['ansModelEventMap']){
                ReactNative.ansModelEventMap = {}
                ReactNative.ansScreenTimer = null
            }
            var ansModelEventMap = ReactNative.ansModelEventMap
            var ansScreenTimer = ReactNative.ansScreenTimer
            var ansModule = ReactNative.NativeModules.RNAnalysysAgentModule
            var ansTag = tag
            var eventStatus = false
            if(props && typeof props === 'object'){
                if( props.hasOwnProperty('onPress') || props.hasOwnProperty('onClick')||props.hasOwnProperty('onRNCSliderValueChange') || props.hasOwnProperty('onChange') ){
                    eventStatus = true
                }
            }

            try{
                if (props.pendingProps.children.type.propTypes.hasOwnProperty('onPress')){
                    eventStatus = true
                }
            }catch (e) {}
            try{
                if(props.return.type.propTypes.hasOwnProperty('onPress')||props.return.type.propTypes.hasOwnProperty('onClick')||props.return.type.propTypes.hasOwnProperty('onSelect')){
                    eventStatus = true
                }
            }catch (e) {}
            try{
                if(props.pendingProps.hasOwnProperty('onClick')||props.pendingProps.hasOwnProperty('onPress')){
                    eventStatus = true
                }
            }catch (e) {}
            try{
                var InstanceTag = getInstanceFromTag(ansTag)
                var ansInstance = InstanceTag.return.return._debugOwner.pendingProps
                if(ansInstance.hasOwnProperty('onPress')||ansInstance.hasOwnProperty('onClick')||ansInstance.hasOwnProperty('onSelect')){
                    eventStatus = true
                }
            }catch(e){

            }
            if(!ansModelEventMap[ansTag]||(ansModelEventMap[ansTag]&&!ansModelEventMap[ansTag]['isClick'])){
                ansModelEventMap[ansTag] = {
                    'isClick': eventStatus
                };
            }
            clearTimeout(ReactNative.ansScreenTimer)
            ReactNative.ansScreenTimer  = setTimeout(function(){
                try{
                    clearTimeout(ReactNative.ansScreenTimer)
                    ansModule.setViewClickableMap(Object.assign({}, ansModelEventMap))
                }catch(e){
                }
            },300)
        } catch (e) {
        }
      })()
      /* ANALYSYSAGENT HOOK */
`
var ansNavigation5HookCode = `
    (function(){
    try{
        function ansGetParams (state: any): any {
            if (!state) {
                return {};
            }
            var ansRoute = state.routes[state.index];
            var params = ansRoute.params||{};
            if (ansRoute.state) {
                var stateParams = ansGetParams(ansRoute.state);
                if (stateParams) {
                    params = stateParams||{};
                }
            }
            return params||{};
        }
        function ansGetPageViewParam (ansRootState: any): void {
            let ansParam = {}
            if (ansRootState) {
                let ansRoute = ansRootState.routes[ansRootState.index];
                if (ansRoute.name === 'Root') {
                    return ansGetPageViewParam(ansRoute.state)
                }
                let ansParam = ansGetParams(ansRootState);
                while (ansRootState.routes[ansRootState.index].state !== undefined) {
                    ansRootState = ansRootState.routes[ansRootState.index].state as NavigationState;
                }
                var ansUrl = ansRootState.routes[ansRootState.index].name;
                ansParam['$url'] = ansUrl
                return ansParam
            } else {
                return{}
            }
        }
        var ansPageviewParam = ansGetPageViewParam(getRootState())
        var ReactNative = require('react-native');
        var ansModule = ReactNative.NativeModules.RNAnalysysAgentModule
        ansModule && ansModule.pageViewWithArgsAuto && ansModule.pageViewWithArgsAuto(ansPageviewParam.$url,ansPageviewParam)
    }catch(e){}
})()
	/* ANALYSYSAGENT HOOK */
`
var ansCheckClickCode = [
    {
        code: "inst = getFiberCurrentPropsFromNode(inst);",
        rep: ["inst", "inst"],
        tag: ["stateNode", "props"]
    },
    {
        code: "var props = getFiberCurrentPropsFromNode(stateNode);",
        rep: [],
        tag: []
    },
    {
        code: "var props = getFiberCurrentPropsFromNode(listener);",
        rep: ["listener"],
        tag: ["stateNode"]
    },
    {
        code: "var props = EventPluginUtils_1.getFiberCurrentPropsFromNode(stateNode);",
        rep: [],
        tag: []
    },
    {
        code: "const props = EventPluginUtils.getFiberCurrentPropsFromNode(stateNode);",
        rep: [],
        tag: []

    },
    {
        code: `const props = EventPluginUtils.getFiberCurrentPropsFromNode(
        inst.stateNode
      );`,
        rep: ["inst.stateNode"],
        tag: ["stateNode"]
    },
    {
        code: `var bankForRegistrationName = listenerBank[registrationName];
    var key = getDictionaryKey(inst);`,
        rep: ["inst", "bankForRegistrationName[key]"],
        tag: ["stateNode", "props"]
    },
    {
        code: "this.touchableHandlePress(e);",
        rep: ["ReactNative.findNodeHandle(this)", "'onTouchEnd'", "this.props"],
        tag: ["stateNode._nativeTag", "registrationName", "props"]
    }
]
var ansCheckEventMapCode = [
    {
        code: "instanceCache.set(current, workInProgress);",
        rep: ["current", "workInProgress"],
        tag: ["tag", "props"]
    },
    {
        code: "instanceCache.set(rootContainerInstance, workInProgress);",
        rep: ["rootContainerInstance", "workInProgress"],
        tag: ["tag", "props"]
    },
    {
        code: "instanceCache.set(tag, internalInstanceHandle);",
        rep: ["internalInstanceHandle"],
        tag: ["props"]
    }, {
        code: "instanceCache.set(rootContainerInstance, current$$1);",
        rep: ["rootContainerInstance", "current$$$1"],
        tag: ["tag", "props"]
    }, {
        code: "instanceCache.set(tag, hostInst);",
        rep: ["hostInst"],
        tag: ["props"]
    },
    {
        code: "instanceProps.set(tag, props);",
        rep: [],
        tag: []
    },
    {
        code: "instanceCache.set(renderExpirationTime$jscomp$0, current$$1);",
        rep: ["renderExpirationTime$jscomp\$0", "current$$$1"],
        tag: ["tag", "props"]
    },
    {
        code: "instanceCache[tag] = internalInstanceHandle;",
        rep: ["internalInstanceHandle"],
        tag: ["props"]
    },
    {
        code: "instanceCache[type] = current$$1;",
        rep: ["type", "current$$$1"],
        tag: ["tag", "props"]
    },
    {
        code: "instanceCache[tag] = hostInst;",
        rep: ["hostInst"],
        tag: ["props"]
    },
    {
        code: "instanceCache[tag] = nativeInst;",
        rep: ["nativeInst"],
        tag: ["props"]
    },
    {

        code: "createViewOrig(tag, className, rootTag, props);",
        rep: ["tag", "this\.props",],
        tag: ["stateNode._nativeTag", "getInstanceFromTag\(ansTag\)"]
    },
    {
        code: "updateViewOrig(tag, className, props);",
        rep: ["tag", "this\.props",],
        tag: ["stateNode._nativeTag", "getInstanceFromTag\(ansTag\)"]
    },
    {
        code: "var nativeTopRootID = ReactNativeTagHandles.getNativeTopRootIDFromNodeID(rootID);",
        rep: ["tag", "this._currentElement.props",],
        tag: ["stateNode._nativeTag", 'getInstanceFromTag\(ansTag\)']
    },
    {
        code: "RCTUIManager.createView(tag, this.viewConfig.uiViewClassName, updatePayload);",
        rep: ["tag", "this._currentElement.props",],
        tag: ["stateNode._nativeTag", 'getInstanceFromTag\(ansTag\)']
    }
]
var ansNavigationCode = [
    {
        code: `if (!isFirstMountRef.current && onStateChangeRef.current) {
        onStateChangeRef.current(getRootState());
      }`,
        rep: [],
        tag: []
    }
]
var substringCode = function (fileContent, scriptStr, hookCode) {
    // 获取 hook 的代码插入的位置
    var hookIndex = fileContent.indexOf(scriptStr);
    // 判断文件是否异常，不存在 touchableHandlePress 方法，导致无法 hook 点击事件
    if (hookIndex == -1) {
        var errText = `Can't not find ${scriptStr}  function`
        throw new Error(`Can't not find ${scriptStr}  function`);
    };
    var codeList = fileContent.split(scriptStr)
    var hookedContent = ''
    for (var i = 0; i < codeList.length; i++) {
        if (i < codeList.length - 1) {
            hookedContent += codeList[i] + scriptStr + "\n" + hookCode
        } else {
            hookedContent += codeList[i]
        }
    }
    // 插入 hook 代码
    // var hookedContent = `${fileContent.substring(0, hookIndex + scriptStr.length)} \n${hookCode} \n${fileContent.substring(hookIndex + scriptStr.length)} `;
    return hookedContent
}
var firstSubstringCode = function (fileContent, scriptStr, hookCode) {
    // 获取 hook 的代码插入的位置
    var hookIndex = fileContent.indexOf(scriptStr);
    // 判断文件是否异常，不存在 touchableHandlePress 方法，导致无法 hook 点击事件
    if (hookIndex == -1) {
        throw "Can't not find updateFiberProps function";
    };
    // 插入 hook 代码
    var hookedContent = `${fileContent.substring(0, hookIndex)} \n${hookCode} \n${scriptStr} ${fileContent.substring(hookIndex + scriptStr.length)} `;
    return hookedContent
}
var ansReplaceCode = function (fileCode, replaceCode, hookCode) {
    var code = replaceCode.code
    var req = replaceCode.rep
    var tag = replaceCode.tag
    if (fileCode.indexOf(code) > -1) {
        if (req.length > 0) {
            for (var i = 0; i < req.length; i++) {
                // var reg = new RegExp(tag[i], 'g')
                // hookCode = hookCode.replace(reg, req[i])
                if (hookCode.indexOf(tag[i]) > -1) {
                    var codeList = hookCode.split(tag[i])
                    var hookedContent = ''
                    for (var y = 0; y < codeList.length; y++) {
                        if (y < codeList.length - 1) {
                            hookedContent += codeList[y] + req[i]
                        } else {
                            hookedContent += codeList[y]
                        }
                    }
                    hookCode = hookedContent
                }
            }
        }

        fileCode = substringCode(fileCode, code, hookCode)
    }
    return fileCode
}
var ansClickHookFN = function (filePaths) {

    filePaths.forEach(function (filePath) {
        if (fs.existsSync(filePath)) {
            // 读取文件内容
            var fileContent = fs.readFileSync(filePath, 'utf8');
            // 已经 hook 过了，不需要再次 hook
            if (fileContent.indexOf('ANALYSYSAGENT HOOK') > -1) {
                return;
            }
            for (var i = 0; i < ansCheckClickCode.length; i++) {
                fileContent = ansReplaceCode(fileContent, ansCheckClickCode[i], ansClickHookCode)
            }
            for (var y = 0; y < ansCheckEventMapCode.length; y++) {
                fileContent = ansReplaceCode(fileContent, ansCheckEventMapCode[y], ansEventMapHookCode)
            }
            // 备份 filePath 源文件
            fs.renameSync(filePath, `${filePath}_analysysagent_backup`);
            // 重写 filePath 文件
            fs.writeFileSync(filePath, fileContent, 'utf8');
            console.log(`found and modify file : ${filePath} `);
        }
    })
}
var ansNavigationHookFN = function (filePaths, checkList, code) {
    filePaths.forEach(function (filePath) {
        if (fs.existsSync(filePath)) {
            // 读取文件内容
            var fileContent = fs.readFileSync(filePath, 'utf8');
            // 已经 hook 过了，不需要再次 hook
            if (fileContent.indexOf('ANALYSYSAGENT HOOK') > -1) {
                return;
            }
            for (var i = 0; i < checkList.length; i++) {
                fileContent = ansReplaceCode(fileContent, checkList[i], code)
            }
            // 备份 filePath 源文件
            fs.renameSync(filePath, `${filePath}_analysysagent_backup`);
            // 重写 filePath 文件
            fs.writeFileSync(filePath, fileContent, 'utf8');
            console.log(`found and modify file : ${filePath} `);
        }
    })
}
var analysysAgentResetFN = function (resetFilePaths) {
    resetFilePaths.forEach(function (resetFilePath) {

        // 判断需要被恢复的文件是否存在
        if (!fs.existsSync(resetFilePath)) {
            return;
        }
        var fileContent = fs.readFileSync(resetFilePath, 'utf8');
        // 未被 hook 过代码，不需要处理
        if (fileContent.indexOf('ANALYSYSAGENT HOOK') == -1) {
            return;
        }
        // 检查备份文件是否存在
        var backFilePath = `${resetFilePath}_analysysagent_backup`;
        if (!fs.existsSync(backFilePath)) {
            throw `File: ${backFilePath} not found, Please rm - rf node_modules and npm install again`;
        }
        // 将备份文件重命名恢复 + 自动覆盖被 hook 过的同名 Touchable.js 文件
        fs.renameSync(backFilePath, resetFilePath);
        console.log(`found and reset file: ${resetFilePath} `);
    })
};
// 全部 hook 文件恢复
var resetAllAnalysysAgentFN = function () {
    analysysAgentResetFN(reactNativeRenderer6X)
    analysysAgentResetFN(reactNavigationPath)
    // analysysAgentResetFN(reactNativeRenderer5X)
}
var allAnalysysAgentHookFN = function () {
    ansClickHookFN(reactNativeRenderer6X)
    ansNavigationHookFN(reactNavigationPath, ansNavigationCode, ansNavigation5HookCode)
    // ansClickHookFN(reactNativeRenderer5X, 5)
}
switch (process.argv[2]) {
    case '-run':
        resetAllAnalysysAgentFN();
        allAnalysysAgentHookFN();
        break;
    case '-reset':
        resetAllAnalysysAgentFN();
        break;
    default:
        console.log('can not find this options: ' + process.argv[2]);
}
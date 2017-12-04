/**
 * 保存文件，可以保存流
 * 用于导出和canvas转图片
 *
 * 具体使用file-saver模块
 *
 * 原理
 * 如果是ie10+，那就使用ie自带的navigator.msSaveOrOpenBlob方法
 * 不然就创建dataUrl，然后创建一个标签，去模拟点击这个标签，就下载了
 */
"use strict";
// IE <10 is explicitly unsupported
//ie10一下不支持
var saveAs = (function () {
    var doc = window.document,
        // only get URL when necessary in case Blob.js hasn't overridden it yet
        get_URL = function () {
            return window.URL || window.webkitURL || window;
        },
        //createElementNS，创建带有命名空间的节点
        save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        can_use_save_link = "download" in save_link,
        //点击
        click = function (node) {
            var event = new MouseEvent("click");
            node.dispatchEvent(event);
        },
        is_safari = /constructor/i.test(window.HTMLElement) || window.safari,
        is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
        //抛错误
        throw_outside = function (ex) {
            (window.setImmediate || window.setTimeout)(function () {
                throw ex;
            }, 0);
        },
        force_saveable_type = "application/octet-stream",
        // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
        arbitrary_revoke_timeout = 1000 * 40,// in ms
        //撤回，如果超时就撤回
        revoke = function (file) {
            var revoker = function () {
                if (typeof file === "string") { // file is an object URL
                    get_URL().revokeObjectURL(file);
                } else { // file is a File
                    file.remove();
                }
            };
            //过了超时事件就撤回
            setTimeout(revoker, arbitrary_revoke_timeout);
        },
        //执行事件
        dispatch = function (filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                //获得监听的事件
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        //执行事件
                        listener.call(filesaver, event || filesaver);
                    } catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        },
        //格式化blob
        auto_bom = function (blob) {
            // prepend BOM for UTF-8 XML and text/* types (including HTML)
            // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
            if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
            }
            return blob;
        },
        //TODO 文件保存对象
        FileSaver = function (blob, name, no_auto_bom) {
            //格式化blob
            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            // First try a.download, then web filesystem, then object URLs
            var filesaver = this,
                type = blob.type,
                force = type === force_saveable_type,
                object_url,
                //执行文件对象的几个回调
                dispatch_all = function () {
                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                },
                // on any filesys errors revert to saving with object URLs
                fs_error = function () {
                    if ((is_chrome_ios || (force && is_safari)) && window.FileReader) {
                        // Safari doesn't allow downloading of blob urls
                        var reader = new FileReader();
                        reader.onloadend = function () {
                            var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                            var popup = window.open(url, '_blank');
                            if (!popup) window.location.href = url;
                            url = undefined; // release reference before dispatching
                            filesaver.readyState = filesaver.DONE;
                            dispatch_all();
                        };
                        //TODO 主要是用了这个api
                        reader.readAsDataURL(blob);
                        filesaver.readyState = filesaver.INIT;
                        return;
                    }
                    //TODO 原理就是打开一个dataUrl
                    // don't create more object URLs than needed
                    if (!object_url) {
                        object_url = get_URL().createObjectURL(blob);
                    }
                    if (force) {
                        window.location.href = object_url;
                    } else {
                        var opened = window.open(object_url, "_blank");
                        if (!opened) {
                            // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                            window.location.href = object_url;
                        }
                    }
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                    revoke(object_url);
                };
            //TODO 真正开始
            filesaver.readyState = filesaver.INIT;
            //使用保存连接
            if (can_use_save_link) {
                //创建dataUrl
                object_url = get_URL().createObjectURL(blob);
                //模拟点击
                setTimeout(function () {
                    //创建点击链接
                    save_link.href = object_url;
                    save_link.download = name;
                    //模拟点击
                    click(save_link);
                    //执行各个阶段的回调
                    dispatch_all();
                    //如果超时就撤回
                    revoke(object_url);
                    //状态修改为完成
                    filesaver.readyState = filesaver.DONE;
                });
                return;
            }
            //如果a标签不能下载
            fs_error();
        },
        FS_proto = FileSaver.prototype,
        saveAs = function (blob, name, no_auto_bom) {
            return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
        };
    // IE 10+ (native saveAs)
    //TODO ie10以上有自带的保存api
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function (blob, name, no_auto_bom) {
            //hook名字
            name = name || blob.name || "download";
            if (!no_auto_bom) {
                //格式化blob
                blob = auto_bom(blob);
            }
            //TODO navigator.msSaveOrOpenBlob
            return navigator.msSaveOrOpenBlob(blob, name);
        };
    }

    FS_proto.abort = function () {
    };
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
    return saveAs;
})();

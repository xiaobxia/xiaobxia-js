
(function (factory) {
	//用于兼容其他规范和库
	if (typeof define === 'function' && define.amd) {
		//用于Require.js加载一个jQuery插件
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		//全局模式
		// Browser globals
		factory(jQuery);
	}

//这当中的config.raw和config.json是外部接口，用于在外部关闭和打开
}(function ($) {
	//用于匹配+号的正则表达式
	var pluses = /\+/g;
	//编码的函数
	function encode(s) {
		//验证config.raw是否打开，如果存在直接返回s，不存在就编码s再返回
		return config.raw ? s : encodeURIComponent(s);
	}
	//解码函数
	function decode(s) {
		//验证config.raw是否打开，如果存在直接返回s，不存在就解码s再返回
		return config.raw ? s : decodeURIComponent(s);
	}
	//把传入值，序列化为字符串
	function stringifyCookieValue(value) {
		//先验证config.json是否打开，如果是就用json的序列化函数，不是就string函数，然后进行编码
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	//解析传入的字符串
	function parseCookieValue(s) {

		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {

			//把传入值中的+号用空格代替，然后解码
			s = decodeURIComponent(s.replace(pluses, ' '));
			//验证config.json是否打开，如果是就把它解析再返回，不是就直接返回
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		//验证config.raw是否打开
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {


		//判断值不为空，且不为函数
		if (value !== undefined && !$.isFunction(value)) {
			//对options进行扩展，添加进默认配置
			options = $.extend({}, config.defaults, options);
			//如果过期时间是一个number
			if (typeof options.expires === 'number') {
				//设置为时间对象
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}
			//把数组连接成字符串，用来作为cookie
			return (document.cookie = [
				//键
				encode(key),
				//等号
				'=',
				//值
				stringifyCookieValue(value),
				//设置过期时间
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				//设置路径
				options.path    ? '; path=' + options.path : '',
				//设置域
				options.domain  ? '; domain=' + options.domain : '',
				//设置安全标志
				options.secure  ? '; secure' : ''
			].join(''));
		}


		var result = key ? undefined : {};

		//得到存储的cookie，通过; 号分割
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		//遍历每一项
		for (var i = 0, l = cookies.length; i < l; i++) {
			//把当前项用=号分割
			var parts = cookies[i].split('=');
			//得到当前项的键，并解码，这时parts成为值
			var name = decode(parts.shift());
			//
			var cookie = parts.join('=');
			//如果键存在，且匹配上了
			if (key && key === name) {
				//
				result = read(cookie, value);
				break;
			}


			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	//移除cookie
	$.removeCookie = function (key, options) {
		//如要要移除项并不存在，那么返回
		if ($.cookie(key) === undefined) {
			return false;
		}

		//删除的逻辑是重新设置这个cookie，把值设为空，把过期时间设为-1
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		//返回，如果被删除了就会返回true
		return !$.cookie(key);
	};

}));

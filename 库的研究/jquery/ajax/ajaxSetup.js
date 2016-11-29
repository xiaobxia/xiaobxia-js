/**
 * 扩展ajax请求的信息，分为两个部分(默认，用户自己设置的)
 **/
var ajaxSetup= function (target, settings) {
    //如果有设置信息，就是$.ajax({})里面的设置
    return settings ?
        //target初始为{},把默认设置扩展进后，再把用户设置扩展进
        ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
        //没有用户设置，那么直接扩展进默认设置
        ajaxExtend(jQuery.ajaxSettings, target);
};
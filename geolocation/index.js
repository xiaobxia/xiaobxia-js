/**
 * Created by xiaobxia on 2018/1/21.
 */
navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
}, function (error) {
    var errorType = {
        1: '位置服务被拒绝',
        2: '获取不到位置信息',
        3: '获取性信息超时'
    };
    console.log(errorType[error.code]);
});
var $window = $(window);
var abovethetop = function(element, settings) {
    var fold;

    if (settings.container === undefined || settings.container === window) {
        fold = $window.scrollTop();
    } else {
        fold = $(settings.container).offset().top;
    }
    var bc=$(element).offset().top + settings.threshold  + $(element).height();
    return fold >= $(element).offset().top + settings.threshold  + $(element).height();
};
var settings = {
    threshold       : 0,
    failure_limit   : 0,
    event           : "scroll",
    effect          : "show",
    container       : $("#one"),
    data_attribute  : "original",
    skip_invisible  : false,
    appear          : null,
    load            : null,
    placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
};
$("#six").on("click",function () {
    var bc=abovethetop($("#four"),settings);
});

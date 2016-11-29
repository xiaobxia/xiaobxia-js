var css= function (name, value) {
    return access(this, function (elem, name, value) {
        var styles, len,
            map = {},
            i = 0;

        if (jQuery.isArray(name)) {
            styles = getStyles(elem);
            len = name.length;

            for (; i < len; i++) {
                map[name[i]] = jQuery.css(elem, name[i], false, styles);
            }

            return map;
        }

        return value !== undefined ?
            jQuery.style(elem, name, value) :
            jQuery.css(elem, name);
    }, name, value, arguments.length > 1);
};
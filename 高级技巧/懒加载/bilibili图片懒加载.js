var LazyImage = function () {
    function B(d) {
        //默认设置
        this.config = {
            //默认的视框偏差
            distance: 200,
            //默认的背景图
            defaultImg: "http://static.hdslb.com/images/v3images/img_loading.png",
            //默认的模式
            mode: "wrap"
        };
        //extend默认设置
        for (var c in this.config) {
            d && d.hasOwnProperty(c) && (this.config[c] = d[c])
        }
        this.covers = [];
        this._selector = "[data-img]";
        this.wrapper = '<div class="img-loading"></div>';
        this.init()
    }

    B.prototype.lazy = function (e, c) {
        var f = this;
        $(e).find(this._selector).each(function (d, i) {
            var h = $(i);
            "undefined" != typeof h.attr("loaded") && null != h.attr("loaded") || f.covers.push({
                element: h,
                callback: c
            })
        });
        this.show()
    };
    B.prototype.init = function () {
        var c = this;
        //监听到事件
        $(window).on("scroll.lazyimage", function () {
            //显示
            c.show()
        })
    };
    B.prototype.show = function () {
        for (var e = 0; e < this.covers.length; e++) {
            var c = this.covers[e],
                f = c.element,
                c = c.callback;
            f.attr("loaded") || ("wrap" != this.config.mode || f.parent(".img-loading").length ? "wrap" != this.config.mode && f.attr("src", this.config.defaultImg) : (f.attr("src", "http://static.hdslb.com/images/transparent.gif"), f.wrap(this.wrapper).parent().css({
                background: "#f5f5f5 url(http://static.hdslb.com/images/v3images/img_loading.png) center center no-repeat",
                height: "100%"
            })), this._inViewRange(f) && (this.load(f, c), this.covers.splice(e, 1), e--))
        }
    };
    B.prototype.load = function (i, c) {
        var o = this, n = $("<img />"), l = LoadWebp.setSrc(i.attr("data-img")), k = new Date, j = 0;
        n.on("load", function () {
            var a = 200 > new Date - k ? 0 : 200;
            o.unwrap(i);
            i.attr({src: l, "data-img": ""});
            //如果data-alt有值，把值转到alt中，并移除data-alt属性
            i.attr("data-alt") && (i.attr("alt", i.attr("data-alt")), i.removeAttr("data-alt"));
            c && "function" == typeof c && c(i);
            i.css("opacity", 0).animate({opacity: 1}, a)
        });
        n.attr("src", l);
        i.attr("alt") && (i.attr("data-alt", i.attr("alt")), i.removeAttr("alt"));
        i.attr("loaded", "loaded");
        n.error(function () {
            j++;
            2 >= j ? n.attr("src", l) : o.unwrap(i)
        })
    };
    B.prototype.unwrap = function (c) {
        "wrap" == this.config.mode && c.parent(".img-loading").length && c.unwrap(this.wrapper)
    };
    B.prototype._inViewRange = function (c) {
        return c.offset().top + c.outerHeight(!0) > $(window).scrollTop() - this.config.distance && c.offset().top < $(window).scrollTop() + $(window).height() + this.config.distance && c.offset().left + c.outerWidth(!0) >= $(window).scrollLeft() - this.config.distance && c.offset().left <= $(window).scrollLeft() + $(window).width() + this.config.distance
    };
    return B;
}();
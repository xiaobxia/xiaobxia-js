/**
 * Created by xiaobxia on 2017/7/7.
 */
//一个有
function scrollSize() {
    var outer = document.createElement('div');
    outer.className = 'el-scrollbar__wrap';
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

    var widthWithScroll = outer.offsetWidth;
    var heightWithScroll = outer.offsetHeight;
    outer.style.overflow = 'scroll';

    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    var widthNoScroll = inner.offsetWidth;
    var heightNoScroll = inner.offsetHeight;
    outer.parentNode.removeChild(outer);
    return {
        width: widthWithScroll - widthNoScroll,
        height: heightWithScroll - heightNoScroll
    };
}

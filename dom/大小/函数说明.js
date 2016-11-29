/**
 * 1. clientHeight和clientWidth是width+padding(ie下:width+padding+border)
 *
 * 2. offsetHeight和offsetWidth用width+padding+border
 *
 * 3. clientTop和clientLeft是border-top和border-left
 *
 * 4. offsetTop和offsetLeft表示该元素的在offsetHeight的大小下与（offsetParent对象）左上角的距离
 *
 * 5. offsetParent对象是指元素最近的 定位 （relative,absolute）祖先元素，
 *    递归上溯，如果没有祖先元素是定位的话，会返回null
 *
 * 6. scrollWidth和scrollHeight是元素的内容区域加上内边距加上溢出尺寸，
 *    当内容正好和内容区域匹配没有溢出时，这些属性与clientWidth和clientHeight相等
 *
 * 7. scrollLeft和scrollTop是指元素滚动条位置，它们是可写的
 *
 * 8. getBoundingClientRect得到元素的上边和左边相对窗口的距离
 */
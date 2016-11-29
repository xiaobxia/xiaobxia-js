/**
 * 1. clientHeight和clientWidth用于描述元素内尺寸，是指 元素内容+内边距 大小，
 * 不包括边框（ IE下实际包括 ）、外边距、滚动条部分
 *
 * 2. offsetHeight和offsetWidth用于描述元素外尺寸，是指 元素内容+内边距+边框，不包括外边距和滚动条部分
 *
 * 3. clientTop和clientLeft返回内边距的边缘和边框的外边缘之间的水平和垂直距离，也就是左，上边框宽度
 *
 * 4. offsetTop和offsetLeft表示该元素的左上角（边框 外边缘 ）与 已定位 的父容器（offsetParent对象）左上角的距离
 *
 * 5. offsetParent对象是指元素最近的 定位 （relative,absolute）祖先元素，
 * 递归上溯，如果没有祖先元素是定位的话，会返回null
 *
 * 6. scrollWidth和scrollHeight是元素的内容区域加上内边距加上溢出尺寸，
 * 当内容正好和内容区域匹配没有溢出时，这些属性与clientWidth和clientHeight相等
 *
 * 7. scrollLeft和scrollTop是指元素滚动条位置，它们是可写的
 *
 * getBoundingClientRect得到元素的上边和左边相对窗口的距离
 */
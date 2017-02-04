/**
 * DataTransfer的属性与方法
 * 属性
 * dropEffect：（拖放经过的元素）表示拖放操作的视觉效果，值：none，copy，link，move
 * effectAllowed：（被拖放的元素）当元素被拖放时所允许的视觉效果。
 * types：存入数据的种类，字符串的伪数组
 * 方法
 * clearData：清除DataTransfer对象的数据
 * setData：设置DataTransfer对象的数据
 * getData：得到DataTransfer对象的数据
 * setDragImage：用img元素设置拖放图标
 *
 * effectAllowed说明，一般用在dragstart
 * copy：允许被拖元素复制到目标元素元素中
 * move：允许被拖元素移动到目标元素元素中
 * link：被拖元素链接到目标元素元素上
 * copyLink：被拖元素复制或链接到目标元素元素中，由dropEffect决定到底是复制还是链接
 * copyMove：被拖元素复制或移动到目标元素元素中，由dropEffect决定到底是复制还是移动
 * linkMove：被拖元素链接或移动到目标元素元素中，由dropEffect决定到底是链接还是移动
 * all：允许所有拖动操作
 * none：不允许执行任何拖动操作
 * unintialize：不指定
 *
 * dropEffect说明，一般用在dragover
 *
 *
 */

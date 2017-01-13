/**
 * 事件
 * add 插入新的option元素，在相关项(relOption)之前
 * multiple 是否允许多项选择
 * options 控件中所有<option>元素的集合
 * remove(index) 移除给定位置的选项
 * selectedIndex 基于0的选中项的索引，没有选中项就为0，对于多选项只得到第一项的索引
 * size 选择框中可见的行数
 *
 * value值的规则
 * 如果在html中指定了value属性那么就是value属性的值，如果没有指定那就是文本的值
 *
 * option的属性
 * index 在集合中的索引
 * label 当前选项的标签
 * selected 当前项是否被选中
 * text 选项的文本
 * value 选项的值
 *
 */
//第一个form中name为"location"的select
var selectbox=document.forms[0].elements["location"];
var text=selectbox.options[0].text;
var value=selectbox.options[0].value;

//得到select中所有被选中的项
function getSelectedOptions(selectbox){
    var result = [];
    var option = null;
    for (var i=0, len=selectbox.options.length; i < len; i++){
        option = selectbox.options[i];
        //检查option的selected的布尔值
        if (option.selected){
            result.push(option);
        }
    }
    return result;
}

//创建option项的方法，除了普通dom创建，还有option构造函数创建
var newOption=new Option("Option text","Option value");
//第二个参数设为undefined，插入在最后，如果想插入特定位置那就使用dom创建
selectbox.add(newOption,undefined);

//移除项,3种方式
selectbox.removeChild(selectbox.options[0]);
selectbox.remove(0);
selectbox.options[0]=null;


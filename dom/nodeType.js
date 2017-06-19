function consoleNodeType(type) {
    var types = [
        '','元素节点','属性节点','文本节点',
        'CDATA部分','实体引用','实体','处理指令',
        '注释元素','文档元素','文档定义','轻量级document对象','DTD 中声明的符号'];
    return types[type];
}
//这种方法可以减少DOM渲染，加快解析速度
var valueList = ['a', 'b', 'c'];
var $listWrap = document.createElement('ul');
var $frag = document.createDocumentFragment();
for (var i = 0; i < valueList.length; i++) {
    var $listItem = document.createElement("li");
    $listItem.innerHTML = valueList[i];
    $frag.appendChild($listItem);
}
$listWrap.appendChild($frag);


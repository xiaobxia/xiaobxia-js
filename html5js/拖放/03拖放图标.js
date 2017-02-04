var dragIcon=document.createElement("img");
dragIcon.src="http://www.xxx.com";
source.addEventListener("dragstart",function (event) {
    var dt=event.dataTransfer;
    dt.setDragImage(dragIcon,-10,-10);
    dt.setData("text/plain","aaa");
},false);
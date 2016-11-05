function a() {
    this.oCount = document.createElement("ul");
    this.oFrag = document.createDocumentFragment();
    this.oCount.className = "count";
    for (var i = 0; i < this.aImg.length; i++) {
        var oLi = document.createElement("li");
        oLi.innerHTML = i + 1;
        this.oFrag.appendChild(oLi)
    }
    this.oCount.appendChild(this.oFrag);
    this.oBox.appendChild(this.oCount)
}
//这种方法可以减少DOM渲染，加快解析速度
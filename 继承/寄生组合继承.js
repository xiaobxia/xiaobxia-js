function SuperType() {


}
function inheritObj(o) {
    function F() {}
    F.prototype=o;
    return new F();
}
function inheritPrototype(superClass,subClass) {
    var p=inheritObj(superClass.prototype);
    p.constructor=subClass;
    subClass.prototype=p;
}
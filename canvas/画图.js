//画线
var Line = function (x, y, x1, y1, width, style) {
    this.sx = x;
    this.sy = y;
    this.ex = x1;
    this.ey = y1;
    this.width = width;
    this.style = style;
};

Line.prototype.drawLine = function (content) {
    content.beginPath();
    content.strokeStyle = this.style;
    content.lineWidth = this.width;
    content.moveTo(this.sx, this.sy);
    content.lineTo(this.ex, this.ey);
    content.stroke();
};
//画圆
var Circle = function (x, y, r, style) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.style = style;
};
Circle.prototype.drawCircle = function (content) {
    content.beginPath();
    content.fillStyle = this.style;
    content.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    content.fill();
};
//画圆环
var Ring = function (x, y, r, style, width) {
    var arg = Array.prototype.slice.call(arguments, 0),
        param = arg.slice(0, 4);
    Circle.apply(this, param);
    this.width = width;
};
Ring.prototype.drawRing = function (content) {
    content.beginPath();
    content.strokeStyle = this.style;
    content.lineWidth = this.width;
    content.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    content.stroke();
};
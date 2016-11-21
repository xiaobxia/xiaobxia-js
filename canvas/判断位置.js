var positionJudge = {
    isPointInCircle: function (point, circle) {
        var a = Math.pow(point.x - circle.x, 2) / 100 + Math.pow(point.y - circle.y, 2) / 100;
        return a <= Math.pow(circle.r, 2) / 100;
    },
    isTwoCircleConnect: function (circle1, circle2) {
        var r = circle1.r + circle2.r,
            b = Math.pow(circle1.x - circle2.x, 2) / 100,
            c = Math.pow(circle1.y - circle2.y, 2) / 100,
            dSquare = b + c,
            d = Math.sqrt(dSquare) * 10;
        return d <= r;
    }
};
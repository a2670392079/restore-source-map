var defaultLineStyle = { strokeStyle: "#6f42c1", lineWith: 2 };
var drawLine = function (ctx, p1, p2, lineStyle) {
    if (lineStyle === void 0) { lineStyle = defaultLineStyle; }
    var strokeStyle = lineStyle.strokeStyle, lineWith = lineStyle.lineWith;
    ctx.arc(p1[0], p1[1], lineWith, 0, Math.PI * 2);
    ctx.fill();
    ctx.arc(p2[0], p2[1], lineWith, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("(".concat(p2.toString(), ")"), p2[0], p2[1] + 10);
    ctx.fillText("(".concat(p1.toString(), ")"), p1[0], p1[1] + 10);
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWith;
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    //   ctx.closePath();
    ctx.stroke();
};
var drawPoint = function (ctx, p, mark) {
    if (mark === void 0) { mark = "P"; }
    ctx.beginPath();
    ctx.arc(p[0], p[1], 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText("".concat(mark, "   ").concat(p.toString()), p[0], p[1] - 10);
};
// const bezier = (ctx: CanvasRenderingContext2D,) => {
// }
var distance = function (ctx, p1, p2, p) {
    drawLine(ctx, p1, p2);
    drawPoint(ctx, p);
    var v1 = new Vec2(p2[0] - p1[0], p2[1] - p1[1]);
    var v2 = new Vec2(p[0] - p1[0], p[1] - p1[1]);
    ctx.fillText("distance: ".concat(Math.abs(v1.cross(v2) / v1.length)), 400, 400);
    ctx.moveTo(50, 50);
    ctx.bezierCurveTo(70, 70, 70, 70, 43, 63);
    ctx.stroke();
};
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.cross = function (point) {
        return this.x * point.y - this.y * point.x;
    };
    Object.defineProperty(Vec2.prototype, "length", {
        get: function () {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        },
        enumerable: false,
        configurable: true
    });
    return Vec2;
}());
export { distance, Vec2 };

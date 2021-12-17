import render_webgl from "./webgl/src/index";
import render_canvas from './canvas/index';
var canvas_test = document.createElement("canvas");
var webgl_test = document.createElement("canvas");
canvas_test.width = 500;
canvas_test.height = 500;
webgl_test.width = 500;
webgl_test.height = 500;
document.body.appendChild(webgl_test);
document.body.appendChild(canvas_test);
var canvas_context = canvas_test.getContext("2d");
var webgl_context = webgl_test.getContext("webgl");
function render() {
    render_webgl(webgl_context);
    render_canvas(canvas_context, canvas_test);
}
render();

import mandelbrot from './mandelbrot_set/index';
var render = function (gl) {
    // particle(gl);
    // render_grid(gl, 36);
    mandelbrot(gl);
};
export default render;

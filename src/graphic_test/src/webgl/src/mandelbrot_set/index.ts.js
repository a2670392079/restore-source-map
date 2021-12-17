import mandelbrotFrag from "../../shader/mandelbrot_set/mandelbrot.frag";
import mandelbrotVert from "../../shader/mandelbrot_set/mandelbrot.vert";
import setUniforms, { UniformsType } from "../utils/setUniforms";
import shaderLoader from "../utils/shaderLoader";
import { setAttrib, setCells } from "../utils/setAttrib";
var mandelbrot = function (gl) {
    var program = shaderLoader(gl, mandelbrotVert, mandelbrotFrag);
    setAttrib(gl, program, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), "a_vertexPostition");
    setAttrib(gl, program, new Float32Array([0, 0, 0, 1, 1, 1, 1, 0]), "uv");
    setUniforms(gl, program, "center", [0, 0]);
    setUniforms(gl, program, "scale", [1]);
    setUniforms(gl, program, "iterations", [256], UniformsType["1i"]);
    var count = setCells(gl, new Int16Array([0, 1, 2, 2, 0, 3]));
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
    //   function update() {
    //     const factor = Math.max(0.1, Math.log(1));
    //     setUniforms(gl, program,)
    //     renderer.uniforms.iterations = factor * 500;
    //     requestAnimationFrame(update);
    //   }
    //   setTimeout(update, 2000);
};
export default mandelbrot;

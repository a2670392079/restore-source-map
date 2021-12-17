var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var UniformsType;
(function (UniformsType) {
    UniformsType["1f"] = "1f";
    UniformsType["1i"] = "1i";
    UniformsType["2f"] = "2f";
    UniformsType["2i"] = "2i";
    UniformsType["3f"] = "3f";
    UniformsType["3i"] = "3i";
    UniformsType["4f"] = "4f";
    UniformsType["4i"] = "4i";
})(UniformsType || (UniformsType = {}));
export default function setUniforms(gl, program, name, value, type) {
    var u_name = gl.getUniformLocation(program, name);
    if (type) {
        if (value.length > 1) {
            gl["uniform".concat(type)].apply(gl, __spreadArray([u_name], value, false));
        }
        else {
            gl["uniform".concat(type)](u_name, value[0]);
            // gl.uniform1i(u_name, 100)
        }
    }
    else {
        if (value.length > 1) {
            var len = value.length;
            if (len <= 4 && len > 0) {
                gl["uniform".concat(len, "f")].apply(gl, __spreadArray([u_name], value, false));
            }
        }
        else {
            gl.uniform1f(u_name, value[0]);
        }
    }
}
// todo 不能直接使用数值变量

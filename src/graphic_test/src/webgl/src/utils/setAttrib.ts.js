export function setAttrib(gl, program, arr, name) {
    if (name === void 0) { name = 'position'; }
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
    var v_position = gl.getAttribLocation(program, name);
    gl.vertexAttribPointer(v_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(v_position);
    return bufferId;
}
export function setCells(gl, cells) {
    var cellsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cellsBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cells, gl.STATIC_DRAW);
    var cellsCount = cells.length;
    return cellsCount;
}

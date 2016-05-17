class initWebGl{

	constructor(canvas) {
		let gl;
		try{
			gl = canvas.getContext("experimental-webgl");
		}
		catch(e){
			let msg = "Error creating WebGL Context!: " + e.toString();
			alert(msg);
			throw Error(msg);
		}

		return gl;
	}

}

class initViewport{

	constructor(gl, canvas){
		gl.viewport(0, 0, canvas.width, canvas.height);
	}

}

class createSquare{

	constructor(gl){
		let vertexBuffer;
		vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		let verts = [
			.5, .5, 0.0,
			-.5, .5, 0.0,
			.5, -.5, 0.0,
			-.5, -.5, 0.0
		];
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array(varts),
			gl.STATIC_DRAW
		);
		let square = {
			buffer: vertexBuffer,
			vertSize: 3,
			nVerts: 4,
			primtype: gl.TRIAGLE_STRIP
		};

		return square;
	}

}
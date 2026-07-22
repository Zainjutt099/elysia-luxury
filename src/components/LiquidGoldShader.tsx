import { useEffect, useRef } from 'react';

export default function LiquidGoldShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        
        // Slow, luxurious liquid gold movement
        float noise = sin(uv.x * 3.0 + u_time * 0.5) * cos(uv.y * 3.0 - u_time * 0.4);
        noise += sin(uv.x * 6.0 - u_time * 0.3) * cos(uv.y * 6.0 + u_time * 0.2) * 0.5;
        
        vec3 color1 = vec3(0.96, 0.95, 0.93); // Warm sand / linen
        vec3 color2 = vec3(0.92, 0.91, 0.88); // Gray beige
        
        vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
        
        // Subtle terracotta/rust sheen effect
        float glint = pow(max(0.0, sin(uv.x * 10.0 + uv.y * 10.0 + u_time)), 50.0);
        finalColor += vec3(0.83, 0.30, 0.15) * glint * 0.15;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResLoc = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId: number;
    const startTime = performance.now();

    const render = () => {
      const currentTime = (performance.now() - startTime) * 0.001;

      // Ensure viewport matches canvas dimensions
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.clearColor(0.96, 0.95, 0.93, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, currentTime);
      if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    // Use ResizeObserver for responsive sizing as instructed
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Sync the WebGL drawing-buffer size with the layout size
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
    });

    resizeObserver.observe(container);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div id="shader-container-ANIMATION_3" ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#F5F2ED]">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

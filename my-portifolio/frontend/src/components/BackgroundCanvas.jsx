import { useRef, useEffect } from "react";
import motoSrc from '../assets/moto.png';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", handleMouseMove);

    const motoImg = new Image();
    motoImg.src = motoSrc;

    const particles = [];
    const numberOfParticles = 25;

    motoImg.onload = () => {

      const imgW = 220;
      const imgH = (motoImg.height / motoImg.width) * imgW;

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.75) + canvas.height * 0.1,
          scale: Math.random() * 0.4 + 0.5,
          speedX: Math.random() * 1.5 + 1.0,
          bobOffset: Math.random() * Math.PI * 2,
          bobSpeed: Math.random() * 0.015 + 0.008,
          bobAmount: Math.random() * 3 + 2,
          alphaOffset: Math.random() * Math.PI * 2,
          alphaSpeed: Math.random() * 0.01 + 0.005,
          imgW,
          imgH,
        });
      }

      function drawMoto(p) {
        const w = p.imgW * p.scale;
        const h = p.imgH * p.scale;
        const alpha = 0.55 + Math.sin(p.alphaOffset) * 0.15;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.shadowColor = "rgba(220, 0, 0, 0.25)";
        ctx.shadowBlur = 18;
        ctx.drawImage(motoImg, -w / 2, -h / 2, w, h);
        ctx.restore();
      }

      function updateParticle(p) {
        p.x += p.speedX;

        // Balanço senoidal salvo direto no p.y
        p.y += Math.sin(p.bobOffset) * 0.4;
        p.bobOffset   += p.bobSpeed;
        p.alphaOffset += p.alphaSpeed;

        if (p.x > canvas.width + 150) {
          p.x = -150;
          p.y = Math.random() * (canvas.height * 0.75) + canvas.height * 0.1;
        }

        // Desvio do mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 4;
            p.y -= (dy / dist) * force * 4;
          }
        }

        drawMoto(p);
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => updateParticle(p));
        animationId = requestAnimationFrame(animate);
      }

      animate();
    };

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "#000000",
      }}
    />
  );
}
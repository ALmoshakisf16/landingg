import { useRef, useEffect } from 'react';

function wrapWords(ctx, text, maxW) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export default function CanvasText({
  text,
  fontSize = 24,
  color = '#fff',
  weight = 'bold',
  align = 'center',
  padding = 20,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!text) return;

    const draw = () => {
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const W = wrap.clientWidth || 300;
      const ctx = canvas.getContext('2d');
      const fontStr = `${weight} ${fontSize}px Cairo, sans-serif`;

      ctx.font = fontStr;
      const availableWidth = Math.max(W - padding * 2, 40);
      const lines = wrapWords(ctx, text, availableWidth);
      const lh = fontSize * 1.5;
      const H = lines.length * lh + fontSize * 0.4;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);
      ctx.font = fontStr;
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.direction = 'rtl';
      ctx.textBaseline = 'alphabetic';

      let xPos = W / 2;
      if (align === 'right') xPos = W - padding;
      if (align === 'left') xPos = padding;

      lines.forEach((l, i) => {
        ctx.fillText(l, xPos, lh * (i + 1));
      });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(draw);
    } else {
      setTimeout(draw, 200);
    }

    const ro = new ResizeObserver(() => draw());
    if (wrapRef.current) ro.observe(wrapRef.current);

    return () => ro.disconnect();
  }, [text, fontSize, color, weight, align, padding]);

  return (
    <div ref={wrapRef} style={{ width: '100%', direction: 'rtl' }}>
      <canvas ref={canvasRef} style={{ display: 'block', margin: '0 auto' }} />
    </div>
  );
}

import { useEffect, useRef } from 'react';

// Lightweight canvas charts, no heavy deps. Pure presentational components.
// Palette from DESIGN.md: coral #cc785c, ink #141413, teal #5db8a6, amber #e8a55a.
const PALETTE = ['#cc785c', '#181715', '#5db8a6', '#e8a55a', '#a9583e', '#6c6a64'];

function setupCanvas(canvas: HTMLCanvasElement, height: number): CanvasRenderingContext2D | null {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  const width = canvas.clientWidth || canvas.parentElement?.clientWidth || 600;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = `${height}px`;
  canvas.style.width = '100%';
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.scale(dpr, dpr);
  return ctx;
}

export interface BarDatum {
  label: string;
  value: number;
}

export function BarChart({ data, height = 220 }: { data: BarDatum[]; height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || data.length === 0) return;
    const ctx = setupCanvas(canvas, height);
    if (!ctx) return;
    const width = canvas.clientWidth || 600;
    const max = Math.max(...data.map((d) => (Number.isFinite(d.value) && d.value > 0 ? d.value : 0)), 1);
    const gap = 12;
    const barW = Math.max(8, (width - gap * (data.length + 1)) / data.length);
    ctx.clearRect(0, 0, width, height);
    ctx.font = '11px Inter, sans-serif';
    data.forEach((d, i) => {
      const v = Number.isFinite(d.value) && d.value > 0 ? d.value : 0;
      const h = Math.max(2, ((height - 48) * v) / max);
      const x = gap + i * (barW + gap);
      const y = height - 28 - h;
      ctx.fillStyle = PALETTE[i % PALETTE.length] ?? '#cc785c';
      ctx.beginPath();
      ctx.roundRect(x, y, barW, h, 4);
      ctx.fill();
      ctx.fillStyle = '#6c6a64';
      ctx.textAlign = 'center';
      ctx.fillText(d.label.slice(0, 10), x + barW / 2, height - 10, barW + 20);
    });
  }, [data, height]);
  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Bar chart"
      style={{ display: 'block', width: '100%' }}
    />
  );
}

export interface LinePoint {
  label: string;
  value: number;
}

export function LineChart({
  series,
  height = 220,
}: {
  series: { name: string; color?: string; points: LinePoint[] }[];
  height?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || series.length === 0) return;
    const ctx = setupCanvas(canvas, height);
    if (!ctx) return;
    const width = canvas.clientWidth || 600;
    const all = series.flatMap((s) => s.points.map((p) => p.value).filter(Number.isFinite));
    if (all.length === 0) return;
    const min = Math.min(0, ...all);
    const max = Math.max(...all, 1);
    const span = max - min || 1;
    const padL = 8;
    const padB = 28;
    const padT = 16;
    const n = Math.max(...series.map((s) => s.points.length));
    const xAt = (i: number) => padL + ((width - padL * 2) * i) / Math.max(1, n - 1);
    const yAt = (v: number) => padT + (1 - (v - min) / span) * (height - padT - padB);
    ctx.clearRect(0, 0, width, height);
    // zero line
    ctx.strokeStyle = '#e6dfd8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, yAt(0));
    ctx.lineTo(width - padL, yAt(0));
    ctx.stroke();
    series.forEach((s, si) => {
      ctx.strokeStyle = s.color ?? PALETTE[si % PALETTE.length] ?? '#cc785c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      s.points.forEach((p, i) => {
        const x = xAt(i);
        const y = yAt(p.value);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.fillStyle = s.color ?? PALETTE[si % PALETTE.length] ?? '#cc785c';
      s.points.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(xAt(i), yAt(p.value), 3, 0, Math.PI * 2);
        ctx.fill();
      });
    });
    // x labels (first series)
    const labels = series[0]?.points ?? [];
    ctx.fillStyle = '#6c6a64';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((p, i) => {
      if (n > 12 && i % Math.ceil(n / 12) !== 0) return;
      ctx.fillText(p.label, xAt(i), height - 8, 60);
    });
    // legend
    ctx.textAlign = 'left';
    series.forEach((s, si) => {
      const lx = padL + si * 140;
      ctx.fillStyle = s.color ?? PALETTE[si % PALETTE.length] ?? '#cc785c';
      ctx.fillRect(lx, 2, 10, 10);
      ctx.fillStyle = '#3d3d3a';
      ctx.fillText(s.name.slice(0, 18), lx + 14, 11);
    });
  }, [series, height]);
  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Line chart"
      style={{ display: 'block', width: '100%' }}
    />
  );
}

export function DonutChart({
  data,
  height = 220,
}: {
  data: BarDatum[];
  height?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || data.length === 0) return;
    const ctx = setupCanvas(canvas, height);
    if (!ctx) return;
    const width = canvas.clientWidth || 600;
    const total = data.reduce((a, d) => a + (Number.isFinite(d.value) && d.value > 0 ? d.value : 0), 0);
    if (total <= 0) return;
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) / 2 - 12;
    let angle = -Math.PI / 2;
    ctx.clearRect(0, 0, width, height);
    data.forEach((d, i) => {
      const v = Number.isFinite(d.value) && d.value > 0 ? d.value : 0;
      const sweep = (v / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.fillStyle = PALETTE[i % PALETTE.length] ?? '#cc785c';
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + sweep);
      ctx.closePath();
      ctx.fill();
      angle += sweep;
    });
    // hole
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }, [data, height]);
  return (
    <div>
      <canvas
        ref={ref}
        role="img"
        aria-label="Donut chart"
        style={{ display: 'block', width: '100%' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
        {data.map((d, i) => (
          <span key={d.label} style={{ fontSize: 12, color: '#3d3d3a' }}>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: 2,
                background: PALETTE[i % PALETTE.length],
                marginRight: 6,
              }}
            />
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

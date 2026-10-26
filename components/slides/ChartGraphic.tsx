import type { ChartEl } from "./slide-elements";
import { BLUE, PIE_COLORS } from "./slide-elements-data";

/**
 * The picture inside a chart element: a bar, line or pie chart of `data`, drawn as SVG. One unit of the view box is 0.1 cqw, so
 * the chart scales with the slide and keeps the proportions of its element.
 */
export function ChartGraphic({ chart }: { chart: ChartEl }) {
  const W = chart.w * 10;
  const H = chart.h * 10;
  const font = { fontFamily: "Arial, Helvetica, sans-serif" };
  const maxV = 5000;
  const left = 62;
  const right = 18;
  const top = 40;
  const bottom = 28;
  const pw = W - left - right;
  const ph = H - top - bottom;
  const n = chart.data.length;
  const y = (v: number) => top + ph - (v / maxV) * ph;
  const ticks = [0, 1000, 2000, 3000, 4000, 5000];

  const titleEl = (
    <text x={W / 2} y={24} textAnchor="middle" fontSize={17} fontWeight={600} fill="#1f2430" style={font}>
      {chart.title}
    </text>
  );

  if (chart.chart === "pie") {
    const total = chart.data.reduce((s, d) => s + d.value, 0);
    const r = Math.min((H - top - 12) / 2, 78);
    const cx = left + 40 + r;
    const cy = top + (H - top - 8) / 2;
    const starts = chart.data.map((_, i) => -Math.PI / 2 + (chart.data.slice(0, i).reduce((s, d) => s + d.value, 0) / total) * Math.PI * 2);
    const slices = chart.data.map((d, i) => {
      const a0 = starts[i];
      const a1 = a0 + (d.value / total) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const path = `M ${cx} ${cy} L ${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A ${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} Z`;
      return <path key={d.label} d={path} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#fff" strokeWidth={2} />;
    });
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
        {titleEl}
        {slices}
        {chart.data.map((d, i) => (
          <g key={d.label} transform={`translate(${cx + r + 56} ${top + 6 + i * 21})`}>
            <rect width={11} height={11} rx={2} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            <text x={18} y={10} fontSize={13} fill="#4b5060" style={font}>
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  const slot = pw / n;
  const grid = ticks.map((t) => (
    <g key={t}>
      <line x1={left} x2={left + pw} y1={y(t)} y2={y(t)} stroke="#E6E8EE" strokeWidth={1} />
      <text x={left - 8} y={y(t) + 4} textAnchor="end" fontSize={12} fill="#6b7280" style={font}>
        {t.toLocaleString("en-GB")}
      </text>
    </g>
  ));
  const labels = chart.data.map((d, i) => (
    <text key={d.label} x={left + slot * i + slot / 2} y={H - 9} textAnchor="middle" fontSize={13} fill="#4b5060" style={font}>
      {d.label}
    </text>
  ));

  if (chart.chart === "line") {
    const pts = chart.data.map((d, i) => [left + slot * i + slot / 2, y(d.value)] as const);
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
        {titleEl}
        {grid}
        {labels}
        <polyline points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={BLUE} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
        {pts.map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r={5} fill="#fff" stroke={BLUE} strokeWidth={3} />
        ))}
      </svg>
    );
  }

  const bw = slot * 0.56;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full">
      {titleEl}
      {grid}
      {labels}
      {chart.data.map((d, i) => (
        <rect key={d.label} x={left + slot * i + (slot - bw) / 2} y={y(d.value)} width={bw} height={top + ph - y(d.value)} rx={2} fill={BLUE} />
      ))}
    </svg>
  );
}

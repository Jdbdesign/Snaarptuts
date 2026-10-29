"use client";

import { PALETTES, chartData, trend, type ChartState } from "./chart-state";
import type { Rows } from "./grid-state";

export const CHART_W = 420;
export const CHART_H = 262;

const GRID = "#E3E5E8";
const AXIS = "#5F6368";

function niceMax(v: number): number {
  if (v <= 0) return 1;
  const pow = 10 ** Math.floor(Math.log10(v));
  const f = v / pow;
  const n = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return n * pow;
}

const fontFor = (f: string) => (f === "Theme Default" ? "Poppins, Arial, sans-serif" : f === "Roboto" ? "Roboto, Arial, sans-serif" : `${f}, sans-serif`);

/**
 * The chart, drawn as plain SVG from the sheet's cells (no chart library). Column, line, area, scatter and pie; stacking none /
 * standard / 100%; a second (right) axis; data labels, trendlines, error bars; legend position; titles. Hooks: chart-svg, chart-title.
 */
export function ChartGraphic({ chart, rows }: { chart: ChartState; rows: Rows }) {
  const { cats, series } = chartData(rows, chart);
  const W = CHART_W;
  const H = CHART_H;
  const pie = chart.type === "pie";
  const hasRight = !pie && series.some((x) => x.s.axis === "right");
  const hasTitle = !!chart.titles.chart;
  const legendPos = chart.legend === "auto" ? "bottom" : chart.legend;
  const legendItems = pie ? cats.map((c, i) => ({ label: c, colour: PALETTES[chart.palette][i % 6] })) : series.map((x) => ({ label: x.s.label, colour: x.colour }));

  const left = 44 + (chart.titles.v ? 14 : 0);
  const right = W - (hasRight ? 40 : 14) - (legendPos === "right" ? 84 : 0);
  const top = 12 + (hasTitle ? 24 : 0) + (legendPos === "top" ? 20 : 0);
  const bottom = H - 24 - (chart.titles.h ? 16 : 0) - (legendPos === "bottom" ? 22 : 0);
  const pw = right - left;
  const ph = bottom - top;

  const stacked = chart.stacking !== "none" && (chart.type === "column" || chart.type === "area" || chart.type === "line");
  const leftS = series.filter((x) => x.s.axis === "left");
  const rightS = series.filter((x) => x.s.axis === "right");
  const maxOf = (list: typeof series) => {
    if (!list.length) return 1;
    if (stacked && chart.stacking === "percent") return 1;
    if (stacked) return Math.max(...cats.map((_, i) => list.reduce((a, x) => a + x.values[i], 0)));
    return Math.max(...list.flatMap((x) => x.values));
  };
  const maxL = chart.stacking === "percent" && stacked ? 1 : niceMax(maxOf(leftS.length ? leftS : series) * 1.05);
  const maxR = niceMax(maxOf(rightS) * 1.05);
  const yL = (v: number) => bottom - (v / maxL) * ph;
  const yR = (v: number) => bottom - (v / maxR) * ph;
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const fmtL = (v: number) => (chart.stacking === "percent" && stacked ? `${Math.round(v * 100)}%` : String(Math.round(v)));

  const slot = pw / Math.max(1, cats.length);
  const cx = (i: number) => left + slot * (i + 0.5);

  // Cumulative baselines per category for stacked series
  const base = (si: number, ci: number) => {
    let sum = 0;
    for (let k = 0; k < si; k++) if (series[k].s.axis === "left") sum += series[k].values[ci];
    return sum;
  };
  const norm = (ci: number) => (chart.stacking === "percent" ? leftS.reduce((a, x) => a + x.values[ci], 0) || 1 : 1);

  const titleColour = chart.titleColor === "auto" ? "#202124" : chart.titleColor;
  const titleSize = chart.titleSize === "Auto" ? 14 : Number(chart.titleSize) || 14;

  const bars = () => {
    const n = stacked ? 1 : series.length;
    const bw = Math.min(34, (slot * 0.72) / n);
    return series.map((x, si) =>
      cats.map((_, ci) => {
        const x0 = stacked ? cx(ci) - bw / 2 : cx(ci) - (bw * n) / 2 + bw * si;
        const y = x.s.axis === "right" ? yR : yL;
        const b = stacked ? base(si, ci) / norm(ci) : 0;
        const v = x.values[ci] / (stacked ? norm(ci) : 1);
        const y1 = y(b + v);
        const y0 = y(b);
        const op = x.s.fillOpacity / 100;
        return (
          <g key={`${x.s.id}-${ci}`}>
            {chart.threeD && <rect x={x0 + 5} y={y1 - 4} width={bw} height={y0 - y1} fill={x.colour} opacity={0.35} />}
            <rect x={x0} y={y1} width={bw} height={Math.max(0, y0 - y1)} fill={x.colour} fillOpacity={op} stroke={x.s.lineOpacity ? x.colour : "none"} strokeWidth={x.s.thickness || 1} />
          </g>
        );
      }),
    );
  };

  const pts = (x: (typeof series)[number], si: number) =>
    cats.map((_, ci) => {
      const y = x.s.axis === "right" ? yR : yL;
      const v = stacked ? (base(si, ci) + x.values[ci]) / norm(ci) : x.values[ci];
      return [cx(ci), y(v)] as [number, number];
    });

  const lines = () =>
    series.map((x, si) => {
      const p = pts(x, si);
      const d = p.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)} ${b.toFixed(1)}`).join(" ");
      if (chart.type === "area") {
        const lowers = cats.map((_, ci) => [cx(ci), (x.s.axis === "right" ? yR : yL)(stacked ? base(si, ci) / norm(ci) : 0)] as [number, number]).reverse();
        const area = `${d} ${lowers.map(([a, b]) => `L${a.toFixed(1)} ${b.toFixed(1)}`).join(" ")} Z`;
        return <path key={x.s.id} d={area} fill={x.colour} fillOpacity={0.28 * (x.s.fillOpacity / 100) + 0.1} stroke={x.colour} strokeWidth={x.s.thickness || 2} />;
      }
      if (chart.type === "scatter") return <g key={x.s.id}>{p.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={4} fill={x.colour} />)}</g>;
      return (
        <g key={x.s.id}>
          <path d={d} fill="none" stroke={x.colour} strokeWidth={x.s.thickness || 2.2} strokeLinejoin="round" />
          {p.map(([a, b], i) => <circle key={i} cx={a} cy={b} r={3} fill="#fff" stroke={x.colour} strokeWidth={1.6} />)}
        </g>
      );
    });

  const extras = () =>
    series.map((x, si) => {
      const p = chart.type === "column" ? cats.map((_, ci) => [cx(ci), (x.s.axis === "right" ? yR : yL)((stacked ? base(si, ci) + x.values[ci] : x.values[ci]) / (stacked ? norm(ci) : 1))] as [number, number]) : pts(x, si);
      const tr = trend(x.values);
      const yy = x.s.axis === "right" ? yR : yL;
      return (
        <g key={x.s.id}>
          {x.s.errorBars && p.map(([a, b], i) => <path key={i} d={`M${a} ${b - 9}V${b + 9}M${a - 4} ${b - 9}H${a + 4}M${a - 4} ${b + 9}H${a + 4}`} stroke="#3C4043" strokeWidth={1.2} fill="none" />)}
          {x.s.dataLabels && p.map(([a, b], i) => <text key={i} x={a} y={b - 6} textAnchor="middle" fontSize={10} fill="#3C4043">{x.values[i]}</text>)}
          {x.s.trendline && <line x1={cx(0)} y1={yy(tr.a)} x2={cx(cats.length - 1)} y2={yy(tr.a + tr.b * (cats.length - 1))} stroke={x.colour} strokeWidth={1.6} strokeDasharray="5 4" />}
        </g>
      );
    });

  const pieSlices = () => {
    const first = series[0];
    if (!first) return null;
    const total = first.values.reduce((a, b) => a + b, 0) || 1;
    const r = Math.min(ph, pw) / 2 - 4;
    const px = left + pw / 2;
    const py = top + ph / 2;
    let a0 = -Math.PI / 2;
    return first.values.map((v, i) => {
      const a1 = a0 + (v / total) * Math.PI * 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      const d = `M${px} ${py} L${px + r * Math.cos(a0)} ${py + r * Math.sin(a0)} A${r} ${r} 0 ${large} 1 ${px + r * Math.cos(a1)} ${py + r * Math.sin(a1)} Z`;
      const mid = (a0 + a1) / 2;
      a0 = a1;
      return (
        <g key={i}>
          <path d={d} fill={PALETTES[chart.palette][i % 6]} stroke="#fff" strokeWidth={1.5} />
          {first.s.dataLabels && <text x={px + r * 0.62 * Math.cos(mid)} y={py + r * 0.62 * Math.sin(mid) + 3} textAnchor="middle" fontSize={10} fill="#fff">{v}</text>}
        </g>
      );
    });
  };

  const legendNode = () => {
    if (legendPos === "none") return null;
    const items = legendItems;
    const horizontal = legendPos === "bottom" || legendPos === "top";
    const step = Math.max(...items.map((it) => it.label.length), 3) * 5.6 + 28;
    return (
      <g fontSize={10.5} fill="#3C4043" data-tl="chart-legend">
        {items.map((it, i) => {
          const x = horizontal ? W / 2 - (items.length * step) / 2 + i * step : legendPos === "right" ? W - 82 : right - 78;
          const y = legendPos === "bottom" ? H - 12 - (chart.titles.h ? 0 : 0) : legendPos === "top" ? top - 8 : legendPos === "right" ? top + 8 + i * 16 : top + 10 + i * 15;
          return (
            <g key={i}>
              <rect x={x} y={y - 8} width={9} height={9} fill={it.colour} rx={1.5} />
              <text x={x + 13} y={y}>{it.label}</text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <svg data-tl="chart-svg" viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ fontFamily: fontFor(chart.font), background: chart.bg, display: "block" }} aria-label="Chart">
      {hasTitle && <text data-tl="chart-title" x={W / 2} y={22} textAnchor="middle" fontSize={titleSize} fontWeight={chart.titleBold ? 700 : 500} fontStyle={chart.titleItalic ? "italic" : "normal"} fill={titleColour}>{chart.titles.chart}</text>}
      {!pie && (
        <g fontSize={10} fill={AXIS}>
          {ticks.map((t) => (
            <g key={t}>
              {chart.gridlines && <line x1={left} x2={right} y1={bottom - t * ph} y2={bottom - t * ph} stroke={GRID} />}
              {chart.minorGrid && t < 1 && <line x1={left} x2={right} y1={bottom - (t + 0.125) * ph} y2={bottom - (t + 0.125) * ph} stroke="#F1F3F4" />}
              <text x={left - 6} y={bottom - t * ph + 3} textAnchor="end">{fmtL(t * maxL)}</text>
              {hasRight && <text x={right + 6} y={bottom - t * ph + 3}>{Math.round(t * maxR)}</text>}
            </g>
          ))}
          <line x1={left} x2={right} y1={bottom} y2={bottom} stroke="#9AA0A6" />
          {cats.map((c, i) => <text key={i} x={cx(i)} y={bottom + 14} textAnchor="middle">{c.length > 11 ? `${c.slice(0, 10)}…` : c}</text>)}
          {chart.titles.h && <text x={left + pw / 2} y={bottom + 30} textAnchor="middle" fontSize={titleSize - 3} fill="#3C4043" fontWeight={chart.titleBold ? 700 : 400}>{chart.titles.h}</text>}
          {chart.titles.v && <text transform={`translate(11 ${top + ph / 2}) rotate(-90)`} textAnchor="middle" fontSize={titleSize - 3} fill="#3C4043" fontWeight={chart.titleBold ? 700 : 400}>{chart.titles.v}</text>}
        </g>
      )}
      {pie ? pieSlices() : chart.type === "column" ? bars() : lines()}
      {!pie && extras()}
      {legendNode()}
    </svg>
  );
}

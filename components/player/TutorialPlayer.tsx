"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { getTutorial } from "@/tutorials";
import { resolveCompletion } from "@/tutorials/completion";
import { BrowserFrame } from "./BrowserFrame";
import { CompletionCard } from "./CompletionCard";
import { ComingSoon } from "./ComingSoon";
import { Rail } from "./Rail";
import { ScenePlayer } from "./ScenePlayer";

type Status = "playing" | "finished";

export function TutorialPlayer({ productId }: { productId: string }) {
  const tutorial = getTutorial(productId)!;
  const { steps } = tutorial;
  const firstBuilt = Math.max(0, steps.findIndex((s) => s.scene));

  const [run, setRun] = useState({ current: firstBuilt, runKey: 0, status: "playing" as Status });
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const [paused, setPaused] = useState(false);
  const [liveUrl, setLiveUrl] = useState<string | null>(null); // set by scenes with several screens
  const [railOpen, setRailOpen] = useState(true); // wide screens
  const [drawerOpen, setDrawerOpen] = useState(false); // narrow screens
  const narrow = useNarrow();
  const railVisible = narrow ? drawerOpen : railOpen;

  const start = useCallback((current: number) => {
    setPaused(false);
    setLiveUrl(null);
    setRun((r) => ({ current, runKey: r.runKey + 1, status: "playing" }));
  }, []);

  const { current } = run;
  const handleDone = useCallback(() => {
    setDone((d) => d.map((v, i) => v || i === current));
  }, [current]);

  const handleAdvance = useCallback(() => {
    const next = steps.findIndex((s, i) => i > current && s.scene);
    if (next >= 0) start(next);
    else setRun((r) => ({ ...r, status: "finished" }));
  }, [steps, current, start]);

  const replay = useCallback(() => {
    setDone(steps.map(() => false));
    start(firstBuilt);
  }, [steps, firstBuilt, start]);

  const select = useCallback(
    (i: number) => {
      if (!steps[i].scene) return;
      if (narrow) setDrawerOpen(false);
      start(i);
    },
    [steps, narrow, start],
  );

  // Space = pause / resume.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      e.preventDefault();
      if (e.type === "keydown" && !e.repeat) setPaused((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, []);

  const step = steps[current];
  const playing = run.status === "playing";

  const rail = (
    <Rail
      tutorial={tutorial}
      current={run.current}
      done={done}
      playing={playing}
      onSelect={select}
      onCollapse={() => (narrow ? setDrawerOpen(false) : setRailOpen(false))}
    />
  );

  return (
    <div className="fixed inset-0 flex overflow-hidden border border-line bg-page p-4">
      {narrow ? (
        railVisible && (
          <>
            <div className="fixed inset-0 z-30 bg-black/20" onClick={() => setDrawerOpen(false)} />
            <div className="fixed bottom-4 left-4 top-4 z-40 shadow-2xl">{rail}</div>
          </>
        )
      ) : (
        <div
          className="h-full shrink-0 overflow-hidden transition-[width,margin] duration-300 ease-out"
          style={{ width: railOpen ? "clamp(260px,15vw,300px)" : 0, marginRight: railOpen ? 20 : 0 }}
          inert={!railOpen}
        >
          {rail}
        </div>
      )}

      <BrowserFrame
        url={liveUrl ?? step.url}
        onExpand={railVisible ? undefined : () => (narrow ? setDrawerOpen(true) : setRailOpen(true))}
      >
        {!steps.some((s) => s.scene) && <ComingSoon name={tutorial.product.name} count={steps.length} />}
        {step.scene && (
          <ScenePlayer
            key={`${step.id}-${run.runKey}`}
            scene={step.scene}
            paused={paused}
            onDone={handleDone}
            onAdvance={handleAdvance}
            onUrlChange={setLiveUrl}
          />
        )}
        {playing && paused && (
          <div className="pointer-events-none absolute left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full bg-[#111] px-3.5 py-1.5 text-[12px] font-medium text-white shadow-lg">
            <Icon name="pause" size={12} />
            Paused · press Space to resume
          </div>
        )}
        {run.status === "finished" && (
          <CompletionCard completion={resolveCompletion(tutorial)} onReplay={replay} />
        )}
      </BrowserFrame>
    </div>
  );
}

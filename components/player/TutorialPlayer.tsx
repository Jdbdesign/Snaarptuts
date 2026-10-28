"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { progressStore } from "@/lib/progress";
import { useProgress } from "@/lib/useProgress";
import { clearPendingJump, peekPendingJump } from "@/lib/pending-jump";
import { useNarrow } from "@/lib/useNarrow";
import { getTutorial } from "@/tutorials";
import { resolveCompletion } from "@/tutorials/completion";
import { BrowserFrame } from "./BrowserFrame";
import { CanvasOverlay } from "./CanvasOverlay";
import { CompletionCard } from "./CompletionCard";
import { ComingSoon } from "./ComingSoon";
import { Rail } from "./Rail";
import { ScenePlayer } from "./ScenePlayer";

type Status = "playing" | "finished";

export function TutorialPlayer({ productId }: { productId: string }) {
  const tutorial = getTutorial(productId)!;
  const { steps } = tutorial;
  const firstBuilt = Math.max(0, steps.findIndex((s) => s.scene));

  // A search result in another product asks for a given step; otherwise start on the first built step.
  const [run, setRun] = useState(() => {
    const jump = peekPendingJump(productId);
    const current = jump !== null && steps[jump]?.scene ? jump : firstBuilt;
    return { current, runKey: 0, status: "playing" as Status };
  });
  const { store, ready } = useProgress();
  const completed = store[tutorial.product.id]?.completed;
  const done = useMemo(() => steps.map((s) => !!completed?.includes(s.id)), [steps, completed]);
  const [paused, setPaused] = useState(false);
  const [liveUrl, setLiveUrl] = useState<string | null>(null); // set by scenes with several screens
  const [railOpen, setRailOpen] = useState(true); // wide screens
  const [drawerOpen, setDrawerOpen] = useState(false); // narrow screens
  const [searchFocus, setSearchFocus] = useState(0);
  const narrow = useNarrow();
  const railVisible = narrow ? drawerOpen : railOpen;

  const start = useCallback((current: number) => {
    setPaused(false);
    setLiveUrl(null);
    setRun((r) => ({ current, runKey: r.runKey + 1, status: "playing" }));
  }, []);

  useEffect(() => clearPendingJump(), []);

  const { current } = run;
  const handleDone = useCallback(() => {
    progressStore.complete(tutorial.product.id, steps[current].id);
  }, [tutorial, steps, current]);

  const handleAdvance = useCallback(() => {
    const next = steps.findIndex((s, i) => i > current && s.scene);
    if (next >= 0) start(next);
    else setRun((r) => ({ ...r, status: "finished" }));
  }, [steps, current, start]);

  const replay = useCallback(() => {
    start(firstBuilt);
  }, [firstBuilt, start]);

  const select = useCallback(
    (i: number) => {
      if (!steps[i].scene) return;
      if (narrow) setDrawerOpen(false);
      start(i);
    },
    [steps, narrow, start],
  );

  // Open the rail if it is collapsed and put the cursor in the search box.
  const openSearch = useCallback(() => {
    if (narrow) setDrawerOpen(true);
    else setRailOpen(true);
    setSearchFocus((n) => n + 1);
  }, [narrow]);

  // "/" = search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      e.preventDefault();
      openSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

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
      ready={ready}
      playing={playing}
      onSelect={select}
      onCollapse={() => (narrow ? setDrawerOpen(false) : setRailOpen(false))}
      searchFocus={searchFocus}
    />
  );

  return (
    <div data-paused={playing && paused} className="fixed inset-0 flex overflow-hidden border border-line bg-page p-4">
      {narrow ? (
        railVisible && (
          <>
            <div className="fixed inset-0 z-[55] bg-black/20" onClick={() => setDrawerOpen(false)} />
            <div className="fixed bottom-4 left-4 top-4 z-[60] shadow-2xl">{rail}</div>
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
        onSearch={openSearch}
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
        {step.scene && (
          <CanvasOverlay paused={playing && paused} interactive={playing} onToggle={() => setPaused((p) => !p)} />
        )}
        {run.status === "finished" && (
          <CompletionCard
            completion={
              // A tutorial with steps still to build must not say "all set" after the last built one.
              steps.some((s) => !s.scene)
                ? {
                    ...resolveCompletion(tutorial),
                    title: `Step ${run.current + 1} complete`,
                    text: "The next steps are coming soon.",
                    replayLabel: "Replay",
                  }
                : resolveCompletion(tutorial)
            }
            onReplay={replay}
          />
        )}
      </BrowserFrame>

    </div>
  );
}

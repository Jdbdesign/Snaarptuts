import { Icon } from "@/components/icons";
import type { Completion } from "@/tutorials/types";

type Props = {
  completion: Required<Completion>;
  onReplay: () => void;
};

/** Centered card that fades in over the stage when the last step has finished. Playback stays stopped until Replay. */
export function CompletionCard({ completion, onReplay }: Props) {
  return (
    <div className="tl-fade absolute inset-0 z-50 flex items-center justify-center bg-white/85 px-6 backdrop-blur-[3px]">
      <div className="tl-fade-up flex w-full max-w-[440px] flex-col items-center rounded-[24px] border border-line bg-white px-8 pb-8 pt-10 text-center shadow-[0_30px_80px_-30px_rgba(17,17,17,0.35)]">
        <span className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-brand text-white shadow-[0_14px_30px_-10px_rgba(112,20,217,0.6)]">
          <Icon name="check" size={38} />
        </span>
        <h2 className="mt-6 text-[28px] font-bold leading-9 text-ink">{completion.title}</h2>
        <p className="mt-2 text-[15px] leading-6 text-muted">{completion.text}</p>
        <button
          onClick={onReplay}
          className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-8 text-[15px] font-semibold text-white shadow-[0_10px_24px_-8px_rgba(112,20,217,0.6)] transition-transform hover:scale-[1.03] active:scale-95"
        >
          <Icon name="replay" size={16} />
          {completion.replayLabel}
        </button>
        <a
          href={completion.backHref}
          target="_top"
          className="mt-4 text-[14px] font-medium text-[#4b5060] underline-offset-4 hover:text-ink hover:underline"
        >
          {completion.backLabel}
        </a>
      </div>
    </div>
  );
}

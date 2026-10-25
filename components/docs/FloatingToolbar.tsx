import { Icon, type IconName } from "@/components/icons";

/** Floating toolbar icons, left to right; a thin divider sits between groups. */
const GROUPS: IconName[][] = [
  ["edBold", "edItalic", "edUnderline", "edStrike"],
  ["edHighlight", "edEmoji"],
  ["edComment"],
];

/**
 * The inside of the dark floating bar that shows above selected text (DocumentView) and above a selected image
 * (ImageBlock). The caller positions the bar; this draws its icons. The Comment icon carries data-tl="selection-comment".
 */
export function FloatingToolbarIcons() {
  return (
    <>
      {GROUPS.map((group, g) => (
        <span key={g} className="flex items-center">
          {g > 0 && <span className="mx-[5px] h-[13px] w-px bg-white/25" />}
          {group.map((name) => (
            <span
              key={name}
              {...(name === "edComment" ? { "data-tl": "selection-comment" } : {})}
              className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] text-white/90 transition-colors data-[hover=true]:bg-white/15"
            >
              <Icon name={name} size={11.5} />
            </span>
          ))}
        </span>
      ))}
    </>
  );
}

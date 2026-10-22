import { Icon } from "@/components/icons";
import { SAMPLE, SUCCESS } from "../domain-data";

/** Screen C: green check (scales in), confirmation text and the proceed button. */
export function SuccessScreen() {
  // The domain stays on one line even though it contains a hyphen.
  const [before, after] = SUCCESS.title.split("{domain}");

  return (
    <div className="mx-auto flex w-[390px] flex-col items-center pt-[161px] text-center">
      <span className="tl-pop flex h-[49px] w-[49px] items-center justify-center rounded-full bg-[#34B161] text-white">
        <Icon name="circleTick" size={26} />
      </span>
      <h1 className="mt-[16px] max-w-[350px] text-[14.5px] font-semibold leading-[21px] text-[#0F1725]">{before}
        <span className="whitespace-nowrap">{SAMPLE.domain.toUpperCase()}</span>
        {after}
      </h1>
      <p className="mt-[6px] max-w-[330px] text-[10.5px] leading-4 text-[#6B7280]">{SUCCESS.text}</p>
      <button
        data-tl="cta-proceed"
        className="mt-[17px] h-[37px] w-full rounded-[6px] bg-[#111827] text-[11px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-[0.99]"
      >
        {SUCCESS.proceed}
      </button>
    </div>
  );
}

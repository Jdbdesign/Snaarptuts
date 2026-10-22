/** Screen B: "Loading admin panel..." (admin.snaarp.com/admin). Pass `label={null}` for a bare spinner. */
export function LoadingScreen({ label = "Loading admin panel..." }: { label?: string | null }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white pb-[60px]">
      <span className="h-[30px] w-[30px] animate-spin rounded-full border-[2.5px] border-[#E7E3F2] border-t-brand" />
      {label && <p className="mt-5 text-[14px] text-muted">{label}</p>}
    </div>
  );
}

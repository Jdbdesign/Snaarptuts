import { notFound } from "next/navigation";
import { TutorialPlayer } from "@/components/player/TutorialPlayer";
import { getTutorial, tutorials } from "@/tutorials";

export function generateStaticParams() {
  return tutorials
    .flatMap((t) => [t.product.id, ...(t.product.aliases || [])])
    .map((productId) => ({ productId }));
}

export default async function TutorialPage({ params }: PageProps<"/tutorials/[productId]">) {
  const { productId } = await params;
  const tutorial = getTutorial(productId);
  if (!tutorial) notFound();
  return <TutorialPlayer key={tutorial.product.id} productId={tutorial.product.id} />;
}

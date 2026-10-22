import { notFound } from "next/navigation";
import { TutorialPlayer } from "@/components/player/TutorialPlayer";
import { getTutorial, tutorials } from "@/tutorials";

export function generateStaticParams() {
  return tutorials.map((t) => ({ productId: t.product.id }));
}

export default async function TutorialPage({ params }: PageProps<"/tutorials/[productId]">) {
  const { productId } = await params;
  if (!getTutorial(productId)) notFound();
  return <TutorialPlayer key={productId} productId={productId} />;
}

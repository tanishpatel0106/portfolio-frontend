import { Container } from "@/components/Container";
import { SingleProduct } from "@/components/Product";
import { products } from "@/constants/products";
import { Product } from "@/types/products";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const findProduct = (slug: string): Product | undefined =>
  products.find((product: Product) => product.slug === slug);

export function generateStaticParams() {
  return products
    .filter((p: Product) => p.slug)
    .map((p: Product) => ({ slug: p.slug as string }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);

  if (product) {
    return {
      title: product.title,
      description: product.description,
    };
  }
  return {
    title: "Projects",
    description: "Projects and live applications built by Tanish Patel.",
  };
}

export default async function SingleProjectPage({ params }: Props) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) {
    redirect("/projects");
  }
  return (
    <Container>
      <SingleProduct product={product} />
    </Container>
  );
}

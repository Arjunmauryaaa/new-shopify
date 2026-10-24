import type { Metadata } from "next";
import { getProductProvider } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { CartPageView } from "@/components/cart/CartPageView";

export const metadata: Metadata = {
  title: "Your Bag",
  robots: { index: false, follow: true },
};

export default async function CartPage() {
  const provider = await getProductProvider();
  const crossSellProducts = await provider.getBestsellers();

  return (
    <Container className="py-14 pb-24">
      <h1 className="font-display text-4xl sm:text-5xl">Your Bag</h1>
      <div className="mt-10">
        <CartPageView crossSellProducts={crossSellProducts.slice(0, 4)} />
      </div>
    </Container>
  );
}

import Image from "next/image";

export function CollectionHero({
  title,
  description,
  image,
  productCount,
}: {
  title: string;
  description: string;
  image?: string;
  productCount: number;
}) {
  if (image) {
    return (
      <section className="bg-ink relative flex h-[46vh] min-h-[320px] w-full items-end overflow-hidden">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-80" />
        <div className="from-ink/80 via-ink/20 absolute inset-0 bg-gradient-to-t to-transparent" />
        <div className="text-ivory relative px-5 pb-10 sm:px-8 lg:px-12">
          <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
          <p className="text-ivory/85 mt-3 max-w-lg text-sm sm:text-base">{description}</p>
          <p className="text-ivory/70 mt-2 text-xs tracking-wider uppercase">{productCount} products</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-line border-b px-5 py-14 sm:px-8 lg:px-12">
      <h1 className="font-display text-4xl sm:text-5xl">{title}</h1>
      <p className="text-charcoal mt-3 max-w-lg text-sm sm:text-base">{description}</p>
      <p className="text-charcoal-soft mt-2 text-xs tracking-wider uppercase">{productCount} products</p>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const STATS = [
  { value: 2019, label: "Founded", format: "plain" as const },
  { value: 42, label: "Countries Shipped To", suffix: "+" },
  { value: 500, label: "Thousand Customers", suffix: "K+" },
  { value: 98, label: "Would Recommend Us", suffix: "%" },
];

export function InteractiveSection() {
  return (
    <section className="bg-ink text-ivory py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="text-ivory/70 text-xs font-medium tracking-[0.25em] uppercase">In Motion</p>
          <h2 className="font-display mt-3 text-4xl sm:text-5xl">Built at Global Scale</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-4xl sm:text-5xl">
                {stat.format === "plain" ? stat.value : <Counter to={stat.value} suffix={stat.suffix} />}
              </p>
              <p className="text-ivory/70 mt-2 text-xs tracking-wider uppercase">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

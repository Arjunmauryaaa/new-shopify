import { unsplash, IMAGE_POOL } from "@/lib/images";
import type { JournalArticle } from "@/types/content";

export const MOCK_JOURNAL: JournalArticle[] = [
  {
    id: "j-1",
    slug: "designing-for-everyday-motion",
    title: "Designing for Everyday Motion",
    excerpt:
      "Inside the design brief behind the Motion 01 — how our product team balances performance engineering with a silhouette meant to be worn all day, every day.",
    content:
      "Every VELORA silhouette begins with a single question: how does this move with a body that isn't standing still? The Motion 01 started as a series of gait-analysis sketches before it was ever a shoe. Our team studied how weight travels through the foot across a normal day — walking to work, standing through a shift, sprinting for a train — and built the midsole geometry around that data rather than a single lab test.\n\nThe knit upper came later, once the sole platform was locked. We wanted a material that could flex with the forefoot on toe-off without stretching out of shape by the end of the day. It took fourteen prototype rounds to get the knit density right.\n\nThe result is a shoe that doesn't ask you to break it in. It's ready on day one, and that was the whole point.",
    image: unsplash(IMAGE_POOL.editorial[5], 1800),
    category: "Design",
    date: "2026-07-14",
    readTime: "4 min read",
  },
  {
    id: "j-2",
    slug: "the-materials-behind-shell-parka",
    title: "The Materials Behind the Shell Parka",
    excerpt:
      "A closer look at the three-layer construction, recycled insulation, and seam-sealing process that make our flagship outerwear piece genuinely weatherproof.",
    content:
      "Weatherproofing is easy to claim and hard to prove. Before the Shell Parka shipped, we ran it through 40 hours of simulated rainfall at our materials partner's facility, checking seam integrity at three-hour intervals.\n\nThe outer shell is a tightly woven recycled nylon treated with a PFC-free durable water repellent. Underneath, a fully taped seam structure prevents the pinhole leaks that cause most 'waterproof' jackets to fail after a season of wear.\n\nWe chose recycled insulation not as a marketing checkbox but because the performance data held up against virgin alternatives in independent testing. If it hadn't, we would have used something else.",
    image: unsplash(IMAGE_POOL.jackets[1], 1800),
    category: "Materials",
    date: "2026-06-22",
    readTime: "5 min read",
  },
  {
    id: "j-3",
    slug: "a-conversation-with-our-lead-pattern-maker",
    title: "A Conversation With Our Lead Pattern Maker",
    excerpt:
      "Twenty years into her career, our lead pattern maker explains why fit is the hardest problem in apparel design, and how VELORA approaches it differently.",
    content:
      "\"Most fit problems aren't really fit problems,\" she tells us. \"They're communication problems between the design intent and the factory floor.\" That's why every VELORA pattern goes through a minimum of six fit sessions on live models before a single unit is produced.\n\nWe asked what makes a garment feel considered rather than generic. Her answer was immediate: proportion. Not fabric, not price point — proportion. A hoodie that hits at the right length relative to the wearer's torso will always read as more expensive than one that doesn't, regardless of the materials used.",
    image: unsplash(IMAGE_POOL.editorial[6], 1800),
    category: "Craft",
    date: "2026-05-30",
    readTime: "6 min read",
  },
  {
    id: "j-4",
    slug: "how-we-test-running-shoes",
    title: "How We Test Running Shoes",
    excerpt:
      "From lab-based impact testing to a 500-runner field trial, here's the process every VELORA running silhouette goes through before release.",
    content:
      "Before a running shoe reaches the field-test stage, it has already been through mechanical impact testing simulating over 300 miles of wear. Only silhouettes that hold their cushioning response within an acceptable range move forward.\n\nField testing is where the real signal comes from. We recruit runners across pace ranges — not just elite athletes — because the majority of people running in our shoes are training for a 10K, not qualifying for Boston. Feedback from that broader group has changed our midsole geometry more than any lab result.",
    image: unsplash(IMAGE_POOL.running[2], 1800),
    category: "Performance",
    date: "2026-05-09",
    readTime: "5 min read",
  },
  {
    id: "j-5",
    slug: "building-a-wardrobe-that-lasts",
    title: "Building a Wardrobe That Lasts",
    excerpt:
      "Our founder's notes on designing fewer, better pieces — and why VELORA has resisted the pressure to release seasonal collections on a fast-fashion timeline.",
    content:
      "We release two core collections a year, not six. That's a deliberate constraint. Every additional collection cycle pushes production timelines that make it harder to hold to the quality standards we started the company on.\n\nThe pieces that stay in our range the longest — the Signature Tee, the Essential Hoodie, the Motion 01 — aren't reinvented every season. They're refined. Small adjustments to fit, fabric weight, or construction based on wear data, rather than a full redesign for the sake of novelty.",
    image: unsplash(IMAGE_POOL.editorial[7], 1800),
    category: "Brand",
    date: "2026-04-18",
    readTime: "4 min read",
  },
  {
    id: "j-6",
    slug: "packing-for-a-week-in-motion",
    title: "Packing for a Week in Motion",
    excerpt:
      "A field guide to building a capsule travel wardrobe from the VELORA range — five pieces that layer across climates and occasions.",
    content:
      "A well-built capsule starts with the outer layer. The Aero Windbreaker packs down to the size of a water bottle and covers everything from a chilly flight to an unexpected evening downpour.\n\nFrom there, build inward: the Ribbed Long Sleeve as a base layer, the Signature Tee for warm days, the Essential Hoodie for transit, and one pair of the Drift Low that works from a morning meeting to an evening walk. Five pieces, every scenario covered.",
    image: unsplash(IMAGE_POOL.editorial[8], 1800),
    category: "Guides",
    date: "2026-03-27",
    readTime: "3 min read",
  },
];

import { poolImages } from "@/lib/images";
import { slugify } from "@/lib/utils";
import type { Product, ProductColor, ProductVariant } from "@/types/product";

const SHOE_SIZES = ["38", "39", "40", "41", "42", "43", "44", "45"];
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const ONE_SIZE = ["One Size"];

function buildVariants(
  handle: string,
  colors: ProductColor[],
  sizes: string[],
  price: number,
  compareAtPrice: number | undefined,
  unavailable: string[] = []
): ProductVariant[] {
  const variants: ProductVariant[] = [];
  for (const color of colors) {
    for (const size of sizes) {
      const id = `${handle}-${slugify(color.name)}-${slugify(size)}`;
      variants.push({
        id,
        title: `${color.name} / ${size}`,
        price,
        compareAtPrice,
        available: !unavailable.includes(id),
        color: color.name,
        size,
        sku: id.toUpperCase(),
      });
    }
  }
  return variants;
}

interface Seed {
  handle: string;
  title: string;
  category: Product["category"];
  tags: string[];
  description: string;
  price: number;
  compareAtPrice?: number;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  inventory: number;
  materials: string[];
  careInstructions: string[];
}

const BLACK: ProductColor = { name: "Black", hex: "#111112" };
const WHITE: ProductColor = { name: "White", hex: "#F5F3EF" };
const SAND: ProductColor = { name: "Sand", hex: "#C9B79C" };
const STONE: ProductColor = { name: "Stone", hex: "#A8A399" };
const CHARCOAL: ProductColor = { name: "Charcoal", hex: "#3A3A3C" };
const OLIVE: ProductColor = { name: "Olive", hex: "#5C5A44" };
const RUST: ProductColor = { name: "Rust", hex: "#A85C32" };
const NAVY: ProductColor = { name: "Navy", hex: "#1F2937" };
const CREAM: ProductColor = { name: "Cream", hex: "#EDE6D6" };
const SILVER: ProductColor = { name: "Silver", hex: "#C7C9CC" };

const SEEDS: Seed[] = [
  // SNEAKERS
  {
    handle: "velora-motion-01",
    title: "VELORA Motion 01",
    category: "Sneakers",
    tags: ["sneakers", "bestseller", "unisex"],
    description:
      "The Motion 01 is our signature performance sneaker, engineered for everyday movement. A knit upper moves with the foot while a molded midsole absorbs impact without sacrificing feedback.",
    price: 149,
    compareAtPrice: 179,
    colors: [BLACK, WHITE, SAND],
    sizes: SHOE_SIZES,
    images: poolImages("sneakers", [0, 1, 2]),
    rating: 4.8,
    reviewCount: 214,
    featured: true,
    bestseller: true,
    inventory: 340,
    materials: ["Engineered knit upper", "Molded EVA midsole", "Recycled rubber outsole"],
    careInstructions: [
      "Wipe clean with a damp cloth",
      "Air dry away from direct heat",
      "Do not machine wash",
    ],
  },
  {
    handle: "velora-drift-low",
    title: "VELORA Drift Low",
    category: "Sneakers",
    tags: ["sneakers", "low-top", "men"],
    description:
      "A low-profile silhouette with a lightweight cupsole construction. Drift Low pairs a soft leather upper with a minimal branding language for an off-duty look that still performs.",
    price: 139,
    colors: [WHITE, BLACK, STONE],
    sizes: SHOE_SIZES,
    images: poolImages("sneakers", [3, 4, 5]),
    rating: 4.6,
    reviewCount: 128,
    newArrival: true,
    inventory: 260,
    materials: ["Full-grain leather upper", "Cupsole construction", "Cotton laces"],
    careInstructions: ["Spot clean only", "Use a suede brush for the outsole", "Store with shoe trees"],
  },
  {
    handle: "velora-aero-knit",
    title: "VELORA Aero Knit",
    category: "Sneakers",
    tags: ["sneakers", "lightweight", "women"],
    description:
      "A featherweight knit sneaker built for warm-weather movement. Ventilated construction and a sock-like fit make Aero Knit disappear on the foot.",
    price: 129,
    colors: [BLACK, SAND, NAVY],
    sizes: SHOE_SIZES,
    images: poolImages("sneakers", [6, 7, 0]),
    rating: 4.5,
    reviewCount: 96,
    inventory: 180,
    materials: ["Breathable knit upper", "Sockliner", "Lightweight foam sole"],
    careInstructions: ["Hand wash cold", "Air dry only"],
  },
  {
    handle: "velora-cloudstep",
    title: "VELORA Cloudstep",
    category: "Sneakers",
    tags: ["sneakers", "cushioned", "unisex"],
    description:
      "Maximum cushioning meets minimalist design. Cloudstep uses a dual-density foam stack for an exaggerated, plush ride without adding bulk to the silhouette.",
    price: 159,
    compareAtPrice: 189,
    colors: [WHITE, CHARCOAL],
    sizes: SHOE_SIZES,
    images: poolImages("sneakers", [1, 3, 6]),
    rating: 4.7,
    reviewCount: 152,
    bestseller: true,
    inventory: 210,
    materials: ["Mesh upper", "Dual-density foam midsole", "Rubber traction pods"],
    careInstructions: ["Wipe clean with a damp cloth", "Air dry away from direct heat"],
  },
  // RUNNING SHOES
  {
    handle: "velora-pulse-runner",
    title: "VELORA Pulse Runner",
    category: "Running Shoes",
    tags: ["running", "performance", "bestseller", "men"],
    description:
      "Built for daily mileage, Pulse Runner balances responsive cushioning with a breathable engineered mesh upper. A carbon-infused plate adds a subtle propulsive snap to every stride.",
    price: 169,
    colors: [BLACK, WHITE, RUST],
    sizes: SHOE_SIZES,
    images: poolImages("running", [0, 1, 2]),
    rating: 4.9,
    reviewCount: 301,
    featured: true,
    bestseller: true,
    inventory: 275,
    materials: ["Engineered mesh upper", "Carbon-infused plate", "High-rebound foam"],
    careInstructions: ["Wipe clean with a damp cloth", "Remove insoles to air dry"],
  },
  {
    handle: "velora-velocity-2",
    title: "VELORA Velocity 2.0",
    category: "Running Shoes",
    tags: ["running", "race day", "women"],
    description:
      "Our lightest racing silhouette, rebuilt. Velocity 2.0 shaves grams without compromising the plush landing zone runners expect from VELORA running shoes.",
    price: 189,
    colors: [WHITE, NAVY],
    sizes: SHOE_SIZES,
    images: poolImages("running", [3, 4, 5]),
    rating: 4.7,
    reviewCount: 89,
    newArrival: true,
    inventory: 120,
    materials: ["Ultralight mesh upper", "Nitrogen-infused foam", "Carbon plate"],
    careInstructions: ["Spot clean only", "Air dry away from direct heat"],
  },
  {
    handle: "velora-marathon-pro",
    title: "VELORA Marathon Pro",
    category: "Running Shoes",
    tags: ["running", "long-distance", "men"],
    description:
      "Engineered for distance, Marathon Pro delivers stable, fatigue-resistant cushioning across 26.2 miles and beyond, with a wider platform for late-race confidence.",
    price: 179,
    colors: [BLACK, STONE, RUST],
    sizes: SHOE_SIZES,
    images: poolImages("running", [1, 2, 0]),
    rating: 4.8,
    reviewCount: 176,
    bestseller: true,
    inventory: 200,
    materials: ["Breathable mesh upper", "Stability foam midsole", "Durable rubber outsole"],
    careInstructions: ["Wipe clean with a damp cloth", "Air dry only"],
  },
  {
    handle: "velora-featherlight-trainer",
    title: "VELORA Featherlight Trainer",
    category: "Running Shoes",
    tags: ["running", "cross-training", "unisex"],
    description:
      "A do-everything trainer built for tempo runs, gym sessions, and recovery days alike. Featherlight Trainer is the most versatile shoe in the running range.",
    price: 149,
    colors: [WHITE, BLACK, SAND],
    sizes: SHOE_SIZES,
    images: poolImages("running", [4, 5, 3]),
    rating: 4.5,
    reviewCount: 64,
    inventory: 150,
    materials: ["Engineered knit upper", "Responsive EVA midsole"],
    careInstructions: ["Hand wash cold", "Air dry only"],
  },
  // CASUAL SHOES
  {
    handle: "velora-canvas-low",
    title: "VELORA Canvas Low",
    category: "Casual Shoes",
    tags: ["casual", "everyday", "unisex"],
    description:
      "A wardrobe staple built from heavyweight organic canvas. Canvas Low is finished with a vulcanized sole for durability that only improves with wear.",
    price: 89,
    colors: [WHITE, BLACK, OLIVE],
    sizes: SHOE_SIZES,
    images: poolImages("casual", [0, 1, 2]),
    rating: 4.4,
    reviewCount: 143,
    inventory: 310,
    materials: ["Organic cotton canvas", "Vulcanized rubber sole"],
    careInstructions: ["Machine washable, cold gentle cycle", "Air dry only"],
  },
  {
    handle: "velora-weekend-slip-on",
    title: "VELORA Weekend Slip-On",
    category: "Casual Shoes",
    tags: ["casual", "slip-on", "men"],
    description:
      "Effortless by design. The Weekend Slip-On trades laces for a knit collar and elastic gore, without giving up the tailored look of a clean minimal sneaker.",
    price: 99,
    colors: [SAND, CHARCOAL],
    sizes: SHOE_SIZES,
    images: poolImages("casual", [3, 0, 1]),
    rating: 4.3,
    reviewCount: 58,
    newArrival: true,
    inventory: 140,
    materials: ["Suede and knit upper", "Elastic side gores", "Lightweight rubber sole"],
    careInstructions: ["Spot clean only", "Use a suede brush"],
  },
  {
    handle: "velora-heritage-court",
    title: "VELORA Heritage Court",
    category: "Casual Shoes",
    tags: ["casual", "leather", "women"],
    description:
      "A tennis-inspired court shoe rebuilt in full-grain leather. Heritage Court references archival sport silhouettes with a modern, minimal finish.",
    price: 119,
    compareAtPrice: 139,
    colors: [WHITE, NAVY],
    sizes: SHOE_SIZES,
    images: poolImages("casual", [2, 3, 0]),
    rating: 4.6,
    reviewCount: 77,
    inventory: 165,
    materials: ["Full-grain leather upper", "Rubber cupsole"],
    careInstructions: ["Wipe clean with a damp cloth", "Condition leather periodically"],
  },
  // JACKETS
  {
    handle: "velora-shell-parka",
    title: "VELORA Shell Parka",
    category: "Jackets",
    tags: ["jackets", "outerwear", "bestseller", "unisex"],
    description:
      "A technical three-layer shell built for unpredictable weather. The Shell Parka is fully seam-sealed with an adjustable storm hood and internal drawcord waist.",
    price: 349,
    colors: [BLACK, OLIVE, STONE],
    sizes: APPAREL_SIZES,
    images: poolImages("jackets", [0, 1, 2]),
    rating: 4.9,
    reviewCount: 112,
    featured: true,
    bestseller: true,
    inventory: 95,
    materials: ["3-layer waterproof shell", "Sealed seams", "Recycled insulation"],
    careInstructions: ["Machine wash cold on delicate cycle", "Do not tumble dry", "Reproof periodically"],
  },
  {
    handle: "velora-aero-windbreaker",
    title: "VELORA Aero Windbreaker",
    category: "Jackets",
    tags: ["jackets", "lightweight", "men"],
    description:
      "Packable, wind-resistant, and barely there. The Aero Windbreaker folds into its own pocket and adds a protective outer layer without adding bulk.",
    price: 159,
    colors: [BLACK, WHITE, RUST],
    sizes: APPAREL_SIZES,
    images: poolImages("jackets", [3, 4, 5]),
    rating: 4.5,
    reviewCount: 88,
    newArrival: true,
    inventory: 180,
    materials: ["Ripstop nylon shell", "DWR water-resistant finish"],
    careInstructions: ["Machine wash cold", "Hang dry"],
  },
  {
    handle: "velora-wool-overcoat",
    title: "VELORA Wool Overcoat",
    category: "Jackets",
    tags: ["jackets", "outerwear", "wool", "women"],
    description:
      "An heirloom-quality overcoat cut from an Italian wool blend. Tailored for a clean silhouette that layers easily over knitwear.",
    price: 429,
    compareAtPrice: 480,
    colors: [CHARCOAL, CREAM, NAVY],
    sizes: APPAREL_SIZES,
    images: poolImages("jackets", [1, 5, 2]),
    rating: 4.8,
    reviewCount: 41,
    inventory: 60,
    materials: ["Italian wool blend", "Cupro lining", "Horn-effect buttons"],
    careInstructions: ["Dry clean only"],
  },
  {
    handle: "velora-utility-bomber",
    title: "VELORA Utility Bomber",
    category: "Jackets",
    tags: ["jackets", "bomber", "men"],
    description:
      "A reinforced cotton-twill bomber with articulated sleeves and utility pockets. Built to be lived in through every season transition.",
    price: 219,
    colors: [OLIVE, BLACK, SAND],
    sizes: APPAREL_SIZES,
    images: poolImages("jackets", [4, 0, 3]),
    rating: 4.6,
    reviewCount: 67,
    inventory: 110,
    materials: ["Cotton twill shell", "Ribbed cuffs and hem"],
    careInstructions: ["Machine wash cold", "Hang dry"],
  },
  // HOODIES
  {
    handle: "velora-essential-hoodie",
    title: "VELORA Essential Hoodie",
    category: "Hoodies",
    tags: ["hoodies", "essentials", "bestseller", "unisex"],
    description:
      "The foundation of the VELORA loungewear range. A midweight fleece hoodie with a relaxed fit and a lined kangaroo pocket.",
    price: 99,
    colors: [BLACK, WHITE, STONE, CHARCOAL],
    sizes: APPAREL_SIZES,
    images: poolImages("hoodies", [0, 1, 2]),
    rating: 4.7,
    reviewCount: 268,
    featured: true,
    bestseller: true,
    inventory: 420,
    materials: ["Cotton-poly fleece blend", "Ribbed cuffs and hem"],
    careInstructions: ["Machine wash cold with like colors", "Tumble dry low"],
  },
  {
    handle: "velora-heavyweight-fleece-hoodie",
    title: "VELORA Heavyweight Fleece Hoodie",
    category: "Hoodies",
    tags: ["hoodies", "heavyweight", "men"],
    description:
      "A dense 480gsm fleece hoodie with a boxier fit, engineered for cold-weather layering without added bulk from a shell.",
    price: 119,
    colors: [BLACK, OLIVE],
    sizes: APPAREL_SIZES,
    images: poolImages("hoodies", [3, 0, 1]),
    rating: 4.8,
    reviewCount: 94,
    newArrival: true,
    inventory: 150,
    materials: ["480gsm cotton fleece", "Double-lined hood"],
    careInstructions: ["Machine wash cold", "Tumble dry low"],
  },
  {
    handle: "velora-cropped-hoodie",
    title: "VELORA Cropped Hoodie",
    category: "Hoodies",
    tags: ["hoodies", "cropped", "women"],
    description:
      "A cropped-length hoodie in brushed-back fleece, designed to pair with high-rise bottoms without excess fabric at the waist.",
    price: 94,
    colors: [SAND, BLACK, CREAM],
    sizes: APPAREL_SIZES,
    images: poolImages("hoodies", [1, 2, 3]),
    rating: 4.5,
    reviewCount: 52,
    inventory: 130,
    materials: ["Brushed-back fleece", "Ribbed cuffs and hem"],
    careInstructions: ["Machine wash cold", "Lay flat to dry"],
  },
  // T-SHIRTS
  {
    handle: "velora-signature-tee",
    title: "VELORA Signature Tee",
    category: "T-Shirts",
    tags: ["t-shirts", "essentials", "bestseller", "unisex"],
    description:
      "A heavyweight 220gsm cotton tee with a boxy, considered fit. The Signature Tee is the building block of the VELORA everyday wardrobe.",
    price: 49,
    colors: [BLACK, WHITE, STONE, NAVY],
    sizes: APPAREL_SIZES,
    images: poolImages("tshirts", [0, 1, 2]),
    rating: 4.7,
    reviewCount: 312,
    featured: true,
    bestseller: true,
    inventory: 520,
    materials: ["220gsm combed cotton"],
    careInstructions: ["Machine wash cold", "Tumble dry low"],
  },
  {
    handle: "velora-organic-cotton-tee",
    title: "VELORA Organic Cotton Tee",
    category: "T-Shirts",
    tags: ["t-shirts", "organic", "women"],
    description:
      "A lighter-weight tee spun from 100% organic cotton, garment-dyed for a soft, lived-in hand feel from the first wear.",
    price: 44,
    colors: [SAND, WHITE, RUST],
    sizes: APPAREL_SIZES,
    images: poolImages("tshirts", [3, 4, 0]),
    rating: 4.6,
    reviewCount: 118,
    newArrival: true,
    inventory: 240,
    materials: ["100% organic cotton", "Garment-dyed"],
    careInstructions: ["Machine wash cold", "Hang dry recommended"],
  },
  {
    handle: "velora-ribbed-long-sleeve",
    title: "VELORA Ribbed Long Sleeve",
    category: "T-Shirts",
    tags: ["t-shirts", "long-sleeve", "men"],
    description:
      "A close-fitting ribbed long sleeve designed to layer cleanly under jackets and overshirts, or worn on its own.",
    price: 59,
    colors: [BLACK, CREAM, CHARCOAL],
    sizes: APPAREL_SIZES,
    images: poolImages("tshirts", [2, 3, 4]),
    rating: 4.5,
    reviewCount: 61,
    inventory: 175,
    materials: ["Ribbed cotton-elastane blend"],
    careInstructions: ["Machine wash cold", "Lay flat to dry"],
  },
  // ACCESSORIES
  {
    handle: "velora-chrono-watch",
    title: "VELORA Chrono Watch",
    category: "Accessories",
    tags: ["accessories", "watch", "bestseller", "unisex"],
    description:
      "A minimalist chronograph with a brushed stainless case and sapphire crystal glass, designed to move seamlessly from the studio to the street.",
    price: 249,
    compareAtPrice: 289,
    colors: [SILVER, BLACK],
    sizes: ONE_SIZE,
    images: poolImages("accessories", [0, 1, 2]),
    rating: 4.8,
    reviewCount: 73,
    featured: true,
    bestseller: true,
    inventory: 85,
    materials: ["Stainless steel case", "Sapphire crystal glass", "Genuine leather strap"],
    careInstructions: ["Water resistant to 50m", "Avoid extreme temperatures"],
  },
  {
    handle: "velora-shield-sunglasses",
    title: "VELORA Shield Sunglasses",
    category: "Accessories",
    tags: ["accessories", "sunglasses", "unisex"],
    description:
      "Polarized shield-lens sunglasses with a lightweight acetate frame and 100% UVA/UVB protection.",
    price: 129,
    colors: [BLACK, STONE],
    sizes: ONE_SIZE,
    images: poolImages("accessories", [3, 4, 0]),
    rating: 4.4,
    reviewCount: 45,
    newArrival: true,
    inventory: 160,
    materials: ["Acetate frame", "Polarized lenses"],
    careInstructions: ["Store in included case", "Clean with microfiber cloth"],
  },
  {
    handle: "velora-transit-backpack",
    title: "VELORA Transit Backpack",
    category: "Accessories",
    tags: ["accessories", "bags", "unisex"],
    description:
      "A structured 22L backpack with a padded laptop sleeve, water-resistant shell, and magnetic quick-access pocket.",
    price: 189,
    colors: [BLACK, OLIVE],
    sizes: ONE_SIZE,
    images: poolImages("accessories", [5, 6, 0]),
    rating: 4.7,
    reviewCount: 102,
    bestseller: true,
    inventory: 140,
    materials: ["Water-resistant recycled nylon", "Padded 16-inch laptop sleeve"],
    careInstructions: ["Spot clean only", "Air dry away from direct heat"],
  },
  {
    handle: "velora-reversible-belt",
    title: "VELORA Reversible Belt",
    category: "Accessories",
    tags: ["accessories", "belt", "men"],
    description:
      "A full-grain leather belt with a reversible black/tan design and a solid brass buckle that rotates between finishes.",
    price: 79,
    colors: [BLACK, SAND],
    sizes: ["S/M", "L/XL"],
    images: poolImages("accessories", [7, 0, 1]),
    rating: 4.3,
    reviewCount: 29,
    inventory: 190,
    materials: ["Full-grain leather", "Solid brass buckle"],
    careInstructions: ["Wipe clean with a damp cloth", "Condition leather periodically"],
  },
  {
    handle: "velora-foundation-cap",
    title: "VELORA Foundation Cap",
    category: "Accessories",
    tags: ["accessories", "cap", "unisex"],
    description:
      "A structured six-panel cap in brushed cotton twill with an embroidered VELORA mark and adjustable strap closure.",
    price: 45,
    colors: [BLACK, WHITE, OLIVE],
    sizes: ONE_SIZE,
    images: poolImages("accessories", [8, 0, 1]),
    rating: 4.5,
    reviewCount: 84,
    inventory: 260,
    materials: ["Cotton twill", "Embroidered detailing"],
    careInstructions: ["Spot clean only", "Do not machine wash"],
  },
];

function seedToProduct(seed: Seed, index: number): Product {
  const variants = buildVariants(seed.handle, seed.colors, seed.sizes, seed.price, seed.compareAtPrice);
  return {
    id: `gid://velora/Product/${index + 1}`,
    handle: seed.handle,
    title: seed.title,
    description: seed.description,
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    currency: "USD",
    images: seed.images.map((url) => ({ url, alt: seed.title, width: 1600, height: 2000 })),
    thumbnail: seed.images[0],
    category: seed.category,
    tags: seed.tags,
    variants,
    colors: seed.colors,
    sizes: seed.sizes,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    featured: Boolean(seed.featured),
    bestseller: Boolean(seed.bestseller),
    newArrival: Boolean(seed.newArrival),
    inventory: seed.inventory,
    materials: seed.materials,
    careInstructions: seed.careInstructions,
    shippingNote: "Free standard shipping on orders over $150. Express shipping available at checkout.",
    returnsNote: "Free returns within 30 days of delivery. Items must be unworn with original tags attached.",
  };
}

export const MOCK_PRODUCTS: Product[] = SEEDS.map(seedToProduct);

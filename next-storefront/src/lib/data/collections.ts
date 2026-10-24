import { unsplash, IMAGE_POOL } from "@/lib/images";
import type { Collection } from "@/types/collection";

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "gid://velora/Collection/1",
    handle: "new-arrivals",
    title: "New Arrivals",
    description: "The latest additions to the VELORA range, fresh off the line.",
    image: unsplash(IMAGE_POOL.editorial[0], 2000),
  },
  {
    id: "gid://velora/Collection/2",
    handle: "best-sellers",
    title: "Best Sellers",
    description: "The pieces our community keeps coming back for.",
    image: unsplash(IMAGE_POOL.editorial[1], 2000),
  },
  {
    id: "gid://velora/Collection/3",
    handle: "men",
    title: "Men",
    description: "Footwear and apparel engineered for everyday motion.",
    image: unsplash(IMAGE_POOL.editorial[2], 2000),
  },
  {
    id: "gid://velora/Collection/4",
    handle: "women",
    title: "Women",
    description: "Considered silhouettes built for comfort and expression.",
    image: unsplash(IMAGE_POOL.editorial[3], 2000),
  },
  {
    id: "gid://velora/Collection/5",
    handle: "unisex",
    title: "Unisex",
    description: "Shared essentials designed to move between wardrobes.",
    image: unsplash(IMAGE_POOL.editorial[4], 2000),
  },
  {
    id: "gid://velora/Collection/6",
    handle: "outerwear",
    title: "Outerwear",
    description: "Technical shells and considered layers for every season.",
    image: unsplash(IMAGE_POOL.jackets[0], 2000),
  },
  {
    id: "gid://velora/Collection/7",
    handle: "accessories",
    title: "Accessories",
    description: "The finishing details, from timepieces to travel-ready bags.",
    image: unsplash(IMAGE_POOL.accessories[5], 2000),
  },
  {
    id: "gid://velora/Collection/8",
    handle: "shoes",
    title: "Footwear",
    description: "Sneakers, running shoes, and everyday footwear built to move.",
    image: unsplash(IMAGE_POOL.sneakers[2], 2000),
  },
];

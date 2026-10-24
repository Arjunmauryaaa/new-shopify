const BASE = "https://images.unsplash.com/photo-";

export function unsplash(id: string, width = 1600, quality = 80) {
  return `${BASE}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/**
 * Curated, verified Unsplash photo IDs grouped by subject.
 * Swap these for real product photography when connecting a live catalog —
 * every consumer reads through this single module.
 */
export const IMAGE_POOL = {
  sneakers: [
    "1595950653106-6c9ebd614d3a",
    "1542291026-7eec264c27ff",
    "1600185365483-26d7a4cc7519",
    "1549298916-b41d501d3772",
    "1460353581641-37baddab0fa2",
    "1491553895911-0055eca6402d",
    "1465453869711-7e174808ace9",
    "1608231387042-66d1773070a5",
  ],
  running: [
    "1606107557195-0e29a4b5b4aa",
    "1600269452121-4f2416e55c28",
    "1465479423260-c4afc24172c6",
    "1483721310020-03333e577078",
    "1571019613454-1cb2f99b2d8b",
    "1607522370275-f14206abe5d3",
  ],
  casual: [
    "1585386959984-a4155224a1ad",
    "1587563871167-1ee9c731aefb",
    "1525966222134-fcfa99b8ae77",
    "1512374382149-233c42b6a83b",
  ],
  jackets: [
    "1520256862855-398228c41684",
    "1551028719-00167b16eac5",
    "1544923246-77307dd654cb",
    "1591047139829-d91aecb6caea",
    "1591195853828-11db59a44f6b",
    "1516826957135-700dedea698c",
  ],
  hoodies: [
    "1556821840-3a63f95609a7",
    "1509942774463-acf339cf87d5",
    "1556742049-0cfed4f6a45d",
    "1620799140408-edc6dcb6d633",
  ],
  tshirts: [
    "1576566588028-4147f3842f27",
    "1521572163474-6864f9cf17ab",
    "1503341504253-dff4815485f1",
    "1554568218-0f1715e72254",
    "1622445275576-721325763afe",
  ],
  accessories: [
    "1590874103328-eac38a683ce7",
    "1611085583191-a3b181a88401",
    "1523275335684-37898b6baf30",
    "1572635196237-14b3f281503f",
    "1572635148818-ef6fd45eb394",
    "1591561954557-26941169b49e",
    "1553062407-98eeb64c6a62",
    "1560343090-f0409e92791a",
    "1611923134239-b9be5816e23c",
  ],
  editorial: [
    "1483985988355-763728e1935b",
    "1490481651871-ab68de25d43d",
    "1441984904996-e0b6ba687e04",
    "1509631179647-0177331693ae",
    "1517841905240-472988babdf9",
    "1441986300917-64674bd600d8",
    "1552346154-21d32810aba3",
    "1552374196-c4e7ffc6e126",
    "1441123694162-e54a981ceba5",
    "1525845859779-54d477ff291f",
    "1552058544-f2b08422138a",
    "1519415943484-9fa1873496d4",
    "1489824904134-891ab64532f1",
  ],
  portraits: [
    "1544005313-94ddf0286df2",
    "1531123897727-8f129e1688ce",
    "1500648767791-00dcc994a43e",
    "1544725176-7c40e5a71c5e",
    "1560250097-0b93528c311a",
    "1522075469751-3a6694fb2f61",
    "1607746882042-944635dfe10e",
    "1573497019940-1c28c88b4f3e",
    "1580489944761-15a19d654956",
  ],
} as const;

export type ImagePoolKey = keyof typeof IMAGE_POOL;

export function poolImages(key: ImagePoolKey, ids: number[], width = 1600) {
  const pool = IMAGE_POOL[key];
  return ids.map((i) => unsplash(pool[i % pool.length], width));
}

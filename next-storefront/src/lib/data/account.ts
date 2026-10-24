export interface MockOrder {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing";
  total: number;
  currency: string;
  itemCount: number;
}

export interface MockAddress {
  id: string;
  label: string;
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export const MOCK_ACCOUNT = {
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  memberSince: "2024-03-11",
  orders: [
    { id: "VEL-10021", date: "2026-07-02", status: "Delivered", total: 258, currency: "USD", itemCount: 2 },
    { id: "VEL-10015", date: "2026-06-14", status: "Shipped", total: 149, currency: "USD", itemCount: 1 },
    { id: "VEL-10002", date: "2026-05-01", status: "Delivered", total: 396, currency: "USD", itemCount: 3 },
  ] as MockOrder[],
  addresses: [
    {
      id: "addr-1",
      label: "Home",
      line1: "128 Meridian Ave",
      city: "Austin",
      region: "TX",
      postalCode: "78701",
      country: "United States",
      isDefault: true,
    },
  ] as MockAddress[],
};

"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { MOCK_ACCOUNT } from "@/lib/data/account";
import { Badge } from "@/components/ui/Badge";

const TABS = ["Orders", "Profile", "Addresses", "Settings"] as const;
type Tab = (typeof TABS)[number];

export function AccountDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Orders");

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      <aside>
        <p className="font-display text-xl">{MOCK_ACCOUNT.name}</p>
        <p className="text-charcoal-soft text-sm">{MOCK_ACCOUNT.email}</p>

        <nav className="mt-8 flex flex-col gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              aria-current={activeTab === tab}
              className={cn(
                "px-3 py-2.5 text-left text-sm transition-colors",
                activeTab === tab ? "bg-ink text-ivory" : "text-charcoal hover:bg-ivory-dim"
              )}
            >
              {tab}
            </button>
          ))}
          <Link href="/wishlist" className="text-charcoal hover:bg-ivory-dim px-3 py-2.5 text-left text-sm">
            Wishlist
          </Link>
          <Link href="/" className="text-charcoal-soft hover:bg-ivory-dim mt-4 px-3 py-2.5 text-left text-sm">
            Log Out
          </Link>
        </nav>
      </aside>

      <div>
        {activeTab === "Orders" && (
          <div>
            <h2 className="font-display text-2xl">Order History</h2>
            <div className="divide-line border-line mt-6 flex flex-col divide-y border-y">
              {MOCK_ACCOUNT.orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="text-ink text-sm font-medium">{order.id}</p>
                    <p className="text-charcoal-soft text-xs">
                      {formatDate(order.date)} &middot; {order.itemCount} item
                      {order.itemCount === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge tone={order.status === "Delivered" ? "ink" : "outline"}>{order.status}</Badge>
                    <span className="text-ink text-sm">{formatPrice(order.total, order.currency)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Profile" && (
          <div>
            <h2 className="font-display text-2xl">Profile</h2>
            <div className="mt-6 grid max-w-md gap-4">
              <Field label="Full Name" value={MOCK_ACCOUNT.name} />
              <Field label="Email" value={MOCK_ACCOUNT.email} />
              <Field label="Member Since" value={formatDate(MOCK_ACCOUNT.memberSince)} />
            </div>
          </div>
        )}

        {activeTab === "Addresses" && (
          <div>
            <h2 className="font-display text-2xl">Addresses</h2>
            <div className="mt-6 flex flex-col gap-4">
              {MOCK_ACCOUNT.addresses.map((address) => (
                <div key={address.id} className="border-line max-w-md border p-5">
                  <div className="flex items-center gap-2">
                    <p className="text-ink text-sm font-medium">{address.label}</p>
                    {address.isDefault && <Badge tone="outline">Default</Badge>}
                  </div>
                  <p className="text-charcoal mt-2 text-sm">
                    {address.line1}
                    <br />
                    {address.city}, {address.region} {address.postalCode}
                    <br />
                    {address.country}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Settings" && (
          <div>
            <h2 className="font-display text-2xl">Settings</h2>
            <div className="text-charcoal mt-6 flex max-w-md flex-col gap-4 text-sm">
              <label className="border-line flex items-center justify-between border-b pb-4">
                Order & shipping updates
                <input type="checkbox" defaultChecked className="accent-ink h-4 w-4" />
              </label>
              <label className="border-line flex items-center justify-between border-b pb-4">
                New arrivals & product news
                <input type="checkbox" defaultChecked className="accent-ink h-4 w-4" />
              </label>
              <label className="flex items-center justify-between pb-4">
                Marketing offers
                <input type="checkbox" className="accent-ink h-4 w-4" />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-charcoal-soft text-xs font-medium tracking-wider uppercase">{label}</p>
      <p className="border-line bg-card text-ink mt-1.5 border px-4 py-3 text-sm">{value}</p>
    </div>
  );
}

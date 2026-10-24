export function AnnouncementBar({ message }: { message?: string }) {
  if (!message?.trim()) return null;

  return (
    <div className="bg-ink text-ivory flex min-h-9 items-center justify-center px-4 py-2">
      <p className="text-center text-[11px] font-medium tracking-wide">{message}</p>
    </div>
  );
}

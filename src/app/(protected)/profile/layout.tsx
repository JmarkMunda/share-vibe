export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-slate-400">{children}</section>;
}

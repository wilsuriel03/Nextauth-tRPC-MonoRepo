export default function DashboardLayout(props: { children: React.ReactNode }) {
  return <main className="h-screen flex w-full items-center justify-center">{props.children}</main>;
}

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <main className="relative bg-black">
      {props.children}
    </main>
  );
}

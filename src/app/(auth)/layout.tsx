export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen p-4 flex flex-col justify-center max-w-md mx-auto">{children}</div>
  );
}

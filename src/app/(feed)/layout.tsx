import Footer from '@/widgets/footer/footer';
import NavBar from '@/widgets/navbar/navbar';

export default function Feedlayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen flex flex-col justify-between
      max-w-5xl mx-auto"
    >
      <div className="fixed top-0 left-0 right-0 bg-[#FFFF] z-10">
        <NavBar />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#FFFF] z-10 footer-father ">
        <Footer />
      </div>

      <div className="p-4 pb-[80px] pt-[70px]">{children}</div>
    </div>
  );
}

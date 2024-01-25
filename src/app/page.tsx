import {
  // Hero,
  ServicesSummary,
  ServiceDetailsLong,
  ServiceDetailsCompact,
  About,
  Subscribe,
  Partners,
  Contact,
  SearchBar,
} from "@/components/widgets/homepage";
import { headerData } from "@/config/navigation";
import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "@/components/ui/Footer";
export default function Home() {
  return (
    <>
      <Header links={headerData.links} actions={headerData.actions} />
      <main className="w-full max-w-6xl p-16 flex flex-col mx-auto">
        <p className="font-medium text-center text-primary my-2">EZTRADING</p>
        <h1 className="text-5xl font-bold text-center mb-4">
          The best way to buy and sell products
        </h1>
        <div className="w-full my-4">
          <SearchBar />
        </div>
        <div className="flex gap-4 justify-center items-center mb-16">
          <p className="font-medium">Frequently search:</p>

          {["garden tool", "home decor", "custom decor"].map((item, index) => (
            <Button
              variant="outline"
              key={index}
              asChild
              className="rounded-full bg-slate-50/30 backdrop-blur-md "
            >
              <Link href={`/search?kwd=${item}`}>{item}</Link>
            </Button>
          ))}
        </div>
        <ServicesSummary />
        {/* <About id="about" /> */}
        <Subscribe />
        {/* <Partners id="partners" /> */}
        <Contact id="contact" />
      </main>
      <Footer />
    </>
  );
}

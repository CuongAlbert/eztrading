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
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header links={headerData.links} actions={headerData.actions} />
      <div className="w-full h-[640px] relative">
        <Image
          src="/images/home-cover.avif"
          alt="Hero"
          fill
          className="object-cover"
        />
        <div className="w-full flex p-4 md:p-16 lg:p-32 flex-col gap-3 justify-center absolute top-0 left-0 h-full bg-gradient-to-r from-green-950 via-green-950/80 to-transparent to-[120%]">
          <p className="font-bold text-primary-foreground ">EZTRADING</p>
          <h1 className="text-4xl font-bold text-orange-500">
            {`A Leading B2B Gateway `}
          </h1>
          <h1 className="text-4xl font-bold text-orange-500">
            {`to Vietnam's Sustainable Supply Chain`}
          </h1>
          <div className="flex ">
            <SearchBar />
          </div>
          <div className="flex gap-4 items-center mb-16">
            <p className="font-medium text-primary-foreground">
              Frequently search:
            </p>

            {["garden tool", "home decor", "custom decor"].map(
              (item, index) => (
                <Button
                  variant="ghost"
                  key={index}
                  asChild
                  className="rounded-full bg-slate-50/30 backdrop-blur-md "
                >
                  <Link href={`/search?kwd=${item}`}>{item}</Link>
                </Button>
              ),
            )}
          </div>
        </div>
      </div>
      <main className="w-full max-w-6xl p-16 flex flex-col mx-auto my-8">
        <p className="font-bold text-center text-orange-500 my-2 uppercase">
          Welcome to EZTrading
        </p>
        <h1 className="text-5xl font-bold text-center mb-4 text-primary">
          {`Your No.1 Gateway to Vietnam's Sustainable Supply Network`}
        </h1>
        <p className="text-center text-lg text-muted-foreground mb-8">
          {`As an innovative B2B platform, EZTrading seamlessly connects global buyers with a diverse array of high-quality products sourced from Vietnam's most eco-conscious suppliers. Our commitment to sustainability is at the core of our mission, unlocking opportunities for businesses worldwide to access Vietnam's green excellence. Navigate the future of international trade with EZTrading, where sustainability, quality, and seamless connections converge to elevate your business to new heights. Explore the green horizon and make EZTrading your trusted partner in sourcing responsibly and trading with purpose.`}
        </p>

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

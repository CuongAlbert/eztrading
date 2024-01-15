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
export default function Home() {
  return (
    <>
      <Header links={headerData.links} actions={headerData.actions} />
      <main>
        <SearchBar />
        <ServicesSummary />
        {/* <ServiceDetailsLong />
        <ServiceDetailsCompact
          id="ezsupplies"
          tagline="Our services"
          title="EZSUPPLIES"
          desc="Welcome to EZSUPPLIES, where your home needs meet unparalleled variety. We've curated a home supplies store like no other, featuring everything you require, from trusted international vendors to local artisans, and spanning budget-friendly to luxurious choices."
          action={{
            text: "Get a quote",
            href: "#tally-open=wkGg16&tally-layout=modal&tally-emoji-text=👋&tally-emoji-animation=wave",
          }}
          isSolid
          image={{
            src: "/home-images/supplies.avif",
            alt: "EZSUPPLIES",
          }}
        />
        <ServiceDetailsCompact
          id="ezlist"
          tagline="Our services"
          title="EZLIST"
          desc="EZLIST is your go-to online listing service for effortless property sales and rentals. With EZLIST, you have the flexibility to either tap into our extensive network of real estate agents who can expertly list your property, or take full control by leveraging our cutting-edge listing technology. Either way, we empower you to maximize your returns and achieve faster results."
          action={{
            text: "Get a quote",
            href: "#tally-open=wkGg16&tally-layout=modal&tally-emoji-text=👋&tally-emoji-animation=wave",
          }}
          image={{
            src: "/home-images/ezlist.avif",
            alt: "EZLIST",
          }}
        /> */}
        <About id="about" />
        <Subscribe />
        <Partners id="partners" />
        <Contact id="contact" />
      </main>
    </>
  );
}

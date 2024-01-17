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
        <About id="about" />
        <Subscribe />
        <Partners id="partners" />
        <Contact id="contact" />
      </main>
    </>
  );
}

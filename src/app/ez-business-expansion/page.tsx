import {
  Contact,
  SearchBar,
  ServicesSummary,
  Subscribe,
} from "@/components/widgets/homepage";

import { Button } from "@/components/ui/button";
import { ExpansionServicesItem } from "@/components/widgets/homepage/ExpansionServicesItem";
import { EzServiceExpansion } from "@/components/widgets/homepage/EZServiceExpansion";
import { Footer } from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Image from "next/image";
import Link from "next/link";
import Marketing from "@/assets/images/marketing.webp";
import Office from "@/assets/images/office.webp";
import Partnership from "@/assets/images/partnership.webp";
import { Stream } from "stream";
import TradeRepresentative from "@/assets/images/trade-representative.webp";
import { headerData } from "@/config/navigation";

const EzBusinessExpansionPage = () => {
  return (
    <>
      <Header links={headerData.links} actions={headerData.actions} />

      <main className="w-full max-w-6xl p-4 lg:p-16 flex flex-col mx-auto my-8">
        <p className="font-bold text-center text-orange-500 my-2 uppercase">
          Welcome to EZ Business Expansion
        </p>
        <h1 className="text-4xl font-bold text-center text-primary">
          {`Your one-stop solution`}
        </h1>
        <h1 className="text-4xl font-bold text-center mb-4 text-primary">
          {`for seamless business growth and global market entry`}
        </h1>
        <p className="text-center text-lg text-muted-foreground mb-24">
          {`Our expert team is dedicated to providing tailored services that align with your expansion goals, ensuring a efficient scaling process.`}
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpansionServicesItem
            title="Incorporation & Virtual office"
            image={Office}
          >
            <p className="font-bold">Benefit</p>
            <ul className="mt-2 space-y-2 text-primary-foreground">
              {[
                "Stramlines business setup process.",
                "Offers prestigious business addresses.",
                "Reduces overhead costs significantly.",
                "Enhances company image and credibility.",
                "Provides access to global markets.",
                "Includes mail handling and forwarding services.",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 rounded-full bg-slate-900/30 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ExpansionServicesItem>
          <ExpansionServicesItem
            title="Trade representative"
            image={TradeRepresentative}
          >
            <p className="font-bold">Benefit</p>
            <ul className="mt-2 space-y-2 text-primary-foreground">
              {[
                "Facilitates entry into new markets.",
                "Offers local expertise and connections.",
                "Reduces the need for a physical presence.",
                "Enhances brand visibility and recognition.",
                "Navigates regulatory and cultural barriers.",
                "Builds trust with local customers and partners.",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 rounded-full bg-slate-900/30 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ExpansionServicesItem>
          <ExpansionServicesItem title="Marketing & branding" image={Marketing}>
            <p className="font-bold">Benefit</p>
            <ul className="mt-2 space-y-2 text-primary-foreground">
              {[
                "Creates a strong, memorable brand identity.",
                "Tailors strategies to target demographics.",
                "Leverages digital and traditional media.",
                "Enhances online presence and SEO.",
                "Drives customer engagement and loyalty.",
                "Differentiates your business from competitors.",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 rounded-full bg-slate-900/30 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ExpansionServicesItem>
          <ExpansionServicesItem
            title="Distribution & partnership"
            image={Partnership}
          >
            <p className="font-bold">Benefit</p>
            <ul className="mt-2 space-y-2 text-primary-foreground">
              {[
                "Expands your market reach efficiently.",
                "Connects with reliable local distributors.",
                "Leverages strategic partnership opportunities.",
                "Reduces logistics and supply chain costs.",
                "Enhances product availability and customer satisfaction.",
                "Provides insights into local market trends and demands.",
              ].map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 rounded-full bg-slate-900/30 backdrop-blur-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </ExpansionServicesItem>
        </section>
        <Contact id="contact" />
      </main>
      <Footer />
    </>
  );
};

export default EzBusinessExpansionPage;

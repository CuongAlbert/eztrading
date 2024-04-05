import { Button, buttonVariants } from "@/components/ui/button";
import {
  Contact,
  SearchBar,
  ServicesSummary,
  Subscribe,
} from "@/components/widgets/homepage";

import { EzServiceExpansion } from "@/components/widgets/homepage/EZServiceExpansion";
import { Footer } from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { Link } from "@/config/i18n-navigation";
import List from "@/components/widgets/productList/List";
import { getHighlightedProducts } from "@/server/products";
import { getTranslations } from "next-intl/server";
import { headerData } from "@/config/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("Home");

  const products = await getHighlightedProducts();
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
            {/* {`The First Sustainable B2B Trade Freeway `} */}
            {t("content1.title1")}
          </h1>
          <h1 className="text-4xl font-bold text-orange-500">
            {/* {`Between North America and S.E.A region`} */}
            {t("content1.title2")}
          </h1>
          <div className="flex ">
            <SearchBar
              isDark={true}
              lang={{
                placeHolder: t("search.place-holder"),
                button: t("search.button.search"),
              }}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center mb-16">
            <p className="font-medium text-primary-foreground">
              {/* Or click to search top products */}
              {t("search.title")}
            </p>
            <div className="flex gap-2 flex-wrap items-center justify-center">
              <Button
                variant="ghost"
                asChild
                className="rounded-full bg-slate-50/30 backdrop-blur-md "
              >
                <Link href={`/search`}>All product</Link>
              </Button>
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
      </div>
      <main className="w-full max-w-6xl p-4 lg:p-16 flex flex-col mx-auto my-8">
        <section className="w-full flex flex-col items-center justify-center gap-4 py-8">
          <h1 className="text-4xl font-bold text-center text-primary">
            {t("feature.title")}
          </h1>
          <List products={products.slice(0, 4)} />
          <Link href="/search" className={buttonVariants()}>
            {t("feature.button")}
          </Link>
        </section>
        <section className="w-full flex flex-col items-center justify-center gap-1 py-8">
          <div className="w-full flex flex-col items-center justify-center gap-0">
            <h1 className="text-4xl font-bold text-center text-primary">
              {t("content1.title1")}
            </h1>
            <h1 className="text-4xl font-bold text-center mb-4 text-primary">
              {t("content1.title2")}
            </h1>
          </div>
          <p className="text-center text-lg text-muted-foreground mb-24">
            {t("content1.description")}
          </p>
        </section>
        <ServicesSummary
          lang={[1, 2, 3, 4].map((l) => {
            return {
              title: t(`service.${l}.title`),
              desc: t(`service.${l}.desc`),
            };
          })}
        />
        <EzServiceExpansion />
        {/* <About id="about" /> */}
        {/* <Partners id="partners" /> */}
        <Contact id="contact" />
      </main>
      <Footer />
    </>
  );
}

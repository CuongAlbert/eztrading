import { Contact } from "@/components/widgets/homepage";
import { ExpansionServicesItem } from "@/components/widgets/homepage/ExpansionServicesItem";
import { Footer } from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Marketing from "@/assets/images/marketing.webp";
import Office from "@/assets/images/office.webp";
import Partnership from "@/assets/images/partnership.webp";
import TradeRepresentative from "@/assets/images/trade-representative.webp";
import { headerData } from "@/config/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

const EzBusinessExpansionPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations("ez-business-expansion");
  return (
    <>
      <Header
        links={headerData.links}
        actions={headerData.actions}
        locale={locale}
      />

      <main className="w-full max-w-6xl p-4 lg:p-16 flex flex-col mx-auto my-8">
        <p className="font-bold text-center text-orange-500 my-2 uppercase">
          {t("tagline")}
        </p>
        <h1 className="text-4xl font-bold text-center text-primary">
          {t("heading-line-1")}
        </h1>
        <h1 className="text-4xl font-bold text-center mb-4 text-primary">
          {t("heading-line-2")}
        </h1>
        <p className="text-center text-lg text-muted-foreground mb-24">
          {t("description")}
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpansionServicesItem
            title={t("incorporation.title")}
            image={Office}
            label={t("cta")}
          >
            <p className="font-bold">{t("benefit")}</p>
            <ul className="mt-2 space-y-2 text-primary-foreground">
              {[
                t("incorporation.benefit-1"),
                t("incorporation.benefit-2"),
                t("incorporation.benefit-3"),
                t("incorporation.benefit-4"),
                t("incorporation.benefit-5"),
                t("incorporation.benefit-6"),
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
            title={t("trade-representative.title")}
            image={TradeRepresentative}
            label={t("cta")}
          >
            <p className="font-bold">{t("benefit")}</p>
            <ul className="mt-2 space-y-2 text-primary-foreground">
              {[
                t("trade-representative.benefit-1"),
                t("trade-representative.benefit-2"),
                t("trade-representative.benefit-3"),
                t("trade-representative.benefit-4"),
                t("trade-representative.benefit-5"),
                t("trade-representative.benefit-6"),
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
            title={t("marketing-branding.title")}
            image={Marketing}
            label={t("cta")}
          >
            <p className="font-bold">{t("benefit")}</p>
            <ul className="mt-2 space-y-2 text-primary-foreground">
              {[
                t("marketing-branding.benefit-1"),
                t("marketing-branding.benefit-2"),
                t("marketing-branding.benefit-3"),
                t("marketing-branding.benefit-4"),
                t("marketing-branding.benefit-5"),
                t("marketing-branding.benefit-6"),
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
            title={t("distribution-partnership.title")}
            image={Partnership}
            label={t("cta")}
          >
            <p className="font-bold">{t("benefit")}</p>
            <ul className="mt-2 space-y-2 text-primary-foreground">
              {[
                t("distribution-partnership.benefit-1"),
                t("distribution-partnership.benefit-2"),
                t("distribution-partnership.benefit-3"),
                t("distribution-partnership.benefit-4"),
                t("distribution-partnership.benefit-5"),
                t("distribution-partnership.benefit-6"),
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

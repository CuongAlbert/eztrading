import { SignUp } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("sign-up");
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{t("title")}</h1>
          <p className="py-6">{t("desc")}</p>
        </div>

        <SignUp />
      </div>
    </div>
  );
}

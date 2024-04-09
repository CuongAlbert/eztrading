import React from "react";
import { RegisterBasicInfo } from "@/components/widgets/provider";
import { Logo } from "@/components/common";
import { unstable_setRequestLocale } from "next-intl/server";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import { pick } from "lodash";
const JoinAsPro = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations("sign-in");
  const messages = useMessages();
  return (
    <main
      className="w-full h-full flex flex-col md:flex-row p-2 md:p-8 md:justify-center items-center overflow-auto"
      style={{
        backgroundImage: "url(" + "/images/bg-pttrn.png" + ")",
        backgroundRepeat: "repeat",
        // backgroundSize: "cover",
      }}
    >
      {/* <div className=" p-8 md:p-16 flex flex-col md:flex-row gap-8 md:justify-center md:items-center"> */}
      <div className="flex flex-col w-full p-2 md:p-8 lg:max-w-2xl justify-start items-start gap-8 flex-1">
        <div>
          <Logo />
        </div>
        <div className="w-36 h-1 rounded-full bg-blue-10" />
        <div className="flex flex-col w-full flex-1">
          <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold">
            {t("title")}
          </h1>
          <p className="py-6 md:text-lg lg:text-xl">
            {t("desc")}
            <span className="font-bold">{t("span")}</span>
            {t("desc2")}
            {t("desc3")}
          </p>
        </div>
      </div>
      <div className="flex flex-row p-2 md:p-8 items-center">
        <NextIntlClientProvider messages={pick(messages, "register-box")}>
          <RegisterBasicInfo />
        </NextIntlClientProvider>
      </div>
      {/* </div> */}
    </main>
  );
};

export default JoinAsPro;

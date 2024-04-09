"use client";

import { Link } from "@/config/i18n-navigation";
import React from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export const ProSigninBox = () => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();
  const t = useTranslations("signin-box");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        strategy: "password",
        password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.log("error");
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <>
      <form onSubmit={submit}>
        <div className="flex flex-col gap-6 w-96 max-w-full rounded-lg border border-5 overflow-scroll shadow-xl border-t-4 border-t-blue-10 p-4 transition-all ease-in-out bg-blue-2 shrink-0">
          <p className="font-medium text-xl w-full text-center">{t("title")}</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-sm">
                {t("email")}
              </label>
              <input
                className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
                type="email"
                placeholder={t("email-placeholder")}
                name={t("email")}
                id="email"
                value={emailAddress}
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium text-sm">
                {t("password")}
              </label>
              <input
                className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
                type="password"
                placeholder={t("password-placeholder")}
                name={t("password")}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            {t("sign-in")}
          </button>
          <p className="text-sm text-center">
            {t("register-title")}
            <Link href="/join-as-pro" className="text-blue-700">
              {t("register")}
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

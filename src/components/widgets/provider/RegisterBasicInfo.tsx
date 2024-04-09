"use client";

import { Link } from "@/config/i18n-navigation";
import { NewProvider } from "@/types/provider";
import React from "react";
import { createProvider } from "@/server/providers";
import { set } from "sanity";
import { useRouter } from "@/config/i18n-navigation";
import { useSignUp } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

// import { ClerkAPIErrorJSON } from "@clerk/types";

export const RegisterBasicInfo = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [code, setCode] = React.useState("");
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const [isSubmittingCode, setIsSubmittingCode] = React.useState(false);
  const [formInputError, setFormInputError] = React.useState("");
  const [codeError, setCodeError] = React.useState("");

  const t = useTranslations("register-box");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormInputError("");
    if (!isLoaded) return;

    setIsSubmittingForm(true);
    try {
      await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
          company,
          phone,
          username,
        },
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
      setIsSubmittingForm(false);
    } catch (err: any) {
      console.error("Error:", err.errors[0], JSON.stringify(err, null, 2));
      setIsSubmittingForm(false);
      setFormInputError(err.errors[0].longMessage);
    }
  };

  // This function will handle the user submitting a code for verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError("");
    if (!isLoaded) return;

    try {
      setIsSubmittingCode(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // const slug = (completeSignUp.unsafeMetadata.company as string)
        //   .toLowerCase()
        //   .replace(/[^a-z0-9]/g, "-") // Remove special characters
        //   .concat(new Date().getTime().toString())
        //   .slice(0, 200);
        // Redirect the user to a post sign-up route
        const newProvider: NewProvider = {
          email: completeSignUp.emailAddress as string,
          phone: completeSignUp.unsafeMetadata.phone as string,
          username: completeSignUp.unsafeMetadata.username as string,
          authProviderId: completeSignUp.createdUserId as string,
          // slug: slug,

          company: completeSignUp.unsafeMetadata.company as string,
        };
        await createProvider(newProvider);

        setIsSubmittingCode(false);
        router.push("/provider/my-profile");
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(err, null, 2));
      setIsSubmittingCode(false);
      setCodeError(err.errors[0].longMessage);
    }
  };

  if (isSubmittingForm) {
    return (
      <div className="flex flex-col gap-6 w-96 max-w-full rounded-lg border border-5 overflow-scroll shadow-xl border-t-4 border-t-blue-600 p-16 transition-all ease-in-out bg-blue-50 shrink-0">
        <div className="flex w-full items-center justify-center">
          <div className="loading loading-spinner loading-lg bg-blue-8" />
        </div>
        <p className="text-xl text-center text-slate-11">
          {t("submit-create")}
        </p>
      </div>
    );
  }

  if (isSubmittingCode) {
    return (
      <div className="flex flex-col gap-6 w-96 max-w-full rounded-lg border border-5 overflow-scroll shadow-xl border-t-4 border-t-blue-600 p-16 transition-all ease-in-out bg-blue-50 shrink-0">
        <div className="flex w-full items-center justify-center">
          <div className="loading loading-spinner loading-lg bg-blue-8" />
        </div>
        <p className="text-xl text-center text-slate-11">{t("submit-email")}</p>
      </div>
    );
  }

  if (verifying) {
    return (
      <form onSubmit={handleVerify}>
        <div className="flex flex-col gap-6 w-96 max-w-full rounded-lg border border-5 overflow-scroll shadow-xl border-t-4 border-t-blue-600 p-4 transition-all ease-in-out bg-blue-50 shrink-0">
          <p className="font-medium text-xl w-full text-center">
            {t("verify-email")}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="font-medium text-sm">
                {t("verify-code")}
              </label>
              <input
                className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
                type="text"
                placeholder="Enter the code from the email"
                name="code"
                id="code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            {t("verify")}
          </button>
          {codeError !== "" && (
            <p className="text-red-600 text-sm text-center">{codeError}</p>
          )}
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 w-96 max-w-full rounded-lg border border-5 overflow-scroll shadow-xl border-t-4 border-t-blue-600 p-4 transition-all ease-in-out bg-blue-50 shrink-0">
        <p className="font-medium text-xl w-full text-center">{t("title")}</p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="font-medium text-sm">
              {t("company")}
            </label>
            <input
              className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
              type="text"
              placeholder={t("company-placeholder")}
              name="company"
              id="company"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="phone" className="font-medium text-sm">
                {t("phone")}
              </label>
              <input
                className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
                placeholder="123 456 7890"
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-5" />
        <p className="font-medium text-xl w-full text-center">
          {t("account-info")}
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-sm">
              {t("your-name")}
            </label>
            <input
              className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
              type="text"
              placeholder={t("name-placeholder")}
              name="username"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-sm">
              {t("email")}
            </label>
            <input
              className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
              type="email"
              placeholder={t("email-placeholder")}
              name="email"
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
              name="password"
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
          {t("register")}
        </button>
        {formInputError !== "" && (
          <p className="text-red-600 text-sm">{formInputError}</p>
        )}
        <p className="text-sm text-center">
          {t("signin-title")}
          <Link href="/sign-in" className="text-blue-700">
            {t("sign-in")}
          </Link>
        </p>
      </div>
    </form>
  );
};

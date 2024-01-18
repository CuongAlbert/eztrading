"use client";
import React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ProSigninBox = () => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

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
        router.push("/provider/my-profile");
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
          <p className="font-medium text-xl w-full text-center">
            Sign-in as provider
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium text-sm">
                Email
              </label>
              <input
                className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
                type="email"
                placeholder="Your email address"
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
                Password
              </label>
              <input
                className="py-2 px-4 bg-transparent w-full border border-slate-5 rounded-md"
                type="password"
                placeholder="Your password"
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
            Sign in
          </button>
          <p className="text-sm text-center">
            {"Don't have an account? "}
            <Link href="/join-as-pro" className="text-blue-700">
              Register now
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
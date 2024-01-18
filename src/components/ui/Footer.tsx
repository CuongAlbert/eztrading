import React from "react";
import { Logo } from "../common";
import Link from "next/link";

export const Footer = () => {
  return (
    <section className="relative w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center items-center border border-t-slate-5">
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <Logo />
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <Link className="link link-hover" href="/home-inspection">
            Home Inspection
          </Link>
          <Link className="link link-hover" href="/#home-insurance">
            Home Insurance
          </Link>
          <Link className="link link-hover" href="/#rental-unit-protection">
            Rental Unit Protection
          </Link>
          <Link className="link link-hover" href="/#ezsupplies">
            EZSUPPLIES
          </Link>
          <Link className="link link-hover" href="/#ezlist">
            EZLIST
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <Link className="link link-hover" href="/#about">
            About us
          </Link>
          <Link className="link link-hover" href="/#contact">
            Contact
          </Link>
          <Link className="link link-hover" href="/#partners">
            Partner
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <Link className="link link-hover" href="/">
            Terms of use
          </Link>
          <Link className="link link-hover" href="/">
            Privacy policy
          </Link>
        </nav>
      </footer>
      <div>
        <span className="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://www.rezza.io/favicon.ico)]"></span>
        Power by{" "}
        <Link
          className="text-blue-600 hover:underline"
          href="https://rezza.io/"
        >
          Rezza
        </Link>{" "}
        · All rights reserved.
      </div>
    </section>
  );
};

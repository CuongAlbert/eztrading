export const headerData = {
  links: [
    { text: "home", href: "/" },
    {
      text: "services",
      href: "/ez-business-expansion",
    },
    {
      text: "list",
      href: "/search",
    },
  ],
  actions: [
    {
      text: "action",
      href: "/sign-in",
    },
  ],
};

export const footerData = {
  links: [
    {
      title: "Services",
      links: [
        { text: "EZPROTECT", href: "/#ezprotect" },
        { text: "EZSUPPLIES", href: "/#ezsupplies" },
        { text: "EZLIST", href: "/#ezlist" },
      ],
    },

    {
      title: "Support",
      links: [{ text: "Contact us", href: "/#contact" }],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "/#about" },
        { text: "Partner", href: "/#partner" },
      ],
    },
  ],
  secondaryLinks: [
    { text: "Terms", href: "/terms" },
    { text: "Privacy Policy", href: "/privacy" },
  ],
  socialLinks: [
    // { ariaLabel: "X", icon: "tabler:brand-x", href: "#" },
    // { ariaLabel: "Instagram", icon: "tabler:brand-instagram", href: "#" },
    {
      ariaLabel: "Facebook",
      icon: "tabler:brand-facebook",
      href: "https://www.facebook.com/ezhouzedotca",
    },

    {
      ariaLabel: "Linkedin",
      icon: "tabler:brand-linkedin",
      href: "https://www.linkedin.com/company/ezhouze",
    },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://www.rezza.io/favicon.ico)]"></span>
    Power by <a class="text-blue-600 hover:underline dark:text-gray-200" href="https://rezza.io/"> Rezza</a> · All rights reserved.
  `,
};

export const providerHeader = {
  links: [
    { text: "home", href: "/" },
    {
      text: "profile",
      href: "/provider/my-profile",
    },
    {
      text: "my-list",
      href: "/provider/products",
    },
  ],
  actions: [
    {
      text: "action",
      href: "/join-as-pro",
    },
  ],
};

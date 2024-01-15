// "use client";
// import React, { useContext } from "react";
// import { ProviderInfo } from "@/types/provider";
// // import { QuestionnaireContext } from "@/ctx";

// interface GetQuoteButtonProps {
//   variant?: "primary" | "secondary" | "outline";
//   label?: string;
//   provider: ProviderInfo;
// }

// export const GetQuoteButton: React.FC<GetQuoteButtonProps> = ({
//   variant = "primary",
//   label = "Get Quote",
//   provider,
// }) => {
//   // const { openQuestionnaire } = useContext(QuestionnaireContext);
//   const variantStyle = {
//     primary: "btn-primary",
//     secondary: "btn-secondary",
//     outline: "btn-outline",
//   };
//   return (
//     <button
//       className={`btn w-full flex-1 ${variantStyle[variant]}`}
//       // onClick={() => openQuestionnaire(provider)}
//     >
//       {label}
//     </button>
//   );
// };

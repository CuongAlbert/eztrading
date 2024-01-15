import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "tertiary" | "link";
  children: React.ReactNode;
  target?: string;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  target,
  className,
  onClick,
}) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn btn-tertiary",
    link: "cursor-pointer hover:text-primary",
  };
  return (
    <div
      className={`${variants[variant]} ${className ? className : ""}`}
      {...(target ? { target: target, rel: "noopener noreferrer" } : {})}
      //   target= {target ? target : ""}
      //   rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

import React from "react";

interface RequestEmailTemplateProps {
  name: string;
  message: string;
  product: string;
  phone: string;
  email: string;
  count: string;
}

export const RequestEmailTemplate = ({
  name,
  phone,
  email,
  product,
  count,
  message,
}: RequestEmailTemplateProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center flex flex-col">
        {`${name} has a request`}
      </h1>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">Name: {name}</p>
        <p className="text-muted-foreground">Email: {email}</p>
        <p className="text-muted-foreground">Phone: {phone}</p>
        <p className="text-muted-foreground">Their request: {message}</p>
        <p className="text-muted-foreground">Product name: {product}</p>
        <p className="text-muted-foreground">Count: {count}</p>
      </div>
    </div>
  );
};

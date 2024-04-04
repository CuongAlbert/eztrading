"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { sendRequest } from "@/server/send-request";
import { useTranslations } from "next-intl";

interface SendRequestProps {
  product: string;
}

export const SendRequest = ({ product }: SendRequestProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [count, setCount] = React.useState("");

  const t = useTranslations("product-detail.request-form");

  const handleSendRequest = async () => {
    const data = {
      name,
      email,
      phone,
      message,
      product,
      count,
    };

    await sendRequest(data);
    setIsSuccess(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const openChangeHandler = (open: boolean) => {
    if (!open && isSuccess) {
      setIsSuccess(false);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
    setIsOpen(open);
  };
  return (
    <Dialog open={isOpen} onOpenChange={openChangeHandler}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-700">
          {t("btn-send")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          {!isSuccess && (
            <DialogDescription>{t("description")}</DialogDescription>
          )}
        </DialogHeader>
        {isSuccess && (
          <div className="flex flex-col justify-center items-center gap-8">
            <EnvelopeIcon className="w-16 h-16" />
            <h1 className="text-lg font-medium text-center">
              {t("thank-you")}
            </h1>
          </div>
        )}
        {!isSuccess && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="count">{t("form-count")}</Label>
              <Input
                id="count"
                value={count}
                className="w-full"
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name">{t("form-name")}</Label>
              <Input
                id="name"
                value={name}
                className="w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="email">{t("form-email")}</Label>
              <Input
                id="email"
                value={email}
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="phone">{t("form-phone")}</Label>
              <Input
                id="phone"
                value={phone}
                className="w-full"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="message">{t("form-message")}</Label>
              <Textarea
                id="message"
                value={message}
                className="w-full"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          {!isSuccess && (
            <Button variant={"default"} onClick={handleSendRequest}>
              {t("btn-send")}
            </Button>
          )}
          {isSuccess && <Button onClick={handleClose}>{t("btn-close")}</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

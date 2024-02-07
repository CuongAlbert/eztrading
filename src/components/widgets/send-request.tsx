"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendRequest } from "@/server/send-request";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

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
          Send Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Request</DialogTitle>
          {!isSuccess && (
            <DialogDescription>
              Please provide a few details about your request so we can serve
              you better
            </DialogDescription>
          )}
        </DialogHeader>
        {isSuccess && (
          <div className="flex flex-col justify-center items-center gap-8">
            <EnvelopeIcon className="w-16 h-16" />
            <h1 className="text-lg font-medium text-center">
              Thank you for your request. We will get back to you soon.
            </h1>
          </div>
        )}
        {!isSuccess && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="count">Number of items</Label>
              <Input
                id="count"
                value={count}
                className="w-full"
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                className="w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                className="w-full"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="message">Message</Label>
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
              Send Request
            </Button>
          )}
          {isSuccess && <Button onClick={handleClose}>Close</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

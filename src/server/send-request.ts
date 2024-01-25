"use server";
import { Resend } from "resend";
import { RequestEmailTemplate } from "@/components/request-email-template";
import { ApiResponse } from "@/types/common";
interface SendRequestProps {
  name: string;
  product: string;
  message: string;
  count: string;
  phone: string;
  email: string;
}

export const sendRequest = async (
  srcData: SendRequestProps,
): Promise<ApiResponse<any>> => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log("data", srcData);
  try {
    const res = await resend.emails.send({
      from: "customer-request@settle-buddies.vuadu.net",
      to: "thanhvuttv@gmail.com",
      subject: `${srcData.name} has a request to EZTRADING`,
      react: RequestEmailTemplate({
        ...srcData,
      }),
    });
    if (!res) throw new Error("Can't send request");
    console.log(res);
    return {
      success: true,
      data: [res],
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Can't send request now",
    };
  }
};

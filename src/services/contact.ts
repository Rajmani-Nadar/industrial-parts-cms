import { fetchAPI } from "@/lib/fetchAPI";

export interface ContactEnquiryInput {
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  product?: string | number | null;
}

export interface ContactEnquiryResponse {
  id?: number | string;
  attributes?: {
    name?: string;
    companyName?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    product?: { id?: number | string } | null;
  };
}

export interface ContactEnquiryResult {
  success: boolean;
  message: string;
  data?: ContactEnquiryResponse | null;
}

export async function submitContactEnquiry(data: ContactEnquiryInput): Promise<ContactEnquiryResult> {
  const payload: Record<string, unknown> = {
    data: {
      name: data.name,
      companyName: data.companyName ?? "",
      email: data.email,
      phone: data.phone ?? "",
      subject: data.subject,
      message: data.message,
      ...(data.product !== null && data.product !== undefined && data.product !== ""
        ? { product: Number(data.product) || data.product }
        : {}),
    },
  };

  const response = await fetchAPI<{ data?: ContactEnquiryResponse | null }>('/contact-enquiries', {
    method: "POST",
    body: payload,
  });

  if (!response) {
    throw new Error("Unable to submit your enquiry right now. Please try again later.");
  }

  if (!response.data) {
    throw new Error("The server did not return a valid enquiry response.");
  }

  return {
    success: true,
    message: "Your enquiry has been submitted successfully.",
    data: response.data,
  };
}

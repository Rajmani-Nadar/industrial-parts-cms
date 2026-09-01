import { fetchAPI } from "@/lib/fetchAPI";

export interface ContactEnquiryInput {
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  product?: string;
}

export interface ContactEnquiryResult {
  success: boolean;
  message: string;
}

export async function submitContactEnquiry(data: ContactEnquiryInput): Promise<ContactEnquiryResult> {
  const payload = {
    name: data.name,
    companyName: data.companyName ?? "",
    email: data.email,
    phone: data.phone ?? "",
    subject: data.subject,
    message: data.message,
    product: data.product ?? "",
  };

  const response = await fetchAPI<{ data?: { id?: number | string } }>("/contact-enquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (response?.data) {
    return {
      success: true,
      message: "Your enquiry has been submitted successfully.",
    };
  }

  return {
    success: false,
    message: "Unable to submit your enquiry right now. Please try again later.",
  };
}

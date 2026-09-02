export type ContactInquiryType =
  | "Sales Enquiries"
  | "Technical Support"
  | "Spare Parts Team"
  | "International Business";

export interface ContactMethod {
  title: ContactInquiryType;
  description: string;
  email: string;
  phone: string;
  hours: string;
  icon: "sales" | "support" | "parts" | "global";
}

export interface ContactInfoBlock {
  label: string;
  value: string;
  hint?: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

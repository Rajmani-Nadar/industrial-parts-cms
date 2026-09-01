import { z } from "zod";

export const RFQUrgencyOptions = [
  "Standard",
  "Urgent",
  "Critical outage",
  "Project deadline",
] as const;

export type RFQUrgency = (typeof RFQUrgencyOptions)[number];

export const rfqFormSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  contactPerson: z.string().min(2, "Contact person is required."),
  businessEmail: z.string().email("Enter a valid business email."),
  phoneNumber: z.string().min(7, "Phone number is required."),
  country: z.string().min(2, "Country is required."),
  city: z.string().min(2, "City is required."),
  productCategory: z.string().min(2, "Product category is required."),
  productName: z.string().min(2, "Product name is required."),
  partNumber: z.string().optional().or(z.literal("")),
  compatibleEngine: z.string().optional().or(z.literal("")),
  quantity: z.string().min(1, "Quantity is required."),
  preferredBrand: z.string().optional().or(z.literal("")),
  requiredDeliveryDate: z.string().optional().or(z.literal("")),
  industry: z.string().min(2, "Industry is required."),
  application: z.string().min(2, "Application is required."),
  message: z.string().min(10, "Tell us more about your technical requirement."),
  urgency: z.enum(RFQUrgencyOptions),
  attachmentName: z.string().optional().or(z.literal("")),
  productHint: z.string().optional().or(z.literal("")),
});

export type RFQFormValues = z.infer<typeof rfqFormSchema>;

export interface RFQSubmissionPayload extends RFQFormValues {
  submittedAt: string;
  source: "website";
}

export interface RFQSubmissionResult {
  success: boolean;
  reference: string;
  message: string;
}

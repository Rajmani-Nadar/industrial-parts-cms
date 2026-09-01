import type { RFQFormValues, RFQSubmissionPayload, RFQSubmissionResult } from "@/types/rfq";

const MOCK_REFERENCE_PREFIX = "RFQ";

export async function submitRFQ(payload: RFQFormValues): Promise<RFQSubmissionResult> {
  const submissionPayload: RFQSubmissionPayload = {
    ...payload,
    submittedAt: new Date().toISOString(),
    source: "website",
  };

  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!submissionPayload.businessEmail || !submissionPayload.companyName) {
    throw new Error("Missing required RFQ details.");
  }

  const ref = `${MOCK_REFERENCE_PREFIX}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  console.info("[RFQ Draft Submitted]", submissionPayload);

  return {
    success: true,
    reference: ref,
    message: "Your RFQ has been received.",
  };
}

export function getRFQProductFromSearch(searchParam?: string | null) {
  if (!searchParam) return "";

  return decodeURIComponent(searchParam)
    .replace(/\+/g, " ")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim();
}

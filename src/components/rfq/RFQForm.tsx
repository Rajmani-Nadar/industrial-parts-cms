"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Paperclip, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getRFQProductFromSearch, submitRFQ } from "@/lib/rfq-api";
import { RFQFormValues, RFQUrgencyOptions, rfqFormSchema } from "@/types/rfq";

const steps = [
  { label: "Company Details", description: "Tell us about your business" },
  { label: "Product Requirements", description: "Define the required parts" },
  { label: "Project Details", description: "Share technical context" },
  { label: "Review", description: "Confirm and submit" },
] as const;

const categoryOptions = [
  "Engine Braking Systems",
  "Bleeder Brakes",
  "Generator Accessories",
  "ATS Controllers",
  "AVR Modules",
  "Diesel Engine Spare Parts",
  "Sensors",
  "Wiring Harnesses",
  "Heavy Duty Components",
];

const industryOptions = [
  "Manufacturing",
  "Power Generation",
  "Mining",
  "Logistics",
  "Infrastructure",
  "Marine",
  "Oil & Gas",
  "Agriculture",
  "Other",
];

const fieldClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-100";

export function RFQForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reference, setReference] = useState("RFQ-000000");

  const defaultValues = useMemo<RFQFormValues>(() => {
    const product = getRFQProductFromSearch(searchParams.get("product"));

    return {
      companyName: "",
      contactPerson: "",
      businessEmail: "",
      phoneNumber: "",
      country: "",
      city: "",
      productCategory: "",
      productName: product,
      partNumber: "",
      compatibleEngine: "",
      quantity: "",
      preferredBrand: "",
      requiredDeliveryDate: "",
      industry: "",
      application: "",
      message: "",
      urgency: "Standard",
      attachmentName: "",
      productHint: product,
    };
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<RFQFormValues>({
    resolver: zodResolver(rfqFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const watchedValues = watch();

  const nextStep = async () => {
    let fieldsByStep: Array<keyof RFQFormValues> = [];

    if (step === 0) {
      fieldsByStep = [
        "companyName",
        "contactPerson",
        "businessEmail",
        "phoneNumber",
        "country",
        "city",
      ];
    } else if (step === 1) {
      fieldsByStep = [
        "productCategory",
        "productName",
        "partNumber",
        "compatibleEngine",
        "quantity",
        "preferredBrand",
        "requiredDeliveryDate",
      ];
    } else {
      fieldsByStep = ["industry", "application", "message", "urgency"];
    }

    const valid = await trigger(fieldsByStep);
    if (valid) setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const onSubmit = async (data: RFQFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitRFQ(data);
      setReference(result.reference);
      setIsSuccess(true);
      setStep(steps.length - 1);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit RFQ. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTextField = ({
    name,
    label,
    placeholder,
    type = "text",
    required = true,
  }: {
    name: keyof RFQFormValues;
    label: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
  }) => (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {required && <span className="ml-1 text-orange-600">*</span>}
      <input
        type={type}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={fieldClassName}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors[name] && (
        <span id={`${name}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600" role="alert">
          <AlertCircle className="h-3.5 w-3.5" />
          {errors[name]?.message as string}
        </span>
      )}
    </label>
  );

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm md:p-8">
        <div className="flex justify-center">
          <div className="rounded-full bg-emerald-100 p-4 text-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">Your RFQ has been received.</h2>
        <p className="mt-3 text-center text-slate-600">Reference number: <span className="font-semibold text-slate-900">{reference}</span></p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-400">
            Back to Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm md:p-8">
      <div className="mb-8 flex flex-wrap gap-3">
        {steps.map((item, index) => (
          <div key={item.label} className={`flex items-center gap-3 rounded-full border px-3 py-2 text-sm ${index === step ? "border-orange-400 bg-orange-50 text-orange-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${index === step ? "bg-orange-500 text-white" : "bg-slate-200 text-slate-700"}`}>
              {index + 1}
            </span>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step-1" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="grid gap-5 md:grid-cols-2">
              {renderTextField({ name: "companyName", label: "Company Name", placeholder: "Industrial Components Ltd." })}
              {renderTextField({ name: "contactPerson", label: "Contact Person", placeholder: "Alex Morgan" })}
              {renderTextField({ name: "businessEmail", label: "Business Email", type: "email", placeholder: "alex@company.com" })}
              {renderTextField({ name: "phoneNumber", label: "Phone Number", placeholder: "+1 (000) 000-0000" })}
              {renderTextField({ name: "country", label: "Country", placeholder: "United States" })}
              {renderTextField({ name: "city", label: "City", placeholder: "Houston" })}
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step-2" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Product Category
                <span className="ml-1 text-orange-600">*</span>
                <select aria-invalid={Boolean(errors.productCategory)} aria-describedby={errors.productCategory ? "productCategory-error" : undefined} className={fieldClassName} {...register("productCategory")} defaultValue="">
                  <option value="" disabled>Select category</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.productCategory && (
                  <span id="productCategory-error" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.productCategory.message}
                  </span>
                )}
              </label>

              {renderTextField({ name: "productName", label: "Product Name", placeholder: "Engine Brake Assembly" })}
              {renderTextField({ name: "partNumber", label: "Part Number", placeholder: "PN-1045-A", required: false })}
              {renderTextField({ name: "compatibleEngine", label: "Compatible Engine", placeholder: "Cummins ISX15", required: false })}
              {renderTextField({ name: "quantity", label: "Quantity", placeholder: "250 units" })}
              {renderTextField({ name: "preferredBrand", label: "Preferred Brand", placeholder: "OEM / Aftermarket", required: false })}
              {renderTextField({ name: "requiredDeliveryDate", label: "Required Delivery Date", type: "date", required: false })}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step-3" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-slate-700">
                Industry
                <span className="ml-1 text-orange-600">*</span>
                <select aria-invalid={Boolean(errors.industry)} aria-describedby={errors.industry ? "industry-error" : undefined} className={fieldClassName} {...register("industry")} defaultValue="">
                  <option value="" disabled>Select industry</option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.industry && (
                  <span id="industry-error" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600" role="alert">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {errors.industry.message}
                  </span>
                )}
              </label>

              {renderTextField({ name: "application", label: "Application", placeholder: "Generator backup system" })}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  Message / Technical Requirement
                  <span className="ml-1 text-orange-600">*</span>
                  <textarea
                    rows={5}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={fieldClassName}
                    placeholder="Describe operating conditions, performance targets, installation constraints, or required compliance."
                    {...register("message")}
                  />
                  {errors.message && (
                    <span id="message-error" className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600" role="alert">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.message.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700">
                  Attachment Upload Placeholder
                  <div className="mt-2 flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
                    <div>
                      <Paperclip className="mx-auto h-6 w-6 text-slate-400" />
                      <p className="mt-2 text-sm text-slate-600">Upload drawings, specifications or reference documents (future integration)</p>
                    </div>
                  </div>
                </label>
              </div>

              <label className="block text-sm font-medium text-slate-700 md:col-span-2">
                Urgency
                <span className="ml-1 text-orange-600">*</span>
                <Controller
                  name="urgency"
                  control={control}
                  render={({ field }) => (
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      {RFQUrgencyOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => field.onChange(option)}
                          className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${field.value === option ? "border-orange-400 bg-orange-50 text-orange-700" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
                          aria-pressed={field.value === option}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </label>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step-4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-bold text-slate-900">Review your enquiry</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {Object.entries({
                    "Company Name": watchedValues.companyName,
                    "Contact Person": watchedValues.contactPerson,
                    "Business Email": watchedValues.businessEmail,
                    "Phone Number": watchedValues.phoneNumber,
                    "Country": watchedValues.country,
                    "City": watchedValues.city,
                    "Product Category": watchedValues.productCategory,
                    "Product Name": watchedValues.productName,
                    "Part Number": watchedValues.partNumber || "—",
                    "Compatible Engine": watchedValues.compatibleEngine || "—",
                    "Quantity": watchedValues.quantity,
                    "Preferred Brand": watchedValues.preferredBrand || "—",
                    "Required Delivery Date": watchedValues.requiredDeliveryDate || "—",
                    "Industry": watchedValues.industry,
                    "Application": watchedValues.application,
                    "Urgency": watchedValues.urgency,
                  }).map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-white p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                      <p className="mt-2 text-sm font-medium text-slate-800">{String(value)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Technical details</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{watchedValues.message}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {submitError && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            <ShieldCheck className="h-4 w-4" />
            {submitError}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending RFQ
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

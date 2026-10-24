"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function handleChange(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof typeof values;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("success");
    setValues({ name: "", email: "", message: "" });
  }

  if (status === "success") {
    return (
      <div className="border-line bg-card border p-8 text-center" role="status">
        <p className="font-display text-2xl">Message sent</p>
        <p className="text-charcoal mt-2 text-sm">
          Thanks for reaching out — our team will reply within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="contact-name"
          className="text-charcoal-soft text-xs font-medium tracking-wider uppercase"
        >
          Name
        </label>
        <input
          id="contact-name"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className="border-line-strong focus-visible:ring-ink mt-2 h-12 w-full border bg-transparent px-4 text-sm focus-visible:ring-1 focus-visible:outline-none"
        />
        {errors.name && (
          <p id="contact-name-error" className="text-error mt-1.5 text-xs">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="text-charcoal-soft text-xs font-medium tracking-wider uppercase"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className="border-line-strong focus-visible:ring-ink mt-2 h-12 w-full border bg-transparent px-4 text-sm focus-visible:ring-1 focus-visible:outline-none"
        />
        {errors.email && (
          <p id="contact-email-error" className="text-error mt-1.5 text-xs">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="text-charcoal-soft text-xs font-medium tracking-wider uppercase"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="border-line-strong focus-visible:ring-ink mt-2 w-full border bg-transparent px-4 py-3 text-sm focus-visible:ring-1 focus-visible:outline-none"
        />
        {errors.message && (
          <p id="contact-message-error" className="text-error mt-1.5 text-xs">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

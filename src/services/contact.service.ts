import type { ContactInput } from "@/modules/contact";

export class ContactRequestError extends Error {}

/** Sends the contact form to our API route; throws on any non-2xx response. */
export async function sendContactMessage(input: ContactInput): Promise<void> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new ContactRequestError(`Contact request failed (${response.status})`);
}

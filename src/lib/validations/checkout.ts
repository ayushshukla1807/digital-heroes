import { z } from "zod"

export const checkoutSchema = z.object({
  plan: z.enum(["basic", "pro"]),
  billingCycle: z.enum(["monthly", "yearly"]),
  cardNumber: z.string().min(16, "Invalid card number string").regex(/^\d+$/, "Card must contain only numbers"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY"),
  cvc: z.string().min(3).max(4).regex(/^\d+$/, "CVC must be numbers"),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>

import { z } from "zod";

export const contactUsSchema = z.object({
  firstName: z.string().min(1, { message: "This field is required" }),
  lastName: z.string().min(1, { message: "This field is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  formMessage: z.string().min(1, { message: "This field is required" }),

  queryType: z.enum(["General Enquiry", "Support Request"], {
    message: "Please select a query type",
  }),

  terms: z.literal("yes", {
    errorMap: () => ({
      message: "To submit this form, please consent to being contacted",
    }),
  }),
});

export type TContactUsSchema = z.infer<typeof contactUsSchema>;

export const shadcnSchema = z.object({
  firstName: z.string().min(1, { message: "This field is required" }),
  lastName: z.string().min(1, { message: "This field is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  formMessage: z.string().min(1, { message: "This field is required" }),

  queryType: z.enum(["General Enquiry", "Support Request"], {
    message: "Please select a query type",
  }),
  terms: z.literal(true, {
    errorMap: () => ({
      message: "To submit this form, please consent to being contacted",
    }),
  }),
});

export type TShadcnSchema = z.infer<typeof shadcnSchema>;

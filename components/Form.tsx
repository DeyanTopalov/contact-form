"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "./ui/form";

const contactUsSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string(),
  queryType: z.enum(["General Enquiry", "Support Request"]),
  terms: z.literal("on"),
});

type TContactUsSchema = z.infer<typeof contactUsSchema>;
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TContactUsSchema>({ resolver: zodResolver(contactUsSchema) });

  const onSubmit = (data: TContactUsSchema) => {
    console.log(data);
    reset();
  };

  const testValue = "off";

  //   const handleValueChange = (value: string) => {
  //     // Access the register function using useFormContext
  //     const { register } = useFormContext();
  //     register("queryType")({ target: { value } }); // Update form state
  //   };

  return (
    // <FormProvider {...Form}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="firstName">First Name *</Label>
      <Input id="firstName" type="text" {...register("firstName")} />
      {errors.firstName && (
        <p className="text-red-500">{`${errors.firstName.message}`}</p>
      )}
      <Label htmlFor="lastName">Last Name *</Label>
      <Input id="lastName" type="text" {...register("lastName")} />
      {errors.lastName && (
        <p className="text-red-500">{`${errors.lastName.message}`}</p>
      )}
      <Label htmlFor="email">Email Address *</Label>
      <Input id="email" type="text" {...register("email")} />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}
      <RadioGroup id="query-type" className="mt-5" {...register("queryType")}>
        {errors.queryType && (
          <p className="text-red-500">{`${errors.queryType.message}`}</p>
        )}
        <Label htmlFor="query-type">Query Type *</Label>
        <div className="flex items-center gap-4 rounded-lg border border-gray-300 px-5 py-3">
          <RadioGroupItem value="General Enquiry" id="r1" />
          <Label htmlFor="r1">General Enquiry</Label>
        </div>
        <div className="mt-5 flex items-center gap-4 rounded-lg border border-gray-300 px-5 py-3">
          <RadioGroupItem value="Support Request" id="r2" />
          <Label htmlFor="r2">Support Request</Label>
        </div>
        {errors.lastName && (
          <p className="text-red-500">{`${errors.lastName.message}`}</p>
        )}
      </RadioGroup>
      <div className="mt-5">
        <Label htmlFor="message">Message *</Label>
        <Input
          id="message"
          type="text"
          className="h-20"
          {...register("message")}
        />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <Checkbox id="terms" {...register("terms")} />
        <Label htmlFor="terms">
          I consent to being contacted by the team *
        </Label>
        {errors.terms && (
          <p className="text-red-500">{`${errors.terms.message}`}</p>
        )}
      </div>
      <Button
        type="submit"
        className="mt-5 w-full bg-green-800 font-bold"
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
    // </FormProvider>
  );
};

export default Form;

// Basic form structure - completed
// apply reach-hook-form 50/50
// apply zod 50/50
// fix the radiogroup
// fix the checkbox value
// apply the notification
// fix styles and add layouts as per design

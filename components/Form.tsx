"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormAlert from "./FormAlert";
import { useState, useEffect } from "react";

const contactUsSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string(),
  queryType: z.enum(["General Enquiry", "Support Request"], {
    message: "Please select a query type",
  }),

  terms: z.literal("yes", {
    errorMap: () => ({ message: "You must accept the terms & conditions" }),
  }),
});

type TContactUsSchema = z.infer<typeof contactUsSchema>;
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    resetField,
    control,
  } = useForm<TContactUsSchema>({
    resolver: zodResolver(contactUsSchema),
  });

  const [displayAlert, setDisplayAlert] = useState(false);
  // state to store and reset the RadioGroup value
  const [queryValue, setQueryValue] = useState<string>("");

  useEffect(() => {
    if (displayAlert) {
      const timer = setTimeout(() => {
        setDisplayAlert(false);
      }, 1500);

      // Cleanup timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [displayAlert]);

  const onSubmit = (data: TContactUsSchema) => {
    console.log(data);
    setDisplayAlert(true);
    reset();
    setQueryValue("");
  };

  console.log("alert", displayAlert);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormAlert
        className={`${
          displayAlert === true
            ? "absolute inset-x-0 top-0 flex items-center justify-center"
            : "hidden"
        }`}
      />
      <section>
        {/* Text inputs - Personal details */}
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
      </section>

      {/* Radio buttons - Query type */}
      <Controller
        render={({ field }) => (
          <RadioGroup
            id="query-type"
            className="mt-5"
            {...field}
            value={queryValue}
            onValueChange={(value) => {
              setQueryValue(value);
              field.onChange(value);
            }}
          >
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
          </RadioGroup>
        )}
        name="queryType"
        control={control}
      />
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
        <Controller
          render={({ field }) => (
            <Checkbox
              id="terms"
              {...field}
              checked={field.value === "yes"}
              value={field.value || "no"}
              onClick={() =>
                field.onChange(field.value === "yes" ? "no" : "yes")
              }
            />
          )}
          name="terms"
          control={control}
        />

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
  );
};

export default Form;

// apply the notification
// fix styles and add layouts as per design

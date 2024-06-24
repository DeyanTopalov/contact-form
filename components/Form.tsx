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
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  email: z.string().email("Please enter a valid email address"),
  formMessage: z.string().min(1, "This field is required"),

  queryType: z.enum(["General Enquiry", "Support Request"], {
    message: "Please select a query type",
  }),

  terms: z.literal("yes", {
    errorMap: () => ({
      message: "To submit this form, please consent to being contacted",
    }),
  }),
});

type TContactUsSchema = z.infer<typeof contactUsSchema>;
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
      }, 2000);

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
        className={`px-6 ${
          displayAlert === true
            ? "absolute inset-x-0 top-0 flex items-center justify-center"
            : "hidden"
        }`}
        // className="absolute inset-x-0 top-0 flex items-center justify-center px-6"
      />
      <section>
        {/* Text inputs - Personal details */}
        <Label htmlFor="firstName" className="text-base font-normal">
          First Name *
        </Label>
        <Input
          id="firstName"
          type="text"
          className={`text-base ${errors.firstName ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
          {...register("firstName")}
          aria-describedby="firstName-error"
        />
        <div
          id="firstName-error"
          aria-live="polite"
          className="flex h-6 w-full items-center justify-start"
        >
          {errors.firstName && (
            <p className="text-clr-red text-base font-normal">{`${errors.firstName.message}`}</p>
          )}
        </div>
        <Label htmlFor="lastName" className="text-base font-normal">
          Last Name *
        </Label>
        <Input
          id="lastName"
          type="text"
          className={`text-base ${errors.lastName ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
          {...register("lastName")}
          aria-describedby="lastName-error"
        />
        <div
          id="lastName-error"
          aria-live="polite"
          className="flex h-6 w-full items-center justify-start"
        >
          {errors.lastName && (
            <p className="text-clr-red text-base font-normal">{`${errors.lastName.message}`}</p>
          )}
        </div>
        <Label htmlFor="email" className="text-base font-normal">
          Email Address *
        </Label>
        <Input
          id="email"
          type="text"
          className={`text-base ${errors.email ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
          {...register("email")}
          aria-describedby="email-error"
        />
        <div
          id="email-error"
          aria-live="polite"
          className="flex h-6 w-full items-center justify-start"
        >
          {errors.email && (
            <p className="text-clr-red text-base font-normal">{`${errors.email.message}`}</p>
          )}
        </div>
      </section>

      {/* Radio buttons - Query type */}
      <Controller
        render={({ field }) => (
          <RadioGroup
            id="queryType"
            className="mt-5"
            {...field}
            value={queryValue}
            onValueChange={(value) => {
              setQueryValue(value);
              field.onChange(value);
            }}
            aria-describedby="queryType-error"
          >
            <Label htmlFor="queryType" className="text-base font-normal">
              Query Type *
            </Label>
            <div
              className={`flex items-center gap-4 rounded-lg border px-5 py-3 ${errors.queryType ? "border-clr-red" : "border-clr-grey-500"}`}
            >
              <RadioGroupItem
                value="General Enquiry"
                id="r1"
                className={`${errors.queryType ? "border-clr-red focus-visible:ring-clr-red" : ""}`}
              />
              <Label htmlFor="r1">General Enquiry</Label>
            </div>
            <div
              className={`flex items-center gap-4 rounded-lg border px-5 py-3 ${errors.queryType ? "border-clr-red" : "border-clr-grey-500"}`}
            >
              <RadioGroupItem
                value="Support Request"
                id="r2"
                className={`${errors.queryType ? "border-clr-red focus-visible:ring-clr-red" : ""}`}
              />
              <Label htmlFor="r2">Support Request</Label>
            </div>
            <div
              id="queryType-error"
              aria-live="polite"
              className="flex h-6 w-full items-center justify-start"
            >
              {errors.queryType && (
                <p className="text-clr-red text-base font-normal">{`${errors.queryType.message}`}</p>
              )}
            </div>
          </RadioGroup>
        )}
        name="queryType"
        control={control}
      />
      <div className="mt-5">
        <Label htmlFor="formMessage" className="text-base font-normal">
          Message *
        </Label>
        <Input
          id="formMessage"
          type="text"
          className={`h-20 text-base ${errors.formMessage ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
          {...register("formMessage")}
          aria-describedby="formMessage-error"
        />
        <div
          id="formMessage-error"
          aria-live="polite"
          className="flex h-6 w-full items-center justify-start"
        >
          {errors.formMessage && (
            <p className="text-clr-red text-base font-normal">{`${errors.formMessage.message}`}</p>
          )}
        </div>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <Controller
          render={({ field }) => (
            <Checkbox
              id="terms"
              {...field}
              className={`${errors.terms ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
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

        <Label htmlFor="terms" className="text-base font-normal">
          I consent to being contacted by the team *
        </Label>
        {errors.terms && (
          <p className="text-red-500">{`${errors.terms.message}`}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-clr-green-600 mt-5 w-full font-bold"
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;

// fix styles and add layouts as per design
// refactor

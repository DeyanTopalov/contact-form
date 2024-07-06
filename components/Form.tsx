"use client";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useForm, Controller } from "react-hook-form";
import { TContactUsSchema, contactUsSchema } from "@lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormAlert from "./FormAlert";
import { useState, useEffect } from "react";

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
            ? "fixed inset-x-0 top-0 flex items-center justify-center"
            : "hidden"
        }`}
      />
      <section className="grid md:gap-4">
        {/* Text inputs - Personal details */}
        <div className="md:col-span-1">
          <Label htmlFor="firstName" className="text-base font-normal">
            First Name *
          </Label>
          <Input
            id="firstName"
            type="text"
            className={`mt-1 text-base ${errors.firstName ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
            {...register("firstName")}
            aria-describedby="firstName-error"
          />
          <div
            id="firstName-error"
            aria-live="polite"
            className="flex h-6 w-full items-center justify-start"
          >
            {errors.firstName && (
              <p className="text-base font-normal text-clr-red">{`${errors.firstName.message}`}</p>
            )}
          </div>
        </div>
        <div className="md:col-span-1">
          <Label htmlFor="lastName" className="text-base font-normal">
            Last Name *
          </Label>
          <Input
            id="lastName"
            type="text"
            className={`mt-1 text-base ${errors.lastName ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
            {...register("lastName")}
            aria-describedby="lastName-error"
          />
          <div
            id="lastName-error"
            aria-live="polite"
            className="flex h-6 w-full items-center justify-start"
          >
            {errors.lastName && (
              <p className="text-base font-normal text-clr-red">{`${errors.lastName.message}`}</p>
            )}
          </div>
        </div>
        <div className="md:col-span-2 md:-mt-4">
          <Label htmlFor="email" className="text-base font-normal">
            Email Address *
          </Label>
          <Input
            id="email"
            type="text"
            className={`mt-1 text-base ${errors.email ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
            {...register("email")}
            aria-describedby="email-error"
          />
          <div
            id="email-error"
            aria-live="polite"
            className="flex h-6 w-full items-center justify-start"
          >
            {errors.email && (
              <p className="text-base font-normal text-clr-red">{`${errors.email.message}`}</p>
            )}
          </div>
        </div>
      </section>

      {/* Radio buttons - Query type */}
      <Controller
        render={({ field }) => (
          <RadioGroup
            id="queryType"
            className="gap-0"
            {...field}
            value={queryValue}
            onValueChange={(value) => {
              setQueryValue(value);
              field.onChange(value);
            }}
            aria-describedby="queryType-error"
          >
            <Label htmlFor="queryType" className="mb-4 text-base font-normal">
              Query Type *
            </Label>
            {/* Container for radio fields */}
            <div className="grid gap-4 md:grid-cols-2">
              <div
                className={`flex items-center gap-4 rounded-lg border px-5 py-3 has-[:checked]:bg-clr-green-200 ${errors.queryType ? "border-clr-red" : "border-clr-grey-500"}`}
              >
                <RadioGroupItem
                  value="General Enquiry"
                  id="r1"
                  className={`aria-checked:text-clr-green-600 ${errors.queryType ? "border-clr-red focus-visible:ring-clr-red" : ""}`}
                />
                <Label htmlFor="r1">General Enquiry</Label>
              </div>
              <div
                className={`flex items-center gap-4 rounded-lg border px-5 py-3 has-[:checked]:bg-clr-green-200 ${errors.queryType ? "border-clr-red" : "border-clr-grey-500"}`}
              >
                <RadioGroupItem
                  value="Support Request"
                  id="r2"
                  className={`aria-checked:text-clr-green-600 ${errors.queryType ? "border-clr-red focus-visible:ring-clr-red" : ""}`}
                />
                <Label htmlFor="r2">Support Request</Label>
              </div>
            </div>
            <div
              id="queryType-error"
              aria-live="polite"
              className="flex h-6 w-full items-center justify-start"
            >
              {errors.queryType && (
                <p className="text-base font-normal text-clr-red">{`${errors.queryType.message}`}</p>
              )}
            </div>
          </RadioGroup>
        )}
        name="queryType"
        control={control}
      />
      <div className="">
        <Label htmlFor="formMessage" className="text-base font-normal">
          Message *
        </Label>
        <Textarea
          id="formMessage"
          className={`mt-1 h-[15rem] overflow-y-auto text-wrap text-left text-base md:h-[8.25rem] lg:h-[6.625rem] ${errors.formMessage ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
          {...register("formMessage")}
          aria-describedby="formMessage-error"
        />
        <div
          id="formMessage-error"
          aria-live="polite"
          className="flex h-6 w-full items-center justify-start"
        >
          {errors.formMessage && (
            <p className="text-base font-normal text-clr-red">{`${errors.formMessage.message}`}</p>
          )}
        </div>
      </div>
      <div className="my-5 grid gap-2">
        <div className="flex items-center gap-4">
          <Controller
            render={({ field }) => (
              <Checkbox
                id="terms"
                {...field}
                className={`data-[state=checked]:bg-clr-green-600 ${errors.terms ? "border-clr-red focus-visible:ring-clr-red" : "border-clr-grey-500"}`}
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
        </div>
        <div
          id="terms-error"
          aria-live="polite"
          className="flex h-auto min-h-6 w-full items-center justify-start"
        >
          {errors.terms && (
            <p className="text-base font-normal text-clr-red">{`${errors.terms.message}`}</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full cursor-pointer bg-clr-green-600 font-bold hover:bg-clr-grey-900"
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;

// classes and code clean-up
// refactor
// test

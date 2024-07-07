"use client";

import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { TShadcnSchema, shadcnSchema } from "@lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const FormShadcn = () => {
  const form = useForm<TShadcnSchema>({
    resolver: zodResolver(shadcnSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      formMessage: "",
      queryType: "General Enquiry",
      //   terms: true,
    },
  });

  const onSubmit = (values: TShadcnSchema) => {
    console.log(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid gap-2 md:gap-4">
          {/* Text inputs - Personal details */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage className="flex h-6 w-full items-center justify-start" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage className="flex h-6 w-full items-center justify-start" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage className="flex h-6 w-full items-center justify-start" />
              </FormItem>
            )}
          />
        </section>
        <section className="gap-0">
          {/* Radio Group */}
          <FormField
            control={form.control}
            name="queryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Query Type *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid gap-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="General Enquiry" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        General Enquiry
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Support Request" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Support Request
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="flex h-6 w-full items-center justify-start" />
              </FormItem>
            )}
          />
        </section>
        <FormField
          control={form.control}
          name="formMessage"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage className="flex h-6 w-full items-center justify-start" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="mt-2 flex items-center gap-2">
              <FormLabel>Terms</FormLabel>
              <FormControl className="-translate-y-1">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="flex h-6 w-full items-center justify-start" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-6 w-full cursor-pointer bg-clr-green-600 font-bold hover:bg-clr-grey-900"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormShadcn;

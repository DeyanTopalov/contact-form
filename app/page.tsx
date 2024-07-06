import Form from "@components/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormShadcn from "@components/FormShadcn";

export default function Home() {
  return (
    <section className="mt-8 grid w-full max-w-[43.125rem] rounded-2xl bg-white p-6 md:mt-32 md:max-w-[46rem] md:p-10">
      <h1 className="mb-8 text-[2rem] font-bold">Contact Us</h1>
      <Tabs defaultValue="custom">
        <TabsList>
          <TabsTrigger value="custom">custom</TabsTrigger>
          <TabsTrigger value="shadcn">shadcn</TabsTrigger>
        </TabsList>
        <TabsContent value="custom">
          <Form />
        </TabsContent>
        <TabsContent value="shadcn">
          <FormShadcn />
        </TabsContent>
      </Tabs>
    </section>
  );
}

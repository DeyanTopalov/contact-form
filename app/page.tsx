import Form from "@components/Form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormShadcn from "@components/FormShadcn";

export default function Home() {
  return (
    <section className="relative mt-8 grid w-full max-w-[43.125rem] rounded-2xl bg-white p-6 md:mt-32 md:max-w-[46rem] md:p-10">
      <Tabs defaultValue="custom">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-[2rem] font-bold">Contact Us</h1>

          <TabsList className="">
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="shadcn">Shadcn</TabsTrigger>
          </TabsList>
        </div>

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

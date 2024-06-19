import Form from "@components/Form";
import { ProfileForm } from "@components/FormTest";

export default function Home() {
  return (
    <section className="grid w-full rounded-2xl bg-white p-6">
      <h1 className="mb-8">Contact Us</h1>
      <Form />
      {/* <ProfileForm /> */}
    </section>
  );
}

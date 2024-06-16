import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const Form = () => {
  return (
    <form>
      <Label htmlFor="first-name">First Name *</Label>
      <Input id="first-name" name="first-name" type="text" />
      <Label htmlFor="last-name">Last Name *</Label>
      <Input id="last-name" name="last-name" type="text" />
      <Label htmlFor="email-address">Email Address *</Label>
      <Input id="email-address" name="email-address" type="text" />
      <RadioGroup defaultValue="">
        <div className="mt-5 flex items-center gap-4 rounded-lg border border-gray-300 px-5 py-3">
          <RadioGroupItem value="general-enquiry" id="r1" />
          <Label htmlFor="r1">General Enquiry</Label>
        </div>
        <div className="mt-5 flex items-center gap-4 rounded-lg border border-gray-300 px-5 py-3">
          <RadioGroupItem value="support-request" id="r2" />
          <Label htmlFor="r2">Support Request</Label>
        </div>
      </RadioGroup>
      <div className="mt-5">
        <Label htmlFor="message">Message *</Label>
        <Input id="message" name="message" type="text" className="h-20" />
      </div>
      <div className="mt-5 flex items-center gap-4">
        <Checkbox id="terms" name="terms" />
        <Label htmlFor="terms">
          I consent to being contacted by the team *
        </Label>
      </div>
      <Button type="submit" className="mt-5 w-full bg-green-800 font-bold">
        Submit
      </Button>
    </form>
  );
};

export default Form;

// Basic form structure - completed
// apply reach-hook-form
// apply zod
// apply notification
// fix styles and add layouts as per design

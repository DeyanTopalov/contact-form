import { CircleCheckBig } from "lucide-react";

const FormAlert = ({ className }: classNameProps) => {
  return (
    <div className={className}>
      <div className="bg-clr-grey-900 mt-6 h-full w-full max-w-[28.125rem] rounded-xl p-6 text-white">
        <div className="flex items-center justify-start gap-2">
          <CircleCheckBig className="text-white" />
          <span className="font-bold">Message Sent!</span>
        </div>
        <p className="mt-2 text-base">
          Thanks for completing the form. We&apos;ll be in touch soon!
        </p>
      </div>
    </div>
  );
};

export default FormAlert;

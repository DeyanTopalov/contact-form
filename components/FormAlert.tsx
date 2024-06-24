const FormAlert = ({ className }: classNameProps) => {
  return (
    <div className={className}>
      <div className="mt-6 h-full w-full max-w-[28.125rem] rounded-xl bg-green-800 p-6 text-white">
        <span>Message Sent!</span>
        <p>Thanks for completing the form. We'll be in touch soon!</p>
      </div>
    </div>
  );
};

export default FormAlert;

// absolute inset-x-0 top-0 flex items-center justify-center

import { Input } from "@/components/ui/input";

type FormSectionProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string; 
};

const FormSection = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
}: FormSectionProps) => (
  <div className="space-y-1">
    <label className="font-semibold text-sm">{label}</label>
    <Input
      className={`mt-1 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      required={required}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default FormSection;

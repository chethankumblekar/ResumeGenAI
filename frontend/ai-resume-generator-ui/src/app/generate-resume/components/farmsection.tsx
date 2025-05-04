import { Input } from "@/components/ui/input";

type FormSectionProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string; // Added type prop for more flexibility (default is text)
  required?: boolean; // Optional: Flag to mark fields as required
};

const FormSection = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text", // Default to 'text' if no type is passed
  required = false, // Default to false
}: FormSectionProps) => (
  <div className="space-y-2">
    <label className="font-semibold text-sm">{label}</label>
    <Input
      className="mt-1"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={type} // Allow dynamic input types (e.g., email, password, etc.)
      required={required}
    />
  </div>
);

export default FormSection;

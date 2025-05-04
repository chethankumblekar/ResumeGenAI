import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";

type EducationError = Partial<{
  institution: string;
  degree: string;
  year: string;
  description: string;
}>;

type EducationSectionProps = {
  educations: { institution: string; degree: string; year: string; description: string }[];
  onUpdateEducations: (educations: { institution: string; degree: string; year: string; description: string }[]) => void;
  errors?: EducationError[];
};

const EducationSection = ({ educations, onUpdateEducations, errors }: EducationSectionProps) => {
  const handleChange = (index: number, field: keyof typeof educations[0], value: string) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    onUpdateEducations(updatedEducations);
  };

  const handleAddEducation = () => {
    onUpdateEducations([
      ...educations,
      { institution: "", degree: "", year: "", description: "" },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    onUpdateEducations(updatedEducations);
  };

  return (
    <div>
      <label className="font-semibold text-lg">Education</label>
      <div className="space-y-4 mt-2">
        {educations.map((edu, idx) => (
          <div key={idx} className="space-y-2 border p-4 rounded-md shadow-sm">
            <div>
              <Input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleChange(idx, "institution", e.target.value)}
              />
              {errors?.[idx]?.institution && (
                <p className="text-red-500 text-sm mt-1">{errors[idx].institution}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleChange(idx, "degree", e.target.value)}
              />
              {errors?.[idx]?.degree && (
                <p className="text-red-500 text-sm mt-1">{errors[idx].degree}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleChange(idx, "year", e.target.value)}
              />
              {errors?.[idx]?.year && (
                <p className="text-red-500 text-sm mt-1">{errors[idx].year}</p>
              )}
            </div>

            <div>
              <Textarea
                placeholder="Description"
                value={edu.description}
                onChange={(e) => handleChange(idx, "description", e.target.value)}
              />
              {errors?.[idx]?.description && (
                <p className="text-red-500 text-sm mt-1">{errors[idx].description}</p>
              )}
            </div>

            <Button
              variant="link"
              onClick={() => handleRemoveEducation(idx)}
              className="text-red-500 hover:text-red-700"
            >
              Remove Education
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={handleAddEducation}
        className="mt-4 flex items-center justify-center space-x-2"
      >
        <PlusIcon className="w-4 h-4" />
        <span>Add Education</span>
      </Button>
    </div>
  );
};

export default EducationSection;

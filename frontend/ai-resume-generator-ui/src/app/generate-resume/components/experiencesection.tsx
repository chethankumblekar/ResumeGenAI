import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";

type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
};

type ExperienceError = {
  company?: string;
  role?: string;
  duration?: string;
  description?: string;
};

type ExperienceSectionProps = {
  experiences: Experience[];
  onUpdateExperiences: (experiences: Experience[]) => void;
  errors?: ExperienceError[];
};

const ExperienceSection = ({
  experiences,
  onUpdateExperiences,
  errors = [],
}: ExperienceSectionProps) => {
  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experiences];
    updated[index][field] = value;
    onUpdateExperiences(updated);
  };

  const handleAddExperience = () => {
    onUpdateExperiences([
      ...experiences,
      { company: "", role: "", duration: "", description: "" },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    onUpdateExperiences(updated);
  };

  return (
    <div>
      <label className="font-semibold text-lg">Experiences</label>
      <div className="space-y-4 mt-2">
        {experiences.map((exp, idx) => {
          const error = errors[idx] || {};
          return (
            <div key={idx} className="space-y-2 border p-4 rounded-md shadow-sm">
              <div>
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleChange(idx, "company", e.target.value)}
                  className={error.company ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {error.company && <p className="text-sm text-red-500">{error.company}</p>}
              </div>
              <div>
                <Input
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => handleChange(idx, "role", e.target.value)}
                  className={error.role ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {error.role && <p className="text-sm text-red-500">{error.role}</p>}
              </div>
              <div>
                <Input
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleChange(idx, "duration", e.target.value)}
                  className={error.duration ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {error.duration && <p className="text-sm text-red-500">{error.duration}</p>}
              </div>
              <div>
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleChange(idx, "description", e.target.value)}
                  className={error.description ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {error.description && (
                  <p className="text-sm text-red-500">{error.description}</p>
                )}
              </div>
              <Button
                variant="link"
                onClick={() => handleRemoveExperience(idx)}
                className="text-red-500 hover:text-red-700"
              >
                Remove Experience
              </Button>
            </div>
          );
        })}
      </div>

      <Button
        variant="outline"
        onClick={handleAddExperience}
        className="mt-4 flex items-center justify-center space-x-2"
      >
        <PlusIcon className="w-4 h-4" />
        <span>Add Experience</span>
      </Button>
    </div>
  );
};

export default ExperienceSection;

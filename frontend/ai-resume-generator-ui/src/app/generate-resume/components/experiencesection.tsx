import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";

type ExperienceSectionProps = {
  experiences: { company: string; role: string; duration: string; description: string }[];
  onUpdateExperiences: (experiences: { company: string; role: string; duration: string; description: string }[]) => void;
};

const ExperienceSection = ({ experiences, onUpdateExperiences }: ExperienceSectionProps) => {
  const handleChange = (index: number, field: keyof typeof experiences[0], value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    onUpdateExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    onUpdateExperiences([
      ...experiences,
      { company: "", role: "", duration: "", description: "" },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    onUpdateExperiences(updatedExperiences);
  };

  return (
    <div>
      <label className="font-semibold text-lg">Experiences</label>
      <div className="space-y-4 mt-2">
        {experiences.map((exp, idx) => (
          <div key={idx} className="space-y-2 border p-4 rounded-md shadow-sm">
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleChange(idx, "company", e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleChange(idx, "role", e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleChange(idx, "duration", e.target.value)}
              className="mb-2"
            />
            <Textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleChange(idx, "description", e.target.value)}
              className="mb-2"
            />
            <Button
              variant="link"
              onClick={() => handleRemoveExperience(idx)}
              className="text-red-500 hover:text-red-700"
            >
              Remove Experience
            </Button>
          </div>
        ))}
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SkillDto } from "@/types/resume";
import { PlusIcon } from "lucide-react";

type SkillsSectionProps = {
  skills: SkillDto[];
  onUpdateSkills: (skills: SkillDto[]) => void;
  errors?: string[]; // 🆕 Optional error messages array (per skill)
};

const SkillsSection = ({ skills, onUpdateSkills, errors = [] }: SkillsSectionProps) => {
  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index].skillName = value;
    onUpdateSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    onUpdateSkills([...skills, { skillName: "" }]);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    onUpdateSkills(updatedSkills);
  };

  return (
    <div>
      <label className="font-semibold text-lg">Skills</label>
      <div className="space-y-2 mt-2">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center space-x-2">
              <Input
                value={skill.skillName}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="Enter skill"
                className={`flex-1 ${errors[index] ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              <Button
                variant="link"
                onClick={() => handleRemoveSkill(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </Button>
            </div>
            {errors[index] && <p className="text-sm text-red-500">{errors[index]}</p>}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={handleAddSkill}
        className="mt-4 flex items-center justify-center space-x-2"
      >
        <PlusIcon className="w-4 h-4" />
        <span>Add Skill</span>
      </Button>
    </div>
  );
};

export default SkillsSection;

export type SkillDto = { skillName: string };

export type ExperienceDto = {
  company: string;
  role: string;
  duration: string;
  description: string;
};

export type EducationDto = {
  institution: string;
  degree: string;
  year: string;
  description: string;
};

export type ResumeForm = {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: SkillDto[];
  experiences: ExperienceDto[];
  educations: EducationDto[];
};

export type ExperienceError = Partial<Record<keyof ExperienceDto, string>>;
export type EducationError = Partial<Record<keyof EducationDto, string>>;


export type ResumeFormErrors = Partial<{
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: string;
  experiences: ExperienceError[];
  educations: EducationError[];
}>;

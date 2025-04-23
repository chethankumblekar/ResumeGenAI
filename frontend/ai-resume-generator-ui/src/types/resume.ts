export interface ResumeForm {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: SkillDto[];
  experiences: ExperienceDto[];
  educations: EducationDto[];
}

export interface SkillDto {
  skillName: string;
}

export interface ExperienceDto {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface EducationDto {
  institution: string;
  degree: string;
  year: string;
  description: string;
}

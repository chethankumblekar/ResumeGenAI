'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormSection from "./components/farmsection";
import SkillsSection from "./components/skillssection";
import ExperienceSection from "./components/experiencesection";
import EducationSection from "./components/educationsection";
import { resumeService } from "@/lib/resumeservice";
import type { ResumeForm } from "@/types/resume";

export default function GenerateResumePage() {
  const [form, setForm] = useState<ResumeForm>({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    skills: [{ skillName: '' }],
    experiences: [{ company: '', role: '', duration: '', description: '' }],
    educations: [{ institution: '', degree: '', year: '', description: '' }],
  });

  const updateField = <K extends keyof ResumeForm>(field: K, value: ResumeForm[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const resumeData = await resumeService.generateResume(form);
      console.log('Resume created:', resumeData);
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  return (
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="space-y-6 p-8">
          <h1 className="text-2xl font-bold">Generate Resume</h1>

          {/* Personal Information */}
          <FormSection
            label="Full Name"
            placeholder="Enter Full Name"
            value={form.fullName}
            onChange={(value) => updateField('fullName', value)}
          />
          <FormSection
            label="Email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(value) => updateField('email', value)}
          />
          <FormSection
            label="Phone"
            placeholder="Enter Phone Number"
            value={form.phone}
            onChange={(value) => updateField('phone', value)}
          />
          <FormSection
            label="Professional Summary"
            placeholder="Enter Summary"
            value={form.summary}
            onChange={(value) => updateField('summary', value)}
          />

          {/* Skills Section */}
          <SkillsSection
            skills={form.skills}
            onUpdateSkills={(newSkills) => updateField('skills', newSkills)}
          />

          {/* Experience Section */}
          <ExperienceSection
            experiences={form.experiences}
            onUpdateExperiences={(updatedExperiences) => updateField('experiences', updatedExperiences)}
          />

          {/* Education Section */}
          <EducationSection
            educations={form.educations}
            onUpdateEducations={(updatedEducations) => updateField('educations', updatedEducations)}
          />

          <Button onClick={handleSubmit} className="w-full">
            Generate Resume
          </Button>
        </CardContent>
      </Card>
  );
}

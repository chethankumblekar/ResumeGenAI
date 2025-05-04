'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormSection from "./components/farmsection";
import SkillsSection from "./components/skillssection";
import ExperienceSection from "./components/experiencesection";
import EducationSection from "./components/educationsection";
import { resumeService } from "@/lib/resumeservice";
import { useFormStore } from "@/store/farmstore";
import { ToastMessages } from "@/constants/messages";
import { toast } from 'sonner';
import { useState } from "react";
import LoadingIndicator from "@/components/shared/loader";

export default function GenerateResumePage() {

  const { form, updateField, validateForm, formErrors } = useFormStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  const isValid = validateForm();
  if (!isValid) return;

  try {
    setLoading(true)
    const resumeData = await resumeService.generateResume(form);
    if(resumeData) toast.success(ToastMessages.resume.submitSuccess);
  } catch (error) {
    toast.error(ToastMessages.resume.submitError);
    console.log(error);
  }
  finally {
    setLoading(false);
  }
};


  return (
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="space-y-6 p-8">
          <h1 className="text-2xl font-bold">Generate Resume</h1>

          <FormSection
            label="Full Name"
            placeholder="Enter Full Name"
            value={form.fullName}
            onChange={(value) => updateField('fullName', value)}
            error={formErrors.fullName}
          />

          <FormSection
            label="Email"
            placeholder="Enter Email"
            value={form.email}
            onChange={(value) => updateField('email', value)}
            error={formErrors.email}
          />
        
          <FormSection
            label="Phone"
            placeholder="Enter Phone Number"
            value={form.phone}
          onChange={(value) => updateField('phone', value)}
          error={formErrors.phone}
          />
          <FormSection
            label="Professional Summary"
            placeholder="Enter Summary"
            value={form.summary}
          onChange={(value) => updateField('summary', value)}
          error={formErrors.summary}
          />

          <SkillsSection
            skills={form.skills}
            onUpdateSkills={(newSkills) => updateField("skills", newSkills)}
            errors={formErrors.skills ? [formErrors.skills] : undefined}
          />


          <ExperienceSection
            experiences={form.experiences}
            onUpdateExperiences={(updated) => updateField("experiences", updated)}
            errors={formErrors.experiences}
          />


          <EducationSection
            educations={form.educations}
            onUpdateEducations={(updatedEducations) => updateField('educations', updatedEducations)}
            errors={formErrors.educations}
          />

          <Button onClick={handleSubmit} className="w-full">
            Generate Resume
        </Button>
        <LoadingIndicator isLoading={loading} />
        </CardContent>
      </Card>
  );
}

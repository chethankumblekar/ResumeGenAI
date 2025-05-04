import { create } from 'zustand';
import { ResumeForm, ResumeFormErrors, ExperienceError, EducationError } from "@/types/resume";

interface ResumeFormState {
  form: ResumeForm;
  formErrors: ResumeFormErrors;
  updateField: <K extends keyof ResumeForm>(field: K, value: ResumeForm[K]) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

const initialFormState: ResumeForm = {
  fullName: '',
  email: '',
  phone: '',
  summary: '',
  skills: [{ skillName: '' }],
  experiences: [{ company: '', role: '', duration: '', description: '' }],
  educations: [{ institution: '', degree: '', year: '', description: '' }],
};

export const useFormStore = create<ResumeFormState>((set, get) => ({
  form: initialFormState,
  formErrors: {},
  updateField: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
      formErrors: { ...state.formErrors, [field]: undefined }, 
    })),
  validateForm: () => {
  const { form } = get();
  const errors: ResumeFormErrors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Valid email is required";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  if (!form.summary.trim()) errors.summary = "Summary is required";

  if (!form.skills.length || form.skills.some((s) => !s.skillName.trim()))
    errors.skills = "At least one valid skill is required";

  const experienceErrors: ExperienceError[] = form.experiences.map((exp) => {
    const err: ExperienceError = {};
    if (!exp.company.trim()) err.company = "Company is required";
    if (!exp.role.trim()) err.role = "Role is required";
    if (!exp.duration.trim()) err.duration = "Duration is required";
    if (!exp.description.trim()) err.description = "Description is required";
    return err;
  });
  if (experienceErrors.some((e) => Object.keys(e).length > 0)) {
    errors.experiences = experienceErrors;
  }

  const educationErrors: EducationError[] = form.educations.map((edu) => {
    const err: EducationError = {};
    if (!edu.institution.trim()) err.institution = "Institution is required";
    if (!edu.degree.trim()) err.degree = "Degree is required";
    if (!edu.year.trim()) err.year = "Year is required";
    if (!edu.description.trim()) err.description = "Description is required";
    return err;
  });
  if (educationErrors.some((e) => Object.keys(e).length > 0)) {
    errors.educations = educationErrors;
  }

  set({ formErrors: errors });

  return Object.keys(errors).length === 0;
},
  resetForm: () => set({ form: initialFormState, formErrors: {} }),
}));

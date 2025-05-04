import type { ResumeForm } from '@/types/resume'; // import the types for your resume form
import { apiClient } from './apiclient';

interface CreateResumeResponse {
  resumeId: string;
}

export const resumeService = {
  async generateResume(form: ResumeForm): Promise<CreateResumeResponse> {
      const response = await apiClient.post<CreateResumeResponse>('/api/resume/create', form);
      return response;
  }
};

export interface JobOpening {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  salary?: string;
  experience: string;
  linkedinUrl?: string;
  indeedUrl?: string;
  applyEmail: string;
}

export const openings: JobOpening[] = [];

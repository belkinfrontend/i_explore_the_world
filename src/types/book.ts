export interface Book {
  title: string;
  image?: string | null;
  description?: string | null;
  availability: boolean;
  year?: number | null;
  pages?: number | null;
  authors: string[];
  goodreads?: string | null;
  verified_data?: boolean;
  language?: string | null;
}

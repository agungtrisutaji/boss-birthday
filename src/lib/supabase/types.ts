export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      greetings: {
        Row: {
          id: string;
          name: string;
          message: string;
          emoji: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          message: string;
          emoji?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          message?: string;
          emoji?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Greeting = Database["public"]["Tables"]["greetings"]["Row"];

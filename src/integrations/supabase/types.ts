export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          last_login: string | null
          password_hash: string
          phone_number: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          last_login?: string | null
          password_hash: string
          phone_number?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          last_login?: string | null
          password_hash?: string
          phone_number?: string | null
          role?: string | null
        }
        Relationships: []
      }
      trainer_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_available: boolean | null
          start_time: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_available?: boolean | null
          start_time: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_available?: boolean | null
          start_time?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trainer_content: {
        Row: {
          content_type: string
          created_at: string
          description: string | null
          file_url: string
          id: string
          moderation_status: string | null
          title: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          content_type: string
          created_at?: string
          description?: string | null
          file_url: string
          id?: string
          moderation_status?: string | null
          title: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          content_type?: string
          created_at?: string
          description?: string | null
          file_url?: string
          id?: string
          moderation_status?: string | null
          title?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trainer_profiles: {
        Row: {
          age: number | null
          availability_timings: string[] | null
          career_motivation: string | null
          certification_files: string[] | null
          city: string | null
          created_at: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          govt_id_file: string | null
          id: string
          offers_home_visits: boolean | null
          offers_online_sessions: boolean | null
          phone: string | null
          role: string | null
          services_offered: string[] | null
          status: string | null
          updated_at: string
          years_experience: number | null
        }
        Insert: {
          age?: number | null
          availability_timings?: string[] | null
          career_motivation?: string | null
          certification_files?: string[] | null
          city?: string | null
          created_at?: string
          full_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          govt_id_file?: string | null
          id: string
          offers_home_visits?: boolean | null
          offers_online_sessions?: boolean | null
          phone?: string | null
          role?: string | null
          services_offered?: string[] | null
          status?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Update: {
          age?: number | null
          availability_timings?: string[] | null
          career_motivation?: string | null
          certification_files?: string[] | null
          city?: string | null
          created_at?: string
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          govt_id_file?: string | null
          id?: string
          offers_home_visits?: boolean | null
          offers_online_sessions?: boolean | null
          phone?: string | null
          role?: string | null
          services_offered?: string[] | null
          status?: string | null
          updated_at?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          amount: number
          created_at: string
          duration_minutes: number
          id: string
          mode: string
          notes: string | null
          session_date: string
          session_type: string
          status: string | null
          trainer_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          duration_minutes?: number
          id?: string
          mode: string
          notes?: string | null
          session_date: string
          session_type: string
          status?: string | null
          trainer_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          duration_minutes?: number
          id?: string
          mode?: string
          notes?: string | null
          session_date?: string
          session_type?: string
          status?: string | null
          trainer_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_interests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          status: string | null
          trainer_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          status?: string | null
          trainer_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          status?: string | null
          trainer_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          age: number | null
          city: string | null
          created_at: string
          experience_level:
            | Database["public"]["Enums"]["experience_level"]
            | null
          fitness_goals: string[] | null
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          health_conditions: string | null
          id: string
          phone: string | null
          preferred_workout_type: string | null
          time_preference: Database["public"]["Enums"]["time_preference"] | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          city?: string | null
          created_at?: string
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          fitness_goals?: string[] | null
          full_name: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          health_conditions?: string | null
          id: string
          phone?: string | null
          preferred_workout_type?: string | null
          time_preference?:
            | Database["public"]["Enums"]["time_preference"]
            | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          city?: string | null
          created_at?: string
          experience_level?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          fitness_goals?: string[] | null
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          health_conditions?: string | null
          id?: string
          phone?: string | null
          preferred_workout_type?: string | null
          time_preference?:
            | Database["public"]["Enums"]["time_preference"]
            | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_trainer_stats: {
        Args: { p_trainer_id: string }
        Returns: {
          total_sessions: number
          total_clients: number
          total_earnings: number
          pending_interests: number
        }[]
      }
      get_trainer_status: {
        Args: { user_email: string }
        Returns: string
      }
    }
    Enums: {
      experience_level: "beginner" | "intermediate" | "advanced"
      gender_type: "male" | "female" | "other" | "prefer_not_to_say"
      time_preference: "morning" | "afternoon" | "evening" | "flexible"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      experience_level: ["beginner", "intermediate", "advanced"],
      gender_type: ["male", "female", "other", "prefer_not_to_say"],
      time_preference: ["morning", "afternoon", "evening", "flexible"],
    },
  },
} as const

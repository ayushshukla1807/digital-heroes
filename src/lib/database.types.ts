export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      charities: {
        Row: {
          created_at: string | null
          description: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          logo_url: string | null
          name: string
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          name: string
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          name?: string
          website?: string | null
        }
        Relationships: []
      }
      draw_entries: {
        Row: {
          created_at: string | null
          draw_id: string
          id: string
          numbers_matched: number | null
          prize_amount: number | null
          prize_tier: Database["public"]["Enums"]["prize_tier"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          draw_id: string
          id?: string
          numbers_matched?: number | null
          prize_amount?: number | null
          prize_tier?: Database["public"]["Enums"]["prize_tier"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          draw_id?: string
          id?: string
          numbers_matched?: number | null
          prize_amount?: number | null
          prize_tier?: Database["public"]["Enums"]["prize_tier"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "draw_entries_draw_id_fkey"
            columns: ["draw_id"]
            isOneToOne: false
            referencedRelation: "draws"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draw_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      draws: {
        Row: {
          created_at: string | null
          draw_month: string
          draw_type: Database["public"]["Enums"]["draw_type"] | null
          id: string
          jackpot_amount: number | null
          prize_pool: number | null
          published_at: string | null
          status: Database["public"]["Enums"]["draw_status"] | null
          winning_numbers: number[] | null
        }
        Insert: {
          created_at?: string | null
          draw_month: string
          draw_type?: Database["public"]["Enums"]["draw_type"] | null
          id?: string
          jackpot_amount?: number | null
          prize_pool?: number | null
          published_at?: string | null
          status?: Database["public"]["Enums"]["draw_status"] | null
          winning_numbers?: number[] | null
        }
        Update: {
          created_at?: string | null
          draw_month?: string
          draw_type?: Database["public"]["Enums"]["draw_type"] | null
          id?: string
          jackpot_amount?: number | null
          prize_pool?: number | null
          published_at?: string | null
          status?: Database["public"]["Enums"]["draw_status"] | null
          winning_numbers?: number[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          charity_contribution_percent: number | null
          charity_id: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          subscription_end: string | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
        }
        Insert: {
          charity_contribution_percent?: number | null
          charity_id?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          subscription_end?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
        }
        Update: {
          charity_contribution_percent?: number | null
          charity_id?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          subscription_end?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          subscription_start?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_charity_id_fkey"
            columns: ["charity_id"]
            isOneToOne: false
            referencedRelation: "charities"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          created_at: string | null
          id: string
          score: number | null
          score_date: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          score?: number | null
          score_date: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          score?: number | null
          score_date?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      winner_verifications: {
        Row: {
          draw_id: string
          id: string
          payout_status: Database["public"]["Enums"]["payout_status"] | null
          proof_url: string | null
          reviewed_at: string | null
          status: Database["public"]["Enums"]["verification_status"] | null
          submitted_at: string | null
          user_id: string
        }
        Insert: {
          draw_id: string
          id?: string
          payout_status?: Database["public"]["Enums"]["payout_status"] | null
          proof_url?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          submitted_at?: string | null
          user_id: string
        }
        Update: {
          draw_id?: string
          id?: string
          payout_status?: Database["public"]["Enums"]["payout_status"] | null
          proof_url?: string | null
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["verification_status"] | null
          submitted_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "winner_verifications_draw_id_fkey"
            columns: ["draw_id"]
            isOneToOne: false
            referencedRelation: "draws"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "winner_verifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      draw_status: "pending" | "simulated" | "published"
      draw_type: "random" | "algorithmic"
      payout_status: "pending" | "paid"
      prize_tier: "5-match" | "4-match" | "3-match"
      subscription_plan: "monthly" | "yearly"
      subscription_status: "active" | "inactive" | "expired"
      user_role: "user" | "admin"
      verification_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      draw_status: ["pending", "simulated", "published"],
      draw_type: ["random", "algorithmic"],
      payout_status: ["pending", "paid"],
      prize_tier: ["5-match", "4-match", "3-match"],
      subscription_plan: ["monthly", "yearly"],
      subscription_status: ["active", "inactive", "expired"],
      user_role: ["user", "admin"],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const

"use server";

import { createClient } from "@/supabase/server";

// Remove push notification functionality as the column no longer exists
export const sendNotification = async (userId: string, status: string) => {
  // No-op function to prevent errors
  return;
};

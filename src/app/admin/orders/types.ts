import { createClient } from "@/supabase/server";
import { Database } from "@/supabase/types";
import { PostgrestResponse } from "@supabase/supabase-js";

const supabase = await createClient();

const ordersWithProductsQuery = supabase
  .from("order")
  .select("*, order_items:order_item(*, product(*)), user(*)")
  .order("created_at", { ascending: false });

export type OrdersWithProducts = {
  id: number;
  created_at: string;
  status: string;
  totalPrice: number;
  user: {
    id: string;
    username?: string | null;
  };
  order_items: Array<{
    id: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
  }>;
};

import { createClient } from "@/supabase/server";
import { Database } from "@/supabase/types";
import { PostgrestResponse } from "@supabase/supabase-js";

const supabase = await createClient();

const ordersWithProductsQuery = supabase
  .from("order")
  .select("*, order_items:order_item(*, product(*)), user(*)")
  .order("created_at", { ascending: false });

export type OrdersWithProducts = Array<{
  id: number;
  created_at: string;
  status: string;
  totalPrice: number;
  description?: string;
  slug?: string;
  user: {
    id: string;
    username?: string | null;
  };
  order_items: Array<{
    id: number;
    product: {
      category: any;
      created_at: any;
      heroImage: any;
      imagesUrl: any;
      maxQuantity: any;
      slug: any;
      title: any;
      id: number;
      name: string;
      price: number;
    };
  }>;
}>;

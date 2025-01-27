"use server";

import slugify from "slugify";

import { createClient } from "@/supabase/server";
import {
  ProductsWithCategoriesResponse,
  UpdateProductSchema,
} from "@/app/admin/products/products.types";
import { CreateProductSchemaServer } from "@/app/admin/products/schema";
import { revalidatePath } from "next/cache";

export const getProductsWithCategories =
  async (): Promise<ProductsWithCategoriesResponse> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("product")
      .select("*, category:category(*)")
      .returns<ProductsWithCategoriesResponse>();

    if (error) {
      throw new Error(`
        Error fetching products with categories: ${error.message}`);
    }

    return data || [];
  };

export const createProduct = async ({
  category,
  heroImage,
  images,
  maxQuantity,
  price,
  title,
}: CreateProductSchemaServer) => {
  const supabase = await createClient();

  // Get current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session. User must be authenticated.");
  }

  const user = session.user;
  console.log("Current User:", {
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role,
  });

  const slug = slugify(title, { lower: true });

  const { data, error } = await supabase.from("product").insert({
    category,
    heroImage,
    imagesUrl: images,
    maxQuantity,
    price,
    slug,
    title,
  });

  if (error) {
    console.error("Detailed Supabase Error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(`Error creating product: ${error.message}`);
  }

  revalidatePath("/admin/products");

  return data;
};

export const updateProduct = async ({
  category,
  heroImage,
  imagesUrl,
  maxQuantity,
  price,
  slug,
  title,
}: UpdateProductSchema) => {
  const supabase = await createClient();

  // Get current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session. User must be authenticated.");
  }

  const user = session.user;
  console.log("Current User:", {
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role,
  });

  const { data, error } = await supabase
    .from("product")
    .update({
      category,
      heroImage,
      imagesUrl,
      maxQuantity,
      price,
      title,
    })
    .match({ slug });

  if (error) {
    console.error("Detailed Supabase Error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(`Error updating product: ${error.message}`);
  }

  revalidatePath("/admin/products");

  return data;
};

export const deleteProduct = async (slug: string) => {
  const supabase = await createClient();

  // Get current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session. User must be authenticated.");
  }

  const user = session.user;
  console.log("Current User:", {
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role,
  });

  const { error } = await supabase.from("product").delete().match({ slug });

  if (error) {
    console.error("Detailed Supabase Error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error(`Error deleting product: ${error.message}`);
  }

  revalidatePath("/admin/products");
};

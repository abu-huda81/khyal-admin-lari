import Link from "next/link";
import {
  Package2,
  ShoppingCart,
  Users,
  LayoutGrid,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCategoriesWithProducts } from "@/actions/categories";
import { getProductsWithCategories } from "@/actions/products";
import Image from "next/image";
import { createClient } from "@/supabase/server";
import { ADMIN } from "@/constants/contants";

export default async function Home() {
  const categories = await getCategoriesWithProducts();
  const products = await getProductsWithCategories();

  // Check if user is admin
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  let isAdmin = false;

  if (authData?.user) {
    const { data } = await supabase
      .from("users")
      .select("type")
      .eq("id", authData.user.id)
      .single();

    isAdmin = data?.type === ADMIN;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Khyal Product Catalog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of products across various categories
          </p>
        </div>

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Our Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground">
                    {category.products.length} Products
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={product.heroImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground mb-2">
                    {product.category.name}
                  </p>
                  <p className="font-semibold text-primary">
                    {product.price
                      ? `$${product.price.toFixed(2)}`
                      : "Price not set"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {isAdmin && (
          <div className="text-center mt-8">
            <Link href="/admin/dashboard">
              <Button size="lg">
                Go to Dashboard
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

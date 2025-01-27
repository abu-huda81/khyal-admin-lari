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

const Dashboard = async () => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Manage Products",
      description: "Easily add, edit, and track your product inventory.",
      link: "/admin/products",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Monitor and manage user accounts and roles.",
      link: "/admin/users",
    },
    {
      icon: LayoutGrid,
      title: "Category Organization",
      description: "Organize your products into intuitive categories.",
      link: "/admin/categories",
    },
    {
      icon: TrendingUp,
      title: "Sales Analytics",
      description: "Gain insights into your business performance.",
      link: "/admin/dashboard",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Package2 className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">Khyal Admin Dashboard</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Streamline your business operations with a powerful, intuitive admin
          management system.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {feature.title}
              </CardTitle>
              <feature.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4">
                {feature.description}
              </p>
              <Link href={feature.link}>
                <Button variant="outline" size="sm" className="w-full">
                  Manage
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/supabase/client";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

type SalesMetrics = {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  newCustomers: number;
};

type MonthlyDataItem = {
  month: string;
  revenue: number;
};

type OrderData = { totalPrice: number; created_at: string };
type SupabaseQueryResult<T> = {
  data: T[] | null;
  error: any;
};

// Add a type guard to ensure data safety
function isValidMonthlyDataItem(item: any): item is MonthlyDataItem {
  return (
    item &&
    typeof item === "object" &&
    typeof item.month === "string" &&
    typeof item.revenue === "number"
  );
}

export default function SalesAnalytics() {
  const [metrics, setMetrics] = useState<SalesMetrics>({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    newCustomers: 0,
  });

  const [monthlySales, setMonthlySales] = useState<MonthlyDataItem[]>([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const supabase = createClient();

      try {
        // Fetch total revenue
        const revenueResult: SupabaseQueryResult<OrderData> = await supabase
          .from("order")
          .select("totalPrice");

        // Fetch monthly sales
        const monthlyResult: SupabaseQueryResult<MonthlyDataItem> =
          await supabase
            .from("order")
            .select("created_at, totalPrice")
            .then((result) => {
              if (result.error) return result;

              // Group by month and calculate total revenue
              const monthlyData = result.data.reduce((acc, order) => {
                const month = new Date(order.created_at).toLocaleString(
                  "default",
                  { month: "long" }
                );
                const existingMonth = acc.find((item) => item.month === month);

                if (existingMonth) {
                  existingMonth.revenue += order.totalPrice;
                } else {
                  acc.push({ month, revenue: order.totalPrice });
                }

                return acc;
              }, [] as MonthlyDataItem[]);

              return { data: monthlyData, error: null };
            });

        // Log full error details
        if (revenueResult.error) {
          console.error(
            "Revenue Query Error:",
            JSON.stringify(revenueResult.error, null, 2)
          );
        }

        if (monthlyResult.error) {
          console.error(
            "Monthly Sales Query Error:",
            JSON.stringify(monthlyResult.error, null, 2)
          );
        }

        if (revenueResult.error || monthlyResult.error) {
          return;
        }

        const revenueData = revenueResult.data || [];
        const monthlyData = monthlyResult.data || [];

        // Validate and process data
        if (revenueData.length > 0 && monthlyData.length > 0) {
          const totalRevenue = revenueData.reduce(
            (sum, order) => sum + order.totalPrice,
            0
          );

          setMetrics({
            totalRevenue,
            totalOrders: revenueData.length,
            averageOrderValue: totalRevenue / revenueData.length,
            newCustomers: 50, // Placeholder - you'll want to fetch this dynamically
          });

          // Use type guard to filter monthly sales
          const processedMonthlySales = monthlyData.filter(
            isValidMonthlyDataItem
          );
          setMonthlySales(processedMonthlySales);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Sales Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.averageOrderValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.newCustomers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlySales}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

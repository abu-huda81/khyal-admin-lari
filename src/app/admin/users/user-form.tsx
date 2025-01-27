"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserType, UserInsert } from "./users.types";
import { createUser, updateUser } from "./actions";

const userSchema = z.object({
  id: z.string().optional(),
  email: z.string().email("Invalid email address"),
  type: z.string().optional(),
  avatar_url: z
    .string()
    .optional()
    .default(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    ),
  expo_notification_token: z.string().optional().nullable(),
  stripe_customer_id: z.string().optional().nullable(),
});

type UserFormProps = {
  user?: UserType | null;
  onClose: () => void;
};

export function UserForm({ user, onClose }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user?.id || "",
      email: user?.email || "",
      type: user?.type || "",
      avatar_url:
        user?.avatar_url ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      expo_notification_token: user?.expo_notification_token || null,
      stripe_customer_id: user?.stripe_customer_id || null,
    },
  });

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    setIsSubmitting(true);
    try {
      if (user) {
        // Updating existing user
        await updateUser(user.id, data);
        toast.success("User updated successfully");
      } else {
        // For creating a new user, omit the id if it's undefined or empty
        const insertData: UserInsert = {
          avatar_url:
            data.avatar_url ??
            "https://xsgames.co/randomusers/avatar.php?g=male",
          email: data.email ?? "",
          type: data.type ?? "",
          expo_notification_token: data.expo_notification_token ?? null,
          stripe_customer_id: data.stripe_customer_id ?? null,
          id: "",
        };
        await createUser(insertData);
        toast.success("User created successfully");
      }
      onClose();
    } catch (error) {
      toast.error("Failed to save user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  disabled={!!user}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <FormControl>
                <Input placeholder="Enter user role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter avatar URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expo_notification_token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expo Notification Token</FormLabel>
              <FormControl>
                <Input placeholder="Enter expo notification token" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stripe_customer_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stripe Customer ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter stripe customer ID" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {user ? "Update User" : "Create User"}
        </Button>
      </form>
    </Form>
  );
}

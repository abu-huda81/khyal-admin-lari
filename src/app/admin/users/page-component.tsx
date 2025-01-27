"use client";

import { useState } from "react";
import { Users, PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UsersPageProps, UserType } from "./users.types";
import { UserForm } from "./user-form";
import { deleteUser } from "./actions";
import { UserTableRow } from "./user-table-row";

export default function UsersPageComponent({ users }: UsersPageProps) {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center my-10">
        <div className="ml-auto flex items-center gap-2">
          <Dialog
            open={isUserModalOpen}
            onOpenChange={() => setIsUserModalOpen(!isUserModalOpen)}
          >
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setCurrentUser(null);
                  setIsUserModalOpen(true);
                }}
              >
                <PlusCircle className="h-3.5 w-3.5 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {currentUser ? "Edit User" : "Create User"}
                </DialogTitle>
              </DialogHeader>
              <UserForm
                user={currentUser}
                onClose={() => setIsUserModalOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Users className="inline-block mr-2" /> User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onEdit={(user) => {
                    setCurrentUser(user);
                    setIsUserModalOpen(true);
                  }}
                  onDelete={handleDeleteUser}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

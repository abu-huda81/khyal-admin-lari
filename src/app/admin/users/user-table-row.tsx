import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";

import { UserType } from "./users.types";

type UserTableRowProps = {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (id: string) => void;
};

export function UserTableRow({ user, onEdit, onDelete }: UserTableRowProps) {
  return (
    <TableRow>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.type || "N/A"}</TableCell>
      <TableCell>
        {user.created_at
          ? format(new Date(user.created_at), "yyyy-MM-dd HH:mm")
          : "N/A"}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(user)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

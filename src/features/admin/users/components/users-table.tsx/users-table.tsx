import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersTableProps } from "./index.type";
import { Badge } from "@/components/ui/badge";

export const UsersTable = ({ users }: UsersTableProps) => {
  if (!Array.isArray(users)) return null;
  if (users.length < 1) return null;
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">#</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.itemId}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell className="text-center">
              {user.active ? (
                <Badge variant="default">active</Badge>
              ) : (
                <Badge variant="destructive">inactive</Badge>
              )}
            </TableCell>
            <TableCell>{}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

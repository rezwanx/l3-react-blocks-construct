import { AddUserForm } from "@/features/admin/users/components/add-user-form";

export default function AddUsersPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Add User</div>
      </div>
      <div className="mt-4">
        <AddUserForm />
      </div>
    </div>
  );
}

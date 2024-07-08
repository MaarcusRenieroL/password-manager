import { AddNewPasswordModal } from "~/components/dashboard/modals/add-new-password";
import { PasswordsTableShell } from "~/components/table-shell/passwords";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <AddNewPasswordModal />
      </div>
      <hr className="my-5" />
      <PasswordsTableShell />
    </div>
  );
}

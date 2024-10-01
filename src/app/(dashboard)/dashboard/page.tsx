import { AddNewPasswordModal } from "~/components/dashboard/modals/add-new-password";
import { PasswordsTableShell } from "~/components/table-shell/passwords";
import { server } from "~/lib/trpc/server";

export default async function DashboardPage() {
  const passwords = await server.password.getPasswords();
  const groups = await server.group.getGroups();
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <AddNewPasswordModal groups={groups} />
      </div>
      <hr className="my-5" />
      <PasswordsTableShell data={passwords} groups={groups} />
    </div>
  );
}

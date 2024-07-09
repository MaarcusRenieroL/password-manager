import { AddNewGroupModal } from "~/components/dashboard/modals/add-new-group";
import { GroupsTableShell } from "~/components/table-shell/groups";

export default function GroupsPage() {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Groups</h1>
        <AddNewGroupModal />
      </div>
      <hr className="my-5" />
      <GroupsTableShell />
    </div>
  );
}

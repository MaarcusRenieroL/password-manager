import { GroupsTableShell } from "~/components/table-shell/groups";
import { Button } from "~/components/ui/button";

export default function GroupsPage() {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Groups</h1>
        <Button>Add New Group</Button>
      </div>
      <hr className="my-5" />
      <GroupsTableShell />
    </div>
  );
}

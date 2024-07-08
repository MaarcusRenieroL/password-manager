import { Button } from "~/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <Button>Add New Password</Button>
      </div>
      <hr className="my-5" />
      Data table
    </div>
  );
}

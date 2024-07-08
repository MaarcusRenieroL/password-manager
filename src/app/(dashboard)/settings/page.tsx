import { AccountForm } from "~/components/dashboard/settings/account-form";

export default function SettingsPage() {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
      <hr className="my-5" />
      <div className="space-y-5">
        <AccountForm />
      </div>
    </div>
  );
}

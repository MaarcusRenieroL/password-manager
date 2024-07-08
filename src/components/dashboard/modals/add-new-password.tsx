import { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const AddNewPasswordModal: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Password</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add New Password</DialogTitle>
          <DialogDescription>
            Fill out the form to add new password
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Website Name</Label>
            <Input placeholder="Enter Website Name" type="text" />
          </div>
          <div className="space-y-2">
            <Label>Website URL</Label>
            <Input placeholder="Enter Website URL" type="url" />
          </div>
          <div className="space-y-2">
            <Label>Username</Label>
            <Input placeholder="Enter Username" type="text" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="Enter Email" type="email" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="flex w-full space-x-5">
              <Input placeholder="Enter Password" type="password" />
              <Button variant="outline">Generate a password</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

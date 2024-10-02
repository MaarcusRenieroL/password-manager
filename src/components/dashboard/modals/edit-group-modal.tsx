import { Group } from "@prisma/client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateGroupSchema } from "~/lib/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { client } from "~/lib/trpc/client";
import { toast } from "sonner";
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
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Edit } from "lucide-react";

type Props = {
  group: Group;
};

export const EditGroupModal: FC<Props> = ({ group }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof updateGroupSchema>>({
    mode: "onChange",
    resolver: zodResolver(updateGroupSchema),
    defaultValues: {
      groupId: group.groupId,
      groupName: group.groupName,
    },
  });

  const { mutateAsync: updateGroup } = client.group.updateGroup.useMutation({
    onSuccess: (data) => {
      toast("Success", {
        description: data.message,
      });
    },
    onError: (error) => {
      toast("Error", {
        description: error.message,
      });
    },
  });

  const handleSubmit = async (data: z.infer<typeof updateGroupSchema>) => {
    try {
      setLoading(true);

      await updateGroup(data);
      router.refresh();
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Group</DialogTitle>
          <DialogDescription>
            Fill out the form to edit the group
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter group name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              disabled={loading}
              name="groupName"
              control={form.control}
            />

            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


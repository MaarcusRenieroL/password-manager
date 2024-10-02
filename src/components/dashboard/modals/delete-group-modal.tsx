import { FC, useState } from "react";
import { client } from "~/lib/trpc/client";
import { toast } from "sonner";
import { z } from "zod";
import { deleteGroupSchema } from "~/lib/types/zod-schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Loader } from "~/components/loader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Group } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  group: Group;
};

export const DeleteGroupModal: FC<Props> = ({ group }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof deleteGroupSchema>>({
    resolver: zodResolver(deleteGroupSchema),
    defaultValues: {
      groupId: group.groupId,
    },
  });

  const { mutateAsync: deleteGroup } = client.group.deleteGroup.useMutation({
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

  const handleDelete = async (data: z.infer<typeof deleteGroupSchema>) => {
    try {
      setLoading(true);

      await deleteGroup(data);
      router.refresh();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Delete {group.groupName} group</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleDelete)}
          >
            <FormField
              name="groupId"
              disabled={loading}
              control={form.control}
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>
                    <Label>Website Name</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Website Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button disabled={loading} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit" variant="destructive">
                {loading ? <Loader /> : "Delete Group"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


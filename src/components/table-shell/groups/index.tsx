"use client";

import { Checkbox } from "~/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import React, { type FC, useMemo } from "react";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTable } from "~/components/data-table";
import { TrashIcon } from "@radix-ui/react-icons";
import { EditIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export const GroupsTableShell: FC = ({}) => {
  const GroupsColumnDef = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "uniqueId",
        cell: ({ row }) => (
          <div className="min-w-max">{row.getValue("id")}</div>
        ),
        accessorKey: "id",
        enableHiding: true,
      },
      {
        id: "groupName",
        header: ({ column }) => (
          <div>
            <DataTableColumnHeader column={column} title="Group Name" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="min-w-max mr-auto">{row.getValue("groupName")}</div>
        ),
        accessorKey: "groupName",
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: "actions",
        header: () => (
          <div className="flex min-w-max items-center justify-center">
            Actions
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-evenly min-w-max space-x-5">
            <Button>
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button>
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <DataTable
      data={[]}
      columns={GroupsColumnDef}
      filterableColumns={[]}
      searchPlaceholder="Search groups..."
      messages={{
        filteredDataNotFoundMessage: {
          title: "No groups found!",
          description: "Add group to get started!",
        },
        emptyDataMessage: {
          title: "No gropus found!",
          description: "Add group to get started!",
        },
      }}
    />
  );
};

"use client";

import { Checkbox } from "~/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import React, { type FC, useMemo, useState } from "react";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTable } from "~/components/data-table";
import { ViewData } from "~/components/table-shell/view-data";
import { Group, Password } from "@prisma/client";

type Props = {
	data: Password[];
	groups: Group[];
}

export const PasswordsTableShell: FC<Props> = ({ data, groups }) => {
	const PasswordsColumnDef = useMemo<ColumnDef<any>[]>(
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
				id: "websiteName",
				header: ({ column }) => (
					<div>
						<DataTableColumnHeader column={column} title="Website Name" />
					</div>
				),
				cell: ({ row }) => (
					<div className="min-w-max mr-auto">{row.getValue("websiteName")}</div>
				),
				accessorKey: "websiteName",
				enableSorting: true,
				enableHiding: true,
			},
			{
				id: "websiteUrl",
				header: ({ column }) => (
					<div>
						<DataTableColumnHeader column={column} title="Website URL" />
					</div>
				),
				cell: ({ row }) => (
					<div className="min-w-max mr-auto">{row.getValue("websiteUrl")}</div>
				),
				accessorKey: "websiteUrl",
				enableSorting: true,
				enableHiding: true,
			},
			{
				id: "userName",
				header: ({ column }) => (
					<div>
						<DataTableColumnHeader column={column} title="Username" />
					</div>
				),
				cell: ({ row }) => (
					<div className="min-w-max">{row.getValue("userName")}</div>
				),
				accessorKey: "userName",
				enableSorting: true,
				enableHiding: true,
			},
			{
				id: "email",
				header: ({ column }) => (
					<div>
						<DataTableColumnHeader column={column} title="Email" />
					</div>
				),
				cell: ({ row }) => (
					<div className="min-w-max">{row.getValue("email")}</div>
				),
				accessorKey: "email",
				enableSorting: true,
				enableHiding: true,
			},
			{
				id: "actions",
				header: () => (
					<div className="flex min-w-max items-center justify-center">Actions</div>
				),
				cell: ({ row }) => (
					<div className="flex items-center justify-center">
						<ViewData data={row.original} groups={groups} />
					</div>
				),
			},
		],
		[]
	);
	
	return (
		<DataTable
			data={data}
			columns={PasswordsColumnDef}
			filterableColumns={[]}
			searchPlaceholder="Search websites..."
			messages={{
				filteredDataNotFoundMessage: {
					title: "No websites found!",
					description: "Add passwords to get started!",
				},
				emptyDataMessage: {
					title: "No passwords found!",
					description: "Add passwords to get started!",
				},
			}}
		/>
	);
};

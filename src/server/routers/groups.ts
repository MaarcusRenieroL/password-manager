import { privateProcedure, router } from "~/server/trpc";
import { addNewGroupSchema } from "~/lib/types/zod-schema";
import { getServerAuthSession } from "~/lib/auth";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";

export const groupRouter = router({
	addNewGroup: privateProcedure
		.input(addNewGroupSchema)
		.mutation(async ({ ctx, input }) => {
			try {
				const { userId } = ctx;
				const { groupName } = input;
				const session = await getServerAuthSession();
				
				if (!session) {
					throw new TRPCError({
						code: "UNAUTHORIZED",
						message: "User not logged in",
					});
				}
				
				const existingUser = await db.user.findFirst({
					where: {
						id: userId,
					},
				});
				
				if (!existingUser) {
					throw new TRPCError({
						code: "UNAUTHORIZED",
						message: "User not found",
					});
				}
				
				if (session.user.id !== userId) {
					throw new TRPCError({
						code: "FORBIDDEN",
						message: "User not authorized",
					});
				}
				
				if (!groupName) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Missing required fields",
					});
				}
				
				
				const newGroup = await db.group.create({
					data: {
						groupName: groupName,
					},
				});
				
				return {
					id: newGroup.groupId,
					message: "New Group added",
				};
			} catch (error: any) {
				console.log(
					"================== ADD NEW GROUP PROCEDURE ==================",
				);
				console.log(error.message);
				
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: error.message,
				});
			}
		}),
})
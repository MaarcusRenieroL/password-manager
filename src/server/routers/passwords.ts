import { addNewPasswordSchema, deletePasswordSchema, updatePasswordSchema } from "~/lib/types/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import { getServerAuthSession } from "~/lib/auth";

export const passwordRouter = router({
	getPasswords: privateProcedure.query(async ({ ctx }) => {
		const { userId } = ctx;
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
		
		return db.password.findMany({
			where: {
				userId,
			},
		});
	}),
	addNewPassword: privateProcedure
		.input(addNewPasswordSchema)
		.mutation(async ({ ctx, input }) => {
			try {
				const { userId } = ctx;
				const { websiteUrl, websiteName, email, password, userName, groupId } = input;
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
				
				if (!websiteUrl || !websiteName || !password) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Missing required fields",
					});
				}
				
				if (!email && !userName) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Please enter either email or username",
					});
				}
				
				const newPassword = await db.password.create({
					data: {
						websiteName: websiteName,
						websiteUrl: websiteUrl,
						email: email,
						userName: userName,
						password: password,
						userId: existingUser.id,
						groupId: groupId
					},
				});
				
				return {
					id: newPassword.passwordId,
					message: "New Password added",
				};
			} catch (error: any) {
				console.log(
					"================== ADD NEW PASSWORD PROCEDURE ==================",
				);
				console.log(error.message);
				
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: error.message,
				});
			}
		}),
	updatePassword: privateProcedure
		.input(updatePasswordSchema)
		.mutation(async ({ ctx, input }) => {
			try {
				const { userId } = ctx;
				const { passwordId, websiteUrl, websiteName, email, password, userName, groupId } = input;
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
				
				if (!password || password.length === 0) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Password is required",
					});
				}
				
				const existingPassword = await db.password.findFirst({
					where: {
						passwordId: passwordId
					},
				});
				
				if (!existingPassword) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Password not found",
					});
				}
				
				const updatedPassword = await db.password.update({
						where: {
							passwordId,
						},
						data: {
							websiteName: websiteName || existingPassword.websiteName,
							websiteUrl: websiteUrl || existingPassword.websiteUrl,
							email: email || existingPassword.email,
							userName: userName || existingPassword.userName,
							password: password || existingPassword.password,
							userId: existingUser.id,
							groupId: groupId || existingPassword.groupId
						},
					}
				);
				
				return {
					id: updatedPassword.passwordId,
					message: "Password updated",
				};
			} catch (err: any) {
				console.log(
					"======================== UPDATE PASSWORD PROCEDURE ===========================",
				);
				console.log(err.message);
				
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: err.message,
				});
			}
		}),
	deletePassword: privateProcedure
		.input(deletePasswordSchema)
		.mutation(async ({ ctx, input }) => {
			try {
				const { userId } = ctx;
				const { passwordId } = input;
				
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
				
				if (!passwordId) {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Missing required fields",
					});
				}
				
				const deletedPassword = await db.password.delete({
					where: {
						passwordId: passwordId
					},
				});
				
				return {
					id: deletedPassword.passwordId,
					message: "Password deleted",
				};
				
			} catch (error: any) {
				console.log(
          "========================= DELETE PASSWORD PROCEDURE ===========================",
        );
        console.log(error.message);
        
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
			}
	})
});

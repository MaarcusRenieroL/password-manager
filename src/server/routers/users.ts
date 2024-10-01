import {
	changeEmailFormSchema,
	changeNameFormSchema,
	changePasswordFormSchema,
	deleteAccountSchema,
	registerSchema
} from "~/lib/types/zod-schema";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import bcryptjs from "bcryptjs";
import { getServerAuthSession } from "~/lib/auth";

export const userRouter = router({
	getUser: privateProcedure.query(async ({ ctx }) => {
		try {
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
			
			return existingUser;
		} catch (error: any) {
			console.log(
				"========================= GET NAME PROCEDURE ===========================",
			);
			console.log(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Error updating name",
			});
		}
	}),
	addUser: publicProcedure.input(registerSchema).mutation(async ({ input }) => {
		try {
			const { email, password, confirmPassword, name } = input;
			
			if (!email || !password || !confirmPassword || !name) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Missing required fields",
				});
			}
			
			const existingUser = await db.user.findFirst({
				where: {
					email: email,
				},
			});
			
			if (existingUser) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "User already exists",
				});
			}
			
			const newUser = await db.user.create({
				data: {
					name: name,
					email: email,
					password: await bcryptjs.hash(password, 10),
				},
			});
			
			return {
				data: newUser,
				statusCode: 200,
				message: "User created succesfully",
			};
		} catch (error) {
			console.log(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Error creating user",
			});
		}
	}),
	updateName: privateProcedure.input(changeNameFormSchema).mutation(async ({ ctx, input }) => {
		try {
			const { userId } = ctx;
			const { name } = input;
			
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
			
			if (!name) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Missing required fields",
				});
			}
			
			const updatedUser = await db.user.update({
				where: {
					id: userId,
				},
				data: {
					name: name,
				},
			})
			
			return {
				id: updatedUser.id,
				message: "Name updated",
			};
			
		} catch (error: any) {
			console.log(
				"========================= UPDATE NAME PROCEDURE ===========================",
			);
			console.log(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Error updating name",
			});
		}
	}),
	updateEmail: privateProcedure.input(changeEmailFormSchema).mutation(async ({ ctx, input }) => {
		try {
			const { userId } = ctx;
			const { email } = input;
			
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
			
			if (!email) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Missing required fields",
				});
			}
			
			const updatedUser = await db.user.update({
				where: {
					id: userId,
				},
				data: {
					email: email,
				},
			})
			
			return {
				id: updatedUser.id,
				message: "Email updated",
			};
			
		} catch (error: any) {
			console.log(
				"========================= UPDATE EMAIL PROCEDURE ===========================",
			);
			console.log(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Error updating name",
			});
		}
	}),
	updatePassword: privateProcedure.input(changePasswordFormSchema).mutation(async ({ ctx, input }) => {
		try {
			const { userId } = ctx;
			const { currentPassword, newPassword, confirmNewPassword } = input;
			
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
			
			if (!currentPassword || !newPassword || !confirmNewPassword) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Missing required fields",
				});
			}
			
			const updatedUser = await db.user.update({
				where: {
					id: userId,
				},
				data: {
					password: await bcryptjs.hash(newPassword, 10)
				},
			})
			
			return {
				id: updatedUser.id,
				message: "Password updated",
			};
			
		} catch (error: any) {
			console.log(
				"========================= UPDATE PASSWORD PROCEDURE ===========================",
			);
			console.log(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Error updating name",
			});
		}
	}),
	deleteUser: privateProcedure.input(deleteAccountSchema).mutation(async ({ ctx, input }) => {
		try {
			const { userId } = ctx;
			const { id } = input;
			
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
			
			if (!id || id!== userId) {
				throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid user ID",
        });
			}
			
			
			await db.password.deleteMany({
				where: {
					userId: userId,
				}
			})
			
			await db.group.deleteMany({
				where: {
					userId: userId,
				}
			})
			
			await db.user.delete({
        where: {
          id: userId,
        }
      });
			
			return {
        id: userId,
        message: "User deleted",
      };
			
		} catch (error) {
			console.log(
				"========================= DELETE USER PROCEDURE ===========================",
			);
			console.log(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Error deleting user",
			});
		}
	})
});

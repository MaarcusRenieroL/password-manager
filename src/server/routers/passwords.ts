import { addNewPasswordSchema } from "~/lib/types/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import { getServerAuthSession } from "~/lib/auth";
import bcrypt from "bcryptjs";

export const passwordRouter = router({
  addNewPassword: privateProcedure
    .input(addNewPasswordSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { websiteUrl, websiteName, email, password, userName } = input;
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
            password: await bcrypt.hash(password, 10),
            userId: existingUser.id,
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
});

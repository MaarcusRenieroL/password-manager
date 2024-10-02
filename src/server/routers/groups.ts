import { privateProcedure, router } from "~/server/trpc";
import {
  addNewGroupSchema,
  deleteGroupSchema,
  updateGroupSchema,
} from "~/lib/types/zod-schema";
import { getServerAuthSession } from "~/lib/auth";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";

export const groupRouter = router({
  getGroups: privateProcedure.query(async ({ ctx }) => {
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

    return db.group.findMany({
      where: {
        userId,
      },
    });
  }),
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
            userId: existingUser.id,
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
  updateGroup: privateProcedure
    .input(updateGroupSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { groupId, groupName } = input;
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
            message: "User not found",
          });
        }

        if (!groupId || !groupName) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing required fields",
          });
        }

        const updatedGroup = await db.group.update({
          where: {
            groupId,
          },
          data: {
            groupName,
          },
        });

        return {
          id: updatedGroup.groupId,
          message: "Group updated",
        };
      } catch (error: any) {
        console.log(
          "==================== UPDATE GROUP PROCEDURE ====================",
        );
        console.log(error.message);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),
  deleteGroup: privateProcedure
    .input(deleteGroupSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { groupId } = input;
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

        if (!groupId) {
          throw new TRPC({
            code: "BAD_REQUEST",
            message: "Missing required fields",
          });
        }

        const deletedGroup = await db.group.delete({
          where: {
            groupId,
          },
        });

        return {
          id: deletedGroup.groupId,
          message: "Group deleted",
        };
      } catch (error: any) {
        console.log(
          "=================== DELETE GROUP PROCEDURE ===================",
        );
        console.log(error.message);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
    }),
});


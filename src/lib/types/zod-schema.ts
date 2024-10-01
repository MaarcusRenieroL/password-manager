import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string({
      required_error: "Name is required",
    }),
    lastName: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email",
      })
      .min(2, {
        message: "Email must be at least 2 characters long",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    })
    .min(2, {
      message: "Email must be at least 2 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

export const addNewPasswordSchema = z.object({
  websiteName: z.string({
    required_error: "Website Name is required",
  }),
  websiteUrl: z
    .string({
      required_error: "Website Url is required",
    })
    .url({
      message: "Invalid Url",
    }),
  email: z
    .string()
    .email({
      message: "Invalid Email",
    })
    .optional(),
  userName: z.string().optional(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});

export const addNewGroupSchema = z.object({
  groupName: z.string({
    required_error: "Group Name is required",
  }).min(3, {
    message: "Group Name must be at least 3 characters long",
  })
})
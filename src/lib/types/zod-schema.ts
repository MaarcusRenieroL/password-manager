import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({
      required_error: "Name is required",
    }).min(2, {
      message: "Name must be at least 2 characters long",
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
  groupId: z.string({
    required_error: "Group is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});

export const updatePasswordSchema = z.object({
  passwordId: z.string(),
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
  groupId: z.string({
    required_error: "Group is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});

export const deletePasswordSchema = z.object({
  passwordId: z.string(),
});

export const addNewGroupSchema = z.object({
  groupName: z.string({
    required_error: "Group Name is required",
  }).min(3, {
    message: "Group Name must be at least 3 characters long",
  })
})

export const updateGroupSchema = z.object({
  groupId: z.string(),
  groupName: z.string({
    required_error: "Group Name is required",
  }).min(3, {
    message: "Group Name must be at least 3 characters long",
  })
})

export const deleteGroupSchema = z.object({
  groupId: z.string(),
})


export const changeNameFormSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }).min(3, {
    message: "Name must be at least 3 characters long",
  })
})

export const changeEmailFormSchema = z.object({
  email: z
   .string({
      required_error: "Email is required",
    })
   .email({
      message: "Invalid email",
    })
   .min(2, {
      message: "Email must be at least 2 characters long",
    })
})

export const changePasswordFormSchema = z.object({
  currentPassword: z
    .string({
      required_error: "Current Password is required",
    })
    .min(6, {
      message: "Current Password must be at least 6 characters long",
    }),
  newPassword: z
    .string({
      required_error: "New Password is required",
    })
    .min(6, {
      message: "New Password must be at least 6 characters long",
    }),
  confirmNewPassword: z
  .string({
    required_error: "Confirm New Password is required",
  })
  .min(6, {
    message: "Confirm New Password must be at least 6 characters long",
  }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const deleteAccountSchema = z.object({
  id: z.string()
})

export const passwordsSchema = z.array(addNewPasswordSchema);
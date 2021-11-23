import { z } from 'zod';

export const newUserProfileSchema = z.object({
    profile: z.object({
        firstName: z.string().min(3).max(30),
        lastName: z.string().min(3).max(30),
        email: z.string().email(),
        login: z.string().email(),
    }),
});

export type NewUserProfile = z.infer<typeof newUserProfileSchema>;

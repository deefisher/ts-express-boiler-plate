import * as Joi from '@hapi/joi';
import 'joi-extract-type';

export const newUserProfileSchema = Joi.object({
    profile: Joi.object({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        login: Joi.string().email().required(),
    }).required(),
});

export type NewUserProfile = Joi.extractType<typeof newUserProfileSchema>;

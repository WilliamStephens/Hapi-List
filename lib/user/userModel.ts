import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userTypes";
import Joi from "@hapi/joi";

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema<IUserModel>({
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

export const userJoiSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
}).label("User");

export const jwtResponseSchema = Joi.object({
  token: Joi.string()
    .required()
    .description("JSON Web Token")
}).label("JWT");

export default mongoose.model<IUserModel>("User", userSchema);

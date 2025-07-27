import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin", "courier"],
      default: "user",
      required: true,
    },
    token: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", userSchema);

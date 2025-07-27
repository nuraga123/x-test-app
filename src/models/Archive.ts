import { Schema, model, models } from "mongoose";

const archiveSchema = new Schema(
  {
    username: { type: String, required: true },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.Archive || model("Archive", archiveSchema);

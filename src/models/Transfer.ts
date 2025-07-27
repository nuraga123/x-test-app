import { Schema, model, models, Types } from "mongoose";

const TransferSchema = new Schema(
  {
    materials: [
      {
        material: { type: Types.ObjectId, ref: "Material", required: true },
        condition: {
          type: String,
          enum: ["new", "used", "broken"],
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    fromBarn: { type: Types.ObjectId, ref: "User", required: true },
    toBarn: { type: Types.ObjectId, ref: "User", required: true },
    fromLocation: { type: String, required: true },
    toLocation: { type: String, required: true },
    courier: { type: Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELED"],
      default: "PENDING",
    },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.Transfer || model("Transfer", TransferSchema);

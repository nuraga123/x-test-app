import { Schema, model, models, Types } from "mongoose";

const BarnSchema = new Schema(
  {
    barnKeeper: { type: Types.ObjectId, ref: "User", required: true },
    material: { type: Types.ObjectId, ref: "Material", required: true },
    newCount: { type: Number, default: 0 },
    usedCount: { type: Number, default: 0 },
    brokenCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Barn || model("Barn", BarnSchema);

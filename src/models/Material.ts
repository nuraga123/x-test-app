import { Schema, model, models } from "mongoose";

const MaterialSchema = new Schema(
  {
    materialName: { type: String, required: true, unique: true },
    code: { type: String, unique: true },
    unit: {
      type: String,
      required: true,
      enum: ["piece", "meter", "kilogram", "liter"],
    },
    price: { type: Number, required: true },
    type: { type: String },
  },
  { timestamps: true }
);

export default models.Material || model("Material", MaterialSchema);

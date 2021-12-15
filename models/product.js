const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    description: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

module.exports = model("Product", productSchema);

const { Schema, model } = require("mongoose");

const campaignSchema = new Schema(
  {
    founderId: { type: Schema.Types.ObjectId, required: true },
    campaignType: {
      type: String,
      required: true,
      enum: ["fundraising", "donation"],
    },
    campaignCategory: {
      type: String,
      required: true,
      enum: [
        "financialResources",
        "food",
        "shelterAndBedding",
        "clothingAndFootwear",
        "medicalSupplies",
        "toiletries",
        "educationalSupplies",
        "communicationTools",
        "toolsAndEquipment",
        "petSupplies",
      ],
    },
    title: { type: String, required: true },
    campaignDesc: { type: String },
    campaignImage: { type: String },
    orgId: { type: Number, required: true },
    goal: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { collection: "campaigns" },
);

module.exports = model("campaign", campaignSchema);

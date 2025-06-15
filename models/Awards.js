const mongoose = require("mongoose")

const awardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Award title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Award description is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Award date is required"],
      trim: true,
    },
    issuer: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Certificate", "Award", "Recognition", "Achievement", "Other"],
      default: "Certificate",
    },
    priority: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Awards", awardSchema)

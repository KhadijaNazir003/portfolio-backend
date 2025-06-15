const mongoose = require("mongoose")

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    institute: {
      type: String,
      required: [true, "Institute is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Current", "Completed", "In Progress"],
      default: "Completed",
    },
    description: {
      type: String,
      trim: true,
    },
    gpa: {
      type: String,
      trim: true,
    },
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Education", educationSchema)

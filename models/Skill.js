const mongoose = require("mongoose")

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Frontend", "Backend", "Database", "Tools", "Languages", "Frameworks", "Other"],
      trim: true,
    },
    proficiency: {
      type: Number,
      required: [true, "Proficiency level is required"],
      min: 1,
      max: 100,
    },
    icon: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
      default: "#1976d2",
    },
    yearsOfExperience: {
      type: Number,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
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

module.exports = mongoose.model("Skills", skillSchema)

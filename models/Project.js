const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    technologies: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Completed", "In Progress", "On Hold", "Cancelled"],
      default: "Completed",
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    images: [
      {
        url: String,
        caption: String,
        isMain: {
          type: Boolean,
          default: false,
        },
      },
    ],
    category: {
      type: String,
      enum: ["Web Development", "Mobile App", "Desktop App", "Game Development", "AI/ML", "Other"],
      required: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Virtual for formatted date range
projectSchema.virtual("dateRange").get(function () {
  const start = this.startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  if (this.endDate) {
    const end = this.endDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
    return `${start} - ${end}`
  }

  return `${start} - Present`
})

module.exports = mongoose.model("Projects", projectSchema)

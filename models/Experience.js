const mongoose = require("mongoose")

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],
    achievements: [
      {
        type: String,
        trim: true,
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance", "Volunteer"],
      required: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    companyLogo: {
      type: String,
      trim: true,
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

// Virtual for formatted date range
experienceSchema.virtual("dateRange").get(function () {
  const start = this.startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  if (this.isCurrent) {
    return `${start} - Present`
  }

  if (this.endDate) {
    const end = this.endDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
    return `${start} - ${end}`
  }

  return start
})

// Virtual for duration calculation
experienceSchema.virtual("duration").get(function () {
  const start = new Date(this.startDate)
  const end = this.isCurrent ? new Date() : new Date(this.endDate)
  
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffMonths / 12)
  
  if (diffYears > 0) {
    const remainingMonths = diffMonths % 12
    return remainingMonths > 0 ? `${diffYears} year${diffYears > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : `${diffYears} year${diffYears > 1 ? 's' : ''}`
  }
  
  return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`
})

module.exports = mongoose.model("Experience", experienceSchema)
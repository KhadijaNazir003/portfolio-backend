const Experience = require("../models/Experience")

// @desc    Get all experience records
// @route   GET /api/experience
// @access  Public
const getExperience = async (req, res) => {
  try {
    const { employmentType, current } = req.query

    const query = { isActive: true }
    
    if (employmentType) query.employmentType = employmentType
    if (current) query.isCurrent = current === "true"

    const experience = await Experience.find(query).sort({ startDate: -1 })

    res.status(200).json({
      success: true,
      count: experience.length,
      data: experience,
    })
  } catch (error) {
    console.error("Error fetching experience:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch experience data",
      error: error.message,
    })
  }
}

// @desc    Get single experience record
// @route   GET /api/experience/:id
// @access  Public
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience record not found",
      })
    }

    res.status(200).json({
      success: true,
      data: experience,
    })
  } catch (error) {
    console.error("Error fetching experience by ID:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch experience record",
      error: error.message,
    })
  }
}

// @desc    Create new experience record
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body)

    res.status(201).json({
      success: true,
      message: "Experience record created successfully",
      data: experience,
    })
  } catch (error) {
    console.error("Error creating experience:", error)
    res.status(400).json({
      success: false,
      message: "Failed to create experience record",
      error: error.message,
    })
  }
}

// @desc    Update experience record
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    })

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience record not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Experience record updated successfully",
      data: experience,
    })
  } catch (error) {
    console.error("Error updating experience:", error)
    res.status(400).json({
      success: false,
      message: "Failed to update experience record",
      error: error.message,
    })
  }
}

// @desc    Delete experience record
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id, 
      { isActive: false }, 
      { new: true }
    )

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience record not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Experience record deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting experience:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete experience record",
      error: error.message,
    })
  }
}

module.exports = {
  getExperience,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
}
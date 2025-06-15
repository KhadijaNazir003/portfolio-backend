const Education = require("../models/Education")

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res) => {
  try {
    const education = await Education.find({ isActive: true }).sort({ year: -1 })

    res.status(200).json({
      success: true,
      count: education.length,
      data: education,
    })
  } catch (error) {
    console.error("Error fetching education:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch education data",
      error: error.message,
    })
  }
}

// @desc    Get single education record
// @route   GET /api/education/:id
// @access  Public
const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id)

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      })
    }

    res.status(200).json({
      success: true,
      data: education,
    })
  } catch (error) {
    console.error("Error fetching education by ID:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch education record",
      error: error.message,
    })
  }
}

// @desc    Create new education record
// @route   POST /api/education
// @access  Private (you can add auth middleware later)
const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body)

    res.status(201).json({
      success: true,
      message: "Education record created successfully",
      data: education,
    })
  } catch (error) {
    console.error("Error creating education:", error)
    res.status(400).json({
      success: false,
      message: "Failed to create education record",
      error: error.message,
    })
  }
}

// @desc    Update education record
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Education record updated successfully",
      data: education,
    })
  } catch (error) {
    console.error("Error updating education:", error)
    res.status(400).json({
      success: false,
      message: "Failed to update education record",
      error: error.message,
    })
  }
}

// @desc    Delete education record
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Education record deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting education:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete education record",
      error: error.message,
    })
  }
}

module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
}

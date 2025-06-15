const Awards = require("../models/Awards")

// @desc    Get all awards
// @route   GET /api/awards
// @access  Public
const getAwards = async (req, res) => {
  try {
    const awards = await Awards.find({ isActive: true }).sort({ date: -1, priority: -1 })

    res.status(200).json({
      success: true,
      count: awards.length,
      data: awards,
    })
  } catch (error) {
    console.error("Error fetching awards:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch awards data",
      error: error.message,
    })
  }
}

// @desc    Get single award
// @route   GET /api/awards/:id
// @access  Public
const getAwardById = async (req, res) => {
  try {
    const award = await Awards.findById(req.params.id)

    if (!award) {
      return res.status(404).json({
        success: false,
        message: "Award not found",
      })
    }

    res.status(200).json({
      success: true,
      data: award,
    })
  } catch (error) {
    console.error("Error fetching award by ID:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch award",
      error: error.message,
    })
  }
}

// @desc    Create new award
// @route   POST /api/awards
// @access  Private
const createAward = async (req, res) => {
  try {
    const award = await Awards.create(req.body)

    res.status(201).json({
      success: true,
      message: "Award created successfully",
      data: award,
    })
  } catch (error) {
    console.error("Error creating award:", error)
    res.status(400).json({
      success: false,
      message: "Failed to create award",
      error: error.message,
    })
  }
}

// @desc    Update award
// @route   PUT /api/awards/:id
// @access  Private
const updateAward = async (req, res) => {
  try {
    const award = await Awards.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!award) {
      return res.status(404).json({
        success: false,
        message: "Award not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Award updated successfully",
      data: award,
    })
  } catch (error) {
    console.error("Error updating award:", error)
    res.status(400).json({
      success: false,
      message: "Failed to update award",
      error: error.message,
    })
  }
}

// @desc    Delete award
// @route   DELETE /api/awards/:id
// @access  Private
const deleteAward = async (req, res) => {
  try {
    const award = await Awards.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!award) {
      return res.status(404).json({
        success: false,
        message: "Award not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Award deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting award:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete award",
      error: error.message,
    })
  }
}

module.exports = {
  getAwards,
  getAwardById,
  createAward,
  updateAward,
  deleteAward,
}

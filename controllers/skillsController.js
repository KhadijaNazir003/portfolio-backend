const Skills = require("../models/Skills")

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const { category } = req.query

    const query = { isActive: true }
    if (category) {
      query.category = category
    }

    const skills = await Skills.find(query).populate("projects", "title").sort({ category: 1, proficiency: -1 })

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      const category = skill.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    }, {})

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
      groupedData: groupedSkills,
    })
  } catch (error) {
    console.error("Error fetching skills:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills data",
      error: error.message,
    })
  }
}

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Public
const getSkillById = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id).populate("projects", "title description githubUrl liveUrl")

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    res.status(200).json({
      success: true,
      data: skill,
    })
  } catch (error) {
    console.error("Error fetching skill by ID:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch skill",
      error: error.message,
    })
  }
}

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res) => {
  try {
    const skill = await Skills.create(req.body)

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    })
  } catch (error) {
    console.error("Error creating skill:", error)
    res.status(400).json({
      success: false,
      message: "Failed to create skill",
      error: error.message,
    })
  }
}

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res) => {
  try {
    const skill = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    })
  } catch (error) {
    console.error("Error updating skill:", error)
    res.status(400).json({
      success: false,
      message: "Failed to update skill",
      error: error.message,
    })
  }
}

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skills.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting skill:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    })
  }
}

module.exports = {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
}

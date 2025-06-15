const Projects = require("../models/Projects")

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { category, status, featured } = req.query

    const query = { isActive: true }

    if (category) query.category = category
    if (status) query.status = status
    if (featured) query.isFeatured = featured === "true"

    const projects = await Projects.find(query).sort({ priority: -1, createdAt: -1 })

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects data",
      error: error.message,
    })
  }
}

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Projects.find({
      isActive: true,
      isFeatured: true,
    }).sort({ priority: -1, createdAt: -1 })

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    })
  } catch (error) {
    console.error("Error fetching featured projects:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured projects",
      error: error.message,
    })
  }
}

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    res.status(200).json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error("Error fetching project by ID:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    })
  }
}

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const project = await Projects.create(req.body)

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    })
  } catch (error) {
    console.error("Error creating project:", error)
    res.status(400).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    })
  }
}

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Projects.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    })
  } catch (error) {
    console.error("Error updating project:", error)
    res.status(400).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    })
  }
}

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Projects.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    })
  }
}

module.exports = {
  getProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
}

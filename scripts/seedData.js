const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Education = require("../models/Education")
const Skills = require("../models/Skills")
const Projects = require("../models/Projects")

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ MongoDB Connected for seeding")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  }
}

const educationData = [
  {
    degree: "Bachelor of Science in Artificial Intelligence",
    institute: "ITU Punjab",
    location: "Lahore, Pakistan",
    year: "2023-2027",
    status: "Current",
    description: "Studying core AI concepts, machine learning, deep learning, and computer vision.",
    achievements: ["Dean's List", "AI Research Project"],
  },
  {
    degree: "Intermediate in Computer Science",
    institute: "Government College",
    location: "Lahore, Pakistan",
    year: "2021-2023",
    status: "Completed",
    description: "Foundation in computer science, mathematics, and physics.",
    gpa: "3.8/4.0",
  },
]

const skillsData = [
  // Programming Languages
  { name: "C++", category: "Languages", proficiency: 85, yearsOfExperience: 3, color: "#00599C" },
  { name: "JavaScript", category: "Languages", proficiency: 80, yearsOfExperience: 2, color: "#F7DF1E" },
  { name: "Python", category: "Languages", proficiency: 75, yearsOfExperience: 2, color: "#3776AB" },
  { name: "C#", category: "Languages", proficiency: 70, yearsOfExperience: 1, color: "#239120" },

  // Frontend
  { name: "React", category: "Frontend", proficiency: 80, yearsOfExperience: 2, color: "#61DAFB" },
  { name: "HTML5", category: "Frontend", proficiency: 90, yearsOfExperience: 3, color: "#E34F26" },
  { name: "CSS3", category: "Frontend", proficiency: 85, yearsOfExperience: 3, color: "#1572B6" },
  { name: "Material-UI", category: "Frontend", proficiency: 75, yearsOfExperience: 1, color: "#0081CB" },

  // Backend
  { name: "Node.js", category: "Backend", proficiency: 70, yearsOfExperience: 1, color: "#339933" },
  { name: "Express.js", category: "Backend", proficiency: 70, yearsOfExperience: 1, color: "#000000" },

  // Database
  { name: "MongoDB", category: "Database", proficiency: 65, yearsOfExperience: 1, color: "#47A248" },
  { name: "MySQL", category: "Database", proficiency: 60, yearsOfExperience: 1, color: "#4479A1" },

  // Tools
  { name: "Git", category: "Tools", proficiency: 80, yearsOfExperience: 2, color: "#F05032" },
  { name: "Unity", category: "Tools", proficiency: 75, yearsOfExperience: 1, color: "#000000" },
  { name: "Qt", category: "Tools", proficiency: 70, yearsOfExperience: 1, color: "#41CD52" },
  { name: "Visual Studio Code", category: "Tools", proficiency: 90, yearsOfExperience: 3, color: "#007ACC" },
]

const projectsData = [
  {
    title: "Text Editor in C++",
    description:
      "Developed a lightweight text editor using C++ that supports basic functionalities such as text formatting, file operations, and syntax highlighting. Implemented a user-friendly interface and optimized performance for handling large text files.",
    shortDescription: "A feature-rich text editor built with C++ and Qt framework",
    technologies: ["C++", "Qt", "File I/O", "Syntax Highlighting"],
    features: [
      "Multi-tab support",
      "Syntax highlighting for multiple languages",
      "Find and replace functionality",
      "Auto-save feature",
      "Customizable themes",
    ],
    startDate: new Date("2023-01-01"),
    endDate: new Date("2024-12-01"),
    status: "Completed",
    githubUrl: "https://github.com/yourusername/text-editor",
    category: "Desktop App",
    priority: 4,
    isFeatured: true,
  },
  {
    title: "Fighting 2D Game in Unity",
    description:
      "Created a 2D fighting game using Unity, featuring character selection, dynamic combat mechanics, and engaging animations. Designed levels and integrated sound effects, enhancing the overall gaming experience while focusing on responsive controls and gameplay balance.",
    shortDescription: "An engaging 2D fighting game with multiple characters and combat mechanics",
    technologies: ["Unity", "C#", "2D Animation", "Game Design"],
    features: [
      "Multiple playable characters",
      "Combo system",
      "Special moves and abilities",
      "Multiple game modes",
      "Sound effects and music",
    ],
    startDate: new Date("2020-11-01"),
    endDate: new Date("2021-04-01"),
    status: "Completed",
    githubUrl: "https://github.com/yourusername/fighting-game",
    liveUrl: "https://yourgame.com",
    category: "Game Development",
    priority: 3,
    isFeatured: true,
  },
  {
    title: "Tic-Tac-Toe Game in C++",
    description:
      "Developed a console-based Tic-Tac-Toe game in C++ that allows single-player and multiplayer modes. Implemented game logic, user input handling, and a simple AI opponent, providing an engaging experience while demonstrating fundamental programming concepts.",
    shortDescription: "Console-based Tic-Tac-Toe game with AI opponent",
    technologies: ["C++", "Console Application", "AI Algorithm"],
    features: [
      "Single-player vs AI",
      "Multiplayer mode",
      "Difficulty levels",
      "Score tracking",
      "Clean console interface",
    ],
    startDate: new Date("2022-05-01"),
    endDate: new Date("2023-12-01"),
    status: "Completed",
    githubUrl: "https://github.com/yourusername/tic-tac-toe",
    category: "Desktop App",
    priority: 2,
  },
  {
    title: "TaskBuddy",
    description:
      "TaskBuddy is a user-friendly mobile application designed to help users efficiently manage their tasks and enhance productivity. With an intuitive interface, TaskBuddy allows users to create, organize, and prioritize tasks effortlessly.",
    shortDescription: "A productivity mobile app for task management",
    technologies: ["React Native", "Firebase", "Redux", "Mobile Development"],
    features: [
      "Task creation and management",
      "Priority levels",
      "Due date reminders",
      "Category organization",
      "Progress tracking",
    ],
    startDate: new Date("2020-01-01"),
    endDate: new Date("2021-12-01"),
    status: "Completed",
    githubUrl: "https://github.com/yourusername/taskbuddy",
    liveUrl: "https://taskbuddy-app.com",
    category: "Mobile App",
    priority: 3,
    isFeatured: true,
  },
]

const seedData = async () => {
  try {
    // Clear existing data
    await Education.deleteMany({})
    await Skills.deleteMany({})
    await Projects.deleteMany({})

    // Insert new data
    const education = await Education.insertMany(educationData)
    const skills = await Skills.insertMany(skillsData)
    const projects = await Projects.insertMany(projectsData)

    console.log("✅ Data seeded successfully!")
    console.log(`📚 Education records: ${education.length}`)
    console.log(`🛠️ Skills: ${skills.length}`)
    console.log(`💼 Projects: ${projects.length}`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding data:", error)
    process.exit(1)
  }
}

// Run the seeder
connectDB().then(() => {
  seedData()
})

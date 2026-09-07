const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Define schemas inline to avoid ES module import complications in a raw Node script
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  details: [String],
  techStack: [String],
  githubUrl: String,
  demoUrl: String,
  category: String,
  order: Number,
});

const SkillSchema = new mongoose.Schema({
  name: String,
  category: String,
  proficiency: Number,
  order: Number,
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
const Skill = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);

const projectsData = [
  {
    title: "NGO Clothes Donation Platform (Threads of Hope)",
    description: "A full-stack donation platform connecting donors with NGOs, improving donation coordination and reducing manual follow-ups by 50%.",
    details: [
      "Built a full-stack platform connecting donors with NGOs, improving donation coordination and reducing manual follow-ups by 50%.",
      "Developed optimized RESTful APIs, reducing average API response time by 35%.",
      "Improved React UI performance and form handling, reducing failed submissions by 25% and improving load time by 40%."
    ],
    techStack: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "RESTful API"],
    githubUrl: "https://github.com/shailjaiswal9135/threads-of-hope",
    demoUrl: "https://threads-of-hope.example.com",
    category: "MERN",
    order: 1
  },
  {
    title: "Real Time Chat Application",
    description: "A real-time messaging application supporting 50+ concurrent users with instant delivery, active user status, and secure authentication.",
    details: [
      "Developed a real-time chat application supporting 50+ concurrent users using Socket.IO.",
      "Implemented secure JWT-based authentication and REST APIs for user and message management.",
      "Optimized socket events and payloads, reducing message latency by 30%.",
      "Built a responsive React UI, improving user engagement across mobile and desktop devices."
    ],
    techStack: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB", "Socket.IO", "ChakraUI"],
    githubUrl: "https://github.com/shailjaiswal9135/realtime-chat",
    demoUrl: "https://chat-app.example.com",
    category: "MERN",
    order: 2
  },
  {
    title: "Text to Image Generator",
    description: "A generative AI web application that translates text prompts into high-quality images with secure payment processing.",
    details: [
      "Developed a full-stack Text-to-Image Generator using React, Vite, TailwindCSS, Node.js, and Express.",
      "Implemented JWT authentication and Razorpay payments, supporting 100+ secure transactions.",
      "Designed scalable backend APIs handling 100+ image generation requests per day.",
      "Enhanced UI/UX using GSAP and Framer Motion, improving interaction and session duration."
    ],
    techStack: ["ReactJS", "NodeJS", "ExpressJS", "Vite", "TailwindCSS", "ClipDrop API", "GSAP", "Framer Motion", "Razorpay"],
    githubUrl: "https://github.com/shailjaiswal9135/text-to-image",
    demoUrl: "https://text-image-gen.example.com",
    category: "AI",
    order: 3
  }
];

const skillsData = [
  // Languages
  { name: "JavaScript", category: "languages", proficiency: 95, order: 1 },
  { name: "TypeScript", category: "languages", proficiency: 90, order: 2 },
  { name: "Python", category: "languages", proficiency: 85, order: 3 },
  { name: "Java", category: "languages", proficiency: 80, order: 4 },
  { name: "C++", category: "languages", proficiency: 80, order: 5 },
  { name: "SQL", category: "languages", proficiency: 85, order: 6 },
  
  // Databases
  { name: "MongoDB", category: "databases", proficiency: 92, order: 1 },
  { name: "MySQL", category: "databases", proficiency: 85, order: 2 },
  
  // Web Frameworks & Libraries
  { name: "Next.js", category: "web", proficiency: 90, order: 1 },
  { name: "ReactJS", category: "web", proficiency: 95, order: 2 },
  { name: "NodeJS", category: "web", proficiency: 92, order: 3 },
  { name: "ExpressJS", category: "web", proficiency: 92, order: 4 },
  { name: "Redux", category: "web", proficiency: 85, order: 5 },
  { name: "Zustand", category: "web", proficiency: 85, order: 6 },
  { name: "HTML5 & CSS3", category: "web", proficiency: 95, order: 7 },
  { name: "SCSS", category: "web", proficiency: 90, order: 8 },
  
  // Gen AI
  { name: "OpenAI API", category: "genai", proficiency: 88, order: 1 },
  { name: "LangChain", category: "genai", proficiency: 85, order: 2 },
  { name: "LangGraph", category: "genai", proficiency: 80, order: 3 },
  { name: "Pinecone (Vector DB)", category: "genai", proficiency: 82, order: 4 },
  { name: "RAG & Prompts", category: "genai", proficiency: 85, order: 5 },
  
  // Tools
  { name: "Git & GitHub", category: "tools", proficiency: 90, order: 1 },
  { name: "VS Code", category: "tools", proficiency: 95, order: 2 },
  { name: "Postman", category: "tools", proficiency: 90, order: 3 },
  { name: "RESTful APIs", category: "tools", proficiency: 92, order: 4 }
];

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.');

  console.log('Clearing old data...');
  await Project.deleteMany({});
  await Skill.deleteMany({});
  console.log('Cleared.');

  console.log('Seeding projects...');
  await Project.insertMany(projectsData);
  console.log('Projects seeded.');

  console.log('Seeding skills...');
  await Skill.insertMany(skillsData);
  console.log('Skills seeded.');

  console.log('Database seeding completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error during seeding:', err);
  process.exit(1);
});

import { NextResponse } from 'next/server';
import dbConnect, { MONGODB_URI } from '@/lib/mongodb';
import Project from '@/lib/models/Project';

const fallbackProjects = [
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

export async function GET() {
  if (!MONGODB_URI) {
    return NextResponse.json({ success: true, source: 'fallback', data: fallbackProjects });
  }

  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ order: 1 });
    
    if (projects.length === 0) {
      return NextResponse.json({ success: true, source: 'fallback (empty db)', data: fallbackProjects });
    }
    
    return NextResponse.json({ success: true, source: 'database', data: projects });
  } catch (error: any) {
    console.error('Error fetching projects from DB:', error);
    return NextResponse.json({ success: true, source: 'fallback (db error)', data: fallbackProjects });
  }
}

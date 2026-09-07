import { NextResponse } from 'next/server';
import dbConnect, { MONGODB_URI } from '@/lib/mongodb';
import Skill from '@/lib/models/Skill';

const fallbackSkills = [
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

export async function GET() {
  if (!MONGODB_URI) {
    return NextResponse.json({ success: true, source: 'fallback', data: fallbackSkills });
  }

  try {
    await dbConnect();
    const skills = await Skill.find({}).sort({ order: 1 });
    
    if (skills.length === 0) {
      return NextResponse.json({ success: true, source: 'fallback (empty db)', data: fallbackSkills });
    }
    
    return NextResponse.json({ success: true, source: 'database', data: skills });
  } catch (error: any) {
    console.error('Error fetching skills from DB:', error);
    return NextResponse.json({ success: true, source: 'fallback (db error)', data: fallbackSkills });
  }
}

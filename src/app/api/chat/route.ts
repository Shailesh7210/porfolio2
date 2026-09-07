import { NextResponse } from 'next/server';

const SHAILESH_RESUME_INFO = `
Name: Shailesh Jaiswal
Location: Bengaluru, Karnataka
Phone: +91-6206948554
Email: shailjaiswal9135@gmail.com
LinkedIn: https://linkedin.com/in/shailjaiswal9135 (Simulated)
GitHub: https://github.com/shailjaiswal9135 (Simulated)
LeetCode: https://leetcode.com/shailjaiswal9135 (Simulated)
HackerRank: https://hackerrank.com/shailjaiswal9135 (Simulated)

Education:
- Master Of Computer Application (MCA) | CGPA: 8.8
  Dr. Shyama Prasad Mukherjee University, Ranchi (2022 - 2024)

Work Experience:
1. Indux Technology | Full Stack Developer Intern (February 2026 - Present) | Bengaluru
   - Developed scalable web applications using Next.js, Node.js, Express, and MongoDB.
   - Built RESTful APIs with Node.js to support dynamic frontend features and data management.
   - Integrated external services and APIs for enhanced platform capabilities.
   - Improved UI responsiveness and frontend performance in Next.js applications.

2. Hashedbit Innovation | Software Developer Intern (April 2024 - June 2024) | Gurgaon, Haryana
   - Developed and maintained web applications using MongoDB, Express.js, React.js, and Node.js (MERN stack).
   - Collaborated with the development team to design and implement RESTful APIs.
   - Integrated third-party services and APIs for enhanced functionality.
   - Optimized frontend performance and UI for responsive and efficient user experience.
   - Participated in Agile development cycles, including sprint planning, daily stand-ups, and code reviews.

Projects:
1. NGO Clothes Donation Platform (Threads of Hope) | MERN Stack
   - Built a full-stack platform connecting donors with NGOs, improving donation coordination and reducing manual follow-ups by 50%.
   - Developed optimized RESTful APIs, reducing average API response time by 35%.
   - Improved React UI performance and form handling, reducing failed submissions by 25% and improving load time by 40%.

2. Real Time Chat Application | MERN Stack, Socket.IO, ChakraUI
   - Developed a real-time chat application supporting 50+ concurrent users using Socket.IO.
   - Implemented secure JWT-based authentication and REST APIs for user and message management.
   - Optimized socket events and payloads, reducing message latency by 30%.
   - Built a responsive React UI, improving user engagement across mobile and desktop devices.

3. Text to Image Generator | MERN Stack, ClipDrop API
   - Developed a full-stack Text-to-Image Generator using React, Vite, TailwindCSS, Node.js, and Express.
   - Implemented JWT authentication and Razorpay payments, supporting 100+ secure transactions.
   - Designed scalable backend APIs handling 100+ image generation requests per day.
   - Enhanced UI/UX using GSAP and Framer Motion, improving interaction and session duration.

Technical Skills:
- Languages: Python, Java, C++, JavaScript, TypeScript, SQL, NoSQL
- Databases: MongoDB, MySQL
- Developer Tools: VS Code, Postman, GitHub, Git, Gitlab, jQuery, RESTful API
- Technologies/Frameworks: ReactJS, Redux, Zustand, NodeJS, ExpressJS, Mongo, Linux, HTML5, CSS3, SCSS
- Gen AI: OpenAI API, LangChain, LangGraph, Vector Databases (Pinecone), RAG, Prompt Engineering, LLM Integration, AI Agents

Coding Platforms:
- LeetCode & HackerRank: Solved 250+ DSA problems.
- HackerRank: 4 star developer.
`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (openaiApiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completures', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are an AI Assistant representing Shailesh Jaiswal on his portfolio website.
Here is Shailesh's resume context:
${SHAILESH_RESUME_INFO}

Respond to the user's questions in a friendly, professional tone. Keep responses relatively concise, bulleted where appropriate, and highlight Shailesh's key strengths. If the question is unrelated to his resume, politely guide them back to asking about his skills, projects, work experience, or how to contact him.`,
              },
              { role: 'user', content: message },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json({
            response: data.choices[0].message.content,
            source: 'OpenAI API',
          });
        } else {
          console.warn('OpenAI API returned non-OK status. Falling back to heuristic chatbot.');
        }
      } catch (err) {
        console.error('Error calling OpenAI API. Falling back to heuristic chatbot.', err);
      }
    }

    // Heuristic Chatbot Fallback
    const msg = message.toLowerCase();
    let reply = '';

    if (msg.includes('project') || msg.includes('build') || msg.includes('threads of hope') || msg.includes('chat') || msg.includes('image')) {
      reply = `Shailesh has built several impressive full-stack projects:
1. **Threads of Hope (NGO Clothes Donation Platform)**: A MERN stack platform that reduced manual follow-ups by 50% and optimized RESTful APIs for 35% faster response times.
2. **Real Time Chat Application**: Features JWT auth and Socket.IO, supporting 50+ concurrent users and cutting socket latency by 30%.
3. **Text to Image Generator**: Integrated ClipDrop API for image generation, Razorpay for payments (100+ transactions), and GSAP/Framer Motion for beautiful animations.

Which project would you like to know more about?`;
    } else if (msg.includes('experience') || msg.includes('work') || msg.includes('intern') || msg.includes('indux') || msg.includes('hashedbit')) {
      reply = `Shailesh has hands-on internship experience:
- **Full Stack Developer Intern** at **Indux Technology** (Feb 2026 - Present): Developing scalable web apps in Next.js, Node.js, Express, and MongoDB, and building RESTful APIs.
- **Software Developer Intern** at **Hashedbit Innovation** (Apr 2024 - Jun 2024): Designed/implemented RESTful APIs, optimized frontend UI performance, and worked in Agile/Scrum cycles.`;
    } else if (msg.includes('skill') || msg.includes('language') || msg.includes('tech') || msg.includes('python') || msg.includes('java') || msg.includes('react') || msg.includes('next') || msg.includes('node')) {
      reply = `Shailesh has a comprehensive skill set across modern technologies:
- **Languages**: JavaScript, TypeScript, Python, Java, C++, SQL, NoSQL.
- **Frameworks & Libraries**: Next.js, ReactJS, ExpressJS, NodeJS, Redux, Zustand, SCSS.
- **Databases**: MongoDB, MySQL.
- **Gen AI**: OpenAI API, LangChain, LangGraph, Pinecone (Vector Databases), RAG, Prompt Engineering.
- **Tools**: Git, GitHub, GitLab, VS Code, Postman.`;
    } else if (msg.includes('gen ai') || msg.includes('ai') || msg.includes('llm') || msg.includes('openai') || msg.includes('langchain') || msg.includes('langgraph')) {
      reply = `Shailesh is highly skilled in **Generative AI**! He has experience working with:
- **APIs & Frameworks**: OpenAI API, LangChain, and LangGraph (for multi-agent workflows).
- **RAG & Vector Databases**: Implementing Retrieval-Augmented Generation using Vector DBs like **Pinecone**.
- **AI Agents**: Designing autonomous agents and handling prompt engineering.
- **Integrations**: He built a full-stack Text-to-Image Generator and integrates AI chatbots like this one!`;
    } else if (msg.includes('education') || msg.includes('college') || msg.includes('university') || msg.includes('mca') || msg.includes('study')) {
      reply = `Shailesh completed his **Master Of Computer Application (MCA)** with an outstanding **CGPA of 8.8** from **Dr. Shyama Prasad Mukherjee University, Ranchi** (2022 - 2024).`;
    } else if (msg.includes('coding') || msg.includes('leetcode') || msg.includes('hackerrank') || msg.includes('dsa') || msg.includes('problem')) {
      reply = `Shailesh is an active competitive programmer:
- Solved **250+ DSA problems** across LeetCode, HackerRank, and other platforms.
- Achieved a **4-star badge** on HackerRank.
- Proficient in data structures and algorithms using Python, Java, and C++.`;
    } else if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('hire') || msg.includes('reach')) {
      reply = `You can reach out to Shailesh Jaiswal through:
- **Email**: shailjaiswal9135@gmail.com
- **Phone**: +91-6206948554
- **Location**: Bengaluru, Karnataka

Feel free to send a message via the Contact Form on this page as well! It will connect directly to the database.`;
    } else {
      reply = `Hello! I am Shailesh's resume assistant. I can tell you about his:
- 💼 **Work Experience** (Indux Technology, Hashedbit Innovation)
- 🚀 **Projects** (NGO Platform, Real-time Chat, Image Generator)
- 🛠️ **Technical Skills** (Next.js, MongoDB, Gen AI, LangGraph, Python)
- 🎓 **Education** (MCA, 8.8 CGPA)
- 🏆 **DSA Stats** (250+ LeetCode, 4-star HackerRank)

What would you like to know?`;
    }

    return NextResponse.json({
      response: reply,
      source: 'Local Heuristic Fallback',
    });
  } catch (error: any) {
    console.error('API Chat route error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  details: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  category: string;
  order: number;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  details: [{ type: String }],
  techStack: [{ type: String }],
  githubUrl: { type: String },
  demoUrl: { type: String },
  category: { type: String, default: 'MERN' }, // MERN, AI, Other
  order: { type: Number, default: 0 },
});

const Project: Model<IProject> = 
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;

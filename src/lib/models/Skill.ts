import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: string; // languages, databases, web, genai, tools
  proficiency: number; // 0 to 100
  order: number;
}

const SkillSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, default: 80 },
  order: { type: Number, default: 0 },
});

const Skill: Model<ISkill> = 
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;

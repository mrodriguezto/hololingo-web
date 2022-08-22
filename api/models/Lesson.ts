import mongoose, { Schema, model, Model } from 'mongoose';
import { ILesson } from 'interfaces';

const lessonSchema = new Schema(
  {
    description: { type: String, required: true },
    example: { type: String, required: true },
    date_created: { type: Date, required: true },
    category: { type: String },
  },
  {
    timestamps: true,
    collection: 'lesson',
  },
);

const Lesson: Model<ILesson> =
  mongoose.models.Lesson || model('Lesson', lessonSchema);

export default Lesson;

import mongoose, { Schema, model, Model } from 'mongoose';
import { ILesson } from 'interfaces';

const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    example: { type: String, required: true },
    category_name: { type: String },
  },
  {
    timestamps: true,
    collection: 'lesson',
    versionKey: false,
  },
);

const Lesson: Model<ILesson> =
  mongoose.models.Lesson || model('Lesson', lessonSchema);

export default Lesson;

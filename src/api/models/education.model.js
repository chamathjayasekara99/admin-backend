import mongoose, { Schema } from 'mongoose';

const EducationSchema = new Schema({
  level: { type: String, required: true },
  school: { type: String, required: true },
  streamOrSpecialisation: { type: String, required: true },
  Grade: { type: String, required: true },
});

const Education = mongoose.model('Education', EducationSchema);

export default Education;

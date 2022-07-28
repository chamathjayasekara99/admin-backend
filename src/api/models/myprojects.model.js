import mongoose, { Schema } from 'mongoose';

const MyProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  githubLink: { type: String, required: true },
  hostedLink: { type: String },
  //define an string array
  usedTechnology: [{ type: String, required: true }],
});

const MyProject = mongoose.model('MyProject', MyProjectSchema);

export default MyProject;

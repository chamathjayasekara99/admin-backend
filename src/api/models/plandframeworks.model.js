import mongoose, { Schema } from 'mongoose';

const PLAndFrameworksSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const PLAndFrameworks = mongoose.model(
  'PLAndFramework',
  PLAndFrameworksSchema
);

export default PLAndFrameworks;

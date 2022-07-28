import mongoose, { Schema } from 'mongoose';

const AcheivementsSchema = new Schema({
  acheivementTitle: { type: String, required: true },
  description: { type: String, required: true },
  associatedWith: { type: String, required: true },
  imageUrl: { type: String },
});

const Achievement = mongoose.model('Acheivement', AcheivementsSchema);

export default Achievement;

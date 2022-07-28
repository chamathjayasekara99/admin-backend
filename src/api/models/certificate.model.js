import mongoose, { Schema } from 'mongoose';
const CertificateSchema = new Schema({
  title: { type: String, required: true },
  associatedWith: { type: String, required: true },
  issueDate: { type: String, required: true },
  expirationDate: { type: String, required: true },
});

const Certification = mongoose.model('Certificate', CertificateSchema);

export default Certification;

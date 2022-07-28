import mongoose, { Schema } from 'mongoose';

const ToolAndTechSchema = new Schema({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
});
const ToolAndTech = mongoose.model('ToolAndFramwork', ToolAndTechSchema);
export default ToolAndTech;

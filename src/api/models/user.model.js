import mongoose, { Schema } from 'mongoose';


// if we need another schema type our object we need to pass the schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  roles: [{ type: String, required: true }],
  propicUrl: { type: String, required: true },
  gmail: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  facebookUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  linkedInUrl: { type: String, required: true },
  projects: [{type:Schema.Types.ObjectId,ref:"MyProject"}], //here we can give th type as schema type
  toolsAndTech: [{type:Schema.Types.ObjectId,ref:"ToolAndFramwork"}],
  education: [{type:Schema.Types.ObjectId,ref:"Education"}],
  plAndFrameworks: [{type:Schema.Types.ObjectId,ref:"PLAndFramework"}],
  certificates: [{type:Schema.Types.ObjectId,ref:"Certificate"}],
  acheivements: [{type:Schema.Types.ObjectId,ref:"Acheivement"}],
});

const User = mongoose.model('users', UserSchema);

export default User;

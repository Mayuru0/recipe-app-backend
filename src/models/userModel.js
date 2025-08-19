import mongoose from "mongoose";
import roles from "../config/constants.js";

//iport FavoriteModel from "./FavoriteModel.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
//   favorites: [
//   {
//     idCategory: String,
//     strCategory: String,
//     strCategoryThumb: String,
//     strCategoryDescription: String,
//     addedAt: { type: Date, default: Date.now },
//   },
// ],
   //favorites: [FavoriteModel], 


  role: {
    type: String,
    enum: ["admin", "user"],
    default: roles.user,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;

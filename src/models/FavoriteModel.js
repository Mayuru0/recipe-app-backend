// FavoriteSchema.js
import mongoose from "mongoose";

const FavoriteModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  strMeal: { type: String, required: true },
  strCategoryThumb: String,
  idMeal: String,
  addedAt: { type: Date, default: Date.now },
});

//export default FavoriteModel; 

const Favorite = mongoose.model("Favorite", FavoriteModel);
export default Favorite;

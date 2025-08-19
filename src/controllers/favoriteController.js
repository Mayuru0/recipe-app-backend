import Favorite from "../models/FavoriteModel.js";

//get all favorites
export const getFavorites = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //res.status(200).json(user.favorites);
    const favorites = await Favorite.find({ user: user._id });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};

//add favorite
export const addFavorite = async (req, res) => {
  const { strMeal, strCategoryThumb, idMeal } = req.body;
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // check duplicate
    const existingFavorite = await Favorite.findOne({
      user: user._id,
      idMeal,
    });
    if (existingFavorite) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    const favorite = new Favorite({
      user: user._id,
      strMeal,
      strCategoryThumb,
      idMeal,
    });

    await favorite.save();
    //user.favorites.push(data);
    //await user.save();
    res.status(200).json({
      message: "Favorite added successfully",
      data: favorite,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add favorite" });
  }
};

// ✅ Delete favorite
export const deleteFavorite = async (req, res) => {
  const { idMeal } = req.params;

  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deleted = await Favorite.findOneAndDelete({
      user: user._id,   // ensure only this user's favorites are touched
      idMeal,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    res.status(500).json({ message: "Failed to delete favorite" });
  }
};


// //delete favorite
// export const deleteFavorite = async (req, res) => {
//    const {idCategory} = req.params;
//    try{
//         const user = req.user;
//        if (!user) {
//            return res.status(404).json({ message: "User not found" });
//        }
//        user.favorites = user.favorites.filter(favorite => favorite.idCategory !== idCategory);
//        await user.save();
//        res.status(200).json({ message: "Favorite deleted successfully" });
//    } catch (error) {
//        res.status(500).json({ message: "Failed to delete favorite" });
//    }
// };

import User from "../models/userModel.js";

//get all favorites
export const getFavorites = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch favorites" });
    }
};


//add favorite
export const addFavorite = async (req, res) => {
   const {idCategory, strCategory, strCategoryThumb, strCategoryDescription} = req.body;
   try{
        const user = req.user;
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }
       user.favorites.push({idCategory, strCategory, strCategoryThumb, strCategoryDescription});
       await user.save();
       res.status(200).json({ message: "Favorite added successfully" });
   } catch (error) {
       res.status(500).json({ message: "Failed to add favorite" });
   }
     
};

//delete favorite
export const deleteFavorite = async (req, res) => {
   const {idCategory} = req.params;
   try{
        const user = req.user;
       if (!user) {
           return res.status(404).json({ message: "User not found" });
       }
       user.favorites = user.favorites.filter(favorite => favorite.idCategory !== idCategory);
       await user.save();
       res.status(200).json({ message: "Favorite deleted successfully" });
   } catch (error) {
       res.status(500).json({ message: "Failed to delete favorite" });
   }
};

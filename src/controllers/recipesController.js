import axios from "axios";
import { THEMEALDB_BASE_URL } from "../config/env.js";

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const response = await axios.get(`${THEMEALDB_BASE_URL}/categories.php`);
    res.status(200).json(response.data.categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// Get recipes by category
export const getRecipesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(`${THEMEALDB_BASE_URL}/filter.php?c=${category}`);
    res.status(200).json(response.data.meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recipes by category" });
  }
};

// Get recipe details by id
export const getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${THEMEALDB_BASE_URL}/lookup.php?i=${id}`);
    res.status(200).json(response.data.meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recipe details" });
  }
};

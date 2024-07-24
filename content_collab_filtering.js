// Sample dataset of food items with their features
const foodDataset = [
    { id: 1, name: 'Pizza', type: 'Italian', flavor: 'Savory', rating: 4.5 },
    { id: 2, name: 'Sushi', type: 'Japanese', flavor: 'Umami', rating: 4.2 },
    { id: 3, name: 'Burger', type: 'American', flavor: 'Savory', rating: 4.0 },
    { id: 4, name: 'Pad Thai', type: 'Thai', flavor: 'Spicy', rating: 4.1 },
    { id: 5, name: 'Tacos', type: 'Mexican', flavor: 'Spicy', rating: 4.3 }
    // Add more food items here
  ];
  
  // Sample user feedback data
  const userFeedback = [
    { userId: 1, foodId: 1, rating: 5 },
    { userId: 1, foodId: 2, rating: 4 },
    { userId: 2, foodId: 1, rating: 4 },
    { userId: 2, foodId: 3, rating: 3 },
    { userId: 3, foodId: 2, rating: 5 },
    { userId: 3, foodId: 4, rating: 4 }
    // Add more user feedback here
  ];
// Collaborative Filtering Algorithm

// Function to get top N food recommendations for a user using collaborative filtering
function getCollaborativeRecommendations(userId, topN) {

    // Filter user feedback for the given user
    const userRatings = userFeedback.filter(feedback => feedback.userId === userId);
    
    // Sort food items based on user ratings
    const sortedRatings = userRatings.sort((a, b) => b.rating - a.rating);
    
    // Extract food IDs from sorted ratings
    const ratedFoodIds = sortedRatings.map(rating => rating.foodId);
    
    // Get top N food recommendations excluding already rated food
    const recommendations = foodDataset.filter(food=>!ratedFoodIds.includes(food.id)).slice(0, topN);
    
    return recommendations;
    }
// Content-Based Filtering Algorithm

// Function to get top N food recommendations based on content similarity
function getContentBasedRecommendations(foodId, topN) {
    const targetFood = foodDataset.find(food => food.id === foodId);
    
    // Find food items with similar features
    const similarFoods = foodDataset.filter(food => food.id === targetFood.id && food.type === targetFood.type && food.flavor === targetFood.flavor);
    
    // Sort similar foods based on their ratings
    const sortedFoods = similarFoods.sort((a, b) => b.rating - a.rating);
    
    // Get top N recommendations
    const recommendations = sortedFoods.slice(0, topN);
    
    return recommendations;
    }
// Usage Example

const userId = 1;
const collaborativeRecommendations = getCollaborativeRecommendations(userId, 3);
console.log('Collaborative Filtering Recommendations:');
console.log(collaborativeRecommendations);

const foodId = 2;
const contentBasedRecommendations = getContentBasedRecommendations(foodId, 3);
console.log('Content-Based Filtering Recommendations:');
console.log(contentBasedRecommendations);
          
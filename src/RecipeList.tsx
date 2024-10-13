import React from 'react';
import Recipe from './Recipe.tsx';
import { IRecipe } from './types.ts';

interface IRecipeListProps {
    recipes: IRecipe[];
    onBack: () => void;
}

const RecipeList: React.FC<IRecipeListProps> = ({ recipes, onBack }) => {
    return (
        <div className="recipe-list">
            <button onClick={onBack}>Back to Tags</button>
            {recipes.map(recipe => (
                <Recipe key={recipe.id} recipeData={recipe} />
            ))}
        </div>
    );
};

export default RecipeList;

import React, { useState, useEffect } from 'react';
import RecipeTagList from './RecipeTagList.tsx';
import RecipeList from './RecipeList.tsx';
import { IRecipe } from './types.ts';

const App = () => {

  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  // Fetch the tags from the given URL
  useEffect(() => {
    fetch('https://dummyjson.com/recipes/tags')
        .then(response => response.json())
        .then(data => setTags(data))
        .catch(error => console.error('Error loading tags:', error));
  }, []);

  // Fetch the recipe if a tag is selected
  useEffect(() => {
    if (selectedTag) {
        fetch(`https://dummyjson.com/recipes/tag/${selectedTag}`)
            .then(response => response.json())
            .then(data => setRecipes(data.recipes || []))
            .catch(error => console.error('Error loading recipes:', error));
    }
  }, [selectedTag]);

  const handleSelectTag = (tagName: string) => {
    setSelectedTag(tagName);
  };

  const handleBackToTags = () => {
    setSelectedTag(null);
  };


  return (
    <div>
        <h1>ACME Recipe O'Master</h1>
        <div className="app-container">
            {selectedTag ? (
                <RecipeList recipes={recipes} onBack={handleBackToTags} />
            ) : (
                <RecipeTagList tagList={tags} onSelectTag={handleSelectTag} />
            )}
        </div>
    </div>
  );
};

export default App;

import { RecipeCard } from "./components/recipeCard"
import { SearchBar } from "./components/searchBar"
import type { Recipe } from "./types/recipe"
import { useState } from "react"
import { useEffect } from "react"

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY



function App() {

  const [recipes,setRecipes] = useState<Recipe[]>([])
  const [loading,setLoading] = useState(false)
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(() => {
  
  const saved = localStorage.getItem("my-ledger");
  return saved ? JSON.parse(saved) : [];
});

  useEffect(() => {
  localStorage.setItem("my-ledger", JSON.stringify(savedRecipes));
}, [savedRecipes]);
  

  const handleSavedRecipe = (recipe:Recipe) => {
    const isAlreadySaved = savedRecipes.some((r) => r.id===recipe.id)

    if(!isAlreadySaved) {
      setSavedRecipes([...savedRecipes,recipe])
    }
  }

  const handleRemoveRecipe = (id:number) => {
    const updatedRecipes = savedRecipes.filter((recipe)=> (recipe.id!==id))

    setSavedRecipes(updatedRecipes)
  }

  const  handleSearch = async (searchTerm : string)=> {
      if(!searchTerm) return

      setLoading(true)
      try {
        const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${searchTerm}&addRecipeInformation=true&number=9`
      );
        const data = await response.json()
        setRecipes(data.results || [])
      }catch (error) {
        console.error('fetch error',error)
      } finally {
        setLoading(false)
      }

      
  }
  return (
    

    

    <div className="flex p-10 bg-gray-50 min-h-screen">
      <main className="flex-1 p-10">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-black mb-6">Chef's Ledger</h1>
          <SearchBar onSearch={handleSearch} />
      </div>
      {loading && <p className="text-center animate-pulse">Sharpening the knives</p>}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onSave={handleSavedRecipe} />
        ))}

      </div>
      {recipes.length==0 && !loading && (<p className="text-center text-gray-400 mt-20">Your ledger is empty. Search for a dish.</p>)}
      </main>
      <aside className="w-96 bg-white border-l border-gray-200 p-8 sticky top-0 h-screen overflow-y-auto shadow-inner">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">My Ledger</h2>
        <div className="space-y-4">
          {savedRecipes.length === 0 ? (
            <p className="text-gray-400 text-sm italic">Search for a recipe to start your ledger!</p>
          ) : (savedRecipes.map((saved)=>(
            <div key={saved.id} className="relative group flex gap-3 items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
              <img src={saved.image} alt="" className="w-12 h-12 object-cover rounded-md shrink-0" />
              <p className="text-sm font-semibold line-clamp-2">{saved.title}</p>

              <button onClick={()=> handleRemoveRecipe(saved.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity" title="Remove">✕</button>
            </div>
          )))}
        </div>
      </aside>

    </div>

     
  )
}
    
      


export default App

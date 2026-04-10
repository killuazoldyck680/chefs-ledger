import type { Recipe } from "../types/recipe";

interface Props {
    recipe: Recipe,
    onSave: (recipe:Recipe) => void
}

export  const RecipeCard = ({recipe,onSave}: Props) => {
    return(
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md group flex flex-col">
        <div className="w-full aspect-video overflow-hidden rounded-t-2xl bg-gray-100">
            <img src={recipe.image} alt="recipe.image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            
            </img>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                {recipe.readyInMinutes}
            </div>

        </div>

        <div className="p-4 flex flex-col mt-auto">
            <h3 className="font-bold text-gray-800 text-lg truncate capitalize line-clamp-1 mb-2" title={recipe.title}>{recipe.title}</h3>
            <p className="text-sm text-gray-500 mb-4">Serves {recipe.servings} people</p>

            <button onClick={()=> onSave(recipe)} className="w-full bg-orange-500 text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer active:scale-95">Add To Ledger</button>
        </div>
    </div>
    )
}
import { useState } from "react";

interface Props {
    onSearch : (query: string) => void
}

export function SearchBar ({onSearch} : Props) {
    const [query , setQuery] = useState('')

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        if(query.trim()) {
            onSearch(query)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl mx-auto mb-10 mt-4">

            <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Search for recipes" className="flex-1 px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-sm transition-all"/>

            <button type="submit" className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-md active:scale-95 cursor-pointer">Search</button>

        </form>
    )

}
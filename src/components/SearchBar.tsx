import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
  onAdd: () => void;
}

export function SearchBar({ keyword, setKeyword, onSearch, onAdd }: SearchBarProps) {
  return (
    <div className="flex gap-4 w-full max-w-2xl">
      <div className="relative flex-1">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword to search..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      <button
        onClick={onSearch}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
      <button
        onClick={onAdd}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        Add
      </button>
    </div>
  );
}
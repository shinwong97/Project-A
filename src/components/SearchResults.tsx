import React from 'react';
import { SearchResult } from '../types';
import { Tag, Clock } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
      <div className="space-y-3">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-gray-900">{result.keyword}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{result.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Score: {result.relevanceScore.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
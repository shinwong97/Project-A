import React from 'react';

interface Result {
  id: number;
  keyword: string;
  category?: string;
  relevanceScore: number;
  createdAt: string;
}

interface ResultsListProps {
  results: Result[];
  isLoading: boolean;
}

export function ResultsList({ results, isLoading }: ResultsListProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mt-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="w-full max-w-2xl mt-8 text-center text-gray-500">
        No results found
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mt-8 space-y-4">
      {results.map((result) => (
        <div
          key={result.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{result.keyword}</h3>
              {result.category && (
                <span className="text-sm text-gray-500">{result.category}</span>
              )}
            </div>
            <span className="text-sm text-blue-600 font-medium">
              {Math.round(result.relevanceScore * 100)}% match
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Added {new Date(result.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
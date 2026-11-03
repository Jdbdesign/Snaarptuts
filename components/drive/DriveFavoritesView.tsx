"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { Star } from "lucide-react";

export interface DriveFavoritesViewProps {
  tl?: Timeline;
}

export const DriveFavoritesView: React.FC<DriveFavoritesViewProps> = () => {
  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto" data-tl="favorites-view">
      {/* Header */}
      <div className="pb-4">
        <h1 className="text-xl font-bold text-gray-900 leading-tight">Favorites</h1>
        <p className="text-xs text-gray-500">Your starred files and folders</p>
      </div>

      {/* Main Body / Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto mb-3 text-gray-300 flex items-center justify-center">
            <Star className="w-12 h-12 stroke-[1.3]" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            No favorites yet
          </h3>
          <p className="text-xs text-gray-500">
            Star files and folders to quickly access them here.
          </p>
        </div>
      </div>
    </div>
  );
};

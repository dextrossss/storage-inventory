
import React from 'react';
import { InventoryStats } from '../types';

interface StatsCardsProps {
  stats: InventoryStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <p className="text-sm font-medium text-slate-500 mb-1">Total SKU Items</p>
        <p className="text-3xl font-bold text-slate-900">{stats.totalItems}</p>
      </div>
      <div className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-200">
        <p className="text-sm font-medium text-amber-700 mb-1">Low Stock Alerts</p>
        <p className="text-3xl font-bold text-amber-900">{stats.lowStockCount}</p>
      </div>
      <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200">
        <p className="text-sm font-medium text-red-700 mb-1">Out of Stock</p>
        <p className="text-3xl font-bold text-red-900">{stats.outOfStockCount}</p>
      </div>
      <div className="bg-indigo-50 p-6 rounded-xl shadow-sm border border-indigo-200">
        <p className="text-sm font-medium text-indigo-700 mb-1">Categories</p>
        <p className="text-3xl font-bold text-indigo-900">{stats.categoryCount}</p>
      </div>
    </div>
  );
};

export default StatsCards;

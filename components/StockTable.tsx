
import React from 'react';
import { StorageItem, StockStatus } from '../types';

interface StockTableProps {
  items: StorageItem[];
}

const StockTable: React.FC<StockTableProps> = ({ items }) => {
  const getStatus = (item: StorageItem): StockStatus => {
    if (item.quantity === 0) return StockStatus.OUT_OF_STOCK;
    if (item.quantity <= item.minStock) return StockStatus.LOW_STOCK;
    return StockStatus.IN_STOCK;
  };

  const getStatusColor = (status: StockStatus) => {
    switch (status) {
      case StockStatus.IN_STOCK: return 'bg-emerald-100 text-emerald-700';
      case StockStatus.LOW_STOCK: return 'bg-amber-100 text-amber-700';
      case StockStatus.OUT_OF_STOCK: return 'bg-red-100 text-red-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiry</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const status = getStatus(item);
              return (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{item.name}</span>
                      {item.metadata && <span className="text-xs text-slate-400 truncate max-w-xs">{item.metadata}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900">{item.quantity}</span>
                      <span className="text-xs text-slate-400">Min: {item.minStock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{item.expiryDate || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {item.lastUpdated.toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            No items found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default StockTable;


import React, { useState, useMemo, useEffect } from 'react';
import { StorageItem, InventoryStats } from './types';
import { parseRawStockData } from './utils/parser';
import { GeminiService } from './services/geminiService';
import StatsCards from './components/StatsCards';
import StockTable from './components/StockTable';
import { ICONS } from './constants';

const RAW_STOCK_STRING = `
import { StorageItem } from '@/types/storage';

export const initialStockData: StorageItem[] = [
  { id: '1', name: 'Office Supplies', location: 'Room A-101', quantity: 150, minStock: 20, category: 'Supplies', lastUpdated: new Date() },
  { id: '2', name: 'Cleaning Products', location: 'Room A-102', quantity: 0, minStock: 10, category: 'Maintenance', lastUpdated: new Date() },
  { id: '3', name: 'Electronics', location: 'Room B-201', quantity: 45, minStock: 5, category: 'Equipment', lastUpdated: new Date() },
  { id: '4', name: 'Paper Stock', location: 'Room A-103', quantity: 5, minStock: 50, category: 'Supplies', lastUpdated: new Date() },
  { id: '5', name: 'Safety Equipment', location: 'Room C-301', quantity: 0, minStock: 15, category: 'Safety', lastUpdated: new Date() },
  { id: '6', name: 'Tools & Hardware', location: 'Room B-202', quantity: 89, minStock: 10, category: 'Equipment', lastUpdated: new Date() },
  { id: '7', name: 'First Aid Kits', location: 'Room C-302', quantity: 12, minStock: 10, category: 'Safety', lastUpdated: new Date() },
  { id: '8', name: 'Packaging Materials', location: 'Room A-104', quantity: 0, minStock: 30, category: 'Supplies', lastUpdated: new Date() },
  { id: '9', name: 'Furniture', location: 'Room D-401', quantity: 23, minStock: 5, category: 'Equipment', lastUpdated: new Date() },
  { id: '10', name: 'IT Equipment', location: 'Room B-203', quantity: 8, minStock: 15, category: 'Equipment', lastUpdated: new Date() },
{ id: '10', name: '200g Benguet Blend Dark Roast Coffee Beans 200g | hg ccb
{ id: '10', name: 'Arla BOX BARISTA 3% Milk 1Lx10 | Apr 26, 2026 | hg cm
{ id: '10', name: 'Pure Robusta Dark Coffee Beans 1kg | hg ccb
{ id: '10', name: '100g Barbecue Fries Powder | Jan 2, 2026 | Easy pfd |
{ id: '10', name: '100g Cheese Fries Powder | Jan 1, 2026 | Easy pfd 
{ id: '10', name: '100g Sour Cream Fries Powder | Jan 2, 2026 | Easy pfd |
{ id: '10', name: '12oz Paper Cup Plain 50p
{ id: '10', name: '1kg Aviko Shoestring Fries 7mm | May 4, 2027 | hg cf
{ id: '10', name: '2.5kg Aviko Shoestring Fries 7mm CN | Dec 13, 2026
{ id: '10', name: 'Anchor Shredded Mozzarella Extra Stretch 2kgx6 dairy | Mar 21, 2026 | hg ba
{ id: '10', name: 'Arla Natural Cream Cheese Plain 150gx12 | Mar 28, 2026
{ id: '10', name: 'ACC Whipping Cream 1kgx15 | hg cd
{ id: '10', name: 'Aluminum Tray #2011 w/ Lid (650ml) 1000pc
{ id: '10', name: 'Aviko BOX i Shoestring Fries 7mm 1kgx10 | Jun 9, 2027 | hg cf
{ id: '10', name: 'Beryl\'s 1kg 8800cts Dark Chocolate Chips | Jan 9, 2027 | hg bb
{ id: '10', name: 'Black Assam Tea 600g | May 31, 2027 | Easy R3e |
{ id: '10', name: 'Blueberry Syrup 2.5kg | Sep 5, 2026 | Easy r1f |
{ id: '10', name: 'Box Milklab Full Cream Milk 1Lx12 | Oct 2, 2026 | hg cm
{ id: '10', name: 'BBread Mix 1kg | Jun 10, 2026 | Easy ppm |
{ id: '10', name: 'Butterscotch Syrup 2.5kg | Jul 6, 2026 | Easy r1f |
Cheese SAUCE DIP 1kg | Mar 21, 2026 | Easy pcd |
Cookies n Cream Powder Base 1kg | Sep 10, 2026 | Easy r2pb |
D Green Apple Fruit Jam 2.5kg | Feb 11, 2026 | hg oj
D Passion Fruit Jam 3kg | Nov 26 2025 | hg oj
Dark Chocolate Powder Base 1kg | Sep 4, 2026 | Easy r2pb |
Easy s Gold Flakes Sparkle 5g | Apr 19, 2026
Ferna Sour Cream and Onion Powder 1kg cons | Apr 29, 2025
Frozen Strawberries Fruit 1kg | hg cf
Hokkaido Syrup 2.5kg | Apr 21, 2026 | Easy r1f |
Honey Butter Sauce 2.5kg l Aug 25, 2026 | Easy pps |
Jersey Sweetened Condensed Creamer 1kgx24
Matcha Powder Base (Improved) 1kg l Nov 6, 2026 | Easy r2pb |
Mlekpol Mozzarella 2.5kgx4 | Mar 21, 2026 | hg cf
Monnalisa BOX Whipping Cream 1Lx12 | Aug 28, 2026 | hg cd
Okinawa Syrup 2.5kg | Jul 28, 2026 | Easy r1f |
Pc Arla BARISTA Milk 1L | Jul 24, 2026 | hg cm
Pc Oatside Full Cream Milk 1L | Nov 2, 2026 | hg cm
Pure Arabica Dark Whole Coffee Beans 1kg | hg ccb
Red Velvet Powder Base 1kg | Aug 4, 2026 | Easy r2pb |
Rock Salt and Cheese 1kg | Jul 30, 2026 | Easy r3et |
Salted Caramel Syrup 2.5kg | Sep 22, 2026 | Easy r1f |
Sig Vanilla Syrup 1kg | Aug 28, 2026 | Easy sy |
Signature Caramel Sauce 2.5kg | Oct 3, 2026 | Easy sa |
Torani Strawberry Syrup 750ml | Apr 26, 2025
Torani Toasted Marshmallow Syrup 750ml | Apr 17, 2026
Ube Sauce 2.5kg | Jul 9, 2026 | Easy sa |
Vanilla Soft Serve Ice Cream Base 1kg | Nov 4, 2026 | Easy r2ss |
Vanilla Syrup 2.5kg | Oct 10, 2026 | Easy r1f |
Whipping Cream 1kg | Jul 14, 2026 | Easy r3et |
Wintermelon Syrup 2.5kg | Jul 29, 2026 | Easy r1f |
Yangnyeom Sauce 2.5kg | Nov 29, 2026 | Easy pps |
`;

const App: React.FC = () => {
  const [items, setItems] = useState<StorageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [aiInsights, setAiInsights] = useState<string>('Analyzing stock patterns...');
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Initialize and Parse Data
  useEffect(() => {
    const parsed = parseRawStockData(RAW_STOCK_STRING);
    setItems(parsed);
    
    // Get AI Insights
    setLoadingInsights(true);
    const gemini = new GeminiService();
    gemini.getInventoryInsights(parsed).then(insights => {
      setAiInsights(insights);
      setLoadingInsights(false);
    });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(items.map(i => i.category));
    return ['All', ...Array.from(cats)].sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const stats: InventoryStats = useMemo(() => ({
    totalItems: items.length,
    lowStockCount: items.filter(i => i.quantity > 0 && i.quantity <= i.minStock).length,
    outOfStockCount: items.filter(i => i.quantity === 0).length,
    categoryCount: categories.length - 1,
  }), [items, categories]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white py-6 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <ICONS.Box />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Stock Management Pro</h1>
              <p className="text-xs text-indigo-200 uppercase font-semibold">Inventory Intelligence System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <ICONS.Search />
              </span>
              <input
                type="text"
                placeholder="Search inventory..."
                className="pl-10 pr-4 py-2 bg-indigo-950/50 border border-indigo-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Top Section: Insights & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <StatsCards stats={stats} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.487l1.32 2.308a1 1 0 01-.13 1.157l-1.352 1.352a1 1 0 01-1.414 0l-1.352-1.352a1 1 0 01-.13-1.157l1.32-2.308a1 1 0 01.897-.487zM6 11a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm3-7a1 1 0 00-1 1v3a1 1 0 002 0V5a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </span>
                AI Supply Insights
              </h3>
              {loadingInsights && <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-600 border-t-transparent"></div>}
            </div>
            <div className="prose prose-sm text-slate-600 italic">
               {aiInsights.split('\n').map((line, idx) => (
                 <p key={idx} className="mb-2 leading-relaxed">{line}</p>
               ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table View */}
        <StockTable items={filteredItems} />

        {/* Footer info */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>Showing {filteredItems.length} of {items.length} total SKU entries.</p>
          <p>© 2024 Intelligent Supply Solutions • Data Processed Successfully</p>
        </div>
      </main>
    </div>
  );
};

export default App;

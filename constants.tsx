
import React from 'react';

export const CATEGORY_MAP: Record<string, string> = {
  'Syrup': 'Syrups & Sauces',
  'Sauce': 'Syrups & Sauces',
  'Coffee': 'Coffee & Tea',
  'Tea': 'Coffee & Tea',
  'Milk': 'Dairy & Alternatives',
  'Cream': 'Dairy & Alternatives',
  'Cheese': 'Dairy & Alternatives',
  'Butter': 'Dairy & Alternatives',
  'Yogurt': 'Dairy & Alternatives',
  'Beef': 'Meats & Frozen',
  'Pork': 'Meats & Frozen',
  'Chicken': 'Meats & Frozen',
  'Lamb': 'Meats & Frozen',
  'Squid': 'Meats & Frozen',
  'Fish': 'Meats & Frozen',
  'Ham': 'Meats & Frozen',
  'Bacon': 'Meats & Frozen',
  'Fries': 'Meats & Frozen',
  'Cup': 'Packaging & Disposables',
  'Bowl': 'Packaging & Disposables',
  'Lid': 'Packaging & Disposables',
  'Bag': 'Packaging & Disposables',
  'Straw': 'Packaging & Disposables',
  'Box': 'Packaging & Disposables',
  'Tray': 'Packaging & Disposables',
  'Spoon': 'Packaging & Disposables',
  'Fork': 'Packaging & Disposables',
  'Chocolate': 'Baking Supplies',
  'Cocoa': 'Baking Supplies',
  'Waffle': 'Baking Supplies',
  'Sugar': 'Baking Supplies',
  'Flour': 'Baking Supplies',
  'Powder': 'Baking Supplies',
  'Organizer': 'Equipment',
  'Machine': 'Equipment',
  'Sealer': 'Equipment',
  'Barrel': 'Equipment',
  'Bottle': 'Equipment',
  'Set': 'Equipment'
};

export const ICONS = {
  Box: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
  Alert: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  )
};

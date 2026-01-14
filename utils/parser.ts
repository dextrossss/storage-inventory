
import { StorageItem } from '../types';
import { CATEGORY_MAP } from '../constants';

export const parseRawStockData = (rawText: string): StorageItem[] => {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const items: StorageItem[] = [];

  lines.forEach((line, index) => {
    // Basic cleaning of common patterns
    // Case 1: JSON-like format { id: '10', name: '...' }
    const jsonMatch = line.match(/id:\s*['"](\d+)['"],\s*name:\s*['"](.+?)['"]/i);
    
    let name = '';
    let metadata = '';
    let expiryDate = '';

    if (jsonMatch) {
      name = jsonMatch[2];
    } else {
      name = line;
    }

    // Split by pipe for metadata
    const parts = name.split('|').map(p => p.trim());
    if (parts.length > 1) {
      name = parts[0];
      metadata = parts.slice(1).join(' | ');
      
      // Try to find expiry date in metadata
      const dateMatch = metadata.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}/i);
      if (dateMatch) {
        expiryDate = dateMatch[0];
      }
    }

    // Infer category
    let category = 'Uncategorized';
    for (const [keyword, cat] of Object.entries(CATEGORY_MAP)) {
      if (name.toLowerCase().includes(keyword.toLowerCase())) {
        category = cat;
        break;
      }
    }

    // Mock realistic quantity/minStock for the "corrected" view based on keywords
    // since the raw data was missing them for most items
    let quantity = Math.floor(Math.random() * 100);
    let minStock = 20;

    if (name.toLowerCase().includes('box') || name.toLowerCase().includes('crate')) {
       quantity = Math.floor(Math.random() * 10);
       minStock = 5;
    } else if (name.toLowerCase().includes('sachet') || name.toLowerCase().includes('pc')) {
       quantity = Math.floor(Math.random() * 500);
       minStock = 100;
    }

    items.push({
      id: `item-${index}`, // Use unique ID instead of the repeating '10'
      name,
      location: 'Main Warehouse',
      quantity,
      minStock,
      category,
      lastUpdated: new Date(),
      expiryDate,
      metadata
    });
  });

  return items;
};


export interface StorageItem {
  id: string;
  name: string;
  location: string;
  quantity: number;
  minStock: number;
  category: string;
  lastUpdated: Date;
  expiryDate?: string;
  unit?: string;
  metadata?: string;
}

export enum StockStatus {
  IN_STOCK = 'In Stock',
  LOW_STOCK = 'Low Stock',
  OUT_OF_STOCK = 'Out of Stock'
}

export interface InventoryStats {
  totalItems: number;
  lowStockCount: number;
  outOfStockCount: number;
  categoryCount: number;
}

import { Category, ProductAd } from '../types';
import { PRODUCT_CATEGORIES as ENGINE_CATEGORIES, INITIAL_CATALOG, generateCatalog } from './adsCatalogEngine';

export const PRODUCT_CATEGORIES: Category[] = ENGINE_CATEGORIES;
export const WINNING_PRODUCT_ADS: ProductAd[] = INITIAL_CATALOG;
export { generateCatalog };

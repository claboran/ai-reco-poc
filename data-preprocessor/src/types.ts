// src/types.ts
export interface RawProduct {
    'Category Name': string;
    'Product Description': string;
}

export interface Product {
    id: string;
    category: string;
    description: string;
}

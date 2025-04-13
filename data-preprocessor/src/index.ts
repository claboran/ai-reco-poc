// src/index.ts
import * as fs from 'fs';
import csv from 'csv-parser';
import { RawProduct, Product } from './types';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

const inputFile = 'data/ecommerceDataset.csv'; // Input CSV file
const outputFile = 'data/products.json'; // Output JSON file
const headers = ['Category Name', 'Product Description'];

const cleanText = (text: string): string => {
    return text
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\s+/g, ' ')    // Normalize whitespace
        .trim()
        .toLowerCase();
};

const  cleanAndTransformProduct = (rawProduct: RawProduct): Product | null => {
    const id = uuidv4();
    try {
        const cleanedDescription = cleanText(rawProduct['Product Description']);
        const cleanedCategory = cleanText(rawProduct['Category Name']);
        if (!cleanedDescription || !cleanedCategory) {
            throw new Error('Missing required fields');
        }
        return {
            id: id,
            category: cleanedCategory,
            description: cleanedDescription,
        };
    } catch (error) {
        console.error(`Error processing product ${id}: ${(error as Error).message}`);
        return null; // Skip this product
    }
};


async function main() {
    const uniqueProducts = new Map<string, Product>();

    // Helper function to generate hash from description
    const hashDescription = (text: string): string => {
        return crypto.createHash('md5').update(text).digest('hex');
    };

    fs.createReadStream(inputFile)
        .pipe(csv({
            headers: headers,
            mapHeaders: ({ header }) => header.trim(),
            mapValues: ({header, index, value}) => value.trim()
        }))
        .on('data', (data: RawProduct) => {
            const cleanedProduct = cleanAndTransformProduct(data);
            if (cleanedProduct) {
                // Use description hash as key
                const descriptionHash = hashDescription(cleanedProduct.description);

                // Only add if not already in the map
                if (!uniqueProducts.has(descriptionHash)) {
                    console.log('Adding product');
                    uniqueProducts.set(descriptionHash, cleanedProduct);
                } else {
                    console.warn(`Duplicate product description found`);
                }
            }
        })
        .on('end', () => {
            // Convert map values to array
            const results = Array.from(uniqueProducts.values());
            fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
            console.log(`Successfully processed ${results.length} unique products out of ${uniqueProducts.size} total. Output written to ${outputFile}`);
        })
        .on('error', (error: Error) => {
            console.error("Error:", error.message);
        });
}

main();
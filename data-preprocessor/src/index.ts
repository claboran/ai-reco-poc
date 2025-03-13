// src/index.ts
import * as fs from 'fs';
import csv from 'csv-parser';
import { RawProduct, Product } from './types';
import { v4 as uuidv4 } from 'uuid';

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
}

async function main() {
    const results: Product[] = [];

    fs.createReadStream(inputFile)
        .pipe(csv({
            headers: headers, // Specify headers manually
            mapHeaders: ({ header }) => header.trim(), // Clean header
            mapValues: ({header, index, value}) => value.trim() // Clean cell
        })) // Use csv-parser
        .on('data', (data: RawProduct) => {
            const cleanedProduct = cleanAndTransformProduct(data);
            if (cleanedProduct) {
                results.push(cleanedProduct);
            }
        })
        .on('end', () => {
            fs.writeFileSync(outputFile, JSON.stringify(results, null, 2)); // Pretty-print JSON
            console.log(`Successfully processed ${results.length} products. Output written to ${outputFile}`);
        })
        .on('error', (error: Error) => {
            console.log("Error", error.message);
        });
}

main();
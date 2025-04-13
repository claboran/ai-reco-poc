import { TProduct } from "../../shared/product.model";
import * as fs from "node:fs";

export class ProductService {
    constructor(
      private productMap: Map<string, TProduct> = new Map<string, TProduct>(),
    ) {
      this.populateProductMap();
    }

    getProducts(id: string): TProduct | null {
        return this.productMap.get(id) ?? null;
    }

    private populateProductMap(): void {
      const products: TProduct[] = JSON.parse(fs.readFileSync('./ai-reco-app/src/server/data/products.json', 'utf8'));
      this.productMap = products?.reduce(
        (productMap, product) =>
          productMap.set(product.id, product),
        this.productMap,
      );
    }
}

export const productService = new ProductService();


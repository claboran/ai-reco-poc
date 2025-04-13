import { PageServerLoad } from "@analogjs/router";
import { TProduct } from "../../../shared/product.model";
import { productService } from "../../../server/service/ProductService";

const checkProductId = (params: unknown): boolean =>
  ((params && typeof params === 'object' && 'productId' in params && typeof params['productId'] === 'string') as boolean);

export const load = async ({params, req, res, fetch,event}: PageServerLoad): Promise<{
  loaded: boolean,
  product: TProduct | null,
}> => {
  if (!checkProductId(params)) {
    return {
      loaded: false,
      product: null,
    };
  }
  const product = productService.getProducts(params!['productId']);
  return {
    loaded: true,
    product: product,
  };
};

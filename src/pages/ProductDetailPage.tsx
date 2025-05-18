import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductDetail from '../components/product/ProductDetail';
import ProductGrid from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { getProductById, getRelatedProducts, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const product = getProductById(id || '');
    const relatedProducts = getRelatedProducts(id || '');

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
                <p className="text-neutral-600 mb-6">
                    Sorry, the product you're looking for doesn't exist or has been removed.
                </p>
                <Link
                    to="/products"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium inline-block"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div>
            <ProductDetail product={product} />

            {relatedProducts.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
                    <ProductGrid products={relatedProducts} />
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;

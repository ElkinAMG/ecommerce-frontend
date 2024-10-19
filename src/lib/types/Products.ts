type Product = {
    id: number;
    name: string;
    description: string;
    sku: string;
    price: number;
    stock: number;
    images: Array<{ url: string, alt: string }>;
    createdAt: Date;
    updatedAt: Date;
};
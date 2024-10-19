type Orders = {
    id: number;
    user?: User;
    product?: Product;
    userId: string;
    productId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
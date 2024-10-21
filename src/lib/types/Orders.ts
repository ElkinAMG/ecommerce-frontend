type Orders = {
    id?: number;
    user?: User;
    product?: Product;
    userId?: number;
    productId: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}
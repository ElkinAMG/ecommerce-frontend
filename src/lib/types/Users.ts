type User = {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    products: Product[];
    orders: Orders[];
    createdAt: Date;
    updatedAt: Date;
}
export default interface IProduct {
    code?: number,
    description?: string,
    SKU: string,
    name: string,
    pictures: Array<string>,
    price: number,
    currency: string
}

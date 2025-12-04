export interface dimensions {
    depth: number,
    height: number,
    width: number,
}

export interface meta {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string,
}

export interface reviews {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string,
}

export interface Product {
    availabilityStatus: string,
    brand: string,
    category: string,
    description: string,
    dimensions: dimensions,
    discountPercentage: number,
    id: number,
    images: string[],
    meta: meta,
    minimumOrderQuantity: number,
    price: number,
    rating: number,
    returnPolicy: string,
    reviews: reviews,
    shippingInformation: string,
    sku: string,
    stock: number,
    tags: string[],
    thumbnail: string,
    title: string,
    warrantyInformation: string,
    weight: number,
}
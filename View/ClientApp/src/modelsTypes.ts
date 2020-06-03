export type PersonType = {
    personId: number
    login: string
    roleId: number
}

export type ProductTypeType = {
    productTypeId: number
    name: string
}

export type ProductType = {
    productId: number
    name: string
    price: number
    count: number
    image: string
    about: string

    productTypeId: number
    type: ProductTypeType
}

export type ModelType = PersonType  | ProductTypeType | ProductType
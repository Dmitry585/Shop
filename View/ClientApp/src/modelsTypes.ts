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
    price: string
    count: number
    image: string
    about: string

    productTypeId: number
}

export type OrderItemType = {
    id: number
    product: ProductType
    productId:number
    count:number
}


export type TableType = {
    tableId: number
    maxPerson: number
}

export type RezervationType = {
    rezervationId?: number
    rezervationDate: Date
    personName:string
    items: Array<OrderItemType>

    tableId: number
}

export type ModelType = PersonType | ProductTypeType | ProductType | TableType | OrderItemType
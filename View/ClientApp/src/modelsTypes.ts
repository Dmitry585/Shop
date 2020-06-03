export type PersonType = {
    personId: number
    login: string
    password: string
    roleId: number

    role: RoleType
}

export type RoleType = {
    roleId: number
    name: string

    persons: Array<PersonType>
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
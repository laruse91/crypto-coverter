export type TCoin = {
    name: string
    fullName: string
    imageUrl: string
    price: number
    volume24hour: number
}
export type TCoinDiff = {
   [key: string]: string
}
export type TOnCoinClick = (coin: TCoin) => void
export type TField = {
    price: null | number
    name: string
    value: number
}
export type TStyle = {
    [key: string]: string
}

// @flow
import type {CategorieProduct} from '../categorieProduct/CategorieProduct.type'

export type Product = {
  id: string,
  name: string,
  urlName: string,
  listPrice: number,
  trialPeriod: number,
  nameFile: string,
  nameFileBanner: string,
  description: string,
  shortDescription: string,
  loginLink: string,
  signupLink: string,
  cancellationTerms: string,
  subscribed: boolean,
  myDiscount: number,
  myListPrice: number,
  positionProducts: PositionProduct[]
}

export type NodeProduct = {
  node: Product
}

export type PositionProduct = {
  categorieProduct: CategorieProduct
}

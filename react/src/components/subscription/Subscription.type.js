// @flow
import type {Product} from '../product/Product.type'

export type Subscription = {
  id: string,
  product: Product,
  smallId: number,
  status: string,
  startAt: Date,
  dateCancellation: Date,
  endAt: Date
}

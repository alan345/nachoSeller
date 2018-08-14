import gql from 'graphql-tag'

export const CATEGORIES_PRODUCTS_QUERY_LIGHT = gql `
  query categorieProducts($orderBy: CategorieProductOrderByInput, $where: CategorieProductWhereInput) {
    categorieProducts(orderBy: $orderBy, where: $where) {
      id
      name
      products {
        id
        name
      }
    }
  }
`

export const CATEGORIES_PRODUCTS_QUERY = gql `
  query categorieProducts($where: CategorieProductWhereInput) {
    categorieProducts(orderBy: orderByInt_ASC, where: $where) {
      id
      name
      urlName
      positionProducts (where:{isFeatured: true}) {
        id
        orderByInt
        orderByHomeInt
        isFeatured
        product {
          id
          urlName
          listPrice
          myListPrice
          shortDescription
          myDiscount
          name
          nameFile
          subscribed
        }
      }
    }
  }
`
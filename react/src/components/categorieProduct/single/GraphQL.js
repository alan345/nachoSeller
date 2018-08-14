import gql from 'graphql-tag'

export const CATEGORIES_SINGLE_PRODUCTS_QUERY = gql `
  query categorieSingleProducts($urlName: String!) {
    categorieSingleProducts(urlName: $urlName) {
      id
      name
      description
      nameFile
      nameFileMobile
      orderByInt
      urlName
      positionProducts (orderBy:orderByInt_ASC) {
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

export const UPDATE_CATEGORY_SELLER_MUTATION = gql`
  mutation UpdateCategorieProductMutation($data: CategorieProductUpdateInput!, $where: CategorieProductWhereUniqueInput!) {
    updateCategorieProduct(data: $data, where: $where) {
      name
      nameFile
      description
      urlName
      positionProducts {
        product {
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

export const UPDATE_POSITION_SELLER_MUTATION = gql`
  mutation UpdatePositionProductMutation($data: PositionProductUpdateInput!, $where: PositionProductWhereUniqueInput!) {
    updatePositionProduct(data: $data, where: $where) {
      orderByInt
      orderByHomeInt
      isFeatured
    }
  }
`

export const CREATE_CATEGORY_SELLER_MUTATION = gql`
  mutation CreateCategorieProductMutation($data: CategorieProductCreateInput!) {
    createCategorieProduct(data: $data) {
      id
      name
      nameFile
      urlName
    }
  }
`


export const DELETE_MUTATION_CATEGORIE_PRODUCT = gql`
  mutation deleteCategorieProduct($where: CategorieProductWhereUniqueInput!) {
    deleteCategorieProduct(where: $where) {
      id
    }
  }
`

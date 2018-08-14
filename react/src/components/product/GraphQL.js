import gql from 'graphql-tag'

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProductMutation($data: ProductUpdateInput!, $where: ProductWhereUniqueInput!) {
    updateProduct(data: $data, where: $where) {
      id
      name
      urlName
      listPrice
      nameFile
      nameFileBanner
      description
      shortDescription
      cancellationTerms
      trialPeriod
    }
  }
`

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProductMutation($data: ProductCreateInput!) {
    createProduct(data: $data) {
      id
    }
  }
`

export const PRODUCT_QUERY = gql`
  query ProductQuery($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      listPrice
      subscribed
      name
      urlName
      loginLink
      signupLink
      nameFile
      nameFileBanner
      description
      shortDescription
      trialPeriod
      cancellationTerms
      positionProducts {
        id
        categorieProduct {
          id
          urlName
          name          
        }
      }
      myListPrice
      myDiscount
    }
  }
`

export const PRODUCTS_QUERY = gql `
  query ProductsQueryConnection($after: String, $orderBy: ProductOrderByInput, $where: ProductWhereInput, $skip: Int) {
    productsConnection(after: $after, orderBy: $orderBy, where: $where, first: 100, skip: $skip) {
      edges {
        node {
          id
          urlName
          listPrice
          myListPrice
          shortDescription
          myDiscount
          name
          nameFile
          nameFileBanner
          subscribed
        }
      }
    }
  }
`

export const DELETE_SELLER_MUTATION = gql`
  mutation deleteProduct($where: ProductWhereUniqueInput!) {
    deleteProduct(where: $where) {
      id
    }
  }
`

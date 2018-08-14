var stripe = require('stripe')('sk_test_kZmElvgvkhuCfKBcSBs9UliV');

module.exports = {
  async createUserInStripe (email) {
    try {
      customer = await stripe.customers.create(
        {
          email: email,
          description: 'Customer for ' + email,
        }
      )
      return customer
    } catch (e) {
      console.error(e)
      throw e
    }
  },
  async retrieveUserInStripe (stripe_cus_id) {
    try {
      customer = await stripe.customers.retrieve(stripe_cus_id)
      return customer
    } catch (e) {
      console.error(e)
      throw e
    }
  },
  async createCardInStripe (tokenCardId, stripe_cus_id) {
    try {
      card = await stripe.customers.createSource(
        stripe_cus_id,
        {source: tokenCardId}
      )
      return card
    } catch (e) {
      console.error(e)
      throw e
    }
  },
  async deleteCardInStripe (stripe_card_id, stripe_cus_id) {
    try {
      card = await stripe.customers.deleteCard(
        stripe_cus_id,
        stripe_card_id
      )
      return card

    } catch (e) {
      console.error(e)
      throw e
    }
  },
  async setDefaultSourceInStripe (stripe_card_id, stripe_cus_id) {
    try {
      user = await stripe.customers.update(
        stripe_cus_id,
        {
          default_source: stripe_card_id
        }
      )
      return user

    } catch (e) {
      console.error(e)
      throw e
    }
  },
  async createChargeInStripe (amount, stripe_cus_id, orderType) {
    try {
      charge = await stripe.charges.create({
        currency: 'usd',
        amount: (amount * 100).toFixed(0),
        description: orderType,
        customer: stripe_cus_id
      })
      return charge
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

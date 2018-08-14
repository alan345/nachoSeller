module.exports = {
  async getTotalListPriceDiscounted (totalNewListPrice) {
    let bandListPriceA = bandListPriceB = bandListPriceC = bandListPriceD = 0
    let discountA = 10/100
    let discountB = 20/100
    let discountC = 30/100
    let discountD = 40/100

    let maxA = 20
    let maxB = 50
    let maxC = 80

    if(totalNewListPrice < maxA) {
      bandListPriceA = totalNewListPrice
    } else if(totalNewListPrice < maxB) {
      bandListPriceA = maxA
      bandListPriceB = totalNewListPrice - maxA
    } else if(totalNewListPrice < maxC) {
      bandListPriceA = maxA
      bandListPriceB = maxB - maxA
      bandListPriceC = totalNewListPrice - maxB
    } else {
      bandListPriceA = maxA
      bandListPriceB = maxB - 20
      bandListPriceC = maxC - maxB
      bandListPriceD = totalNewListPrice - maxC
    }

    let totalListPriceDiscounted =
      bandListPriceA * (1 - discountA) +
      bandListPriceB * (1 - discountB) +
      bandListPriceC * (1 - discountC) +
      bandListPriceD * (1 - discountD)
    return totalListPriceDiscounted
  },
  async getPercentageDiscounted(totalListPriceDiscounted, totalNewListPrice) {
    let percentageDiscounted = 0
    if(totalListPriceDiscounted/totalNewListPrice) {
      percentageDiscounted = ((1 - totalListPriceDiscounted/totalNewListPrice) * 100).toFixed(2)
    }
      return percentageDiscounted
  },
}

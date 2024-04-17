

export const getPriceWithDiscount = ( price:number, discountRate:number ):number => {
    // Calcula el descuento
    const discount = price * (discountRate / 100)
    // Aplica el descuento al precio
    const priceWithDiscount = price - discount

    return Number( priceWithDiscount.toFixed(2) )
}
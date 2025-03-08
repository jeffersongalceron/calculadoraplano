function calculateSubscriptionPrice(numSpaces) {
    const basePrice = 34.99;
    let totalPrice = basePrice * numSpaces;

    // Apply discount for every 5 spaces
    const discountMultiplier = Math.floor(numSpaces / 5) * 0.1;
    totalPrice -= totalPrice * discountMultiplier;

    return totalPrice.toFixed(2); // Return price formatted to 2 decimal places
}

export default calculateSubscriptionPrice;
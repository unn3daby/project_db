export const shopsService = (array) => {
    const shopData = {}
    array.forEach(item => {
        const shopId = item.shopId;
        const price = item.price;
        const date = item.date;
        
        if (shopData[shopId]) {
            shopData[shopId].prices.push(price);
            shopData[shopId].dates.push(date);
        } else {
            shopData[shopId] = {
                prices: [price],
                dates: [date]
            }
        }
    });
    return shopData;
}
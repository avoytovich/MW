const getMergedLineItems = (rowItem) => {
  if (!rowItem.lineItems) return [];

  const quantifiedLineItems = rowItem.lineItems.reduce((accMap, item) => {
    const { productId } = item;
    if (productId in accMap) {
      accMap[productId].quantity += 1;
    } else {
      accMap[productId] = { quantity: 1, ...item };
    }
    return accMap;
  }, {});

  const mergedLineItems = Object.keys(quantifiedLineItems).map((productId) => {
    const li = quantifiedLineItems[productId];
    let lifeTimeString = '[lifetime : unknown]';
    if (li.lifeTime) {
      lifeTimeString = li.lifeTime;
    }
    const nbSeats = li.seats || 1;
    const { name } = li;
    return `${li.quantity}x ${name},\r\n ${nbSeats} seat,\r\n ${lifeTimeString}`;
  });

  return mergedLineItems;
};
export { getMergedLineItems };

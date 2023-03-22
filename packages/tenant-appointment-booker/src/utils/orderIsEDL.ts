const orderIsEDL = (orderType: string) => ["E", "S", "ES"].includes(orderType);

export default orderIsEDL;

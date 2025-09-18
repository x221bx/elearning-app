export const egp = new Intl.NumberFormat("ar-EG", {
    style: "currency", currency: "EGP", maximumFractionDigits: 2,
});
export const oneDecimal = (n) => Number(n || 0).toFixed(1);

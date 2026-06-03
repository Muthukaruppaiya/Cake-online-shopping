const WEIGHT_MULTIPLIERS = {
  '0.5kg': 0,
  '1kg': 600,
  '1.5kg': 900,
  '2kg': 1200,
  '3kg': 1800,
};

export const getWeightMultiplier = (weight) => WEIGHT_MULTIPLIERS[weight] ?? 0;

export const calculateCakePrice = (basePrice, weight) => {
  return Number(basePrice) + getWeightMultiplier(weight);
};

export const formatPrice = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

export const formatWeightLabel = (weight) => {
  const labels = {
    '0.5kg': '500gms',
    '1kg': '1kg',
    '1.5kg': '1.5kg',
    '2kg': '2kg',
    '3kg': '3kg',
  };
  return labels[weight] || weight;
};

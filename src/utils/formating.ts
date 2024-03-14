//function to format percentage to 2 digits including the numbers before the decimal point
export const formatPercentage = (percentage: number): string => {
  // Multiply by 100 to convert to percentage and round to 2 decimal places
  const value = percentage * 100;
  let formattedValue: string;

  // Check if the value is a whole number
  if (Math.floor(value) === value) {
    // Convert to string without decimal point
    formattedValue = value.toString();
  } else {
    // Limit to 0 decimal places if not a whole number
    formattedValue = value.toFixed(0);
  }

  // Add '%' sign and return
  return `${formattedValue}%`;
};

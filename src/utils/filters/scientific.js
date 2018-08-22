const scientific = n => {
  if (!n) return 0;

  const num = (+n / 1000);
  if (num < 1) return n;
  return num.toFixed(1) + 'k';
};

export default scientific;

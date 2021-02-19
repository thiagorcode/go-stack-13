const formatValue = (value: number): string => {
  if (!value) {
    return '0';
  }

  const valueFormat = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return valueFormat;
};
export default formatValue;

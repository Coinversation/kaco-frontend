export const getReceiveNum = (ratio, num) => {
  if (!ratio || !num) {
    return '0.00';
  }
  const _num = Number(ratio) * Number(num);
  if (`${_num}` === `NaN`) {
    return '0.00';
  }
  return _num.toFixed(2);
};

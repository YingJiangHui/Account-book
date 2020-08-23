export default {
  operator: /\+|-|÷|×/g,
  lastOperator: /(\+|-|÷|×)$/,
  priority: /÷|×/g,
  number: /[0-9]\d*/
};
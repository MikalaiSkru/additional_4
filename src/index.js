module.exports = function multiply(first, second) {
  let multipliedNumbersArr = [],
    longerNumberArr = (first.length > second.length ? first : second).split(''),
    shorterNumberArr =(first.length > second.length ? second : first).split(''),
    bigNumber = ['', ''],
    sum = '';

  longerNumberArr.forEach(longerNumber => {
    const number = shorterNumberArr.reduceRight((acc, shorterNumber) => {
      let multipliedString = '' + (longerNumber * shorterNumber),
          isTwoNumbersLength = multipliedString.length > 1,
          multiplicationSum;

      if (isTwoNumbersLength) {
        multiplicationSum = "" + (+acc[0] + +multipliedString[1]);
        if (multiplicationSum.length > 1) {
          acc[1] = '' + multiplicationSum[1] + acc[1];
        } else {
          acc[1] = '' + multiplicationSum + acc[1];
        }
      } else {
        multiplicationSum = "" + (+acc[0] + +multipliedString);
        if (multiplicationSum.length > 1) {
          acc[1] = '' + multiplicationSum[1] + acc[1];
        } else {
          acc[1] = '' + (+acc[0] + +multipliedString) + acc[1];
        }

      }
      acc[0] = isTwoNumbersLength ? multipliedString[0] : '';
      if (multiplicationSum.length > 1) {
        acc[0] = "" + (+acc[0] + +multiplicationSum[0]);
      }
      return acc;
    }, bigNumber);
    multipliedNumbersArr.push(number[0] + number[1]);
    bigNumber = ['', ''];
  });
  let zeros = '0';
  sum = multipliedNumbersArr.pop();

  for (let i = multipliedNumbersArr.length - 1; i >= 0; i--) {
    let cur = multipliedNumbersArr.pop() + zeros,
        sumArr = sum.split(''),
        curArr = cur.split('');

    sum = curArr.reduceRight((acc, item) => {
      const sumLastNumber = sumArr.pop() || 0,
            result = '' + (+acc[0] + +sumLastNumber + +item);
      acc[1] = result.length > 1
        ? result[1] + acc[1]
        : result + acc[1];
      acc[0] = result.length > 1
        ? result[0]
        : '';
      return acc;
    }, ['', '']).join('');

    zeros += '0';
  }

  return sum;
};
export const unique = (source) => {
  let res = [source[0]];
  for (let i = 1; i < source.length; i++) {
    let repeat = false;
    for (let j = 0; j < res.length; j++) {
      if (source[i] === res[j]) {
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      res.push(source[i]);
    }
  }
  return res;
};

export const clone = (origin) => {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
};

export const swapItems = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

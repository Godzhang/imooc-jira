export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = <T, K extends keyof T>(object: T) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key as K];
    if (isFalsy(value)) {
      delete result[key as K];
    }
  });
  return result;
};

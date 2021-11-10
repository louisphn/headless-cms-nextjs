// nextRouterのrouter.path使用時に使える関数
export const getAsString = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[0]!;
  }
  return value!;
};

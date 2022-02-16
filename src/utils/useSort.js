import { useMemo } from 'react';

export const useSort = (data, prop, desc) => {
  const sortedData = useMemo(() => {
    return data?.slice(0).sort((a, b) => {
      if (desc) {
        return a[prop] < b[prop] ? 1 : a[prop] > b[prop] ? -1 : 0;
      } else {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      }
    });
  }, [data, desc, prop]);

  return sortedData;
};

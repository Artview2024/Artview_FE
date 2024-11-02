import {useState, useCallback} from 'react';

const useRefresh = (refetch: () => Promise<any>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return {refreshing, onRefresh};
};

export default useRefresh;

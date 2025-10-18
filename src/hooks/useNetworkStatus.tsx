import { useAppDispatch } from "@/services/redux";
import { setNetworkStatus } from "@/services/redux/settingSlice";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useCallback, useEffect } from "react";

const useNetworkStatus = () => {
  const dispatch = useAppDispatch();

  const mapState = (state: NetInfoState) => {
    if (typeof state.isInternetReachable === "boolean")
      return state.isInternetReachable;
    return !!state.isConnected;
  };

  const getNetworkStatus = useCallback(async () => {
    try {
      const networkStatus = await NetInfo.fetch();
      const value = mapState(networkStatus);
      dispatch(setNetworkStatus(value));
      return value;
    } catch (e) {
      dispatch(setNetworkStatus(false));
      console.log(e);
      return false;
    }
  }, [dispatch]);

  useEffect(() => {
    getNetworkStatus();

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const value = mapState(state);

      dispatch(setNetworkStatus(value));
    });

    return () => unsubscribe();
  }, [getNetworkStatus, dispatch]);

  return { getNetworkStatus };
};

export default useNetworkStatus;

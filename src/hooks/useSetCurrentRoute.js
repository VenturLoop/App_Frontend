import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "../redux/slices/routeSlice"; // Adjust path as necessary
import { usePathname, useRouter } from "expo-router";

const useSetCurrentRoute = (curentPath) => {
  console.log(curentPath);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure that router.pathname is available before dispatching the action
    if (router.pathname) {
      dispatch(setCurrentRoute(pathname));
    }
  }, [router.pathname, dispatch]);
};

export default useSetCurrentRoute;

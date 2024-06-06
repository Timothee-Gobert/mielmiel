import { useSelector } from "react-redux";

const useTrigger = () => {
  return useSelector((state: any) => state.utils.trigger);
};
export default useTrigger;

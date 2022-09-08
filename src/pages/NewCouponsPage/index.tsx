import React, {useEffect} from "react";
import NewCoupons from "../../components/NewCoupons/NewCoupons";
import { useAppDispatch } from "../../hooks";
import { asyncSubtitleTags } from "../../store/slices/tagSlice/tagSlice";

const NewCouponsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncSubtitleTags());
  }, []);

  return (
    <div className="container">
      <NewCoupons />
    </div>
  );
};

export default NewCouponsPage;

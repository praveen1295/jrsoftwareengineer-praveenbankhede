import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { CommentsApiCall } from "../Dashboard/components";
import { apiFailureAction } from "../../commonApiLogic";
import { Spin } from "antd";

interface FuncProps {
  postId: string | Number;
}
const GetComment: React.FC<FuncProps> = (postId) => {
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<string>("");
  useEffect(() => {
    setLoading(true);
    dispatch(CommentsApiCall(postId.postId))
      .unwrap()
      .then((data) => {
        setCount(data?.length.toString());
        setLoading(false);
        // navigate(location.pathname + `?${urlParams.toString()}`);
      })
      .catch((err: Error) => {
        dispatch(apiFailureAction.apiFailure(err));
        setLoading(false);
      });
  }, []);
  return <span>{loading ? <Spin size="small" /> : `${count}`}</span>;
};

export default GetComment;

import React, { useEffect, useState } from "react";
import type { PaginationProps } from "antd";
import { Card, Col, Divider, Pagination, Row, Skeleton, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { DataTypeForList } from "./../../index.d";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { postsListApiCall, CommentsApiCall } from "./components";
import { apiFailureAction } from "../../commonApiLogic";
import { useSelector } from "react-redux";
import GetComment from "../GetComment";

interface FuncProps {}

const ProjectList: React.FC<FuncProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [postListData, setPostListData] = useState<DataTypeForList[]>([]);
  const [current, setCurrent] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fetchSize, setPageSize] = useState(10);

  const urlParams = new URLSearchParams(location.search);

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const { directoriesCount } = useSelector((state: any) => state);

  const onPageChange: PaginationProps["onChange"] = (page) => {
    setCurrent(Number(page));
    urlParams.set("_start", String(fetchSize * (page - 1)));
    urlParams.set("_limit", String(10));

    loadMoreData();
  };

  const loadMoreData = (): void => {
    // setCurrent(Number(urlParams.get("_start")) || 0);

    urlParams.set("_limit", String(fetchSize));

    if (!urlParams.get("_start")) {
      urlParams.set("_start", "0");
    }

    setLoading(true);
    dispatch(postsListApiCall(urlParams.toString()))
      .unwrap()
      .then((data) => {
        setPostListData(data);
        setLoading(false);
        navigate(location.pathname + `?${urlParams.toString()}`);
      })
      .catch((err: Error) => {
        dispatch(apiFailureAction.apiFailure(err));
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, [location.search]);

  return (
    <>
      <Row className="projectList-header" justify="center"></Row>
      <div id="scrollableDiv">
        <InfiniteScroll
          dataLength={postListData.length}
          next={loadMoreData}
          hasMore={postListData.length < 50}
          loader={
            loading ? <Skeleton avatar paragraph={{ rows: 1 }} active /> : ""
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <Row
              justify={"center"}
              gutter={[8, { xs: 8, sm: 16, md: 24, lg: 32 }]}
            >
              {postListData.map((item, idx) => {
                return (
                  <Col key={item?.id}>
                    <Card
                      title={item?.title}
                      bordered={false}
                      style={{ width: 300, height: 350, overflowY: "auto" }}
                    >
                      <div className="postCard">
                        <p>{item?.body}</p>
                        <div>
                          <span style={{ marginRight: "10px" }}>comment:</span>
                          {postListData.length > 0 && (
                            <GetComment postId={item.userId} />
                          )}
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}

          {postListData.length > 0 ? (
            <Pagination
              className="pagination"
              pageSize={fetchSize}
              style={{ marginTop: "20px" }}
              total={100}
              current={current}
              showSizeChanger={false}
              itemRender={itemRender}
              onChange={onPageChange}
            />
          ) : (
            ""
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ProjectList;

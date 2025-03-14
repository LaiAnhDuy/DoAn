/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */

import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, message } from "antd";
import moment from "moment";
import * as CommentService from "../../services/CommentService";
import { addComments } from "../../redux/slides/commentSlide";

export default function Comment({ productId }) {
  const [reply, setReply] = useState("");
  const [Id, setId] = useState();
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  // const [value3, setValue3] = useState("");
  // const [value4, setValue4] = useState("");
  // const [value5, setValue5] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };
  // const handleChange3 = (event) => {
  //   setValue3(event.target.value);
  // };
  // const handleChange4 = (event) => {
  //   setValue4(event.target.value);
  // };
  // const handleChange5 = (event) => {
  //   setValue5(event.target.value);
  // };
  const access_token = localStorage.getItem("access_token");
  const auth = useSelector((state) => state.user);
  const avatar = auth?.fullName.charAt(0).toUpperCase();
  const commentRequest = async () => {
    const data = {
      productId: productId,
      limitPerPage: 1000,
    };
    const res = await CommentService.getComment(data);
    const response = res?.data;

    if (response) {
      dispatch(addComments({ comments: response }));
    }
  };
  const comments = useSelector((state) => state.comment.comments);
  useEffect(() => {
    commentRequest();
  }, [productId]);

  const handleCancel = () => {
    setValue2("");
  };

  const handleComment = async () => {
    const data2 = {
      productId: productId,
      content: value,
    };

    const response = await CommentService.createComment(data2, access_token);

    if (response) {
      setValue("");
      message.success("Tạo bình luận thành công");
      commentRequest();
      setReply("");
    }
  };

  const handleCommentReply = async (parentId, receiver) => {
    const data = {
      productId: productId,
      content: value2,
      parentId: parentId,
      receiver: receiver,
    };
    console.log(data);

    const response = await CommentService.createComment(data, access_token);
    if (response) {
      setValue2("");
      message.success("Tạo bình luận thành công");
      commentRequest();
      setReply("");
    }
  };
  const { Panel } = Collapse;
  return (
    <>
      <div className="my-5">
        <div>
          <div className="flex items-center gap-x-5">
            <p className="border rounded-full w-8 h-8 text-xl flex justify-center items-center ml-6">
              {avatar}
            </p>
            <input
              type="text"
              className="px-7 py-3 w-full bg-gray-100 rounded-full focus:!bg-gray-200 focus:!outline-none"
              placeholder="Nhập bình luận của bạn..."
              value={value}
              onChange={handleChange}
            />
          </div>
          <div className="mt-5 flex justify-end">
            {/* <button
              onClick={() => {
                handleCancel();
              }}
              className="bg-slate-300 font-bold text-sm px-10 py-2 rounded-full mr-8 active:bg-gray-200"
            >
              Huỷ
            </button> */}
            <button
              type="button"
              onClick={handleComment}
              disabled={value.length === 0}
              className="bg-slate-300 font-bold text-sm px-10 py-2 rounded-full active:bg-gray-200"
            >
              Bình luận
            </button>
          </div>
        </div>
        <div>
          {comments?.map((item, index) => {
            return (
              <div key={index} className="mb-5">
                <div className="flex items-top gap-x-5">
                  <p className="border rounded-full w-8 h-8 text-xl flex justify-center items-center ml-6">
                    {item?.sender?.fullName.charAt(0).toUpperCase()}
                  </p>
                  <div>
                    <div className="px-5 py-2 bg-gray-100 rounded-xl text-lg">
                      <p className="font-bold">{item?.sender?.fullName}</p>
                      <p className="min-w-52 text-base">{item?.content}</p>
                    </div>
                    <div className="flex gap-x-10 mt-1 text-[12px] px-5">
                      <p>{moment(item?.createdAt).format("DD/MM/YYYY")}</p>
                      <button
                        className="hover:underline hover:text-blue-500"
                        onClick={() => setReply(item?._id)}
                      >
                        Phản hồi
                      </button>
                    </div>
                  </div>
                </div>
                <div className="ml-14">
                  {reply === item?._id ? (
                    <div>
                      <div className="flex items-center gap-x-5 mt-3">
                        <p className="border rounded-full w-8 h-8 text-xl flex justify-center items-center ml-6">
                          {avatar}
                        </p>
                        <input
                          type="text"
                          className="px-7 py-3 w-full bg-gray-100 rounded-full focus:!bg-gray-200 focus:!outline-none"
                          placeholder="Nhập bình luận của bạn..."
                          value={value2}
                          onChange={handleChange2}
                        />
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={() => {
                            handleCancel();
                            setReply("");
                          }}
                          className="bg-slate-300 font-bold text-sm px-10 py-2 rounded-full mr-8 active:bg-gray-200"
                        >
                          Huỷ
                        </button>
                        <button
                          onClick={() => {
                            handleCommentReply(item?._id, item?.sender?._id);
                            setReply("");
                          }}
                          disabled={value2.length === 0 ? true : false}
                          className="bg-slate-300 font-bold text-sm px-10 py-2 rounded-full active:bg-gray-200"
                        >
                          Bình luận
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <Collapse bordered={false} className="!bg-transparent mt-1">
                    {item?.answers && item?.answers.length > 0 ? (
                      <>
                        <Panel
                          header={
                            "Xem tất cả " + item?.answers.length + " Phản hồi"
                          }
                          key={0}
                          className="!border-none text-[12px]"
                        >
                          {item?.answers &&
                            item?.answers.map((val, id) => (
                              <div key={id}>
                                <div className="flex items-top gap-x-5">
                                  <p className="border rounded-full w-8 h-8 text-xl flex justify-center items-center">
                                    {val.sender?.fullName
                                      .charAt(0)
                                      .toUpperCase()}
                                  </p>
                                  <div className="flex-1">
                                    <div className="px-5 py-2 bg-gray-100 rounded-xl text-lg w-max">
                                      <p className="mr-2 text-lg font-bold">
                                        {val.sender?.fullName}
                                      </p>
                                      <p className="min-w-52 text-base w-max">
                                        {val.sender?._id ===
                                        val.receiver?._id ? (
                                          ""
                                        ) : (
                                          <span className="font-bold">
                                            @{val.receiver?.fullName}
                                          </span>
                                        )}
                                        {" " + val.content}
                                      </p>
                                    </div>
                                    <div className="flex gap-x-10 mt-1 text-[12px] px-5">
                                      <p>
                                        {moment(val.createdAt).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </p>
                                      <button
                                        className="hover:underline hover:text-blue-500"
                                        onClick={() => {
                                          setReply(val._id);
                                          setId(item?._id);
                                        }}
                                      >
                                        Phản hồi
                                      </button>
                                    </div>
                                    <div className="mt-3">
                                      {val.parentId === Id &&
                                      reply === val._id ? (
                                        <div>
                                          <div className="flex items-center gap-x-5">
                                            <p className="border rounded-full w-8 h-8 text-xl flex justify-center items-center ml-6">
                                              {avatar}
                                            </p>
                                            <input
                                              type="text"
                                              className="px-7 py-3 w-full bg-gray-100 rounded-full focus:!bg-gray-200 focus:!outline-none"
                                              placeholder="Nhập bình luận của bạn..."
                                              value={value}
                                              onChange={handleChange}
                                            />
                                          </div>
                                          <div className="mt-3 flex justify-end">
                                            <button
                                              onClick={() => {
                                                handleCancel();
                                                setReply("");
                                              }}
                                              className="bg-slate-300 font-bold text-sm px-10 py-2 rounded-full mr-8 active:bg-gray-200"
                                            >
                                              Huỷ
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleCommentReply(
                                                  item?._id,
                                                  item?.sender?._id
                                                )
                                              }
                                              disabled={
                                                value.length === 0
                                                  ? true
                                                  : false
                                              }
                                              className="bg-slate-300 font-bold text-sm px-10 py-2 rounded-full active:bg-gray-200"
                                            >
                                              Bình luận
                                            </button>
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </Panel>
                      </>
                    ) : null}
                  </Collapse>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

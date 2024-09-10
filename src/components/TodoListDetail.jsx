import axios from "axios";
import React, { useState } from "react";
import useStore from "../store/myStore";

function TodoListDetail(props) {
  const { activeUser } = useStore();
  const { data, fetchList } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState("");
  const labelStyleLine = "flex flex-1 line-through gap-2 p-1";
  const labelStyle = "flex flex-1 gap-2 p-1";
  const checkboxStyle = "toggle toggle-info toggle-sm";

  const hdlDelete = async () => {
    let resp;
    try {
      resp = await axios.delete("http://139.5.146.186/api/v1/todo/" + data.id);
      //   console.log(resp.data);
      fetchList();
    } catch (err) {
      console.log(err);
    }
  };

  const hdlUpdate = async (status) => {
    let resp;
    try {
      resp = await axios.patch("http://139.5.146.186/api/v1/todo/" + data.id, {
        title: data.title,
        status: status,
      });
      //   console.log(resp.data);
      fetchList();
    } catch (err) {
      console.log(err);
    }
  };

  const hdlClick = (e) => {
    e.preventDefault();
    hdlDelete();
  };

  const hdlStatus = (e) => {
    hdlUpdate(!data.status);
  };

  const hdlEdit = (e) => {
    e.preventDefault();
    setText(data.title);
    setIsEdit(true);
  };

  const postList = async () => {
    // console.log("post");
    let resp;
    try {
      resp = await axios.patch("http://139.5.146.186/api/v1/todo/" + data.id, {
        title: text,
      });
      //   console.log(resp.data);
      fetchList();
    } catch (err) {
      console.log(err);
    }
  };

  const hdlEnter = (e) => {
    if (e.key === "Enter") {
      console.log(text);
      postList();
      setIsEdit(false);
    }
  };

  const hdlCancelEdit = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  const inputChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="flex justify-between items-center p-1 gap-1 border rounded-md border-slate-700 hover:bg-base-100">
      {isEdit ? (
        <label className={labelStyle}>
          {/* <input
            type="checkbox"
            checked={!data.status}
            className={checkboxStyle}
            onClick={hdlStatus}
          /> */}
          <input
            type="text"
            value={text}
            onChange={inputChange}
            onKeyUp={hdlEnter}
            className="border p-[2px]"
          />
        </label>
      ) : data.status ? (
        <label className={labelStyleLine}>
          <input
            type="checkbox"
            checked={!data.status}
            className={checkboxStyle}
            onClick={hdlStatus}
          />
          {data.title}
        </label>
      ) : (
        <label className={labelStyle}>
          <input
            type="checkbox"
            checked={!data.status}
            className={checkboxStyle}
            onClick={hdlStatus}
          />
          {data.title}
        </label>
      )}
      {isEdit ? (
        <a
          href=""
          onClick={hdlCancelEdit}
          className="btn btn-xs btn-warning pr-2 flex justify-center items-center"
        >
          Cancel
        </a>
      ) : !data.status ? (
        <a
          href=""
          onClick={hdlEdit}
          className="pr-2 flex justify-center items-center"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </a>
      ) : (
        <></>
      )}
      <a
        href=""
        onClick={hdlClick}
        className="pr-2 flex justify-center items-center"
      >
        <i className="fa-solid fa-delete-left text-slate-800"></i>
      </a>
    </div>
  );
}

export default TodoListDetail;

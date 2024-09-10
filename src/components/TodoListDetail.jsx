import axios from "axios";
import React from "react";

function TodoListDetail(props) {
  const { data, fetchList } = props;

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

  return (
    <div className="flex justify-between p-1 border rounded-md border-slate-700">
      {data.status ? (
        <label
          className="flex flex-1 line-through gap-2 p-1"
          onClick={hdlStatus}
        >
          <input
            type="checkbox"
            checked={data.status}
            className="toggle toggle-info toggle-sm"
          />
          {data.title}
        </label>
      ) : (
        <label
          className="flex flex-1 line-through gap-2 p-1"
          onClick={hdlStatus}
        >
          <input
            type="checkbox"
            checked={data.status}
            className="toggle toggle-info toggle-sm"
          />
          {data.title}
        </label>
      )}
      <a
        href=""
        onClick={hdlClick}
        className="pr-2 flex justify-center items-center"
      >
        <i class="fa-solid fa-delete-left text-slate-800"></i>
      </a>
    </div>
  );
}

export default TodoListDetail;

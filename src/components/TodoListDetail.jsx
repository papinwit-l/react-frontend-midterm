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
    <div className="flex justify-between">
      {data.status ? (
        <label className="flex-1 line-through" onClick={hdlStatus}>
          {data.title}
        </label>
      ) : (
        <label className="flex-1" onClick={hdlStatus}>
          {data.title}
        </label>
      )}
      <a href="" onClick={hdlClick}>
        x
      </a>
    </div>
  );
}

export default TodoListDetail;

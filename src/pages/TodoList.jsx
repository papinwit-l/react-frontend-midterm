import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoListDetail from "../components/TodoListDetail";

function TodoList() {
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem("loginInfo"))
  );
  const [todoList, setTodoList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const fetchList = async () => {
    let resp;
    try {
      resp = await axios.get(
        "http://139.5.146.186/api/v1/todo?userId=" + loginInfo.user.userId
      );
      console.log(resp.data);
      setTodoList(resp.data);
      setLoadingList(false);
    } catch (err) {
      console.log(err);
    }
  };

  const postList = async () => {
    // console.log("post");
    let resp;
    try {
      resp = await axios.post(
        "http://139.5.146.186/api/v1/todo?userId=" + loginInfo.user.userId,
        { title: text }
      );
      //   console.log(resp.data);
      fetchList();
    } catch (err) {
      console.log(err);
    }
  };

  const inputHdl = (e) => {
    setText(e.target.value);
  };

  const hdlEnter = (e) => {
    if (e.key === "Enter") {
      console.log(text);
      postList();
      setText("");
    }
  };

  useEffect(() => {
    if (!loginInfo) {
      navigate("/login");
    }
    // console.log(loginInfo.user.userId);
    fetchList();
    //sss
  }, [loginInfo]);

  return (
    <div className="flex">
      <div className="card bg-base-200 mx-auto mt-6 p-6">
        <label>
          New Task
          <input value={text} onChange={inputHdl} onKeyUp={hdlEnter} />
        </label>
        <div>
          {loadingList ? (
            <p>Loading List...</p>
          ) : (
            // <pre>{JSON.stringify(todoList)}</pre>
            todoList.map((el) => (
              <TodoListDetail key={el.id} data={el} fetchList={fetchList} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;

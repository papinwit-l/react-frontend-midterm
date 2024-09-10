import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoListDetail from "../components/TodoListDetail";
import useStore from "../store/myStore";

function TodoList() {
  const { activeUser, setActiveUser } = useStore();
  //   const [loginInfo, setLoginInfo] = useState(
  //     JSON.parse(localStorage.getItem("loginInfo"))
  //   );
  const [todoList, setTodoList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const fetchList = async () => {
    let resp;
    try {
      resp = await axios.get(
        "http://139.5.146.186/api/v1/todo?userId=" + activeUser.user.userId
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
        "http://139.5.146.186/api/v1/todo?userId=" + activeUser.user.userId,
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

  const hdlLogout = () => {
    localStorage.removeItem("loginInfo");
    setActiveUser(JSON.parse(localStorage.getItem("loginInfo")));
    // setLoginInfo(JSON.parse(localStorage.getItem("loginInfo")));
  };

  useEffect(() => {
    if (!activeUser) {
      navigate("/login");
    }
    // console.log(loginInfo.user.userId);
    fetchList();
    //sss
  }, [activeUser]);

  return (
    <div className="flex">
      <div className="card bg-base-200 mx-auto mt-6 p-6 gap-2 select-none">
        <h1>Welcome, {activeUser && activeUser.user.fullName}</h1>
        <label className="input input-bordered flex items-center gap-2">
          New Task
          <input
            value={text}
            onChange={inputHdl}
            onKeyUp={hdlEnter}
            type="text"
            className="grow"
            placeholder="Task"
          />
        </label>
        <div className="flex flex-col">
          {loadingList ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            // <pre>{JSON.stringify(todoList)}</pre>
            todoList.map((el) => (
              <TodoListDetail key={el.id} data={el} fetchList={fetchList} />
            ))
          )}
        </div>
        <button className="btn btn-primary" onClick={hdlLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TodoList;

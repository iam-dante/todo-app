import axios from "axios";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { FirebaseAuth } from "../utils/FirebaseService";
import { signOut } from "firebase/auth";

import useSwr from "swr";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default function HomeScreen(props) {
  const [user] = useAuthState(FirebaseAuth);

  // Get data
  // const fetcher = (url: string) => axios.get(url).then((r) => r.data);
  // const { dt, error } = useSwr(`/api/getTodo/`, fetcher);

  // console.log(dt);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [data, setData] = useState(undefined);
  // const [todo, setTodo] = useState("");

  const [inputFields, setInputFields] = useState({
    listname: "",
    listItems: [{ name: "", complete: false }],
  });

  const [editInput, setEditInput] = useState({
    listid: "",
    listname: "",
    listItems: [{ id: undefined, name: "", complete: false }],
  });

  //Listener fields
  const handleFormChange = (index: number, event) => {
    let data = [...inputFields.listItems];
    data[index][event.target.name] = event.target.value;
    setEditInput((pv) => ({
      ...pv,
      listItems: [...data],
    }));
  };

  const handleFormChange_ = (index: number, event) => {
    let data = [...inputFields.listItems];
    data[index][event.target.name] = event.target.checked;
    setInputFields((pv) => ({
      ...pv,
      listItems: [...data],
    }));
  };

  const handleEditChange = (index: number, event) => {
    let data = [...editInput.listItems];

    data[index][event.target.name] = event.target.value;

    setInputFields((pv) => ({
      ...pv,
      listItems: [...data],
    }));
  };

  const handelCheck = (index: number, event) => {
    let data = [...editInput.listItems];
    data[index][event.target.name] = event.target.checked;
    setInputFields((pv) => ({
      ...pv,
      listItems: [...pv.listItems, ...data],
    }));

    console.log(editInput);
  };

  const removeEditFields = (index: any) => {
    let data = [...editInput.listItems];
    data.splice(index, 1);
    setEditInput((pv) => ({
      ...pv,
      listItems: [...data],
    }));
  };

  const addEditFields = () => {
    let newfield = { id: undefined, name: "", complete: false };
    setEditInput((pv) => ({
      ...pv,
      listItems: [...pv.listItems, newfield],
    }));
  };

  // Add new fields
  const addFields = () => {
    let newfield = { name: "", complete: false };
    setInputFields((pv) => ({
      ...pv,

      listItems: [...pv.listItems, newfield],
    }));
  };

  // Remove fields
  const removeFields = (index: any) => {
    let data = [...inputFields.listItems];
    data.splice(index, 1);
    setInputFields((pv) => ({
      ...pv,
      listItems: [...data],
    }));
  };

  const submitCreateTodo = async () => {
    const res = await axios({
      method: "POST",
      url: "/api/createTodo",
      data: {
        todoListName: inputFields.listname,
        todoListItems: [...inputFields.listItems],
      },
    });
    setIsOpen(false);
    setInputFields({
      listname: "",
      listItems: [{ name: "", complete: false }],
    });

    location.reload();
  };

  const submitEditTodo = async (listId: String) => {
    const res = await axios({
      method: "POST",
      url: "/api/updateTodo",
      data: {
        todoListId: listId,
        todoListName: editInput.listname,
        todoListItems: [...editInput.listItems],
      },
    });
    closeModalEdit();
    setEditInput({
      listid: "",
      listname: "",
      listItems: [{ name: "", complete: false }],
    });

    location.reload();

  };

  const deleteTodoItem = async (id: String) => {
    const res = await axios({
      method: "POST",
      url: "/api/deleteTodoItem",
      data: {
        id: id,
      },
    });
  };

  function closeModal() {
    setIsOpen(false);
    setInputFields({
      listname: "",
      listItems: [{ name: "", complete: false }],
    });
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModalEdit() {
    setIsOpenEdit(false);
  }

  function openModalEdit() {
    setIsOpenEdit(true);
  }

  function logOut() {
    signOut(FirebaseAuth);
  }

  // var data = []

  // useEffect(() => {
  //   async function fetchData() {
  //     const todos = await axios({
  //       method: "GET",
  //       url: "/api/getTodos",
  //     });
  //     setData(todos.data)
  //   }
  //   fetchData();

  // }, []);

  // async function fetchData() {
  //   const todos = await axios({
  //     method: "GET",
  //     url: "/api/getTodos",
  //   });

  //   return todos.data
  // }

  // const resData = fetchData()
  // console.log(resData.data)

  const playdata = [
    {
      id: "63ebbb8e42b87b679c13ce56",
      name: "Todo List",
      todoItems: [
        {
          id: "63eb4ac3f99438a328fe2142",
          name: "Make More money",
          complete: true,
        },
        // {
        //   id: "63eb4ac3f99438a328fe2143",
        //   name: "Make Friends",
        //   complete: false,
        // },
      ],
    },
  ];

  // console.log(props.data)
  useEffect(() => {
    async function fetchData() {
      const todos = await axios({
        method: "GET",
        url: "/api/getTodos",
      });
      // todos.data.data.map((vl)=>{
      //   dt.push(vl)
      // })

      // const data = todos.data.data
      // console.log(data.length)

      return todos.data.data;
    }
    var data = fetchData();
    // console.log("This is data",dt)

    data.then((rs) => {
      // console.log(rs);
      setData(rs)
    });
  }, []);


  function TodoItemComponent(props) {
    const [complete, setComplete] = useState(props.complete);

    function handleChange() {
      return setComplete(!complete);
    }

    return (
      <div key={props.id} className="flex items-center space-x-3">
        <input
          type="checkbox"
          onChange={handleChange}
          disabled={true}
          checked={complete}
        />
        <h1 className={complete ? "line-through" : ""}>{props.name}</h1>
      </div>
    );
  }

  console.log("rendering");

  return (
    <div className="h-screen bg-white ">
      <div className="flex  w-full items-center justify-between p-4">
        <h1 className="text-xl font-semibold uppercase">Todo App</h1>
        <div className="flex items-center  space-x-4 ">
          <div className="space-y-2">
            <h1 className="">{user?.displayName}</h1>
            <button
              onClick={() => logOut()}
              className="rounded-full bg-red-200 px-4 text-red-800"
            >
              Log Out
            </button>
          </div>
          <img className="h-14 w-14 rounded-full" src={user?.photoURL} />
        </div>
      </div>
      <div className="flex  items-center justify-center space-x-4 py-4 px-2">
        <input
          className="h-12 w-full  rounded-md border border-gray-500 bg-transparent px-2 focus:outline-none  focus:ring-gray-200 md:w-1/2 "
          placeholder="Search"
          // value={todo}
          // onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            openModal();
          }}
          className="h-12 rounded-md bg-sky-800 px-2 text-sm text-white md:text-base "
        >
          Create a todo
        </button>
      </div>

      <div className="flex  flex-col items-center space-y-4 px-4 py-6">
        {data?.map((value) => {
          //  console.log(vl)
          return (
            <div
              key={value.id}
              className="w-full rounded-md border border-gray-600 px-4  pt-6 hover:shadow-xl   md:w-1/2"
            >
              <h1>{value.name}</h1>

              <div className="mt-6 space-y-4">
                {value.todoItems.map((vl, ix) => {
                  return (
                    // <div key={ix} className="flex items-center space-x-3">
                    //   <input type="checkbox" />
                    //   <h1>{vl.name}</h1>
                    // </div>

                    <TodoItemComponent
                      key={ix}
                      name={vl.name}
                      complete={vl.complete}
                    />
                  );
                })}
              </div>

              <div className="flex justify-end py-2 ">
                {/* edit button */}
                <button
                  type="button"
                  onClick={() => {
                    openModalEdit();

                    setEditInput({
                      listid: value.id,
                      listname: value.name,
                      listItems: [...value.todoItems],
                    });
                  }}
                  className="flex items-center rounded-full p-3 hover:bg-sky-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-sky-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>

                <button className="flex items-center rounded-full p-3 hover:bg-sky-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-sky-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add  a Todo */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form className="" onSubmit={submitCreateTodo}>
                    <Dialog.Title as="h3" className=" leading-6 text-gray-900">
                      <input
                        type="text"
                        value={inputFields.listname}
                        onChange={(e) => {
                          setInputFields((pv) => ({
                            ...pv,
                            listname: e.target.value,
                          }));
                        }}
                        className="w-full text-xl font-normal focus:outline-none"
                        placeholder="Title"
                      />
                    </Dialog.Title>

                    <div className="mt-6 space-y-4">
                      {inputFields.listItems.map((value, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              // checked={inputFields.listItems[index].complete}
                              checked={value.complete}
                              name="complete"
                              onChange={(event) => {
                                handleFormChange_(index, event);
                              }}
                            />
                            <input
                              type="text"
                              className={
                                inputFields.listItems[index].complete
                                  ? "w-full font-normal line-through  focus:outline-none"
                                  : "w-full font-normal  focus:outline-none "
                              }
                              placeholder="Todo Item"
                              name="name"
                              value={value.name}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => removeFields(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 text-red-700"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="py-2">
                      <button
                        type="button"
                        className="rounded-full px-2 text-sky-800 hover:bg-sky-200"
                        onClick={addFields}
                      >
                        Add More..
                      </button>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => submitCreateTodo()}
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Edit a Todo */}
      <Transition appear show={isOpenEdit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalEdit}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form className="" onSubmit={submitEditTodo}>
                    <Dialog.Title as="h3" className=" leading-6 text-gray-900">
                      <input
                        className="w-full text-xl font-normal focus:outline-none"
                        placeholder="Title"
                        value={editInput.listname}
                        onChange={(event) => {
                          setEditInput((pv) => ({
                            ...pv,
                            listname: event.target.value,
                          }));
                        }}
                      />
                    </Dialog.Title>

                    <div className="mt-6 space-y-4">
                      {editInput.listItems.map((value, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-3 "
                          >
                            <div className="flex w-full items-center space-x-3">
                              <input
                                type="checkbox"
                                // disabled={vl.complete}
                                checked={value.complete}
                                // value='off'
                                name="complete"
                                // can-true-value={true}
                                // can-false-value={false}
                                onChange={(event) => handelCheck(index, event)}
                              />
                              <input
                                type="text"
                                value={value.name}
                                name="name"
                                className={
                                  editInput.listItems[index].complete
                                    ? "w-full font-normal line-through  focus:outline-none"
                                    : "w-full font-normal  focus:outline-none "
                                }
                                placeholder="Todo Item"
                                onChange={(event) => {
                                  handleEditChange(index, event);
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                removeEditFields(index);
                                deleteTodoItem(value.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 text-red-700"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                    <div className="py-2">
                      <button
                        type="button"
                        className="rounded-full px-2 text-sky-800 hover:bg-sky-200"
                        onClick={addEditFields}
                      >
                        Add More..
                      </button>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          submitEditTodo(editInput.listid);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

// export async function getStaticProps() {

//   const res = await axios({
//     method: "GET",
//     url: "api/getTodos",
//   });

//   // console.log(res);

//   // const res = await fetch("https://catfact.ninja/fact");
//   // const data = await res.json();

//   // console.log(data)
//   // const User = await prisma.user.findFirst({
//   //   where: {
//   //     email: "test@test.co.tz",
//   //   },
//   // });

//   // Read User Todolist
//   // const Todolist = await prisma.todoList.findMany({
//   //   where: {
//   //     userId: User?.id,
//   //   },
//   //   select: {
//   //     id: true,
//   //     name: true,
//   //     todoItems: true,
//   //   },
//   // });

//   // console.log(Todolist);

//   return {
//     props: {
//       todo: "somthin",
//     }, // will be passed to the page component as props
//   };
// }
import axios from "axios";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { FirebaseAuth } from "./FirebaseService";
import { signOut } from "firebase/auth";

export default function HomeScreen(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [data, setData] = useState([
    {
      name: "",
      todoItems: [],
    },
  ]);

  const [user, loading, error] = useAuthState(FirebaseAuth);
  const [todo, setTodo] = useState("");

  const [inputFields, setInputFields] = useState({
    listname: "",
    listItems: [{ name: "", complete: false }],
  });

  //Listen fields
  const handleFormChange = (index: number, event) => {
    let data = [...inputFields.listItems];
    data[index][event.target.name] = event.target.value;
    setInputFields((pv) => ({
      ...pv,
      listItems: [...data],
    }));
  };
  const handleFormChange_ = (index: number, event) => {
    let data = [...inputFields.listItems];

    let rs = event.target.value == "on" ? true : false;

    data[index][event.target.name] = rs;

    setInputFields((pv) => ({
      ...pv,
      listItems: [...data],
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

  // console.log(inputFields)

  const submit = async () => {
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
  };

  function closeModal() {
    setIsOpen(false);
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

  // useEffect(() => {
  //   async function fetchData() {
  //     const todos = await axios({
  //       method: "GET",
  //       url: "/api/getTodos",
  //     });
  //     //  console.log(todos.data)
  //   }
  //   fetchData();
  // }, []);

  const playdata = [
    {
      name: "Todo List",
      todoItems: [
        {
          id: "63e92e7fcb2e942dfd008c86",
          name: "Make More money",
          complete: true,
          todoListId: "63e92e7fcb2e942dfd008c85",
        },
        {
          id: "63e92e7fcb2e942dfd008c87",
          name: "Make Friends",
          complete: false,
          todoListId: "63e92e7fcb2e942dfd008c85",
        },
      ],
    },

    {
      name: "Another Todo",
      todoItems: [
        {
          id: "63e92e7fcb2e942dfd008c86",
          name: "Make More money",
          complete: false,
          todoListId: "63e92e7fcb2e942dfd008c85",
        },
        {
          id: "63e92e7fcb2e942dfd008c87",
          name: "Make Friends",
          complete: true,
          todoListId: "63e92e7fcb2e942dfd008c85",
        },
        {
          id: "63e92e7fcb2e942dfd008c87",
          name: "Make Friends",
          complete: true,
          todoListId: "63e92e7fcb2e942dfd008c85",
        },

        {
          id: "63e92e7fcb2e942dfd008c86",
          name: "Make More money",
          complete: false,
          todoListId: "63e92e7fcb2e942dfd008c85",
        },
      ],
    },
  ];

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
      <div className="flex  items-center justify-center space-x-4 py-4">
        <input
          className="h-12 w-1/2 rounded-md border border-gray-500 bg-transparent px-2  focus:outline-none focus:ring-gray-200 "
          placeholder="Search"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            openModal();
          }}
          className="h-12 rounded-md bg-sky-800 px-2 text-white "
        >
          Create a todo
        </button>
      </div>

      <div className="flex h-screen flex-col items-center space-y-4 px-4">
        {playdata.map((vl, ix) => {
          //  console.log(vl)
          return (
            <div
              key={ix}
              className="w-full rounded-md border border-gray-600 px-4  pt-6 hover:shadow-xl   md:w-1/2"
            >
              <h1>{vl.name}</h1>

              <div className="mt-6 space-y-4">
                {vl.todoItems.map((vl, ix) => {
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
                <button
                  type="button"
                  onClick={() => {
                    openModalEdit();
                    // setData(() => {([
                    //   name: vl.name,
                    //   todoItems: [
                    //     {
                    //       name: "something",
                    //       complete: false,
                    //       todoListId: "63e92e7fcb2e942dfd008c85",
                    //     },
                    //   ],
                    // ]
                    // }));
                  }}
                  className="flex items-center rounded-full p-3 hover:bg-sky-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-sky-900"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>

                <button className="flex items-center rounded-full p-3 hover:bg-sky-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-sky-900"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                  <form className="" onSubmit={submit}>
                    <Dialog.Title as="h3" className=" leading-6 text-gray-900">
                      <input
                        type="text"
                        value={inputFields.listname}
                        onChange={(e)=>{
                          setInputFields((pv) => ({
                            ...pv,
                            listname: e.target.value
                          }))
                        }}
                        className="w-full text-xl font-normal focus:outline-none"
                        placeholder="Title"
                      />
                    </Dialog.Title>

                    <div className="mt-6 space-y-4">
                      {inputFields.listItems.map((input, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              checked={inputFields.listItems[index].complete}
                              name="complete"
                              onChange={(event) => {
                                handleFormChange_(index, event);
                              }}
                            />
                            <input
                              type="text"
                              className="w-full font-normal  focus:outline-none"
                              placeholder="Todo Item"
                              name="name"
                              value={input.name}
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
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="h-6 w-6 text-red-700"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
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
                        onClick={() => submit()}
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
                  {data.map((vl) => {
                    return (
                      <>
                        <Dialog.Title
                          as="h3"
                          className=" leading-6 text-gray-900"
                        >
                          <input
                            className="w-full text-xl font-normal focus:outline-none"
                            placeholder="Title"
                          />
                        </Dialog.Title>
                        <div className="mt-6 space-y-4">
                          <div className="flex items-center space-x-3">
                            <input type="checkbox" />
                            <input
                              type="text"
                              className="w-full font-normal focus:outline-none"
                              placeholder="Todo Item"
                            />
                          </div>

                          <div className="flex items-center space-x-3">
                            <input type="checkbox" />
                            <input
                              type="text"
                              className="w-full font-normal focus:outline-none"
                              placeholder="Todo Item"
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModalEdit}
                    >
                      Edit
                    </button>
                  </div>
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
//     url: "/api/getTodos",
//   });

//   // const res = await fetch("/api/getTodos");
//   // const data = await res.json();

//   // console.log(res);
//   return {
//     props: {
//       todo: res,
//     }, // will be passed to the page component as props
//   };
// }

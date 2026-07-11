import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {
  const defaultUsers=[
    {
      id: 1,
      name: "Anup",
      online: true,
      status: "Online",
      lastMessage: "K xa?",
      messages: [
        { id: 1, text: "K xa?", sender: "Anup", time: "9:30 AM" },
        { id: 2, text: "Thik xa. Timilai ni?", sender: "Me", time: "10:45 AM" },
        {
          id: 3,
          text: "Thikai xa. Aja katai ghumna jane?",
          sender: "Anup",
          time: "11:00 AM",
        },
        { id: 4, text: "Hunxa.", sender: "Me", time: "11:05 AM" },
      ],
    },
    {
      id: 2,
      name: "Bikash",
      online: false,
      status: "Last seen 25 min ago",
      lastMessage: "Homework sakiyo?",
      messages: [
        {
          id: 1,
          text: "Maths ko h/w sakiyo?",
          sender: "Bikash",
          time: "10:30 PM",
        },
        {
          id: 2,
          text: "Xaina ni ajhai gariraxu.",
          sender: "Me",
          time: "10:45 PM",
        },
        {
          id: 3,
          text: "Sakesi pathau hai 😂",
          sender: "Bikash",
          time: "10:50 PM",
        },
      ],
    },
    {
      id: 3,
      name: "Dipesh",
      online: true,
      status: "Online",
      lastMessage: "College aaudai xau?",
      messages: [
        {
          id: 1,
          text: "College aaudai xau?",
          sender: "Dipesh",
          time: "11:10 AM",
        },
        { id: 2, text: "Ah, bato mai xu.", sender: "Me", time: "11:15 AM" },
        {
          id: 3,
          text: "Laa, canteen ma parkhira xu.",
          sender: "Dipesh",
          time: "11:20 AM",
        },
      ],
    },
    {
      id: 4,
      name: "Tenzing",
      online: false,
      status: "Last seen 1 hr ago",
      lastMessage: "Momo khana jam?",
      messages: [
        { id: 1, text: "Momo khana jam?", sender: "Tenzing", time: "11:25 AM" },
        { id: 2, text: "Kata jane?", sender: "Me", time: "11:30 AM" },
        {
          id: 3,
          text: "Bhatbhateni agadi ko pasal ma 😂",
          sender: "Tenzing",
          time: "11:35 AM",
        },
      ],
    },
    {
      id: 5,
      name: "Bishal",
      online: true,
      status: "Online",
      lastMessage: "Football khelna jane?",
      messages: [
        {
          id: 1,
          text: "Football khelna jane?",
          sender: "Bishal",
          time: "11:40 AM",
        },
        { id: 2, text: "Kati baje?", sender: "Me", time: "11:45 AM" },
        {
          id: 3,
          text: "Beluka 5 baje football ground ma aau na.",
          sender: "Bishal",
          time: "11:50 AM",
        },
      ],
    },
  ];

const [users, setUsers] = useState(() => {
  const savedUsers = localStorage.getItem("users");

  if (savedUsers) {
    return JSON.parse(savedUsers);
  }

  return defaultUsers;
});
const [selectedUser, setSelectedUser] = useState(() => {
  const savedId = localStorage.getItem("selectedUserId");

  if (!savedId) return null;

  return users.find((user) => user.id === Number(savedId)) || null;
});
useEffect(() => {
  if (selectedUser) {
    localStorage.setItem("selectedUserId", selectedUser.id);
  }
}, [selectedUser]);

useEffect(() => {
  localStorage.setItem("users", JSON.stringify(users));
}, [users]);


  function sendMessage(newMessage) {
    if (!selectedUser || newMessage.trim() === "") return;

    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          lastMessage: newMessage,
          messages: [
            ...user.messages,
            {
              id: Date.now(),
              text: newMessage,
              sender: "Me",
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        };
      }
      return user;
    });

    setUsers(updatedUsers);

    const updatedSelectedUser = updatedUsers.find(
      (user) => user.id === selectedUser.id,
    );

    setSelectedUser(updatedSelectedUser);
  }

  function deleteMessage(messageId) {
  const updatedUsers = users.map((user) => {
    if (user.id === selectedUser.id) {
      return {
        ...user,
        messages: user.messages.filter(
          (message) => message.id !== messageId
        ),
      };
    }

    return user;
  });

  setUsers(updatedUsers);

  const updatedSelectedUser = updatedUsers.find(
    (user) => user.id === selectedUser.id
  );

  setSelectedUser(updatedSelectedUser);
}

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />

        <ChatWindow selectedUser={selectedUser} sendMessage={sendMessage} deleteMessage={deleteMessage} />
      </div>
    </>
  );
}

export default App;

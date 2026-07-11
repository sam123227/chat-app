import { useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
function Sidebar({ users, selectedUser, setSelectedUser }) {
  const [search, setSearch] = useState("");
  return (
    <div className="w-80 p-4 border-r overflow-y-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-2 pl-12 pr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-400" />
      </div>
      {users
        .filter((user) =>
          user.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className={`mt-6 p-4 rounded-lg cursor-pointer ${
              selectedUser?.id === user.id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-4xl text-gray-500" />

                <div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>

                  <p className="text-gray-500 text-sm">
                    Last Msg: {user.lastMessage}
                  </p>
                </div>
              </div>

              <div
                className={`w-3 h-3 rounded-full ${
                  user.online ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Sidebar;

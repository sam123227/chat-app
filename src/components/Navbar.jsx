import { FaUserCircle } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
function Navbar() {
  return (
    <nav className="bg-blue-600 px-8 py-4 text-white justify-between flex items center shadow-md">
      <div className="flex items-center gap-2">
        <FaComments className="text-3xl" />
        <h1 className="text-2xl text-white font-bold">ChatApp</h1>
      </div>
      <FaUserCircle className="text-3xl cursor-pointer" />
    </nav>
  );
}
export default Navbar;

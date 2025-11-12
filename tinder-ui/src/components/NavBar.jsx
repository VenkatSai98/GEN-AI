import react from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/slice/userSlice";
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async() => {
    try{
    await axios.post(
      BASE_URL+ "/logout",
      {},
       { withCredentials: true }
     ); 
     dispatch(removeUser());
     navigate("/login");
     
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">Sai😊</Link>
      </div>
      
      {user &&(
      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-4">
        <span className="text-white-600 dark:text-white-400 px-4">Welcome {user?.data?.firstName}</span>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                // "https://avatars.githubusercontent.com/u/98606339?s=400&u=92892a03ddcfe20de18e811365c154dbae720227&v=4"
                src= {user?.data?.photoUrl}
              />
            </div>
            
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to ='/profile' className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
      )}
    </div>
  );
};

export default NavBar;

import { Link, useNavigate } from "react-router-dom";
import ExpenseTracker from "../Components/ExpenseTracker";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bgColor">
      <div className="w-full shadow-lg">
        <div className="mx-auto max-w-6xl"> 
          <div className="flex items-center justify-between p-3">
            <h1 className="text-2xl font-semibold text-slate-300">Expense Tracker</h1>

            <p className="text-slate-300">
              Your Profile is incomplete.{" "}
              <Link to={"/updateprofile"}>
                <span
                  onClick={() => navigate("/updateprofile")}
                  className="text-blue-500 hover:underline"
                >
                  Complete it now
                </span>
              </Link>
            </p>

            <button
              className="px-2 py-2 text-white bg-gray-500 rounded-md"
              onClick={() => navigate("/login")}
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-4">
        <ExpenseTracker />
      </div>
    </div>
  );
};

export default Home;

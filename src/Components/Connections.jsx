import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useSelector } from "react-redux";
const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.err(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length == 0) return <h1>No Connections Found</h1>;

  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-black text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photourl, age, gender, about } =
          connection;

        return (
          <div key={_id} className=" flex m-3 p-4 bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                src={photourl}
                className="w-20 h-20 rounded-full"
                alt="photo"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;

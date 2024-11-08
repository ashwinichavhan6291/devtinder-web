import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  console.log(requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length == 0) return <h1>No Requests Found</h1>;

  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-black text-3xl">Connections Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photourl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between m-3 p-4 bg-base-300 w-2/3 mx-auto"
          >
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
            <div>
              <button className="btn btn-success mx-2">Accept</button>
              <button className="btn btn-warning mx-2">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;

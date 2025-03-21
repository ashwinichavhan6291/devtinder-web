import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0)
    return (
      // <div>
      //   <h1 className=" flex justify-center font-bold">No new Users Found</h1>
      // </div>
      <div className="flex justify-center my-20">
        <div className=" card glass w-96 ">
          <figure>
            <img
              src="https://img.freepik.com/premium-photo/sad-cartoon-boy_1003030-3981.jpg"
              alt="car!"
            />
          </figure>

          <div className="card-body ">
            <h2 className="card-title">oops! No User Found</h2>
          </div>
        </div>
      </div>
    );
  return (
    feed && (
      <div className="flex justify-center my-10 ">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;

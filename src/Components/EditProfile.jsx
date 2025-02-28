import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [skills, setSkill] = useState(user.skills);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photourl, setPhotoUrl] = useState(user.photourl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photourl, about },
        {
          withCredentials: true,
        }
      );
      //   console.log(res);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      const i = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className=" h-300 flex justify-center">
      <div className="flex justify-center mx-10 ">
        <div className="card bg-base-content text-white w-96 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">FirstName</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">LastName</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">Skills</span>
                </div>
                <input
                  type="text"
                  value={skills}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setSkill(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label ">
                  <span className="label-text text-white">Photo Url</span>
                </div>
                <input
                  type="text"
                  value={photourl}
                  className="input input-bordered w-full max-w-xs text-black"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, gender, about, photourl, skills }}
      />

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditProfile;

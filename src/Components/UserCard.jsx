const UserCard = ({ user }) => {
  const { firstName, lastName, photourl, age, gender, about } = user;
  // console.log("Photo URL:", photourl);

  return (
    <div className="card card-compact bg-base-300 w-96 shadow-xl ">
      <figure>
        <img alt="photo" src={photourl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        <p className="break-words">{about}</p>
        <div className="card-actions justify-center my-3">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;

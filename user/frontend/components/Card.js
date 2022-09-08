import React from "react";

function Card() {
  return (
    <>
      <div className="card w-96 glass my-5 flex flex-wrap">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="car!" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Life hack</h2>
          <p>How to park your car at your garage?</p>
          <div className="card-actions justify-end">
            <button className="btn bg-[wheat] border-none text-black hover:bg-[#ebc57e] ">
              Learn now!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;

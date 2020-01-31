import React from "react";
import className from "classnames";

export default function LaunchItem({
  launch: {
    flight_number,
    mission_name,
    launch_year,
    launch_date_local,
    launch_success
  }
}) {
  //   console.log("props", props);
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Mission :{" "}
            <span className={launch_success ? "text-success" : "text-danger"}>
              {mission_name}
            </span>
          </h4>
          <p>Date:{launch_date_local}</p>
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary">lanch details</button>
        </div>
      </div>
    </div>
  );
}

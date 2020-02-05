import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useParams, Link } from "react-router-dom";
import LaunchItem from "./LaunchItem";

export default function Launch() {
  const LAUNCH_Query = gql`
    query LAUNCH_Query($flight_number: Int) {
      launch(flight_number: $flight_number) {
        flight_number
        mission_name
        launch_year
        launch_date_local
        launch_success
      }
    }
  `;
  let { flight_number } = useParams();
  flight_number = parseInt(flight_number);
  //   console.log("useParams", useParams());
  return (
    <div>
      <Query query={LAUNCH_Query} variables={{ flight_number }}>
        {({ data, error, loading }) => {
          if (loading) return <span>...loading</span>;
          if (error) {
            console.log(error);
            return null;
          }
          const { launch } = data;
          console.log("data", launch, { data });
          return (
            <>
              {launch && <LaunchItem launch={launch} />}
              <Link to="/">go back</Link>
            </>
          );
        }}
      </Query>
    </div>
  );
}

import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import LaunchItem from "./LaunchItem";
import MessionKey from "./MessionKey";

const LAUNCHES_Query = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
    }
  }
`;

class Launches extends Component {
  render() {
    return (
      <div className="App">
        <h1>Space X</h1>
        <MessionKey />
        <Query query={LAUNCHES_Query}>
          {({ loading, error, data }) => {
            console.log({ loading, error, data });
            if (loading) return <span>...loading</span>;
            if (error) {
              console.log(error);
              return null;
            }
            console.log("data", data);
            return (
              <Fragment>
                {data &&
                  data.launches.map((launch) => (
                    <LaunchItem key={launch.flight_number} launch={launch} />
                  ))}
              </Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Launches;

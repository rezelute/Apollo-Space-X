const { paginateResults } = require("./utils");

module.exports = {
  // ++ QUERY ++ //
  Query: {
    launches: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
      // we want these in reverse chronological order
      allLaunches.reverse();
      const launches = paginateResults({ after, pageSize, results: allLaunches });

      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !== allLaunches[allLaunches.length - 1].cursor
          : false
      };
    },

    launch: (_, { id }, { dataSources }) => {
      return dataSources.launchAPI.getLaunchById({ launchId: id });
    },

    me: (_, __, { dataSources }) => {
      return dataSources.userAPI.findOrCreateUser();
    }
  },

  Mission: {
    // extend Mission > missionPatch to calculate result
    // make sure the default size is 'large' in case user doesn't specify
    missionPatch: (mission, { size } = { size: "LARGE" }) => {
      return size === "SMALL" ? mission.missionPatchSmall : mission.missionPatchLarge;
    }
  },

  Launch: {
    // extend Launch > isBooked to calculate result
    isBooked: async (launch, _, { dataSources }) => {
      return dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id });
    }
  },

  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return dataSources.launchAPI.getLaunchesByIds({ launchIds }) || [];
    }
  },

  // ++ MUTATIONS ++ //
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findUserByEmail({ email });
      console.log("user is: ", user);

      if (user === null) return null; // user doesnt exist

      return Buffer.from(email).toString("base64");
    },

    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const result = await dataSources.userAPI.bookTrips({ launchIds });
      if (!result.auth) {
        return {
          success: false,
          message: "User authentication failed",
          launches: []
        };
      }

      // get full launches details to be returned
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds
      });

      return {
        success: result.bookings && result.bookings.length === launchIds.length,
        message:
          result.bookings.length === launchIds.length
            ? "trips booked successfully"
            : `the following launches couldn't be booked: ${launchIds.filter(
                id => !result.bookings.includes(id)
              )}`,
        launches
      };
    },

    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = await dataSources.userAPI.cancelTrip({ launchId });

      if (!result) {
        return {
          success: false,
          message: "failed to cancel trip"
        };
      }

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: "trip cancelled",
        launches: [launch]
      };
    }
  }
};

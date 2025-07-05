import { getLaunchPadByID, getPayloads, getRocketByID } from "../services/spacexApi";

export const enrichLaunchData = async (launches: any[]) => {
  const enriched = await Promise.all(
    launches.map(async (launch) => {
      try {
        const [rocketRes, launchpadRes, payloadResArr] = await Promise.all([
          getRocketByID(launch.rocket),
          getLaunchPadByID(launch.launchpad),
          Promise.all(launch.payloads.map(getPayloads)),
        ]);

        const orbits = payloadResArr.map(p => p.data.orbit).filter(Boolean).join(", ") || "Unknown";

        return {
          no: launch.flight_number,
          mission: launch.name,
          launchedUtc: launch.date_utc,
          location: launchpadRes.data.name || "Unknown",
          orbit: orbits,
          status: launch.success ? "Success" : launch.success === false ? "Failed" : "Upcoming",
          rocket: rocketRes.data.name || "Unknown",
        };
      } catch (err) {
        console.error("Failed to enrich launch", launch.name, err);
        return {
          no: launch.flight_number,
          mission: launch.name,
          launchedUtc: launch.date_utc,
          location: "Unknown",
          orbit: "Unknown",
          status: launch.success ? "Success" : launch.success === false ? "Failed" : "Upcoming",
          rocket: "Unknown",
        };
      }
    })
  );

  return enriched;
};

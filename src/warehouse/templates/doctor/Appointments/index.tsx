"use client";

import { Grid } from "@mui/material";
import TodaysSchedule from "./TodaysSchedule";
import TodaysAppointments from "./TodaysAppointments";

const Appointments: React.FC = () => {
  return (
    <>
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        justifyContent="center"
      >
        <Grid size={{ xs: 12, md: 12, lg: 4, xl: 4 }}>
          <TodaysSchedule />
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 8, xl: 8 }}>
          <TodaysAppointments />
        </Grid>
      </Grid>
    </>
  );
};

export default Appointments;

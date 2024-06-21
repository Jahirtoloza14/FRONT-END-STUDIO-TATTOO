import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
    name:"appointment",
    initialState:  {
        //estado inicial
        appointment: {
          title: 0,
          user_id: "",
          artist_id:"",
          start_time:"",
          end_time:"",
          location:"",
        },
      },
    reducers: {
        appointmentDetail: (state, action) => {
            return action.payload

        }
    }
})
export const { setAppointment } = appointmentSlice.actions;
export const getAppointment = (state) => state.appointment
export default appointmentSlice.reducer
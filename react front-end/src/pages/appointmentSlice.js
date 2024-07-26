import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
    name:"appointment",
    initialState:  {
        //estado inicial
        appointment: {
          title: "",
          user_id: "",
          artist_id:"",
          start_time:"",
          end_time:"",
          location:"",
        },
      },
    reducers: {
        setAppointment: (state, action) => {
            console.log("setAppointment representando")
            return {
                ...state,
                ...action.payload
            }
        }
      }
})
export const { setAppointment } = appointmentSlice.actions;
export const getAppointment = (state) => state.appointment
export default appointmentSlice.reducer
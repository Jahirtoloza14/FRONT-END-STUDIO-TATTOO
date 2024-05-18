import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        decodificado: {
            first_name: "",
            last_name: "",
            email: "",
            id: "",
            role:""
        },
        vecesLoggeado: 0
    },
    reducers: {
        login: (state, action) => {
            console.log(state.vecesLoggeado);
            // hemos hecho un login. Tenemos un passport: {}
            //                                             token:"ey.reklskdfgd"
            //                                             decodificado : {
            //                                             id:5
            //                                             email: "jahir@hotmail.com" 
            //                                             }

            
            return {
                ...state,
                ...action.payload,
                vecesLoggeado: state.vecesLoggeado + 1
            }
        },

        logout: (state, action) => {
            return {
                token: "",
                decodificado: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    id: ""
                },
                vecesLoggeado: state.vecesLoggeado 
            }
        },
        resetCount: (state, action) => {
            return {
                ...state,
                vecesLoggeado: 0
            }
        }
    }
})
export const { login, logout, resetCount} = userSlice.actions

export const getUserData = (state) =>  state.user
export const getLoggedAmount = (state) => state.user.vecesLoggeado
export default userSlice.reducer




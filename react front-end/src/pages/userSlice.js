import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
        decodificado: {
            first_name: "",
            last_name: "",
            email: "",
            user_id: "",
            role_name:""
        },
      
    },
    reducers: {
        login: (state, action) => {
            console.log("login representando")
            // hemos hecho un login. Tenemos un passport: {}
            //                                             token:"ey.reklskdfgd"
            //                                             decodificado : {
            //                                             id:5
            //                                             email: "jahir@hotmail.com" 
            //                                             }

            
            return {
                ...state,
                ...action.payload,
              
            }
        },

        logout: (state, action) => {
            return {
                token: "",
                decodificado: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    user_id: "",
                    role_name:""
                },
               
            }
        },
    }
})
export const { login, logout} = userSlice.actions;

export const getUserData = (state) =>  state.user;

export default userSlice.reducer;




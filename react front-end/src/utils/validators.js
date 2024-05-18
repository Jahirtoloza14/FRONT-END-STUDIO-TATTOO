export const inputValidator = (input, field) => {
   if (input === ""){
    return fase
   }
    if (field === "name" || field === "last_name" && typeof (input) === "string") {
        return true
    }
    if (field === "password" && typeof(input)=== "string " && input.length >= 6 && input.length <= 12) {
        return false
    }
    return false
}
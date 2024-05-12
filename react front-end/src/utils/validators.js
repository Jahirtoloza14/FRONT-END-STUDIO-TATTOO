export const inputValidator = (input, field) => {
    if(input === ""){
        return false
    }

    if (field === "name" || field === "last_name" && typeof (input) === "string") {
        return true
    }
    if (field === "password" && (input.length < 6 || input.length > 12)) {
        return false
    }
    return false
}
import { THEME } from "../types";

export const handleTheme = (payload) => {
    localStorage.setItem("themeContCalender", payload)
    
    return {
        type: THEME,
        payload: payload
    }
}
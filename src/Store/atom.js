import { atom, selector } from "recoil"

export const userInfoAtom = atom({
    key: "userInfoAtom",
    default: JSON.parse(localStorage.getItem('userinfo'))  || NULL
})

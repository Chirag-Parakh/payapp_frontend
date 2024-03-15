import { atom, selector } from "recoil"

export const userInfoAtom = atom({
    key: "userInfoAtom",
    default: JSON.parse(localStorage.getItem('userinfo'))  || NULL
})

export const showPayScreenAtom = atom({
    key: 'showPayScreenAtom',
    default : false
})

export const reciverInfoAtom = atom({
    key : 'reciverInfoAtom',
    default : null
})

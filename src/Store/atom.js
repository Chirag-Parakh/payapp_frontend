import { atom, selector } from "recoil"

export const userInfoAtom = atom({
    key: "userInfoAtom",
    default: JSON.parse(localStorage.getItem('userinfo'))  || {}
})

export const showPayScreenAtom = atom({
    key: 'showPayScreenAtom',
    default : false
})

export const isLoggedInAtom = atom({
    key : 'isLoggedInAtom',
    default : JSON.parse(localStorage.getItem('userinfo')) ? true : false
})

export const balanceAtom = atom({
    key : 'balanceAtom',
    default : 0
})

export const reciverInfoAtom = atom({
    key : 'reciverInfoAtom',
    default : null
})

export const TransitionAtom = atom({
    key: 'TransitionAtom',
    default : 0
})
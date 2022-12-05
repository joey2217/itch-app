import type { AtomEffect } from "recoil";

export const simpleLocalStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)
    console.log('simpleLocalStorageEffect', savedValue);
    if (savedValue != null) {
      setSelf(savedValue as any)
    }

    onSet((newValue, _, isReset) => {
      console.log(newValue, isReset);
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, newValue as string)
    })
  }

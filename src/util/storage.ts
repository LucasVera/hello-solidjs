export const saveItem = (key: string, value: string) => localStorage.setItem(key, value)

export const getItem = (key: string) => localStorage.getItem(key)

export const deleteItem = (key: string) => localStorage.removeItem(key)

export const clear = () => localStorage.clear()

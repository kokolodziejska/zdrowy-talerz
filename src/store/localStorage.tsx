const LOCAL_STORAGE_KEY = "cartState";

export const loadState = () => {
  try {
    const serialized = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.warn("Błąd ładowania z localStorage:", err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serialized);
  } catch (err) {
    console.warn("Błąd zapisu do localStorage:", err);
  }
};

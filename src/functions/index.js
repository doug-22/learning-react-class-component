export function setItemLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export function getItemLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

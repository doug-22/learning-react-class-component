export function setItemLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export function getItemLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

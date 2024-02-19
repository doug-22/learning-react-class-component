import { getItemLocalStorage, setItemLocalStorage } from '../functions';

class AuthService {
  static isAuthenticated() {
    const token = getItemLocalStorage('TOKEN');
    return !!token;
  }

  static login(token) {
    setItemLocalStorage('TOKEN', token);
  }

  static logout() {
    localStorage.removeItem('TOKEN');
  }
}

export default AuthService;

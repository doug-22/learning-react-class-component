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

  static loginWithGithub(code) {
    const response = fetch(
      `${process.env.REACT_APP_URL_ACCESS_TOKEN}/getaccesstoken`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
      }
    )
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((data) => {
        this.login(data.access_token);
        return {
          status: 'success',
          data: data
        };
      })
      .catch((e) => {
        console.log(e);
      });
    return response;
  }

  static getUser() {
    const token = getItemLocalStorage('TOKEN');
    const response = fetch(`${process.env.REACT_APP_API_URL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${token}`
      }
    })
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        return data.json();
      })
      .then((data) => {
        return {
          status: 'success',
          data: data
        };
      })
      .catch((e) => {
        console.log(e);
      });
    return response;
  }
}

export default AuthService;

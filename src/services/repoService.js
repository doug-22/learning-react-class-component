import { getItemLocalStorage, setItemLocalStorage } from '../functions';

class RepoService {
  static setRepo(repo) {
    const repos = getItemLocalStorage('REPOS') ?? [];
    setItemLocalStorage('REPOS', [...repos, repo]);
  }

  static getRepoByName(repoName) {
    const username = getItemLocalStorage('USERNAME');
    const token = getItemLocalStorage('TOKEN');
    const response = fetch(
      `${process.env.REACT_APP_API_URL}/repos/${username}/${repoName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`
        }
      }
    )
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

export default RepoService;

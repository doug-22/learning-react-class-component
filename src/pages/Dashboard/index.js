import { Component } from 'react';
import { AiFillGithub, AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { VscColorMode } from 'react-icons/vsc';
import { MdDashboard } from 'react-icons/md';

import './styles.sass';
import Select from '../../components/Select';
import Button from '../../components/Button';
import InputWithSearch from '../../components/InputWithSearch';
import Card from '../../components/Card';
import { getItemLocalStorage, setItemLocalStorage } from '../../functions';
import { PiListFill } from 'react-icons/pi';
import AddRepositoryButton from '../../components/AddRepositoryButton';
import AuthService from '../../services/authService';
import RepoService from '../../services/repoService';
import ModalDelete from '../../components/ModalDelete';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterBy: '',
      favorite: false,
      darkMode: false,
      search: '',
      view: 'card',

      cards: [],

      openModal: false,
      dataModal: null
    };

    this.handleSelectFilter = this.handleSelectFilter.bind(this);
    this.handleOnlyFavorite = this.handleOnlyFavorite.bind(this);
    this.handleDarkMode = this.handleDarkMode.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOnFavorite = this.handleOnFavorite.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.handleOpenModalDelete = this.handleOpenModalDelete.bind(this);
    this.handleToogleView = this.handleToogleView.bind(this);
    this.fetchRepo = this.fetchRepo.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
    const repos = getItemLocalStorage('REPOS');
    const darkMode = getItemLocalStorage('DARK_MODE');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this.setState({ ...this.state, cards: repos ?? [], darkMode: darkMode });
  }

  handleSelectFilter(value) {
    this.setState({ filterBy: value.value });
  }

  handleToogleView(value) {
    this.setState({ view: value.value });
  }

  handleOnlyFavorite() {
    this.setState({ favorite: !this.state.favorite });
  }

  handleDarkMode() {
    this.setState({ darkMode: !this.state.darkMode });
    document.documentElement.classList.toggle('dark');
    setItemLocalStorage('DARK_MODE', !this.state.darkMode);
  }

  handleSearch(value) {
    this.setState({ ...this.state, search: value });
  }

  handleOnFavorite(value) {
    const cards = this.state.cards.map((item) => {
      if (item.id === value) {
        return {
          ...item,
          favorite: !item.favorite
        };
      }
      return item;
    });
    this.setState({ ...this.state, cards: cards });
    setItemLocalStorage('REPOS', cards);
  }

  handleOpenModalDelete(value) {
    const repo = this.state.cards.find((item) => item.id === value);
    this.setState({
      ...this.state,
      openModal: !this.state.openModal,
      dataModal: repo
    });
  }

  handleOnDelete(value) {
    const repos = this.state.cards.filter((item) => item.id !== value);
    this.setState({
      ...this.state,
      openModal: !this.state.openModal,
      cards: repos
    });
    setItemLocalStorage('REPOS', repos);
  }

  async fetchUser() {
    const response = await AuthService.getUser();
    if (response.status === 'success') {
      setItemLocalStorage('USERNAME', response.data.login);
    }
  }

  async fetchRepo(repoName) {
    const response = await RepoService.getRepoByName(repoName);
    if (response.status === 'success') {
      const repo = {
        id: response.data.id,
        name: response.data.name,
        stars: response.data.stargazers_count,
        forks: response.data.forks_count,
        openIssues: response.data.open_issues_count,
        age: response.data.created_at,
        lastCommit: response.data.pushed_at,
        license: response.data.license,
        language: response.data.language,
        favorite: false
      };
      RepoService.setRepo(repo);
      const repos = getItemLocalStorage('REPOS');
      this.setState({ ...this.state, cards: repos });
    }
  }

  render() {
    const { filterBy, favorite, cards, search, view, openModal, dataModal } =
      this.state;

    const cardsFiltered = cards
      .sort((a, b) => {
        if (filterBy) {
          if (typeof filterBy === 'number') {
            return b[filterBy] - a[filterBy];
          } else {
            const dateA = new Date(a[filterBy]);
            const dateB = new Date(b[filterBy]);

            return dateB.getTime() - dateA.getTime();
          }
        }
      })
      .filter((item) => {
        if (favorite) {
          return item.favorite;
        }
        return item;
      })
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
      <main>
        <div className="wrapper-header-dashboard">
          <div className="header-dashboard">
            <AiFillGithub className="icon-github" size={50} />
            <h1 className="header-title">Github Manage</h1>
            <Select
              options={[
                { value: 'stars', label: 'Stars' },
                { value: 'forks', label: 'Forks' },
                { value: 'openIssues', label: 'Open Issues' },
                { value: 'age', label: 'Age' },
                { value: 'lastCommit', label: 'Last Commit' }
              ]}
              value={filterBy}
              placeholder="Filter and order"
              onClick={this.handleSelectFilter}
            />
            <InputWithSearch placeholder="Search" onClick={this.handleSearch} />
            <Button
              variant="icon-button-primary"
              icon={
                favorite ? (
                  <AiFillStar size={25} />
                ) : (
                  <AiOutlineStar size={25} />
                )
              }
              onClick={this.handleOnlyFavorite}
            />
            <Button
              variant="icon-button-primary"
              icon={<VscColorMode size={25} />}
              onClick={this.handleDarkMode}
            />
            <Select
              type="button"
              options={[
                {
                  value: 'list',
                  label: 'List',
                  icon: <PiListFill size={25} color="rgb(102, 102, 102)" />
                },
                {
                  value: 'card',
                  label: 'Cards',
                  icon: <MdDashboard size={25} color="rgb(102, 102, 102)" />
                }
              ]}
              value={view}
              onClick={this.handleToogleView}
            />
            <AddRepositoryButton handleSubmit={this.fetchRepo} />
          </div>
        </div>

        <div className="wrapper-body-dashboard">
          <div className="wrapper-cards">
            {cardsFiltered.map((item) => (
              <Card
                key={item.id}
                data={item}
                onFavorite={this.handleOnFavorite}
                onDelete={this.handleOpenModalDelete}
                type={view}
              />
            ))}
          </div>
        </div>

        {openModal && (
          <ModalDelete
            data={dataModal}
            onClose={this.handleOpenModalDelete}
            onDelete={this.handleOnDelete}
          />
        )}
      </main>
    );
  }
}

export default DashboardPage;

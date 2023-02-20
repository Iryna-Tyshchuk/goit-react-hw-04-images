import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { StyledForm, StyledSearchbar } from './SearchBar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    value: '',
  };

  handleSearchChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    if (value.trim() === '') {
      return toast.warning('Please, write what do you want to search)');
    }
    this.props.onSubmit({ value });
    this.setState({ value: '' });
  };

  render() {
    return (
      <StyledSearchbar>
        <StyledForm onSubmit={this.handleSubmit}>
          <button type="submit">
            <ImSearch size="20" />
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.value}
            onChange={this.handleSearchChange}
          />
        </StyledForm>
      </StyledSearchbar>
    );
  }
}

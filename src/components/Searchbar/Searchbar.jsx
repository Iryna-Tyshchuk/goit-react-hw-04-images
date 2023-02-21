import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { StyledForm, StyledSearchbar } from './SearchBar.styled';

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');
  const handleSearchChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.warning('Please, write what do you want to search)');
    }
    onSubmit({ value });
    setValue('');
  };
  return (
    <StyledSearchbar>
      <StyledForm onSubmit={handleSubmit}>
        <button type="submit">
          <ImSearch size="20" />
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleSearchChange}
        />
      </StyledForm>
    </StyledSearchbar>
  );
}
Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

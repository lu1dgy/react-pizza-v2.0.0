import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

import serchLogo from '../../assets/img/search-icon.svg';
import closeIcon from '../../assets/img/close-icon.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const inputLink = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputLink.current.focus();
  };
  // eslint-disable-next-line
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );

  //one state to input and one to the GET from serv
  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={serchLogo} alt="search" />
      <input
        ref={inputLink}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Pizza search ..."
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.closeBtn}
          src={closeIcon}
          alt="close-btn"
        />
      )}
    </div>
  );
}

export default Search;

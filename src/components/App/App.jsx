import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../../redux/contactsOps'; 
import { selectLoading, selectError } from '../../redux/contactsSlice'; 
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';
import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      {loading && <p>Loading...</p>} {}
      {error && <p>Error: {error}</p>} {}

      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default App;

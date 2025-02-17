import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import styles from './ContactForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string().min(3, 'Too short!').required('Required'),
  number: Yup.string().min(2, 'Too short!').required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleSubmit = (values, { resetForm }) => {
    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${values.name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ id: nanoid(), ...values }));
    resetForm();
  };

  return (
    <Formik initialValues={{ name: '', number: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {() => (
        <Form className={styles.form}>
          <label>Name</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className={styles.error} />

          <label>Number</label>
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="div" className={styles.error} />

          <button type="submit">Add contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
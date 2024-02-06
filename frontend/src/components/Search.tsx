import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';

const Search = () => {
  const router = useRouter();
  const validateSearch = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (value.length < 2) {
      error = 'Minimum length: 2 characters';
    }
    return error;
  };
  return (
    <Formik
      initialValues={{
        search: '',
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        router.push(`/search?query=${values.search}`);
        resetForm();
        setSubmitting(false);
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, touched, values }) => (
        <Form style={{ width: '300px' }}>
          <Field
            name='search'
            validate={validateSearch}
            placeholder='Search'
            className='rounded dark:bg-gray-900/70 bg-white border border-pavitra-400  border-pavitra-400 p-2 relative ml-2 w-full dark:placeholder-gray-400 focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none dark:bg-gray-900/70'
          />
          {errors.search && touched.search && values.search.length < 2 ? (
            <div className='text-red-500 text-sm ml-2 absolute'>
              {errors.search}
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};
export default Search;

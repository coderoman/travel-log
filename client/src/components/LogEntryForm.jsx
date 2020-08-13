import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { createLogEntry } from '../api';

import './LogEntryForm.css';

const LogEntryForm = ({ location, onSuccess }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      setLoading(false);
      onSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="logEntry">
      {error ? <span className="error">{error}</span> : null}

      <div className="input">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" required ref={register} />
      </div>

      <div className="input">
        <label htmlFor="comments">Comments</label>
        <textarea rows={3} name="comments" />
      </div>

      <div className="input">
        <label htmlFor="rating">Rating</label>
        <input
          name="rating"
          type="number"
          min="1"
          max="10"
          pattern="\d+"
          ref={register}
        />
      </div>

      <div className="input">
        <label htmlFor="image">Image</label>
        <input name="image" ref={register} />
      </div>

      <div className="input">
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type="date" ref={register} required />
      </div>

      <div className="actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Loading' : 'Create entry'}
        </button>
      </div>
    </form>
  );
};

LogEntryForm.propTypes = {
  location: PropTypes.arrayOf(PropTypes.number),
};

export default LogEntryForm;

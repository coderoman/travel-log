import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { createLogEntry } from '../api';

import './LogEntryForm.css';

const LogEntryForm = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await createLogEntry(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="logEntry">
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
        <input name="image" ref={register} ref={register} />
      </div>

      <div className="input">
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type="date" ref={register} />
      </div>

      <div className="actions">
        <button type="submit">Log travel entry</button>
      </div>
    </form>
  );
};

LogEntryForm.propTypes = {
  //
};

export default LogEntryForm;

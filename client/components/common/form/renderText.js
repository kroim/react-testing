import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const renderText = ({ input, label, type, value, meta: { touched, error, invalid } }) => (
  <TextField
    type={type}
    label={label}
    value={value}
    error={touched && invalid}
    helperText={touched && error}
    margin="normal"
    fullWidth={true}
    {...input}
  />
);

renderText.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  meta: PropTypes.object,
};

export default renderText;

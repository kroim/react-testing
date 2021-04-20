import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Import custom components
import renderText from '../common/form/renderText';

const styles = {
  root: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  card: {
    padding: 20,
    overflow: 'auto',
  },
  cardHeader: {
    textAlign: 'center',
  },
  btnDiv: {
    textAlign: 'center',
  },
  btn: {
    marginTop: 21,
  },
};

const UserActionForm = (props) => {
  const { handleSubmit, onSubmit, onClose, classes, user } = props;
  const [ initialized, setInitialized ] = useState(false);
  if(user && !initialized){
    setInitialized(true);
    props.initialize(user);
  }

  return (
      <CardContent>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <Field type="text" name="first_name" component={renderText} label="First Name" />
          <br />
          <Field type="text" name="last_name" component={renderText} label="Last Name" />
          <br />
          <Field type="text" name="email" component={renderText} label="Email" />
          <br />
          <Field type="password" name="password" component={renderText} label="Password" />
          <br />
          <div className={classes.btnDiv}>
            <Button className={classes.btn} type="submit" variant="contained" color="primary">
              {user?'Update Account':'Add New Account'}
            </Button>
            <Button className={classes.btn} variant="contained" color="primary" onClick={onClose}>
              Close
            </Button>
          </div>
        </form>
      </CardContent>
  );
};

const validateForm = (values) => {
  const errors = {};

  const requiredFields = ['first_name', 'last_name', 'email', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '(Invalid email address.)';
  }
  return errors;
};

UserActionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default reduxForm({
  form: 'UserActionForm', // a unique identifier for this form
  validate: validateForm, // ←Callback function for client-side validation
})(withStyles(styles)(UserActionForm));

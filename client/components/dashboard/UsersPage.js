import React from 'react';
import { Grid } from '@material-ui/core';
import User from './User';

const UsersPage = (props) => {
  return (
    <div>
      <h2 style={{ paddingBottom: '15px' }}>Users</h2>

      <Grid container spacing={24} style={{ marginBottom: '15px' }}>
        <Grid item xs>
          <User data={props.users} actions={props.actions}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default UsersPage;

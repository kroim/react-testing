import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Wallpaper from '@material-ui/icons/Wallpaper';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Field} from "redux-form";
import renderText from "../common/form/renderText";
import {Link} from "react-router-dom";
import UserActionForm from "./UserActionForm";
import {USERS} from "../../constants/entity";

const styles = () => ({
  root: {
    paddingTop: 0,
  },
  subheader: {
    fontSize: 24,
    backgroundColor: cyan[600],
    color: '#FFFFFF',
  },
  actions: {
    justifyContent: 'flex-end',
  },
});

const User = (props) => {
  const [ adding, setAdding ] = useState(false);
  const [ updating, setUpdating ] = useState(null);
  const { classes } = props;
  const users = props.data;

  return (
    <Card>
      <CardHeader title="Users List" />
      <Divider />
      <CardContent>
        <List>
          {users.map((item, i) => (
            <ListItem divider={i < users.length - 1} key={item.id}>
              <ListItemIcon>
                <Avatar>
                  <Wallpaper />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={item.first_name + ' ' + item.last_name} secondary={item.email} />
              <Button color="primary" size="small" variant="text" onClick={() => {
                setAdding(false);
                setUpdating({
                  id: item.id,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  email: item.email
                });
              }}>
                Update
              </Button>
              <Button color="primary" size="small" variant="text" onClick={() => {
                props.actions.destroyItem(USERS, item.id);
                setAdding(false);
                setUpdating(null);
              }}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
      {adding?
         <UserActionForm onSubmit={(formProps) => {
           props.actions.submitForm(USERS, formProps);
           setAdding(false);
           props.actions.fetchAll(USERS);
         }}
         onClose={() => setAdding(false)}
         />
          :
          (
              updating?
                  <UserActionForm user={updating} onSubmit={(formProps) => {
                    props.actions.submitForm(USERS, formProps, updating.id);
                    setUpdating(null);
                    props.actions.fetchAll(USERS);
                  }} onClose={() => setUpdating(null)}
                  />
              :
                  <CardActions className={classes.actions}>
                    <Button color="primary" size="small" variant="text" onClick={() => setAdding(true)}>
                      Add
                    </Button>
                  </CardActions>
          )
      }
    </Card>
  );
};

User.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  actions: PropTypes.object
};

export default withStyles(styles)(User);

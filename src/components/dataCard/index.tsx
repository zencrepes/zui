import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px',
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: '0px 1px 1px',
    borderStyle: 'solid solid solid',
    borderColor: 'rgb(169, 173, 192) rgb(169, 173, 192) rgb(169, 173, 192)',
    borderImage: 'initial',
    borderTop: 0,
    padding: '0px 10px',
    textAlign: 'left',
  },
  cardHeader: {
    padding: '5px 0px 0px 0px',
  },
  cardActions: {
    padding: '0px 0px 0px 0px',
  },
  header: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  liner: {
    width: 'calc(100% + 22px)',
    marginLeft: '-11px',
    height: 6,
    backgroundImage: 'linear-gradient(to right, rgb(43, 56, 143), rgb(92, 107, 192) 51%, rgb(121, 134, 203))',
  },
  spacer: {
    margin: '8px 0px 0px',
  },
  headerTitle: {
    color: 'rgb(43, 56, 143)',
    fontWeight: 500,
    lineHeight: 0.71,
    letterSpacing: 0.4,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 24,
    margin: '8px 0px 0px',
    padding: '0px',
    textDecoration: 'none',
  },
  headerFactTitle: {
    paddingRight: 5,
    textAlign: 'right',
    color: '#999999',
    fontSize: 14,
  },
  headerFactValue: {
    textAlign: 'right',
    color: '#3C4858',
    fontSize: 18,
    fontWeight: 300,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  mainContent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 10,
    },
  },
  helpIcon: {
    color: '#9c9c9c',
    fontSize: 20,
  },
  tooltip: {
    color: '#9c9c9c',
    fontSize: 20,
  },
}));

interface ActionButton {
  name: string;
  onClick: () => void;
  icon?: React.ReactElement;
}

interface MenuItem {
  name: string;
  onClick: () => void;
}

interface Props {
  title?: string;
  subtitle?: string;
  menuItems?: MenuItem[];
  subselect?: any;
  actionButtons?: ActionButton[];
  children: any;
}

const DataCard: React.FC<Props> = (props: Props) => {
  const { title, subtitle, menuItems, actionButtons, children, subselect } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.liner}></div>
      <CardHeader
        action={
          menuItems !== undefined ? (
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          ) : subselect !== undefined ? (
            subselect
          ) : null
        }
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        subheader={subtitle}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
        className={classes.cardHeader}
      />
      {menuItems !== undefined && (
        <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          {menuItems.map((menu: MenuItem) => (
            <MenuItem
              key={menu.name}
              onClick={() => {
                menu.onClick();
              }}
            >
              {menu.name}
            </MenuItem>
          ))}
        </Menu>
      )}
      {actionButtons !== undefined && (
        <CardActions className={classes.cardActions}>
          {actionButtons.map((actionButton: ActionButton) => (
            <Button
              key={actionButton.name}
              size="small"
              color="primary"
              startIcon={actionButton.icon}
              onClick={() => {
                actionButton.onClick();
              }}
            >
              {actionButton.name}
            </Button>
          ))}
        </CardActions>
      )}
      <div className={classes.spacer}></div>
      <CardContent className={classes.mainContent}>{children}</CardContent>
    </Card>
  );
};

export default DataCard;

import React, { FC } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Grid, Box, Dialog, withStyles, makeStyles, useRadioGroup } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { firstWordsToUpperCase } from "@helpers/stringFunctions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
        width: '900px',
        maxWidth: '900px',
        borderRadius: '24px',
    },
  },
}));

const typesColor = ['#E66D00', '#DE2C2C', '#01B956', '#E34C88', '#4350E6', '#FFAF66'];

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: `${theme.spacing(0)}px ${theme.spacing(6)}px ${theme.spacing(6)}px ${theme.spacing(6)}px`,
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CustomizedDialogs: FC = ({ open, onHandleClose, pokemon }) => {
  const classes = useStyles();
  const router = useRouter();

  const getTypeColor = (type) => {
    const url = type.type.url;
    const arrUrl = url && url.split('/');
    const num = arrUrl[6];
    if (num <= 6) {
        return typesColor[num - 1];
    } 
    return typesColor[5];
  };

  return (
    <Dialog className={classes.root} onClose={onHandleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={onHandleClose} />
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <Box component={"div"} style={{ background: '#B3B6B8', width: '100%' }}>
              {
                pokemon?.sprites?.front_default && <img src={pokemon.sprites.front_default} height={"auto"} width={"100%"} />
              }
              {
                !(pokemon?.sprites?.front_default) && 
                <Box 
                    component={"div"} 
                    style={{ 
                        background: '#B3B6B8', 
                        maxWidth: '268px', 
                        maxHeight: '272px', 
                        height: '272px', 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        fontSize: '20px',
                        fontWeight: '400',
                        lineHeight: '30px',
                        color: '#fff',
                    }}
                >
                    <span>Pokemon Picture</span>
                    <span>Placeholder</span>
                </Box>
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box component={"div"} style={{ marginBottom: '24px' }}>
              <Typography
                variant="h6"
                component="h6"
                style={{ 
                    fontSize: '40px', 
                    fontWeight: '700', 
                    lineHeight: '60px', 
                    color: '#42494D', 
                    textAlign: 'left', 
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}
              >
                  {firstWordsToUpperCase(pokemon?.name)}
              </Typography>
            </Box>
            <Box component={"div"} style={{ marginBottom: '16px' }}>
              <Typography
                variant="subtitle1"
                style={{ 
                  display: 'inline-block',
                  fontSize: '20px', 
                  fontWeight: '700', 
                  lineHeight: '30px', 
                  color: '#42494D', 
                  marginRight: '20px',
                }}
              >
                Weight:&nbsp;&nbsp;
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ 
                  display: 'inline-block',
                  fontSize: '20px', 
                  fontWeight: '400', 
                  lineHeight: '30px', 
                  color: '#42494D', 
                  marginRight: '48px',
                }}
              >
                {pokemon?.weight}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ 
                  display: 'inline-block',
                  fontSize: '20px', 
                  fontWeight: '700', 
                  lineHeight: '30px', 
                  color: '#42494D', 
                }}
              >
                Height:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ 
                  display: 'inline-block',
                  fontSize: '20px', 
                  fontWeight: '400', 
                  lineHeight: '30px', 
                  color: '#42494D', 
                }}
              >
                {pokemon?.height}
              </Typography>
            </Box>
            <Box component={"div"} style={{ display: 'flex', marginBottom: '16px' }}>
              <Box component="div">
                <Typography
                  variant="subtitle1"
                  style={{ 
                    display: 'inline-block',
                    fontSize: '20px', 
                    fontWeight: '700', 
                    lineHeight: '30px', 
                    color: '#42494D', 
                    marginRight: '20px',
                  }}
                >
                  Abilities:
                </Typography>
              </Box>
              <Box component="div">
                {
                  pokemon?.abilities[0]?.ability?.name &&
                  <Typography
                    variant="subtitle1"
                    style={{ 
                      display: 'inline-block',
                      fontSize: '20px', 
                      fontWeight: '400', 
                      lineHeight: '30px', 
                      color: '#42494D', 
                      marginRight: '48px',
                    }}
                  >
                    &bull; {pokemon?.abilities[0]?.ability?.name} {`${pokemon?.abilities[0]?.is_hidden ? '(hidden)' : ''}`} 
                  </Typography>
                }
                {
                  pokemon?.abilities[1]?.ability?.name && 
                  <Typography
                    variant="subtitle1"
                    style={{ 
                      fontSize: '20px', 
                      fontWeight: '400', 
                      lineHeight: '30px', 
                      color: '#42494D', 
                      marginRight: '48px',
                    }}
                  >
                    &bull; {pokemon?.abilities[1]?.ability?.name} {`${pokemon?.abilities[1]?.is_hidden ? '(hidden)' : ''}`} 
                  </Typography>
                }
              </Box>
            </Box>
            <Box component={"div"} style={{ display: 'flex', marginBottom: '24px' }}>
              <Box component="div">
                <Typography
                  variant="subtitle1"
                  style={{ 
                    display: 'inline-block',
                    fontSize: '20px', 
                    fontWeight: '700', 
                    lineHeight: '30px', 
                    color: '#42494D', 
                    marginRight: '20px',
                  }}
                >
                  Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {
                  pokemon?.types.map((type, idx) => (
                    <Grid item xs={12} sm={4} key={idx} style={{ maxWidth: '136px' }}>
                      <Button
                        variant="contained"
                        style={{ 
                            borderRadius: '25px', 
                            padding: '12px 0', 
                            fontSize: '16px', 
                            fontWeight: '700', 
                            lineHeight: '16px', 
                            color: '#fff',
                            width: '100px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            background: `${getTypeColor(type)}`,
                        }}
                      >
                        { type.type.name }
                      </Button>
                    </Grid>
                  ))
                }
              </Grid>
            </Box>
            <Box component={"div"}>
              <Button
                variant="contained"
                color="primary"
                disableRipple
                style={{ 
                    borderRadius: '14px', 
                    padding: '8px 24px', 
                    background: '#E6AB09', 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    lineHeight: '30px', 
                    color: '#fff',
                    textTransform: 'none',
                }}
                onClick={() => router.push(`/pokemon/detail/${pokemon.id}`)}
              >
                More Detail
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizedDialogs;
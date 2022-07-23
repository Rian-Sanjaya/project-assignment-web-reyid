import React, { FC, useState, useEffect, useRef } from "react";
import useTranslation from "next-translate/useTranslation";
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Grid, 
    Card, 
    CardContent, 
    Select, 
    MenuItem,
    Hidden,
    makeStyles, 
    withStyles,
    InputBase,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import api from "@utils/api";
// import Layout from "../../src/components/layouts/layout";
import TopNavbar from "@components/layouts/TopNavbar";
import Navbar from "@components/layouts/Navbar";
import DetailDialog from "@components/home/detailDialog";
import { firstWordsToUpperCase } from "@helpers/stringFunctions";

const SelectInput = withStyles((theme) => ({
    input: {
      borderRadius: 8,
      position: 'relative',
    //   backgroundColor: theme.palette.background.paper,
      border: '2px solid #fff',
      fontSize: 20,
      fontWeight: 700,
      padding: '8px 14px',
      color: '#fff',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
        background: '#fff',
        color: '#E6AB09',
        // borderColor: '#80bdff',
        // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiPaginationItem-rounded': {
            border: '2px solid #fff',
            borderRadius: '8px',
            fontSize: '20px',
            fontWeight: 700,
            color: '#fff',
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            background: '#fff',
            color: '#E6AB09',
        }
    },
    msFontSize: {
        fontSize: "32px",
        textAlign: "left",
        [theme.breakpoints.up(600)]: {
            fontSize: "52px"
        }
    }
  }));

const paginationInit = {
    count: 0,
    next: '',
    previous: '',
};

const typesColor = ['#E66D00', '#DE2C2C', '#01B956', '#E34C88', '#4350E6', '#FFAF66'];

const PokemonList: FC = () => {
    const [data, setData] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [pagination, setPagination] = useState(paginationInit);
    const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(9);
    const [open, setOpen] = useState(false);

    const { t } = useTranslation();
    const pokeList = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        fetchData();
    }, [page, perPage]);

    const fetchParam = () => {
        const offset = (page - 1) * perPage;
        const param = `offset=${offset}&limit=${perPage}`;

        return param;
    };

    const fetchData = async (action = '') => {
        setLoading(true);

        const URL = {
            baseURL: "https://pokeapi.co/api/v2/",
            path: `pokemon/?${fetchParam()}`,
        };
        const res = (await api(URL.baseURL)).get(URL.path);
        const resData = (await res).data;

        setPagination({
            count: resData.count,
            next: resData.next,
            previous: resData.previous,
        })

        const arrResults  = [...resData.results];
        const results = [];
        for (let i = 0; i < arrResults.length; i++) {
            const arr = arrResults[i].url.split('/');
            const URL = {
                baseURL: "https://pokeapi.co/api/v2/",
                path: `pokemon/${arr[6]}`,
            };
            const res = (await api(URL.baseURL)).get(URL.path);
            const resData = (await res).data;
            const pokemon = { ...arrResults[i], ...resData };
            results.push(pokemon);
        }
        setData(results);
        setLoading(false);
    };

    const handlePageChange = (e, p) => {
        setPage(p);
    };

    const handlePerPageChange = (event) => {
        setPerPage(event.target.value);
    };

    const scrollToPokeList = () => pokeList.current.scrollIntoView({ behavior: 'smooth' });

    const handleClickOpen = (curentData) => {
        setCurrentData(curentData);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

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
        <Container maxWidth="xl" style={{ backgroundColor: '#FAFAFA', padding: 0, height: '100%' }}>
            <TopNavbar />
            <Navbar />
            <DetailDialog opendialog={open} onHandleClose={handleClose} pokemon={currentData} />
            <Box component="div" style={{ backgroundColor: '#FFF', height: '100%' }}>
                <Box component="div" pl={10} pr={10} style={{ height: `calc(100% - 100px)` }}>
                    <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box component="div">
                                <Typography
                                    align="center"
                                    variant="h4"
                                    component="h3"
                                    className={classes.msFontSize}
                                >
                                    {`All the Pokémon data you'll ever need in one place!`}
                                </Typography>
                                <Typography
                                    align="center"
                                    variant="h6"
                                    component="h6"
                                    style={{ fontSize: '20px', fontWeight: '400', lineHeight: '30px', color: '#7B8082', textAlign: 'left', marginTop: '32px' }}
                                >
                                    {`Thousands of data compiled into one place`}
                                </Typography>
                                <Box component="div" textAlign={"left"} mt={4}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disableRipple
                                        style={{ 
                                            borderRadius: '14px', 
                                            padding: '16px 32px', 
                                            background: '#E6AB09', 
                                            fontSize: '20px', 
                                            fontWeight: '700', 
                                            lineHeight: '30px', 
                                            color: '#fff',
                                            textTransform: 'none',
                                        }}
                                        onClick={scrollToPokeList}
                                    >
                                        Check PokèDex
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Hidden xsDown>
                            <Grid item xs={12} sm={6} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Box component="div" position={"relative"} height={"100%"}>
                                    <Box component="div" position={"absolute"} top={"12%"} left={"4%"} zIndex={1}>
                                        <img src="/images/poke1_home.png" style={{ width: '100%', height: 'auto' }} />
                                    </Box>
                                    <Box component="div" position={"absolute"} top={"24%"} left={"20%"} zIndex={2}>
                                        <img src="/images/poke2_home.png" style={{ width: '100%', height: 'auto' }} />
                                    </Box>
                                    <Box component="div" position={"absolute"} top={"40%"} left={"32%"} zIndex={3}>
                                        <img src="/images/poke3_home.png" style={{ width: '100%', height: 'auto' }} />
                                    </Box>
                                </Box>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Box>
                <Box 
                    component="div" 
                    pl={10} pr={10} 
                    // ref={pokeList}
                    style={{ 
                        backgroundImage: 'url(/images/background_content.png)', 
                        backgroundSize: 'cover', 
                        border: '1px solid transparent' 
                    }}
                >
                    <div ref={pokeList}>
                     <Typography 
                        variant="h2" 
                        style={{ 
                            fontSize: '40px', 
                            fontWeight: '700', 
                            lineHeight: '60px', 
                            color: '#42494D', 
                            textAlign: 'center',
                            marginTop: '80px',
                            marginBottom: '16px',
                        }}
                    >
                        PokèDex
                    </Typography>
                    <Typography 
                        variant="h2" 
                        style={{ 
                            fontSize: '24px', 
                            fontWeight: '300', 
                            lineHeight: '36px', 
                            color: '#42494D', 
                            textAlign: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        All Generation totaling
                    </Typography>
                    <Typography 
                        variant="h2" 
                        style={{ 
                            fontSize: '24px', 
                            fontWeight: '300', 
                            lineHeight: '36px', 
                            color: '#42494D', 
                            textAlign: 'center',
                            marginBottom: '70px',
                        }}
                    >
                        {pagination.count} Pokemon
                    </Typography>
                    <Grid container spacing={10}>
                        {
                            data && data.length && data.map((item) => (
                                <Grid item key={item.id} xs={12} sm={6} md={4} style={{ paddingBottom: '24px', paddingTop: '24px' }}>
                                    <Card variant="outlined" onClick={() => handleClickOpen(item)} style={{ borderRadius: '24px', cursor: 'pointer' }}>
                                        <CardContent style={{ padding: '40px 24px' }}>
                                            <Box component={"div"} style={{ background: '#B3B6B8', minHeight: '200px' }}>
                                                {
                                                    item.sprites.front_default && <img src={item.sprites.front_default} height={"auto"} width={"100%"} />
                                                }
                                                {
                                                    !(item.sprites?.front_default) && 
                                                    <Box 
                                                        component={"div"} 
                                                        style={{ 
                                                            background: '#B3B6B8', 
                                                            maxWidth: '268px',
                                                            maxHeight: '272px', 
                                                            minHeight: '200px',
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
                                            <Typography
                                                variant="h6"
                                                component="h6"
                                                style={{ fontSize: '20px', fontWeight: '700', lineHeight: '20px', color: '#B3B6B8', textAlign: 'left', marginTop: '10px' }}
                                            >
                                                {`#${('0000' + item.id).slice(-4)}`}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                component="h6"
                                                style={{ 
                                                    fontSize: '40px', 
                                                    fontWeight: '700', 
                                                    lineHeight: '60px', 
                                                    color: '#42494D', 
                                                    textAlign: 'left', 
                                                    marginTop: '10px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {firstWordsToUpperCase(item.name)}
                                            </Typography>
                                            <Grid container spacing={1}>
                                                {
                                                    item?.types.slice(0, 3).map((type, idx) => (
                                                        <Grid item xs={12} sm={6} key={idx} style={{ maxWidth: '136px' }}>
                                                        <Button
                                                            variant="contained"
                                                            style={{ 
                                                                borderRadius: '25px', 
                                                                padding: '12px 0', 
                                                                fontSize: '20px', 
                                                                fontWeight: '700', 
                                                                lineHeight: '18px', 
                                                                color: '#fff',
                                                                width: '125px',
                                                                background: `${getTypeColor(type)}`,
                                                            }}
                                                        >
                                                            { type.type.name }
                                                        </Button>
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Box component={'div'} style={{ margin: '80px 0', display: 'flex', justifyContent: 'space-between' }}>
                        <Box component={'div'} style={{ margin: 'auto 0' }}>
                            <Box component={'span'} style={{ fontSize: '20px', fontWeight: '700', lineHeight: '20px', marginRight: '16px', color: '#fff' }}>
                                Per Page:
                            </Box>
                            <Box component={'span'}>
                                <Select variant="outlined" input={<SelectInput />} value={perPage} onChange={handlePerPageChange}>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={21}>21</MenuItem>
                                </Select>
                            </Box>
                        </Box>
                        <Box component={'div'}>
                            <Pagination 
                                size="large" 
                                className={classes.root}
                                count={Math.ceil(pagination.count / perPage)}
                                page={page}
                                variant={"outlined"} 
                                shape="rounded" 
                                showFirstButton 
                                showLastButton
                                onChange={handlePageChange}
                            />
                        </Box>
                        <Box component={'div'} style={{ margin: 'auto 0', fontSize: '20px', fontWeight: '700', lineHeight: '20px', marginRight: '16px', color: '#fff' }}>
                            Total Data: {pagination.count}
                        </Box>
                    </Box>
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

// want to use Per-Page Layouts (still doesn't work)
// PokemonList.getLayout = (page: ReactElement) => {
//     return (
//         <Layout>
//             <div>{page}</div>
//         </Layout>
//     )
// }

export default PokemonList;

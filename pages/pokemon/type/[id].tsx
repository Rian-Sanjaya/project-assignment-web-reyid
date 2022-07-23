import React, { FC, useState, useEffect, } from "react";
import { useRouter } from "next/router";
import { 
  Box, 
  Button,
  Container, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Select, 
  MenuItem,
  makeStyles, 
  withStyles,
  InputBase,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import TopNavbar from "@components/layouts/TopNavbar";
import Navbar from "@components/layouts/Navbar";
import api from "@utils/api";
import { firstWordsToUpperCase } from "@helpers/stringFunctions";

const typesColor = ['#E66D00', '#DE2C2C', '#01B956', '#E34C88', '#4350E6', '#FFAF66'];

const SelectInput = withStyles((theme) => ({
  input: {
    borderRadius: 8,
    position: 'relative',
    border: '1px solid #056593',
    fontSize: '10px',
    fontWeight: 700,
    lineHeight: '20px',
    padding: '4px 8px',
    color: '#056593',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 8,
      background: '#056593',
      color: '#fff',
      // borderColor: '#80bdff',
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
      '& .MuiPaginationItem-rounded': {
          border: '1px solid #056593',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: '20px',
          color: '#056593',
          height: '28px',
          minWidth: '28px',
      },
      '& .MuiPaginationItem-page.Mui-selected': {
          background: '#056593',
          color: '#fff',
      }
  },
}));

const TypePokemon = () => {
  const [allPokemonsType, setAllPokemonsType] = useState(null);
  const [data, setData] = useState(null);
  const [typeList, setTypeList] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [typeName, setTypeName] = useState('');
  const [totalType, setTotalType] = useState(0);
  const [perPage, setPerPage] = useState(9);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;
  const baseUrl = "https://pokeapi.co/api/v2/";
  const classes = useStyles();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handlePagePerPageChange();
  }, [page, perPage]);

  const handlePagePerPageChange = async () => {
    const startIndex = (page - 1) * perPage;
    const slicePokemons = allPokemonsType?.slice(startIndex, startIndex + perPage);
    if (slicePokemons) {
      setLoading(false);
      const arrResults  = [...slicePokemons];
      const results = [];
      for (let i = 0; i < arrResults.length; i++) {
          const arr = arrResults[i].pokemon.url.split('/');
          const res = (await api(baseUrl)).get(`pokemon/${arr[6]}`);
          const resData = (await res).data;
          const pokemon = { ...arrResults[i], ...resData };
          results.push(pokemon);
      }
      setData(results);
      setLoading(false);
    }
  };

  const fetchData = async () => {
      setLoading(true);
      const types = (await api(baseUrl)).get(`type`);
      const typesData = (await types).data;
      setTypeList(typesData.results);
      const res = (await api(baseUrl)).get(`type/${id}`);
      const resData = (await res).data;
      setTypeName(resData.name);
      setTotalType(resData.pokemon.length);
      setAllPokemonsType(resData.pokemon);
      const startIndex = (page - 1) * perPage;
      const slicePokemons = resData.pokemon.slice(startIndex, startIndex + perPage);
      const arrResults  = [...slicePokemons];
      const results = [];
      for (let i = 0; i < arrResults.length; i++) {
          const arr = arrResults[i].pokemon.url.split('/');
          const res = (await api(baseUrl)).get(`pokemon/${arr[6]}`);
          const resData = (await res).data;
          const pokemon = { ...arrResults[i], ...resData };
          results.push(pokemon);
      }
      setData(results);
      setLoading(false);
  };

  const fetchTypeById = async (url) => {
    const arrUrl = url.split('/');
    setLoading(true);
    const res = (await api(baseUrl)).get(`type/${arrUrl[6]}`);
    const resData = (await res).data;
    setTypeName(resData.name);
    setTotalType(resData.pokemon.length);
    setAllPokemonsType(resData.pokemon);
    setPage(1);
    const startIndex = (1 - 1) * perPage;
    const slicePokemons = resData.pokemon.slice(startIndex, startIndex + perPage);
    const arrResults  = [...slicePokemons];
    const results = [];
    for (let i = 0; i < arrResults.length; i++) {
        const arr = arrResults[i].pokemon.url.split('/');
        const res = (await api(baseUrl)).get(`pokemon/${arr[6]}`);
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
    <Container maxWidth="xl" style={{ backgroundColor: '#FAFAFA', padding: 0 }}>
      <TopNavbar />
      <Navbar />
      <Box component="div" p={10} style={{ backgroundColor: '#FFF' }}>
        <Box component={"div"} 
          style={{ 
              display: 'flex', 
              flex: 'auto',
              boxSizing: 'border-box',
              backgroundImage: 'url(/images/background_type1.png)',
              backgroundSize: 'cover',
          }}
        >
          <Box component={"div"}
            style={{
              flex: '0 0 305ps',
              maxWidth: '305px',
              minWidth: '305px',
              width: '305px',
              boxSizing: 'border-box',
            }}
          >
            <Typography variant="h6" style={{ fontSize: '16px', fontWeight: '700', lineHeight: '24px', color: '#42494D'}}>Pokemon Type</Typography>
            <ul>
              {
                typeList && typeList.map((list, idx) => (
                  <li 
                    key={idx} 
                    style={{ fontSize: '14px', fontWeight: '700', lineHeight: '21px', color: '#7B8082', cursor: 'pointer', marginBottom: '12px' }}
                    onClick={() => fetchTypeById(list.url)}
                  >
                    {firstWordsToUpperCase(list.name)}
                  </li>
                ))
              }
            </ul>
          </Box>
          <Box component={"div"}
            style={{
              boxSizing: 'border-box',
              overflowX: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              flex: 'auto',

            }}
          >
            <Typography variant="h4" style={{ fontSize: '40px', fontWeight: '700', lineHeight: '60px', color: '#42494D', marginBottom: '24px' }}>
              Pokemon with Type {firstWordsToUpperCase(typeName)}
            </Typography>
            <TableContainer component={Paper} 
              style={{ borderRadius: '24px', boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', opacity: '0.8' }}
            >
              <Table>
                <TableBody>
                  {
                    data && data.length && data.map((item) => (
                      <TableRow key={item.id} onClick={() => router.push(`/pokemon/detail/${item.id}`)} style={{ cursor: 'pointer' }}>
                        <TableCell align="center">
                          <Box component={"div"} 
                            style={{ 
                              background: '#B3B6B8', 
                              width: '100px', 
                              maxWidth: '100px', 
                              minWidth: '100px', 
                              height: '100px', 
                              maxHeight: '100px', 
                              minHeight: '100px', 
                            }}
                          >
                            {
                              <img src={item.sprites.front_default} height={"auto"} width={"100%"} />
                            }
                            {
                              !(item.sprites?.front_default) && 
                              <Box 
                                  component={"div"} 
                                  style={{ 
                                      background: '#B3B6B8', 
                                      width: '100px', 
                                      maxWidth: '100px', 
                                      minWidth: '100px', 
                                      height: '100px', 
                                      maxHeight: '100px', 
                                      minHeight: '100px', 
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
                        </TableCell>
                        <TableCell align="center" style={{ color: '#42494D', fontSize: '20px', fontWeight: '700', lineHeight: '15px' }}>
                          {`#${('0000' + item.id).slice(-4)}`}
                        </TableCell>
                        <TableCell align="center" style={{ color: '#42494D', fontSize: '20px', fontWeight: '700', lineHeight: '15px' }}>
                          {firstWordsToUpperCase(item.name)}
                        </TableCell>
                        <TableCell align="left">
                          {
                            item?.types.slice(0, 3).map((type, idx) => (
                              <Button
                                key={idx}
                                variant="contained"
                                style={{ 
                                  borderRadius: '25px', 
                                  padding: '8px 0', 
                                  fontSize: '12px', 
                                  fontWeight: '700', 
                                  lineHeight: '14px', 
                                  color: '#fff',
                                  width: '88px',
                                  background: `${getTypeColor(type)}`,
                                  marginRight: '8px',
                                }}
                              >
                                  { type.type.name }
                              </Button>
                            ))
                          }
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <Box component={'div'} style={{ margin: '40px 0 0', display: 'flex', justifyContent: 'space-between' }}>
              <Box component={'div'} style={{ margin: 'auto 0' }}>
                <Box component={'span'} style={{ fontSize: '10px', fontWeight: '700', lineHeight: '10px', marginRight: '16px', color: '#056593' }}>
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
                  count={Math.ceil(totalType / perPage)}
                  page={page}
                  variant={"outlined"} 
                  shape="rounded" 
                  showFirstButton 
                  showLastButton
                  onChange={handlePageChange}
                />
              </Box>
              <Box component={'div'} style={{ margin: 'auto 0', fontSize: '10px', fontWeight: '700', lineHeight: '10px', marginRight: '16px', color: '#056593' }}>
                Total Data: {totalType}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default TypePokemon;
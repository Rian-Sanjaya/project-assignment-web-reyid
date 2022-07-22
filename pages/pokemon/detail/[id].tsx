import React, { FC, useState, useEffect, } from "react";
import { useRouter } from "next/router";
import { Box, Container, Typography, Button, Grid } from "@material-ui/core";
import TopNavbar from "@components/layouts/TopNavbar";
import Navbar from "@components/layouts/Navbar";
import api from "@utils/api";
import { firstWordsToUpperCase } from "@helpers/stringFunctions";

const typesColor = ['#E66D00', '#DE2C2C', '#01B956', '#E34C88', '#4350E6', '#FFAF66'];
const statsColor = ['#0571A6', '#E66D00', '#E6AB09', '#01B956', '#3C48CF', '#DE2C2C'];
const evolssColor = ['#01B956', '#E6AB09', '#E66D00', '#DE2C2C'];

const DetailPokemon: FC = () => {
    const [data, setData] = useState(null);
    const [evolChains, setEvolChains] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const baseUrl = "https://pokeapi.co/api/v2/";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (action = '') => {
        setLoading(true);

        const URL = {
            baseURL: "https://pokeapi.co/api/v2/",
            path: `pokemon/${id}`,
        };
        const res = (await api(URL.baseURL)).get(URL.path);
        const resData = (await res).data;
        fetchEvol(id);
        setData(resData);
        setLoading(false);
    };

    const fetchEvol = async (id) => {
        const evol = (await api(baseUrl)).get(`evolution-chain/${id}`);
        const evolData = (await evol).data;
        
        let evolutions = [];
        let goNext = false;
        let url = '';
        url = evolData.chain?.species?.url;
        const arrUrl = url && url.split('/');
        if (url) {
            const chain = (await api(baseUrl)).get(`pokemon/${arrUrl[6]}`);
            const chainData = (await chain).data;
            evolutions.push(chainData);
            goNext = true;
        }
        if (goNext) {
            url = evolData.chain?.evolves_to[0]?.species?.url;
            const arrUrl = url && url.split('/');
            if (url) {
                const chain = (await api(baseUrl)).get(`pokemon/${arrUrl[6]}`);
                const chainData = (await chain).data;
                evolutions.push(chainData);
                goNext = true;
            } else {
                goNext = false;
            }
        }
        if (goNext) {
            url = evolData.chain?.evolves_to[0]?.evolves_to[0]?.species?.url;
            const arrUrl = url && url.split('/');
            if (url) {
                const chain = (await api(baseUrl)).get(`pokemon/${arrUrl[6]}`);
                const chainData = (await chain).data;
                evolutions.push(chainData);
                goNext = true;
            } else {
                goNext = false;
            }
        }
        if (goNext) {
            url = evolData.chain?.evolves_to[0]?.evolves_to[0]?.evolves_to[0]?.species?.url;
            const arrUrl = url && url.split('/');
            if (url) {
                const chain = (await api(baseUrl)).get(`pokemon/${arrUrl[6]}`);
                const chainData = (await chain).data;
                evolutions.push(chainData);
                goNext = true;
            } else {
                goNext = false;
            }
        }
        setEvolChains(evolutions);
    };

    const changeToEvol = (currentEvol) => {
        fetchEvol(currentEvol.id);
        setData(currentEvol);
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

    const otherSprites = (urlImg) => {
        return <Grid item xs={12} sm={2} style={{ maxWidth: '141px', maxHeight: '141px' }}>
            <Box component={"div"} style={{ background: '#B3B6B8', maxWidth: '141px', maxHeight: '141px' }}>
                {
                    urlImg && <img src={urlImg} height={"100%"} width={"100%"} style={{ objectFit: 'contain' }} />
                }
                {
                    !(urlImg) && 
                    <Box 
                        component={"div"} 
                        style={{ 
                            background: '#B3B6B8', 
                            maxWidth: '141px',
                            height: '141px', 
                            display: 'flex', 
                            flexDirection: 'column',
                            justifyContent: 'center', 
                            alignItems: 'center',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '30px',
                            color: '#fff',
                        }}
                    >
                        <span>Other Pokemon</span>
                        <span>Sprites</span>
                    </Box>
                }
            </Box>
        </Grid>
    }

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#FAFAFA', padding: 0 }}>
            <TopNavbar />
            <Navbar />
            <Box component="div" p={10} style={{ backgroundColor: '#FFF' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={5}>
                        <Box component={"div"} style={{ background: '#B3B6B8', width: '100%' }}>
                        {
                            data?.sprites?.front_default && <img src={data.sprites.front_default} height={"auto"} width={"100%"} />
                        }
                        {
                            !(data?.sprites?.front_default) && 
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
                                {firstWordsToUpperCase(data?.name)}
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
                                {data?.weight}
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
                                {data?.height}
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
                                    data?.abilities[0]?.ability?.name && 
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
                                            &bull; {data?.abilities[0]?.ability?.name} {`${data?.abilities[0]?.is_hidden ? '(hidden)' : ''}`} 
                                        </Typography>
                                }
                                {
                                    data?.abilities[1]?.ability?.name && 
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
                                        &bull; {data?.abilities[1]?.ability?.name} {`${data?.abilities[1]?.is_hidden ? '(hidden)' : ''}`} 
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
                                    data?.types.map((type, idx) => (
                                        <Grid item xs={12} sm={3} key={idx} style={{ maxWidth: '136px' }}>
                                            <Button
                                                variant="contained"
                                                style={{ 
                                                    borderRadius: '25px', 
                                                    padding: '12px 0', 
                                                    fontSize: '16px', 
                                                    fontWeight: '700', 
                                                    lineHeight: '16px', 
                                                    color: '#fff',
                                                    width: '120px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    background: `${getTypeColor(type)}`,
                                                }}
                                                onClick={() => console.log('type: ', type)}
                                            >
                                                { type.type.name }
                                            </Button>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Box component="div" style={{ marginTop: '48px' }}>
                    <Typography 
                        variant="h4"
                        style={{ 
                            fontSize: '20px', 
                            fontWeight: '700', 
                            lineHeight: '30px', 
                            color: '#42494D', 
                            marginBottom: '16px',
                        }}
                    >
                        Other Images:
                    </Typography>
                    <Grid container spacing={2}>
                        {otherSprites(data?.sprites?.other?.dream_world?.front_default)}
                        {otherSprites(data?.sprites?.other?.home?.front_default)}
                        {otherSprites(data?.sprites?.other?.['official-artwork']?.front_default)}
                        {otherSprites(data?.sprites?.versions?.['generation-i']?.['red-blue'].front_default)}
                        {otherSprites(data?.sprites?.versions?.['generation-ii']?.['crystal'].front_default)}
                        {otherSprites(data?.sprites?.versions?.['generation-iii']?.['emerald'].front_default)}
                    </Grid>
                </Box>
                <Box component="div" style={{ marginTop: '48px' }}>
                    <Typography 
                        variant="h4"
                        style={{ 
                            fontSize: '20px', 
                            fontWeight: '700', 
                            lineHeight: '30px', 
                            color: '#42494D', 
                            marginBottom: '16px',
                        }}
                    >
                        Stats:
                    </Typography>
                    <Grid container spacing={2}>
                        {   data && data.stats && data.stats.map((stat, idx) => (
                            <Grid item xs={12} md={2} key={idx}
                                style={{ border: `20px solid ${statsColor[idx]}`, borderRadius: '50%', maxWidth: '170px', maxHeight: '170px', marginRight: '8px', marginBottom: '16px' }}
                            >
                                <Typography 
                                    variant="subtitle1"
                                    style={{ 
                                        fontSize: '32px', 
                                        fontWeight: '700', 
                                        lineHeight: '60px', 
                                        textAlign: 'center',
                                        marginTop: '-14px',
                                        color: `${statsColor[idx]}`,
                                    }}
                                >
                                    {stat.base_stat}
                                </Typography>
                                <Typography 
                                    variant="subtitle1"
                                    style={{ 
                                        fontSize: '20px', 
                                        fontWeight: '400', 
                                        lineHeight: '30px', 
                                        textAlign: 'center',
                                        color: `${statsColor[idx]}`,
                                    }}
                                >
                                    {stat.stat.name}
                                </Typography>
                            </Grid>
                            ))
                        }
                    </Grid>
                </Box>
                <Box component="div" style={{ marginTop: '48px' }}>
                    <Typography 
                        variant="h4"
                        style={{ 
                            fontSize: '20px', 
                            fontWeight: '700', 
                            lineHeight: '30px', 
                            color: '#42494D', 
                            marginBottom: '16px',
                        }}
                    >
                        Evolution:
                    </Typography>
                    <Grid container spacing={2}>
                        {
                            evolChains && evolChains.map((evol, idx) => (
                                <Grid item xs={12} sm={2} key={evol.id} style={{ marginRight: '50px', maxWidth: '225px', maxHeight: '225px', marginBottom: '24px' }}>
                                    <Box component={"div"} style={{ position: 'relative' }}>
                                        {
                                            idx > 0 &&
                                            <Box component={"div"}
                                                style={{ position: 'absolute', left: '-60px', top: '50%', transform: 'translateY(-50%)', width: '46px' }}
                                            >
                                                {
                                                    <img src={'/images/right_arrow.png'} height={"100%"} width={"100%"} style={{ objectFit: 'contain' }} />
                                                }
                                            </Box>
                                        }
                                        {
                                            evol.sprites?.front_default && 
                                            <Box component={"div"}
                                                style={{ 
                                                    border: `8px solid ${evolssColor[idx]}`, 
                                                    borderRadius: '50%', 
                                                    // maxWidth: '155px', 
                                                    // maxHeight: '155px', 
                                                    marginRight: '16px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => changeToEvol(evol)}
                                            >
                                                {
                                                    <img src={evol.sprites?.front_default} height={"100%"} width={"100%"} style={{ objectFit: 'contain' }} />
                                                }
                                            </Box>
                                        }
                                        {
                                            !(evol.sprites?.front_default) && 
                                            <Box 
                                                component={"div"} 
                                                style={{ 
                                                    border: `8px solid ${evolssColor[idx]}`, 
                                                    maxWidth: '155px',
                                                    height: '155px', 
                                                    borderRadius: '50%',
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    justifyContent: 'center', 
                                                    alignItems: 'center',
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                    lineHeight: '30px',
                                                    color: '#fff',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <span>Other Pokemon</span>
                                                <span>Sprites</span>
                                            </Box>
                                        }
                                    </Box>
                                    <Typography 
                                        variant="h4"
                                        style={{ 
                                            fontSize: '20px', 
                                            fontWeight: '700', 
                                            lineHeight: '30px', 
                                            color: '#42494D', 
                                            marginTop: '16px',
                                            marginBottom: '32px',
                                            textAlign: 'center',
                                            width: '160ßpx',
                                        }}
                                    >
                                        {firstWordsToUpperCase(evol.name)}
                                    </Typography>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default DetailPokemon;

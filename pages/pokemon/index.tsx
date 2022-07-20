import React, { FC, useState, useEffect, ReactElement } from "react";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import { Box, Container, Typography, Button, List, ListItem, ListItemText } from "@material-ui/core";
import api from "@utils/api";
// import Layout from "../../src/components/layouts/layout";
import TopNavbar from "../../src/components/layouts/TopNavbar";
import Navbar from "../../src/components/layouts/Navbar";

const PokemonList: FC = () => {
    const [data, setData] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const { t } = useTranslation();
    const route = useRouter();
    const { locale } = route;
    // setLanguage(locale);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchParam = (action) => {
        let param = 'limit=9&offset=0';
        if (action === 'prev') {
            param = pagination && pagination.previous ? pagination.previous : param;
        }
        if (action ===  'next') {
            param = pagination && pagination.next ? pagination.next : param;
        }
        const index = param.indexOf('?');
        param = index === -1 ? param : param.slice(index + 1);
        return param;
    };

    const fetchData = async (action = '') => {
        setLoading(true);

        const URL = {
            baseURL: "https://pokeapi.co/api/v2/",
            path: `pokemon/?${fetchParam(action)}`,
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

    return (
        <Container maxWidth="xl" style={{ backgroundColor: '#FAFAFA', padding: 0, height: '100%' }}>
            <TopNavbar />
            <Navbar />
            <Box component="div" style={{ backgroundColor: '#FFF', height: '100%' }}>
                <Box component="div" pl={10} pr={10} style={{ height: `calc(100% - 100px)` }}>
                    <Typography>List Pokemon</Typography>
                </Box>
                <Box component="div" pl={10} pr={10}>
                    <List>
                        {
                            data && data.length && data.map((item, idx) => (
                                <ListItem key={idx}>
                                    <ListItemText>
                                        {item.name} {item.weight}
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                    <Button
                        variant="contained"
                        color="primary"
                        // fullWidth
                        onClick={() =>
                            route.push(`/pokemon/detail/${1}`)
                        }
                    >
                        {/* {t("home:requirement-action")} */}
                        Pokemon Detail
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        // fullWidth
                        onClick={() => fetchData('prev')}
                    >
                        Prev
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        // fullWidth
                        onClick={() => fetchData('next')}
                    >
                        Next
                    </Button>
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

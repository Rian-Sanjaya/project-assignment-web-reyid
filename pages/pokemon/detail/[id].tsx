import React, { FC } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { Box, Container, Typography, Button } from "@material-ui/core";

const DetailPokemon: FC = () => {
    const { t } = useTranslation();
    const route = useRouter();

    return (
        <Container maxWidth="xl">
            <Box component="div" m={10}>
                <Button
                    variant="contained"
                    color="primary"
                    // fullWidth
                    onClick={() => route.back()}
                >
                    Back
                </Button>
                <Typography>Detail Pokemon</Typography>
            </Box>
        </Container>
    );
};

export default DetailPokemon;

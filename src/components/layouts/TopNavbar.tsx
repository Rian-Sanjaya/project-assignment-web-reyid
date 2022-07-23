import React, { FC, useState } from 'react';
import { Box, Select, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";
import { Language } from '@material-ui/icons';
import setLanguage from "next-translate/setLanguage";

const TopNavbar: FC = () => {
  const [lang, setLang] = useState('English');
  const route = useRouter();
  const { locale } = route;

  const handleChange = async (event) => {
    await setLanguage(locale === "id" ? "en" : "id");
    setLang(event.target.value);
  };

  return (
    <Box component="div" pl={10} pr={10} mt={0} mb={0} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box component={"div"} style={{ marginRight: '4px' }}>
        <Language style={{ fontSize: '18px', marginTop: '6px' }} />
      </Box>
      <Select
        value={lang}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Without label' }}
        disableUnderline
        style={{ fontSize: '12px', lineHeight: '18px', fontWeight: 400 }}
      >
        <MenuItem value={`English`}>English</MenuItem>
        <MenuItem value={`Indonesia`}>Indonesia</MenuItem>
      </Select>
    </Box>
  )
}

export default TopNavbar;
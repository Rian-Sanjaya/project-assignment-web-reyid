import React, { FC, useState } from 'react';
import { Box, Select, MenuItem } from "@material-ui/core";
import setLanguage from "next-translate/setLanguage";

const TopNavbar: FC = () => {
  const [lang, setLang] = useState('English');

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  return (
    <Box component="div" pl={10} pr={10} mt={0} mb={0} style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
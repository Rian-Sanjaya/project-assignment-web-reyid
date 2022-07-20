import React, { FC } from 'react';
import Link from 'next/link';
import { Box } from "@material-ui/core";

const TopNavbar: FC = () => {
  return (
    <Box component="div"  pl={10} pr={10} pt={1} pb={1} style={{ backgroundColor: '#FFF', display: 'flex', flexWrap: 'wrap' }}>
      <div style={{ display: 'inline-block', width: '167px', marginRight: '40px' }}>
        <img src="/images/logo_navbar.png" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div style={{ margin: 'auto 0', textAlign: 'center', marginRight: '40px' }}>
        <Link href="/pokemon">
          <a style={{ textDecoration: 'none', fontSize: '16px', lineHeight: '24px', color: '#E6AB09' }}>Home</a>
        </Link>
      </div>
      <div style={{ margin: 'auto 0', textAlign: 'center' }}>
        <Link href="/pokemon/detail/1">
          <a style={{ textDecoration: 'none', fontSize: '16px', lineHeight: '24px', color: '#42494D' }}>Pokemon Type</a>
        </Link>
      </div>
    </Box>
  )
}

export default TopNavbar;
import React, { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <>
      <div>Navbar</div>
      <main>{children}</main>
    </>
  )
}

export default Layout;
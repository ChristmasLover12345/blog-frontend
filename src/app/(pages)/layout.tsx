import NavbarComponent from '@/Components/NavbarComponent';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavbarComponent />
      {/* The pages are the children within our layout */}
        {children}
    </div>
  )
}

export default layout
import { doLogout } from '@/actions/authentication'
import React from 'react'

const Logout = ({children}:{children:React.ReactNode}) => {
  return (
    <form action={doLogout}>
      <button type="submit">{children}</button>
    </form>
  )
}

export default Logout
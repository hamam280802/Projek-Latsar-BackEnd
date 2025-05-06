import React from 'react'

const Page = ({searchParams,}: {searchParams: {[key: string]: string | string[] | undefined;};}) => {
  const activationToken = searchParams["verify"] ?? "";
  return (
    <div>page</div>
  )
}

export default Page
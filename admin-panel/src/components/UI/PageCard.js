import React from 'react'

const PageCard = (props) => {
  return (
    <div className='m-2 p-2 rounded-3xl bg-white md:m-10 md:p-10'>
      {props.children}
    </div>
  )
}

export default PageCard

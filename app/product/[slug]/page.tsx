import React from 'react'

const page = ({params}:{
    params:{ slug: string }
}) => {
  return (
    <div>
      my proudct :{params.slug}
    </div>
  )
}

export default page

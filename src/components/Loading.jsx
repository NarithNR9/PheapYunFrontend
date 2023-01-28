import { MDBSpinner } from 'mdb-react-ui-kit'
import React from 'react'

const Loading = ({size}) => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <MDBSpinner grow className='mx-2' color='info' style={{height: size, width: size}}>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
      <div className='text-primary fs-2 mt-2' role='status'>
          <span className=''>Loading...</span>
        </div>
    </div>
  )
}

export default Loading

import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBCardOverlay,
} from 'mdb-react-ui-kit'

export default function MovieCard({ movieProp }) {
  return (
    <MDBCard
      className='mx-2 text-white'
      style={{ backgroundColor: '#424242' }}
    >
        <MDBCardImage
          src={movieProp?.imageUrl}
          alt='...'
          position='top'
        />

      <MDBCardBody className='p-0 py-2 ps-2 fs-5 mt bg-primaryk' style={{ backgroundColor: '#424242', fontFamily: 'Khmer OS Siemreap'}}>
        <MDBCardText>{movieProp?.title}</MDBCardText>
      </MDBCardBody>
      <MDBCardOverlay className='p-0 d-flex justify-content-end align-items-end pb-5 pe-1'>
        EP {movieProp?.episodes.length}
      </MDBCardOverlay>
    </MDBCard>
  )
}

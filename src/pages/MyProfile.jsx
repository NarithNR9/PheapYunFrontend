import { useEffect } from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit'
import { useSelector, useDispatch } from 'react-redux'
import { update, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

export default function MyProfile() {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC

    if (isError) {
      toast.error(message)
    }

    // redirect when logged in
    if (isSuccess) {
      toast.success(message)
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const handleEdit = () => {
    const username = document.getElementById('username')
    username.removeAttribute('disabled')
    username.focus()
    document.getElementById('btnSave').classList.remove('disabled')
  }

  const handleSave = () => {
    let updateData = {
      ...user,
      username: document.getElementById('username').value,
    }
    dispatch(update(updateData))
  }

  return (
    <section className='vh-50' style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className='py-5 h-100'>
        <MDBRow className='justify-content-center align-items-center h-100'>
          <MDBCol lg='6' className='mb-4 mb-lg-0'>
            <MDBCard className='mb-3' style={{ borderRadius: '.5rem' }}>
              <MDBRow className='g-0'>
                <MDBCol
                  md='4'
                  className='gradient-custom text-center text-white'
                  style={{
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                  }}
                >
                  {!user.imageUrl ? (
                    <MDBCardImage
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'
                      alt='Avatar'
                      className='my-5'
                      style={{ width: '80px' }}
                      fluid
                    />
                  ) : (
                    <MDBCardImage
                      src={user.imageUrl}
                      className='my-5 rounded-circle'
                      style={{ width: '80px' }}
                      alt='photo'
                      fluid
                    />
                  )}

                  <MDBTypography tag='h5' className='text-uppercase'>
                    {user.username}
                  </MDBTypography>
                  <MDBCardText>Movie Lover</MDBCardText>
                </MDBCol>
                <MDBCol md='8'>
                  <MDBCardBody className='p-4'>
                    <MDBRow className='pt-1'>
                      <MDBCol size='6' className='mb-3'>
                        <MDBTypography tag='h6'>Username</MDBTypography>
                        <input
                          type='text'
                          className='text-muted'
                          id='username'
                          style={{ borderStyle: 'hidden' }}
                          size='30'
                          // value={user.username}
                          placeholder={user.username}
                          disabled
                        />
                      </MDBCol>
                    </MDBRow>

                    <hr className='mt-0 mb-4' />
                    <MDBRow className='pt-1'>
                      <MDBCol size='6' className='mb-3'>
                        <MDBTypography tag='h6'>Email</MDBTypography>
                        <input
                          className='text-muted'
                          id='email'
                          style={{ borderStyle: 'hidden' }}
                          size='30'
                          value={user.email}
                          disabled
                        />
                      </MDBCol>
                    </MDBRow>

                    <hr className='mt-0 mb-4' />
                    <MDBRow className='pt-1'>
                      <MDBCol size='6' className='mb-3'>
                        <MDBTypography tag='h6'>Favourite Movies</MDBTypography>
                        <MDBCardText className='text-muted'>12</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <hr className='mt-0 mb-4' />

                    <div className='d-flex justify-content-between align-items-center'>
                      <span className='text-primary hover' onClick={handleEdit}>
                        Edit <MDBIcon far icon='edit' />
                      </span>
                      <div
                        className='btn btn-success disabled'
                        id='btnSave'
                        onClick={handleSave}
                      >
                        Save Changes
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )
}

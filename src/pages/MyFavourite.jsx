import React, { useState } from 'react'
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png',
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png',
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png',
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png',
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png',
  },
]

const MyFavourite = () => {
  const movies = [
    {
      id: 'gary',
      title: 'Gary Goodspeed',
      thumb: '/images/gary.png',
    },
    {
      id: 'cato',
      title: 'Little Cato',
      thumb: '/images/cato.png',
    },
    {
      id: 'kvn',
      title: 'KVN',
      thumb: '/images/kvn.png',
    },
  ]

  const [characters, updateCharacters] = useState(finalSpaceCharacters)

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    updateCharacters(items)
  }

  return (
    <div className='container my-1 table-responsive'>
      <h4 className='d-flex justify-content-center '>My Favourite</h4>
      <table className='table table-primary mb-1 '>
        <thead>
          <tr>
            <th className='pe-0' scope='col'>#</th>
            <th scope='col'>Image</th>
            <th scope='col'>Title</th>
            <th scope='col'>Episodes</th>
          </tr>
        </thead>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='movies'>
            {(provided) => (
              <tbody
                className='table-secondary'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <tr
                          className='align-middle fs-6'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <th className='pe-0' scope='row'>{index + 1}</th>
                          <td>
                            <a href='google.com'>
                            <img
                              src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/1F8BA77CA0BFA2D189B1C4E41A6BC9E19D0A4B5D56B46F71E2FA6CA3AEBEEB5C/badging?width=800&aspectRatio=1.78&format=jpeg&label=staroriginal'
                              alt=''
                              style={{ height: '100px' }}
                            /></a>
                          </td>
                          <td>{name}</td>
                          <td>12</td>
                        </tr>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      <div className='d-flex justify-content-end'>
        <div className='btn btn-success'>Save Change</div>
      </div>
    </div>
  )
}

export default MyFavourite

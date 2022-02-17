import React from 'react'

const Table = (props) => {

  return (
    <table border={2}>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Year</th>
                      <th>Feedback</th>
                    </tr>
                    {
                      props.participants.map(participant => {
                        return (
                          <tr>
                            <td>{participant.id}</td>
                            <td>{participant.name}</td>
                            <td>{participant.year}</td>
                            <td>{participant.feedback}</td>
                          </tr>
                        )
                      })
                    }
          </table>
  )
}

export default Table
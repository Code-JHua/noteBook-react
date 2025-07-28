import React from 'react'
import { useParams } from 'react-router-dom'

export default function NoteList() {
  const params = useParams()
  const category = params.category
  return (
    <div>
      <h1>{category}</h1>
    </div>
  )
}

import React from 'react'
import axios from '../../api'
import style from './index.module.less'

export default function NoteClass() {
  axios.get('/user/test').then(res => {
    console.log(res);
  })
  return (
    <div>
      <h1>NoteClass</h1>
    </div>
  )
}

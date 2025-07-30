import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import axios from '../../api'
import { useParams } from 'react-router'

export default function NoteDetail() {
  const [noteDetail, setNoteDetail] = useState({})
  const id = useParams().id
  const user = JSON.parse(localStorage.getItem('user'))


  const getdata = async () => {
    axios.get(`/findNoteDetailById?id=${id}`).then(res => {
      // console.log(res.data)
      setNoteDetail(res.data[0])
    })
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <div className={styles['note-detail']}>
      <div className={styles['note-img']}>
        <img src={noteDetail.note_img} alt="" />
      </div>
      <div className={styles['note-content']}>
        <div className={styles['tab']}>
          <span className={styles['note_type']}>{noteDetail.note_type}</span>
          <span className={styles['author']}>作者：{user.nickname}</span>
        </div>
        <p className={styles['title']}>{noteDetail.note_title}</p>
        <div className={styles['content']}>{noteDetail.note_content}</div>
      </div>
    </div>
  )
}

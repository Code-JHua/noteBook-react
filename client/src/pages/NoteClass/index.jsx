import React from 'react'
import axios from '../../api'
import styles from './index.module.less'
import { WapNav, Edit, LikeO, Search } from '@react-vant/icons'
import Menu from '../../components/Menu'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NoteClass() {

  // axios.get('/user/test').then(res => {
  //   console.log(res);
  // })

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const noteClassList = [
    { title: '美食', id: 1 },
    { title: '旅行', id: 2 },
    { title: '恋爱', id: 3 },
    { title: '学习', id: 4 },
    { title: '吵架', id: 5 },
  ]

  const goNoteList = (title) => {
    navigate(`/noteList/${title}`)
  }

  return (
    <div className={styles['note-class-wrapper']}>
      <div className={[`${styles['note-class']}`, `${showMenu ? styles['hide'] : ''}`].join(' ')}>
        <header>
          <div>
            <WapNav className={styles['icon']} onClick={() => setShowMenu(!showMenu)} />
          </div>
          <div>
            <Edit className={styles['icon']}  onClick={() => navigate('/notePublish')}/>
            <LikeO className={styles['icon']} />
            <Search className={styles['icon']} />
          </div>
        </header>
        <section>
          {
            noteClassList.map(item => {
              return (
                <div key={item.id}
                  className={styles['note-class-item']}
                  style={{ backgroundColor: randomColor() }}
                  onClick={() => goNoteList(item.title)}
                >
                  <span className={styles['note-class-item-title']}>{item.title}</span>
                </div>
              )
            })
          }
        </section>
      </div>
      <div className={[`${styles['menu']}`, `${showMenu ? styles['show'] : ''}`].join(' ')}>
        <Menu setShowMenu={setShowMenu} />
      </div>
    </div>
  )
}

// 随机颜色,颜色偏亮色系 
const randomColor = () => {
  const base = 100
  const r = Math.floor(Math.random() * 100) + base
  const g = Math.floor(Math.random() * 100) + base
  const b = Math.floor(Math.random() * 100) + base
  return `rgb(${r}, ${g}, ${b})`
}


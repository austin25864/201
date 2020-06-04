import React, { useState, useEffect } from 'react'
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'

function App() {
  // todos列表
  // todo = { id: 123213, text:'買牛奶', completed: false }
  const [todos, setTodos] = useState([
    { id: 1591256594282, text: '買牛奶', completed: false },
    { id: 1591256594281, text: '買iphone', completed: false },
    { id: 1591256594283, text: '學react', completed: false },
  ])

  // 用於文字輸入框輸入新的todo
  const [text, setText] = useState('')

  // 利用id值尋找符合的todos裡的index，然後改變completed
  const handleCompleted = (id) => {
    const newTodos = [...todos]

    const todoItemIndex = todos.findIndex((v, i) => v.id === id)

    if (todoItemIndex !== -1) {
      newTodos[todoItemIndex].completed = !newTodos[todoItemIndex].completed
      setTodos(newTodos)
    }
  }

  return (
    <>
      <MyNavbar />
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <h1 className="mt-5">待辨事項</h1>
          <hr />

          {/* 可控表單元素必要條件: 
                1. value對應state值
                2. onChange事件對應setState(setXXX)改變值的方法 */}

          <div className="form-group">
            <label htmlFor="todoInput">輸入待辨事項</label>
            <input
              id="todoInput"
              className="form-control"
              type="text"
              value={text}
              onChange={(event) => {
                setText(event.target.value)
              }}
              onKeyPress={(event) => {
                // 處理按下 Enter鍵
                if (event.key === 'Enter' && event.target.value !== '') {
                  // 建立一個新的todo項目
                  const newTodoItem = {
                    id: +new Date(),
                    text: event.target.value,
                    completed: false,
                  }

                  // 建立新的todos陣列
                  const newTodos = [newTodoItem, ...todos]

                  // 設定新的todos，變動呈現的列表
                  setTodos(newTodos)

                  // 清空文字輸入框
                  setText('')
                }
              }}
            />
          </div>
          <div>
            <ul className="list-group">
              {todos.map((value, index) => {
                // 利用id即為加入的時間日期
                const date = new Date(value.id)

                // 依照completed刪除掉，或改變render的樣式
                if (value.completed) {
                  return (
                    <li
                      key={value.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span style={{ color: 'red' }}>
                        <del>{value.text}</del>
                      </span>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          handleCompleted(value.id)
                        }}
                      >
                        取消完成
                      </button>
                      <span className="badge badge-primary badge-pill">
                        ⌚{date.toLocaleString()}
                      </span>
                    </li>
                  )
                }

                // 列表項目(子元素)需要唯一的key值(id值的意思)
                return (
                  <li
                    key={value.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {value.text}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        handleCompleted(value.id)
                      }}
                    >
                      完成
                    </button>
                    <span className="badge badge-primary badge-pill">
                      ⌚{date.toLocaleString()}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </main>
      <MyFooter />
    </>
  )
}

export default App

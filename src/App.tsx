import { A, Route, Routes } from '@solidjs/router'
import { Component, lazy } from 'solid-js'
import { TodoProvider } from './context/TodoContext'

const Home = lazy(() => import('./pages/Home'))
const TodoDetail = lazy(() => import('./pages/TodoDetail'))
const WithNavbar = lazy(() => import('./components/Navbar/WithNavbar'))


const App: Component = () => {
  return (
    <div>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<WithNavbar><Home /></WithNavbar>} />
          <Route path="/todo/:id" element={<WithNavbar><TodoDetail /></WithNavbar>} />
          <Route path="*" element={<div><h1>404 Not found</h1><p><A href="/">Go to Home</A></p></div>} />
        </Routes>
      </TodoProvider>
    </div>
  )
}

export default App

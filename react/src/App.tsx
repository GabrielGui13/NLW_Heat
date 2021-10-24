import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import styles from './styles/App.module.scss'

//css modules => melhor por adicionar escopo as classes e estilizacoes do css

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessageList/>
      <LoginBox/>
    </main>
  )
}

export default App

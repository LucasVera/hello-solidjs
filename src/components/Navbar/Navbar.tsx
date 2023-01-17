import { A } from '@solidjs/router'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (<div class={styles.container}>
    <p>Logo here</p>
    <A href='/'>Home</A>
    {/* <A href='/'>About</A> */}
  </div>)
}

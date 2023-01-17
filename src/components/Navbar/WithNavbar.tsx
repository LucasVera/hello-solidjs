import { JSXElement } from "solid-js"
import Navbar from "./Navbar"

export interface WithNavbarProps {
  children?: JSXElement
}

export default function WithNav(props: WithNavbarProps) {
  return <>
    <Navbar />
    {props.children}
  </>
}
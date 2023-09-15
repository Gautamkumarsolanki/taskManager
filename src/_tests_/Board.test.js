import { render, screen } from "@testing-library/react"
import Board from '../components/Board'
import App from "../App"


test('App routes',()=>{
    render(<App/>)
    screen.debug();
})
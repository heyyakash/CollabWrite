import {render,screen} from "@testing-library/react"
import Home from '../pages/index'

describe('Home', ()=>{
    it('Should have login link',()=>{
        render(<Home />) //Arange
        const myElem = screen.getByRole('link', {name:'Login'}) //ACT
        expect(myElem).toBeInTheDocument() //ASSERT
    })

    it('Should contain the brand logo', () => {
        render(<Home />)
        const myElem = screen.getByRole('heading',{name:"CollabWrite"})
        expect(myElem).toBeInTheDocument()
    })
})


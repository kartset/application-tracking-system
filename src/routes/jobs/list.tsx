import { Box } from "@chakra-ui/react"
import Card from "../../components/card"

const List = () => {
    let arr = [1,2,3,4,5,6,7,8,9,10]
    return (<Box>{arr.map(a => {return (<Card key={a} />)})}</Box>)
}

export default List
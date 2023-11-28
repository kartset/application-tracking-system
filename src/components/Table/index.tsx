import { Flex, GridItem, Input, Text } from "@chakra-ui/react"
import Pagination from "./pagination"
import AppTable from "./table"

const TableWrapper = ({tableProps, paginationProps}:any) => {
  return (
    <GridItem overflowX={'scroll'} overflowY={'hidden'} width={'inherit'} style={{ borderRadius:'1rem', border:'1px #E3E9F0 solid', backgroundColor:'white', boxShadow: '2px 0px 2px rgba(0, 0, 0, 0.2)'}} ml={4} mr={4} mt={3} rowSpan={13}>
        <AppTable {...tableProps} />
        <Flex justifyContent={'space-between'}>
            <Flex p={3}>
                <Text wordBreak="unset">Go to:</Text>
                <Input ml={1} size='xs' rounded={'lg'} w="40px" />
            </Flex>
            <Pagination {...paginationProps} />
        </Flex>
        </GridItem>
  )
}

export default TableWrapper
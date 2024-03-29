import { 
    Box, Button, Drawer, DrawerBody, 
    DrawerContent, DrawerOverlay, Flex, 
    Grid, GridItem, Input, useDisclosure
} from "@chakra-ui/react"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import './style.css'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useId } from "react"
import { getUser } from "../../redux/reducers/appLogin"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux"
import { faker } from "@faker-js/faker"


const Layout = () => {

    const { user } = useSelector((state:RootState) => state.appLogin)
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    useEffect(() => {
        dispatch(getUser())
    }, [])
    
    return (
        Object.keys(user).length > 0 ?
            <Grid templateColumns={'repeat(12, 1fr)'} flexDirection={'row'} height={'100vh'} bgColor={'#131215'}>
                <GridItem width={'16vw'}  display={{base:'none', md:'block'}} colSpan={2}>
                    <Sidebar />
                </GridItem> 
                <GridItem width={{base:'100vw', md:'83vw'}} rounded={'2xl'} colSpan={{base:12, md:10}}>
                    <Grid 
                        rounded={{base:'none', md:'2xl'}} 
                        height={{base:'100vh', md:'95vh'}} 
                        templateRows='repeat(22, 1fr)' 
                        mt={{base:0, md:1}} 
                        mb={2} mr={{base:0,md:2}} 
                        bgColor={'#F8F8FF'}
                    >
                        <GridItem 
                            style={{ 
                                boxShadow: '0 0px 0px rgba(0, 0, 0, 0.2)'
                            }}
                            borderTopLeftRadius={{base:'none', md:'1rem'}}
                            borderTopRightRadius={{base:'none', md:'1rem'}}
                            backgroundColor={'white'} 
                            rowSpan={{base:3, md:2}}
                            width={'100%'}
                        >
                            <Navbar onOpen={onOpen} />
                        </GridItem>
                        <Outlet />
                    </Grid>
                </GridItem>
                <MobileSidebarDrawer isOpen={isOpen} onClose={onClose} />
            </Grid>
        :   <Login />
        
    )
}

export const Login = () => {

    const formSchema = Yup.object({
        username: Yup.string().required('Username or Email is required'),
        password: Yup.string().required('Password is Required')
    })

    const initialValues = {
        username: '',
        password: ''
    }

    const formId = useId()

    const navigate = useNavigate()

    const onSubmit = (values:{username:string, password:string}) => {
        localStorage.setItem('user', JSON.stringify({
            username: values.username,
            name: faker.person.fullName(),
            age: faker.person.bio(),
            email: values.username.includes('@') ? values.username : faker.internet.email(),

        }))
        navigate('/app/vacancies')
        window.location.reload()
    }

    return (
        <div className="app-login">
            <div className="card">
                <Box fontSize={'25px'} fontWeight={'extrabold'} mt={4} >Welcome</Box>
                <Box mt={4} className='brand'>AT-System</Box>
                <Formik
                    validationSchema={formSchema}
                    initialValues={initialValues}
                    onSubmit={(values) => {onSubmit(values)} }
                >
                    <Form id={formId} >
                        <Field name="username" >
                            {({field}:any) => {
                                return (
                                    <Flex mt={4} flexDirection={'column'} >
                                        <Input
                                            {...field}
                                            variant={'flushed'}
                                            placeholder="Email or Username" 
                                        />
                                        <ErrorMessage name="username" />
                                    </Flex>
                                )
                            }}
                        </Field>
                        <Field name="password" >
                            {({field}:any) => {
                                return (
                                    <Flex mt={4} flexDirection={'column'} >
                                        <Input 
                                            {...field}
                                            variant={'flushed'}
                                            placeholder="Type Password" 
                                            type="password"
                                        />
                                        <ErrorMessage name="password" />
                                    </Flex>
                                )
                            }}
                        </Field>                        
                    </Form>
                </Formik>
                <Button colorScheme='blue' mt={4} mb={4} form={formId} type="submit">
                    Login
                </Button>
            </div>
        </div>
    )
}

const MobileSidebarDrawer:React.FC<any> = ({isOpen, onClose,}) => {  
    return (
        <Drawer size={'xs'} placement={'left'} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bg={'#2A2B2D'} >
            <DrawerBody>
                <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
    )
  }

export default Layout
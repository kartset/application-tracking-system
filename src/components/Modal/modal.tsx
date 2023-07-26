import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Heading,
  } from '@chakra-ui/react'
import GoogleLoginWrapper from '../Google-Login'

const NavModal:React.FC<any> = ({modalTitle, isOpen, onClose}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Heading style={{textAlign:'center'}} mt={8} mb={8} as={'h2'} size={'md'}>{modalTitle}</Heading>
                    <GoogleLoginWrapper />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default NavModal
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Heading,
    ModalHeader,
  } from '@chakra-ui/react'
import GoogleLoginWrapper from '../Google-Login'
import Login from '../Form/Login'
import CandidateApplicationForm from '../Form/CandidateApplicationForm'

const NavModal:React.FC<any> = ({modalTitle, isOpen, onClose}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Heading style={{textAlign:'center'}} mt={8} mb={8} as={'h2'} size={'md'}>{modalTitle}</Heading>
                    <GoogleLoginWrapper onClose={onClose} />
                    <Login modalTitle={modalTitle} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export const ApplyModal:React.FC<any> = ({modalTitle, isOpen, onClose}) => {
  return (
        <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader style={{textAlign:'center'}} mt={1} mb={1}>
                    {modalTitle}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <CandidateApplicationForm isOpen={isOpen} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
  )
}

export default NavModal
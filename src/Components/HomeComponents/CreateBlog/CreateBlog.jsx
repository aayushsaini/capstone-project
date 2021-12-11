import React, { useState, useContext } from 'react'
import { Input, Textarea } from '@chakra-ui/react'
import "./CreateBlog.scss"
import mainContext from '../../../Context/MainContext';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody, 
    Box,
    FormLabel,
    ModalCloseButton,useDisclosure, Button
  } from '@chakra-ui/react'

const CreateBlog = () => {

    const context = useContext(mainContext);
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const author = context.userData.userName;
    const authorImg = context.userData.userPic;

    // const [author, setAuthor] = useState(context.userData.userName);
    // const [authorImg, setAuthorImg] = useState(context.userData.photoUrl)

    function handleSubmit(e) {
        e.preventDefault();
        const blog = { title, body, author, authorImg };
        fetch('https://my-garden-public-data.herokuapp.com/blogs', {
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            alert("Blog Posted 🎉");
            onClose();
            context.blogRefresh();
        })
    }

    return (
        <Box p={4} className="modal">
            <div className="intro">
                <button className="button" onClick={onOpen}>Write your own blog</button>
            </div>
           

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay/>
                <ModalContent bgColor="#fff" color="black" >
                    <form onSubmit={handleSubmit}>
                        <ModalHeader pt={5} mb={2} mx={0} maxW="20vw" maxH="7vh" minW="20vw" minH="7vh">Write your blog ✍️</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormLabel>Blog Title</FormLabel>
                            <Input color="#282828" 
                                placeholder='Type title...' 
                                style={{'border':'2.5px solid #a6d6cb'}}
                                value={title}
                                onChange={(e)=> setTitle(e.target.value)} />
                            <FormLabel mt={3}>Blog body</FormLabel>
                            <Textarea color="#282828"
                                    minH="40vh" 
                                    placeholder='Type content...' 
                                    style={{'border':'2.5px solid #a6d6cb'}}
                                    value={body}
                                    onChange={(e)=> setBody(e.target.value)} />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='green' px="30px" onClick={handleSubmit}>
                            Publish Blog
                            </Button>
                        </ModalFooter>
                     </form>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default CreateBlog

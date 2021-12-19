import React, { useState, useContext } from 'react'
import './Dashboard.scss'
import { Box, Text, Spacer, Spinner } from '@chakra-ui/react'
import todBg from '../../Assets/todBg.png'
import waterPlantBg from '../../Assets/waterPlantBg.png'
import tick from '../../Assets/true.png'
import cross from '../../Assets/cross.png'
import success from "../../Assets/success.png"
import scanIcon from '../../Assets/scanIcon.png'
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom'
import userContext from '../../Context/MainContext'
import axios from "axios";
import { WarningIcon, WarningTwoIcon, CheckCircleIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody, 
    FormLabel,
    ModalCloseButton,useDisclosure
  } from '@chakra-ui/react'
  import {
    List,
    ListItem,
    ListIcon
  } from '@chakra-ui/react'


const Dashboard = (props) => {

    const history = useHistory;
    const user = useContext(userContext);

    if (user.userData.userName === "") {
        history.push('/');
    }

    const plantsData = props.data;
    const [modal, setShowModal] = useState(false);
    const [plantId, setPlantId] = useState(null);
    const [plantHealth, setPlantHealth] = useState(null);
    const [plantWater, setPlantWater] = useState(null);
    
    const handleClick = (health, water, id) => {
        setShowModal(true);
        setPlantId(id);
        setPlantHealth(health);
        setPlantWater(water);
    };

// Color for unhealthy box & Text: #F7DCDC  #DB7777
    return (
        <div className="dashboard">
            <div className="subtitle">My Plants 🪴</div>
            <div className="container">
                {plantsData && plantsData.map((plant) => {
                    return (
                        <Box key={plant.id} style={{'cursor': 'pointer'}} onClick={()=>handleClick(plant.health, plant.water, plant.id)} className="item" bgColor={plant.health==="good"?"#C7EAE3":"#C7EAE3"} minW="200px" maxW="200px" h="220px"  borderRadius="27px">
                            <img src={plant.image} className="plant-img" alt="" />
                            <Text textAlign="center" pt="10px" color={plant.health==="good"?"#57A2A2":"#57A2A2"} textTransform="capitalize" fontWeight="700">{plant.name}</Text>
                        </Box>
                    );
                })}
            </div>
            <div className="subtitle2" onClick={()=>setShowModal(false)}>Garden Care 🧑‍🌾</div>
            <div className="care-section" onClick={()=>setShowModal(false)}>
                <div className="tod">
                    <img src={todBg} alt="" className="tod-bg" />
                    <span className="tod-text">💡 Tip of the day<br /> <span className="tip">It's Better to Underwater Your Plants<br/> Than to Overwater Them.</span></span>
                </div>
                <div className="waterPlant">
                    <img src={waterPlantBg} alt="" />
                    <div className="data">
                        <div className="title">Garden Water Cycle</div>
                        <div className="day">☀️ Tommorow</div>
                        <div className="time">🕖 7:00 AM</div>
                        <br/>
                        <button onClick={() => alert("Your reminder has been set!")}>Set Reminder</button>
                    </div>
                </div>
            </div>
            {modal?<div className="bg" onClick={()=>setShowModal(false)}/>:null}
            {modal?<Modalx id={plantId} health={plantHealth} water={plantWater} />:null}
        </div>
    )
}

export const BG = () => {
    return (
        <div className="bg"></div>
    )
}

export const Modalx = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [ files, setFiles ] = useState([]);
    // const [ image, setImage ] = useState();
    // const id = props.id;
    // const health = props.health;
    const water = props.water;

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            // console.log("....",acceptedFiles);
            setFiles(
                acceptedFiles.map((file) => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    })

    const [plantHealth, setPlantHealth] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [causes, setCauses] = useState(null);
    // const [precaution, setPrecautions] = useState(null);
    const [solutions, setSolutions] = useState(null);

    const handleClick = async () => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append("file", files[0]);
        let res = await axios({
            method: "post",
            url: 'https://us-central1-potatodisease.cloudfunctions.net/predict',
            data: formData,
          });
        setPlantHealth(res.data.class);
        setConfidence(res.data.confidence);
        setCauses(res.data.Cause);
        setSolutions(res.data.Solution)
        setIsLoading(false);
    }

    return (
        <div className="modalBg">
            <div className="modal">
                <span className="health">Plant's Health <Spacer />{plantHealth?<>{plantHealth}<WarningIcon onClick={onOpen} w={5} h={5} ml={2} color="red.300" style={{'cursor':'pointer'}} /></>:(<span style={{'fontWeight':'400'}}>Upload image to test</span>)}</span>
                <span className="water">{confidence?"Confidence":"Plant Watered?"} <Spacer />{confidence?confidence:(water!==0?<img src={tick} alt="" />:<img src={cross} alt="" />) }</span>
                <center><div className="file" {...getRootProps()}><input {...getInputProps()}  />{files[0]?(<img src={success} style={{'width':'100px', 'marginLeft':'15px', 'marginTop':'20px','objectFit':'cover'}} alt="" />):(<img src={scanIcon} style={{'cursor':'pointer'}} alt="" />)}</div></center>
                <center><button onClick={handleClick}>{isLoading?(<Spinner />): "Scan My Plant"}</button></center>
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay/>
                <ModalContent bgColor="#fff" color="black" >
                    <form>
                        <ModalHeader pt={5} mb={2} mx={0} maxW="32vw" maxH="7vh" minW="20vw" minH="7vh">Quick Info: {plantHealth}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormLabel style={{'color':'#591616'}} mb={0.5}>Causes:</FormLabel>
                            {causes && causes.map((cause) => {
                                return (
                                    <List px={2}>
                                        <ListItem><ListIcon as={WarningTwoIcon} style={{'marginBottom':'3px'}} w={4} h={4} color='orange.500'/><span>{cause}</span></ListItem>
                                    </List>
                                )
                            })}
                            <FormLabel style={{'color':'#591616'}} mt={2}>Solutions:</FormLabel>
                            {solutions && solutions.map((solution) => {
                                return (
                                    <List px={2}>
                                        <ListItem><ListIcon as={CheckCircleIcon} style={{'marginBottom':'3px'}} w={4} h={4} color='green.500'/><span>{solution}</span></ListItem>
                                    </List>
                                )
                            })}
                        </ModalBody>
                        <ModalFooter>
                            <center><span style={{'fontSize':'0.7em', 'color':'lightgrey'}}>Visit Community Page For More Info</span></center>
                        </ModalFooter>
                     </form>
                </ModalContent>
            </Modal>

        </div>
    );
}

export default Dashboard

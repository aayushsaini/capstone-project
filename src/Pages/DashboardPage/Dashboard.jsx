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


    return (
        <div className="dashboard">
            <div className="subtitle">My Plants 🪴</div>
            <div className="container">
                {plantsData && plantsData.map((plant) => {
                    return (
                        <Box style={{'cursor': 'pointer'}} onClick={()=>handleClick(plant.health, plant.water, plant.id)} className="item" bgColor={plant.health==="good"?"#C7EAE3":"#F7DCDC"} minW="200px" maxW="200px" h="220px"  borderRadius="27px">
                            <img src={plant.image} className="plant-img" alt="" />
                            <Text textAlign="center" pt="10px" color={plant.health==="good"?"#57A2A2":"#DB7777"} textTransform="capitalize" fontWeight="700">{plant.name}</Text>
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
            {modal?<Modal id={plantId} health={plantHealth} water={plantWater} />:null}
        </div>
    )
}

export const BG = () => {
    return (
        <div className="bg"></div>
    )
}

export const Modal = (props) => {


    const [ files, setFiles ] = useState([]);
    // const [ image, setImage ] = useState();
    // const id = props.id;
    const health = props.health;
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

    const handleClick = async () => {
        setIsLoading(true);
        let formData = new FormData();
        formData.append("file", files[0]);
        let res = await axios({
            method: "post",
            url: '/predict',
            data: formData,
          });
        console.log("--->",res.data);
        setPlantHealth(res.data.class);
        setConfidence(res.data.confidence);
        setIsLoading(false);
    }

    // console.log(formData);

    return (
        <div className="modalBg">
            <div className="modal">
                {/* <span className="health">Plant's Health <Spacer />{health==="good"?<img src={tick} alt="" />:<img src={cross} alt="" />}</span> */}
                {/* <span className="health">Plant's Health <Spacer />{health==="good"?<img src={tick} alt="" />:<img src={cross} alt="" />}</span> */}
                <span className="health">Plant's Health <Spacer />{plantHealth?plantHealth:(<span style={{'fontWeight':'400'}}>Upload image to test</span>)}</span>
                {/* <span className="water">Plant Watered <Spacer />{water!==0?<img src={tick} alt="" />:<img src={cross} alt="" />}</span> */}
                <span className="water">{confidence?"Confidence":"Plant Watered?"} <Spacer />{confidence?confidence:(water!==0?<img src={tick} alt="" />:<img src={cross} alt="" />) }</span>
                <center><div className="file" {...getRootProps()}><input {...getInputProps()}  />{files[0]?(<img src={success} style={{'width':'100px', 'marginLeft':'15px', 'marginTop':'20px','objectFit':'cover'}} alt="" />):(<img src={scanIcon} style={{'cursor':'pointer'}} alt="" />)}</div></center>
                {/* <center>{files?<button onClick={handleClick}>Scan My Plant</button>:<button disabled>Scan My Plant</button>}</center> */}
                <center><button onClick={handleClick}>{isLoading?(<Spinner />): "Scan My Plant"}</button></center>
                {console.log(files[0])}
            </div>
        </div>
    );
}

export default Dashboard

'use client'
import { useRef, useState, useEffect } from "react";
import { HandLandmarker, FilesetResolver, DrawingUtils, PoseLandmarker, DrawingOptions } from '@mediapipe/tasks-vision'
import videoStyles from '@/styles/main.module.css'
import * as tf from '@tensorflow/tfjs';
import { setupWebcamVideo } from '@/utils/cameraUtils'
import { createLandmarker, processData } from '@/utils/mediapipeUtils'
import styles from '@/styles/train.module.css'
import { notifications } from '@mantine/notifications'
import { TextInput, Group, Button, Autocomplete, Grid,NativeSelect } from '@mantine/core';


const TrainPage = () => {
    // useState declarations
    const [mediaStream, setMediaStream] = useState(null);
    const [detectStart, setDetectStart] = useState(false)
    const [results, setResults] = useState({})
    const [label, setLabel] = useState("control")
    const [videoInputLabel, setVideoInputLabel] = useState("")
    const [videoInputLabelList, setVideoInputLabelList] = useState([])
    const [inputDevice, setInputDevice] = useState([])

    //third party hooks
    // const matches = useMediaQuery('(min-width: 56.25em)');

    // reference declarations
    const videoRef = useRef(null);
    const canvasRef = useRef(null)
    const inputDeviceId = useRef(null)
    const detectInterval = useRef(null)

    /**
     * @type {HandLandmarker}
     */
    var handLandmarker = useRef(null)
    /**
     * @type {PoseLandmarker}
     */
    var poseLandmarker = useRef(null)

    //urls
    const modelUrl = 'localstorage://model'

    // medaipipe declarations
    const runningMode = "VIDEO";


    const setMediaDevices = (recursion = 0) => {
        if (recursion > 5) {
            notifications.show({
                message: `Camera can't be moounted. Please allow camera or reload the page`,
                withCloseButton: true,
                title: "Please give permission ",
                color: "red",
            })
            return
        }
        try {
            navigator.permissions.query({ name: 'camera' }).then(res => {
                console.log(res.state)
                if (res.state === 'prompt') {
                    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                        stream.getVideoTracks().forEach((track) => {
                            track.stop();
                        });
                    });
                    setTimeout(() => setMediaDevices(recursion + 1), 1000)
                } else if (res.state === 'denied') {
                    notifications.show({
                        message: `Camera can't be moounted. Please allow camera or reload the page`,
                        withCloseButton: true,
                        title: "Please give permission",
                        color: "red",
                    })
                } else {
                    navigator.mediaDevices.enumerateDevices().then(devices => {
                        setInputDevice(devices)
                    })
                }
            })
        } catch (e) {
            notifications.show({
                message: `Camera can't be moounted. Please allow camera or reload the page`,
                withCloseButton: true,
                title: "Please give permission",
                color: "red",
            })
        }
    }

    useEffect(() => {
        setMediaDevices()
        createLandmarker(runningMode).then(([handLandmarkerOpt, poseLandmarkerOpt]) => {
            handLandmarker.current = handLandmarkerOpt
            poseLandmarker.current = poseLandmarkerOpt
        });
    }, []);


    useEffect(() => {
        let videoDeviceListTemp = []
        for (let value of inputDevice) {
            if (value.label && value.kind === 'videoinput') {
                videoDeviceListTemp.push(value.label)
            }
        }
        console.log(videoDeviceListTemp[0])
        setVideoInputLabelList(videoDeviceListTemp)
        setVideoInputLabel(videoDeviceListTemp[0])
    }, [inputDevice])

    useEffect(() => {
        if (inputDevice.length) {
            inputDeviceId.current = inputDevice.filter((value, index) => value.label == videoInputLabel)[0].deviceId
        }
    }, [videoInputLabel])


    const releaseCamera = () => {
        if (videoRef.current) {
            if (videoRef.current.srcObject) {
                console.log("IN RELEASE CAMERA")
                videoRef.current.srcObject.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        }
        setMediaStream(null)
    }

    const detect = async () => {
        if (!handLandmarker.current) return
        if (!poseLandmarker.current) return
        try {
            console.log("In detect")

            const canvasContext = canvasRef.current.getContext('2d')
            canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

            const handLandmarkResult = handLandmarker.current.detectForVideo(videoRef.current, performance.now())
            const poseLandmarkResult = poseLandmarker.current.detectForVideo(videoRef.current, performance.now())

            const dw = new DrawingUtils(canvasContext)
            if (handLandmarkResult.landmarks) {
                for (const landmarks of handLandmarkResult.landmarks) {
                    dw.drawLandmarks(landmarks)
                }
            }
            if (poseLandmarkResult.landmarks) {
                for (const landmarks of poseLandmarkResult.landmarks) {
                    dw.drawLandmarks(landmarks)
                }
            }
            const [finalData, gotData] = processData(poseLandmarkResult, handLandmarkResult)
            if (gotData) {
                if (finalData.length != 225) {
                    console.warn("ERROR in length")
                    return
                }
                console.log(results, label, finalData.length)
                results[label].push(finalData)
                setResults(results)
            }
        } catch (e) {
            console.warn(e)
            return
        }
    }

    const startDetect = () => {
        const d = true
        setupWebcamVideo(mediaStream, setMediaStream, videoRef, inputDeviceId.current).then(() => {
            const int = setInterval(() => detect(), 100)
            detectInterval.current = int
        });
        setDetectStart(d)
    }

    const stopDetect = () => {
        console.log(results)
        const d = false
        console.log("In STOP detect", d)
        setDetectStart(d)
        notifications.show({
            message: `Data regarding ${label} is captured`,
            withCloseButton: true,
            title: "Data captured",
            color: "green",

        })
        setLabel("")
        clearInterval(detectInterval.current)
        detectInterval.current = null
        releaseCamera()
    }

    const detectHandler = () => {
        if (!label) {
            notifications.show({
                message: "Label cannot be empty",
                withCloseButton: true,
                title: "Error",
                color: "red",

            })
            return
        }
        if (!results[label]) {
            results[label] = []
        }
        console.log(results)
        startDetect()
        setTimeout(stopDetect, 10 * 1000);
    }

    const showResults = () => {
        console.log(results,)
    }

    const saveData = () => {
        localStorage.setItem('trainData', JSON.stringify(results))
        console.log("SAVED")
        notifications.show({
            message: "Your data is saved",
            withCloseButton: true,
            title: "Data Saved",
            color: "green",

        })
        return
    }

    const clearMemoryData = () => {
        setResults({})
        notifications.show({
            message: "Cleared Data from Memory",
            withCloseButton: true,
            title: "Data cleared",
            color: "yellow",

        })
    }

    const clearDiskData = () => {
        localStorage.removeItem('trainData')
        notifications.show({
            message: "Cleared Data from Disk",
            withCloseButton: true,
            title: "Data cleared",
            color: "yellow",

        })
    }
    return (
        <>
            <h1 onClick={showResults} className={styles.title}>Collect data to train your model</h1>
            <p>Train your own model to recognise your personalized signs. Training your own model will also result in better recognition of your body style.</p>
            <p>NOTE: - You must record &lsquo; control&rsquo; sign to make the model work.&lsquo;control&rsquo; sign is just standing still or not showing any sign.</p>
            <p>After clicking on start capturing, it will stop after 10seconds. If you want to capture more data, click the button again with the same label name.</p>
            <p>You need to save the data before proceeding to model train page</p>
            <Group justify="space-around" p={"md"}>
                <Autocomplete
                    label="Sign Name"
                    placeholder="Enter the sign name"
                    data={Object.keys(results)}
                    value={label}
                    onChange={setLabel}
                />
                <Button onClick={detectHandler} variant="filled" radius={"md"}>{detectStart ? "Capturing" : "Start Capturing"}</Button>
                <Button onClick={saveData} variant="filled" radius={"md"}>Save Data</Button>
            </Group>
            <Group justify="center" p={"md"}>
                <Button onClick={clearMemoryData}>Clear Data (from Momory)</Button>
                <Button onClick={clearDiskData}>Clear Data (from Disk)</Button>
                <NativeSelect
                    value={videoInputLabel}
                    onChange={(event) => setVideoInputLabel(event.currentTarget.value)}
                    data={videoInputLabelList}
                />
            </Group>
            <Grid grow>
                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                    <div className={videoStyles.videoPlayer}>
                        <video className="h-full w-full mx-auto" ref={videoRef} autoPlay muted />
                        <canvas ref={canvasRef}></canvas>
                    </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                    <h2 className={styles.capturedTitle}>Captured Data Points(s)</h2>
                    <div>
                        {Object.keys(results).map((val, index) => {
                            return <p key={val + index}>{val}:{results[val].length}</p>
                        })}
                    </div>
                </Grid.Col>
            </Grid >

        </>
    );
}

export default TrainPage
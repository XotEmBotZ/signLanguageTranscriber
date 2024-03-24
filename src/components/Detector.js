'use client'
import { useRef, useState, useEffect } from "react";
import { HandLandmarker, FilesetResolver, DrawingUtils, PoseLandmarker, DrawingOptions, PoseLandmarkerResult } from '@mediapipe/tasks-vision'
import styles from '@/styles/main.module.css'
import * as tf from '@tensorflow/tfjs';
import { setupWebcamVideo } from '@/utils/cameraUtils'
import { createLandmarker, processData } from '@/utils/mediapipeUtils'
import { Checkbox, Button, Group, AppShell, NativeSelect, Flex } from '@mantine/core';
import { notifications } from "@mantine/notifications";


export default function Detector() {
  // useState declarations
  const [errorMsg, setErrorMsg] = useState("")
  const [mediaStream, setMediaStream] = useState(null);
  const [detectStart, setDetectStart] = useState(false)
  const [sentenceOpt, setSentenceOpt] = useState("Not initialized")
  const [useCustomModel, setUseCustomModel] = useState(false)
  const [videoInputLabel, setVideoInputLabel] = useState("")
  const [videoInputLabelList, setVideoInputLabelList] = useState([])
  const [inputDevice, setInputDevice] = useState([])

  // reference declarations
  const videoRef = useRef(null);
  const canvasRef = useRef(null)
  const prediction = useRef([])
  const sentence = useRef([])
  const inputDeviceId = useRef(null)

  //urls
  const modelUrl = 'localstorage://model'

  // medaipipe declarations
  const runningMode = "VIDEO";

  //model storage
  /**
   * @type {React.MutableRefObject<tf.GraphModel>}
   */
  let model = useRef(null)
  /**
   * @type {React.MutableRefObject<HandLandmarker>}
   */
  let handLandmarker = useRef(null)
  /**
   * @type {React.MutableRefObject<PoseLandmarker>}
   */
  let poseLandmarker = useRef(null)

  /**
   * @type {React.MutableRefObject<Array>}
   */

  const defaultLables = ['control', 'yes', 'no', 'thankYou', 'hello', 'iLoveYou', 'peace', 'please',]
  const lables = useRef(defaultLables)

  const intervalId = useRef(null)

  const detect = async () => {
    if (!handLandmarker.current) return
    if (!poseLandmarker.current) return
    try {

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
      if (gotData && model.current) {
        const index = tf.tidy(() => {
          const resTensor = tf.tensor2d([finalData])
          const res = model.current.predict(resTensor)
          return (res.flatten().argMax().dataSync()[0])
        })
        if (prediction.current.length > 5) {
          prediction.current.shift()
        }
        if (sentence.current.length > 10) {
          sentence.current.shift()
        }
        prediction.current.push(lables.current[index])
        if (new Set(prediction.current).size == 1 && sentence.current[sentence.current.length - 1] != prediction.current[0] && prediction.current[0] != "control") {
          // console.clear()
          sentence.current.push(prediction.current[0])
          console.log(prediction.current[0], sentence.current)
          setSentenceOpt(sentence.current.join(" "))
        }
        // console.log(prediction.current)
      }
    } catch (e) {
      console.warn(e)
      return
    }
  }

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      setInputDevice(devices)
    })
    return ()=>{
      clearInterval(intervalId.current)
      releaseCamera()
    }
  }, [])

  useEffect(() => {
    createLandmarker(runningMode).then(([handLandmarkerOpt, poseLandmarkerOpt]) => {
      handLandmarker.current = handLandmarkerOpt
      poseLandmarker.current = poseLandmarkerOpt
    });
    if (localStorage.getItem("customLabel")) {
      console.log("Start loading custom model")
      tf.loadLayersModel("localstorage://customModel").then(modelOpt => {
        console.log("Custom model loaded")
        model.current = modelOpt
        lables.current = JSON.parse(localStorage.getItem("customLabel"))
        setUseCustomModel(true)
      })
    } else if (localStorage.getItem("tensorflowjs_models/model/info")) {
      tf.loadGraphModel(modelUrl).then(modelOpt => {
        console.log('default model loaded')
        model.current = modelOpt
      });
    } else {
      setErrorMsg("Model couldn't be loaded. Kindly refresh the page")
    }

  }, [mediaStream]);

  useEffect(() => {
    console.log("In model change effect", useCustomModel)
    if (useCustomModel) {
      tf.loadLayersModel("localstorage://customModel").then(modelOpt => {
        console.log("Custom model loaded")
        model.current = modelOpt
        lables.current = JSON.parse(localStorage.getItem("customLabel"))
        setUseCustomModel(true)
        notifications.show({
          message: `Custom Model Loaded`,
          withCloseButton: true,
          title: "Model loaded",
          color: "green",
        })
      }).catch(e => {
        notifications.show({
          message: `${e}`,
          withCloseButton: true,
          title: "Error while loading model",
          color: "red",
        })
        setUseCustomModel(false)
      })
    } else {
      tf.loadGraphModel(modelUrl).then(modelOpt => {
        console.log('default model loaded')
        model.current = modelOpt
      });
      lables.current = defaultLables
      notifications.show({
        message: `Default Model Loaded`,
        withCloseButton: true,
        title: "Model loaded",
        color: "green",
      })
    }
  }, [useCustomModel])

  useEffect(() => {
    let videoDeviceListTemp = []
    for (let value of inputDevice) {
      if (value.label) {
        videoDeviceListTemp.push(value.label)
      }
    }
    console.log(videoDeviceListTemp[0])
    setVideoInputLabelList(videoDeviceListTemp)
    setVideoInputLabel(videoDeviceListTemp[0])
  }, [inputDevice])

  useEffect(() => {
    if (inputDevice.length){
      inputDeviceId.current = inputDevice.filter((value, index) => value.label == videoInputLabel)[0].deviceId
    }
  }, [videoInputLabel])

  const toggleDetect = () => {
    try {
      const d = !detectStart
      console.log(d)
      if (d) {
        setupWebcamVideo(mediaStream, setMediaStream, videoRef, inputDeviceId.current).then(()=>{
          const int = setInterval(() => detect(), 100)
          intervalId.current = int
          console.log(int)
        });
      }
      if (!d) {
        clearInterval(intervalId.current)
        releaseCamera()
      }
      setDetectStart(!detectStart)
    } catch (e) {
      console.warn(e)
    }
  }

  const releaseCamera=()=>{
    if (videoRef.current){
      if(videoRef.current.srcObject){
        console.log("IN RELEASE CAMERA")
        videoRef.current.srcObject.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
    setMediaStream(null)
  }
  return (
    <>
      <AppShell.Navbar p="md">
        <h1>Configurations</h1>
        <Flex direction={'column'} gap={'sm'}>
          <Group>
            <Button variant="filled" onClick={toggleDetect}>{detectStart ? "Stop Detection" : "Start Detection"}</Button>
            <Checkbox
              label="Use Custom Model"
              onChange={(event) => setUseCustomModel(event.currentTarget.checked)}
              checked={useCustomModel}
            />
          </Group>
          <NativeSelect
            value={videoInputLabel}
            onChange={(event) => setVideoInputLabel(event.currentTarget.value)}
            data={videoInputLabelList}
          />
        </Flex>
      </AppShell.Navbar >
      <h1>{sentenceOpt}</h1>
      <h1>{errorMsg}</h1>
      <div className={styles.videoPlayer}>
        <video className="h-full w-full mx-auto" ref={videoRef} autoPlay muted />
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
}

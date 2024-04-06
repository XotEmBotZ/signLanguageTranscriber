'use client'
import React, { useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs';
import { notifications } from '@mantine/notifications'
import styles from "@/styles/train.module.css"
import { redirect } from 'next/navigation'
import { Button } from '@mantine/core'

const ModelTrain = () => {
    //usestate declaration
    const [dataComplaint, setDataComplaint] = useState(false)
    const [trainTestSplit, setTrainTestSplit] = useState(0.7)
    const [modelStatts, setModelStatts] = useState({})

    //Ref declaration
    const trainDataObj = useRef({})
    const inputShape = useRef(0)
    const labels = useRef([])
    /**
     * @type {React.MutableRefObject<tf.Tensor2D>}
     */
    const prepairedDataX = useRef(null)
    /**
     * @type {React.MutableRefObject<tf.Tensor1D>}
     */
    const prepairedDataY = useRef(null)
    /**
     * @type {React.MutableRefObject<tf.Sequential>}
     */
    const model = useRef(null)

    const createLables = (length, index) => {
        let arr = new Array(length).fill(0)
        arr[index] = 1
        return arr
    }

    const prepData = () => {
        let tempDataX = []
        let tempDataY = []
        labels.current = Object.keys(trainDataObj.current).sort()
        labels.current.forEach((label, index) => {
            const element = trainDataObj.current[label]
            tempDataX.push(...element)
            tempDataY.push(...new Array(element.length).fill(createLables(labels.current.length, index)))
        })
        prepairedDataX.current = tf.tensor2d(tempDataX)
        prepairedDataY.current = tf.tensor2d(tempDataY)
    }

    useEffect(() => {
        if (!localStorage.getItem('trainData')) {
            notifications.show({
                message: "Save the data from Data Collection Page",
                withCloseButton: true,
                title: "Data not found",
                color: "red",

            })
            redirect('/train/data-collection')
        }
        if (Object.keys(localStorage.getItem('trainData')).length) {
            trainDataObj.current = JSON.parse(localStorage.getItem('trainData'))
        }
        if (Object.keys(trainDataObj.current).includes('control')) {
            setDataComplaint(true)
            inputShape.current = trainDataObj.current[Object.keys(trainDataObj.current)[0]][0].length
        }
    }, [])

    const trainCallback = (epochs, logs) => {
        setModelStatts(logs)
    }

    const saveModel = () => {
        model.current.save("localstorage://customModel")
        localStorage.setItem("customLabel", JSON.stringify(labels.current))
        notifications.show({
            message: "Your custom model is saved.",
            withCloseButton: true,
            title: "Model Saved",
            color: "green",

        })
        return
    }
    const trainData = async () => {
        prepData()
        model.current = new tf.Sequential()
        model.current.add(tf.layers.dense({ units: 256, activation: 'relu', inputShape: inputShape.current }))
        model.current.add(tf.layers.dense({ units: 128, activation: "relu" }))
        model.current.add(tf.layers.dense({ units: 64, activation: "relu" }))
        model.current.add(tf.layers.dense({ units: 32, activation: "relu" }))
        model.current.add(tf.layers.dense({ units: Object.keys(trainDataObj.current).length, activation: "softmax" }))
        model.current.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['categoricalAccuracy'] })
        model.current.summary()

    }
    return (<>

        <h1 className={styles.title}>Collect data to train your model</h1>
        {Object.keys(trainDataObj.current).length ? <p>You have collected data in <span>{Object.keys(trainDataObj.current).join(", ")}</span>. Your custom model will only be able to detect this symbols</p> : "Loading"}
        {dataComplaint ? <></> : <p> Your data collection dosent have &lsquo;control&rsquo; which is required to train the model</p>}
        <div>
            <h3>Collected data</h3>
            {Object.keys(trainDataObj.current).map((val, index) => {
                return <p key={val + index}>{val}:{trainDataObj.current[val].length}</p>
            })}
            <h3>Model confuguration (Advance)</h3>
            <p>Input shape = {inputShape.current}</p>
            <p>Output shape = {Object.keys(trainDataObj.current).length}</p>
        </div>
        <div className={styles.inputDiv}>
            {/* <button onClick={trainData}>Train Data</button> */}
            <Button variant="filled" onClick={trainData}>Train Your Custom Model</Button>
        </div>
        <div className={styles.outputDiv}>

            <div>
                <h2 className={styles.capturedTitle}>Model Statistics</h2>
                <div>
                    <p>Loss:{(modelStatts.loss * 100).toFixed(5)}%</p>
                    <p>Accuracy:{(modelStatts.categoricalAccuracy * 100).toFixed(5)}%</p>
                </div>
            </div>
        </div>

    </>)
}

export default ModelTrain
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateVoiceRecorderModel } from "../redux/slices/appSlice";
import commonStyles from "../commonStyles";
import { Microphone, PaperPlaneTilt, Trash, X } from "@phosphor-icons/react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function VoiceRecorderModel() {
    const dispatch = useDispatch();
    const voiceRecorderRedux = useSelector(
        (state) => state.appReducers.models.voiceRecorder
    );

    // Function to voice recorder Model.
    function hanldeCloseVoiceRecorderModel(event) {
        event.preventDefault();
        dispatch(
            updateVoiceRecorderModel({
                show: false,
            })
        );
    }

    // Function to send audio recording
    function handleSendVoiceRecording(event) {
        event.preventDefault();
    }

    // Close the voice recorder model when user click on the ESC key.
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!voiceRecorderRedux.show || keyCode !== 27) {
                return;
            }

            dispatch(
                updateVoiceRecorderModel({
                    show: false,
                })
            );
        };

        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    // Audio Recorder
    const recorderControls = useAudioRecorder(
        {
            noiseSuppression: true,
            echoCancellation: true,
        },
        (err) => console.log(err) // an error occured when no audio device is found on user's system or when audio recording is not allowed.
    );

    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);

        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;

        const targetContainer = document.getElementById("audio-container");
        targetContainer.appendChild(audio);
    };

    return (
        <div
            className={`${voiceRecorderRedux.show ? "fixed" : "hidden"} fixed top-0 h-full min-h-screen w-full bg-black/90 z-999999 flex items-center justify-center px-4 py-5`}
        >
            <div className="bg-white dark:bg-smokyBlack w-full max-w-md px-10 py-8 rounded-md space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-black dark:text-white font-medium text-sm">
                        Record a message
                    </h3>

                    <button
                        className="text-black dark:text-white hover:!text-primary"
                        onClick={hanldeCloseVoiceRecorderModel}
                    >
                        <X size={24} weight="regular" />
                    </button>
                </div>

                <div
                    id="audio-container"
                    className={`flex flex-col gap-4 justify-center items-center`}
                >
                    <AudioRecorder
                        showVisualizer={true}
                        onRecordingComplete={(blob) => addAudioElement(blob)}
                        recorderControls={recorderControls}
                        downloadOnSavePress={true}
                        downloadFileExtension="mp3"
                    />
                </div>

                <form className="flex items-center gap-2">
                    <button
                        className="grow rounded-full bg-primary p-2 text-white flex items-center justify-center gap-2 hover:opacity-90"
                        onClick={handleSendVoiceRecording}
                    >
                        <PaperPlaneTilt size={24} weight="regular" />
                        <span>Send</span>
                    </button>

                    <button
                        className="grow rounded-full bg-warning dark:bg-warningLight p-2 text-white flex items-center justify-center gap-2 hover:opacity-90"
                        onClick={handleSendVoiceRecording}
                    >
                        <Trash size={24} weight="regular" />
                        <span>Delete</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VoiceRecorderModel;

import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import audioFile from "../assets/audio/file_example.mp3";
import { Pause, Play } from "@phosphor-icons/react";

function Waveform({ incoming }) {
    const waveformRef = useRef(null);
    const [waveSurfer, setWaveSurfer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");

    useEffect(() => {
        if (waveformRef.current) {
            const ws = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: "gunmetalGray",
                progressColor: `${incoming ? "#008080" : "white"}`,
                url: audioFile,
                renderFunction: (channels, ctx) => {
                    const { width, height } = ctx.canvas;
                    const scale = channels[0].length / width;
                    const step = 6;

                    ctx.translate(0, height / 2);
                    ctx.strokeStyle = ctx.fillStyle;
                    ctx.beginPath();

                    for (let i = 0; i < width; i += step * 2) {
                        const index = Math.floor(i * scale);
                        const value = Math.abs(channels[0][index]);
                        let x = i;
                        let y = value * height;

                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, y);
                        ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, true);
                        ctx.lineTo(x + step, 0);

                        x = x + step;
                        y = -y;
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, y);
                        ctx.arc(x + step / 2, y, step / 2, Math.PI, 0, false);
                        ctx.lineTo(x + step, 0);
                    }

                    ctx.stroke();
                    ctx.closePath();
                },
            });

            ws.on("ready", () => {
                const totalDuration = ws.getDuration();
                setDuration(formatTime(totalDuration));
            });

            ws.on("audioprocess", () => {
                const currentTime = ws.getCurrentTime();
                setCurrentTime(formatTime(currentTime));
            });

            ws.on("finish", () => {
                setIsPlaying(false);
                setCurrentTime(formatTime(0));
            });

            setWaveSurfer(ws);

            return () => {
                ws.destroy();
            };
        }
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handlePlayPause = (event) => {
        event.preventDefault();

        if (waveSurfer) {
            if (isPlaying) {
                waveSurfer.pause();
            } else {
                waveSurfer.play();
            }

            setIsPlaying((prev) => !prev);
        }
    };

    return (
        <div
            className={`flex flex-row items-center space-x-6 px-2 py-2 rounded-lg bg-transparent
                `}
        >
            <button
                className={`bg-primary ${!incoming && "bg-white !text-gunmetalGray"} rounded-full text-white h-16 w-16 flex items-center justify-center`}
                onClick={handlePlayPause}
            >
                {isPlaying ? (
                    <Pause size={24} weight="regular" />
                ) : (
                    <Play size={24} weight="regular" />
                )}
            </button>

            <div className="flex-grow flex flex-col space-y-4">
                <div
                    ref={waveformRef}
                    className="w-full !z-0"
                    style={{ overflow: "hidden" }}
                ></div>

                <div className="text-xs">
                    {currentTime}/{duration}
                </div>
            </div>
        </div>
    );
}

export default Waveform;

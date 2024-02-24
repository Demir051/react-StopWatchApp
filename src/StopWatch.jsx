import React, {useState , useEffect , useRef} from 'react';
import './StopWatch.css';

function StopWatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalRef.current);
        }

    }, [isRunning]);

    function start() {
        if (!isRunning) {
            setIsRunning(true);
            startTimeRef.current = Date.now();
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
    }

    function stop() {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
        }
    }

    function reset() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setElapsedTime(0);
    }

    function formatTime(milliseconds) {
        let hours = Math.floor(elapsedTime / 3600000);
        let minutes = Math.floor((elapsedTime % 3600000) / 60000);
        let seconds = Math.floor((elapsedTime % 60000) / 1000);
        let ms = Math.floor((elapsedTime % 1000) / 10);
        return `${hours}:${minutes}:${seconds}:${ms}`;
    }

    return (
        <div className='stopwatch'>
            <div className='display'>{formatTime()}</div>
            <div className='controls'>
                <button onClick={start} className='start-button'>Start</button>
                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
        </div>
    )
}

export default StopWatch;
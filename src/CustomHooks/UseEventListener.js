import {useEffect, useRef} from "react";

export default function UseEventListener(eventName, handler, element = window) {
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        // element must supports addEventListener
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        // create event listener to calls handler function stored in ref
        const eventListener = event => savedHandler.current(event);

        // add event listener
        element.addEventListener(eventName, eventListener);
        // remove event listener on cleanup
        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

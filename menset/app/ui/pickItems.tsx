"use client"
// import { useEffect, useRef } from "react";
// import { Draggable } from "@fullcalendar/interaction";
export default function PickItems() {
    // const draggableRef = useRef(null);

    // useEffect(() => {
    //     if (draggableRef.current) {
    //         new Draggable(draggableRef.current, {
    //             itemSelector: ".fc-event",
    //         });
    //     }
    // }, []);

    return (
        <div id='external-events' className='w-[200px] border-2 border-solid p-4 fixed'>

            <p>
                <strong>面接日程候補</strong>
            </p>

            <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event mt-3 p-1'>
                <div className='fc-event-main'>第一候補</div>
            </div>
            <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event mt-3 p-1'>
                <div className='fc-event-main'>第二候補</div>
            </div>
            <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event mt-3 p-1'>
                <div className='fc-event-main'>第三候補</div>
            </div>
        </div>
    )
}
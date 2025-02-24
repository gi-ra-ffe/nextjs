import React, { useEffect, useRef } from "react";
import { Draggable } from "@fullcalendar/interaction";

type Props = {
    pickItem: { id: string; title: string };
};

export const ExternalItem = ({ item }: Props) => {
    const elRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!elRef.current) return;

        const draggable = new Draggable(elRef.current, {
            eventData: () => {
                return { ...item, create: true };
            },
        });

        return () => draggable.destroy();
    });

    return (
        <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event mt-3 p-1'
            ref={elRef}>
            <div className='fc-event-main'>{item.title}</div>
        </div>
    );
};


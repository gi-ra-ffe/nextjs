"use client"

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import PickItems from '@/app/ui/pickItems';
export default function Calendar() {
    // const Draggable = FullCalendar.Draggable;
    // const containerEl = document.getElementById('external-events');
    // new Draggable(containerEl, {
    //     itemSelector: '.fc-event',
    //     eventData: function (eventEl) {
    //         return {
    //             title: eventEl.innerText
    //         };
    //     }
    // });
    return (
        <>
            <PickItems />
            <div className='ml-[240px]'>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    locale={jaLocale}
                    initialView="timeGridWeek"
                    allDaySlot={false}
                    weekends={false}
                    editable={true}
                    droppable={true}
                    businessHours={{
                        daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                    }}
                    slotMinTime="10:30:00"
                    slotMaxTime="17:00:00"
                    firstDay={1}
                    height="auto"
                    drop={function (info) {
                        info.draggedEl.parentNode.removeChild(info.draggedEl);
                    }}
                />
            </div>
        </>
    )
}
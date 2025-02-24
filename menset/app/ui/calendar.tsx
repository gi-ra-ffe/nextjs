"use client"

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import {ExternalItem} from '@/app/ui/ExternalItems';
import { useState } from 'react';
// import { useEffect, useRef, useState } from 'react';

const pickItems = [
    { id: "1", title: "第一候補", },
    { id: "2", title: "第二候補", },
    { id: "3", title: "第三候補", },
];

const selectedItems = []

export default function Calendar() {
    const startDay = new Date().toISOString().slice(0, 10);
    const endDay = new Date(Date.now() + 21 * 86400000).toISOString().slice(0, 10);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleEventReceive = () => {
        setCurrentIndex(prevIndex => prevIndex + 1); // 次の候補へ進む
        // events[]
    };

    return (
        <main className='p-[40px]'>
            <div id='external-events' className='w-[200px] border-2 border-solid p-4 fixed'>
                <p>
                    <strong>面接日程候補</strong>
                </p>
                {currentIndex < pickItems.length ? (
                    <ExternalItem item={pickItems[currentIndex]} key={pickItems[currentIndex].id} />
                ) : (
                    <p>第三希望まで選択しました</p>
                )}
                {/* {currentIndex > 0 ? (
                    <p>wahaha</p>
                ) : (
                    <>
                        <strong>選択した日時を表示します</strong>
                    </>
                )} */}
            </div>

            <div className='ml-[240px]'>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    locale={jaLocale}
                    initialView="timeGridWeek"
                    allDaySlot={false}
                    weekends={false}
                    editable={true}
                    droppable={true}
                    slotMinTime="10:30:00"
                    slotMaxTime="17:00:00"
                    firstDay={1}
                    height="auto"
                    eventReceive={handleEventReceive}
                    validRange={ {start:startDay, end:endDay}}
                />
            </div>
        </main>
    )
}
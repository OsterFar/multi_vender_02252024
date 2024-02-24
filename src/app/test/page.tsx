import React from "react";
import prisma from "@/lib/prisma";

type Slot = {
  day: string;
  slots: string[];
};
async function page() {
  const data = await prisma.sessionDetails.findMany({
    where: {
      landingPageId: 2,
    },
  });

  const slotsBooked = [
    { startTime: "20:00", endTime: "21:00", available: true },
    { startTime: "21:00", endTime: "22:00", available: true },
  ];
  const dayForDeletion = "Fri Feb 16 2024";
  data.map((item) => {
    if (Array.isArray(item.slots_details)) {
      item.slots_details.map((slot) => {
        if (slot.day === dayForDeletion) {
          slot.slots.filter((slotTime) => {
            slotsBooked.forEach((slotBooked) => {
              console.log(slotBooked.startTime);
              console.log(slotTime.split("---")[0].split("to")[0]);
              if (
                slotTime.split("---")[0].split("to")[0].trim() ===
                slotBooked.startTime.trim()
              ) {
                console.log("found");
              }
            });
          });
        }
      });
    }
  });

  const filteredData = data.map((item) => {
    if (Array.isArray(item.slots_details)) {
      const filteredSlots = item.slots_details.map((slot) => {
        if (slot.day === dayForDeletion) {
          const filteredSlotTimes = slot.slots.filter((slotTime) => {
            const startTime = slotTime.split("---")[0].split("to")[0].trim();
            return !slotsBooked.some(
              (slotBooked) => slotBooked.startTime.trim() === startTime
            );
          });
          return { ...slot, slots: filteredSlotTimes };
        }
        return slot;
      });
      return { ...item, slots_details: filteredSlots };
    }
    return item;
  });

  console.log(filteredData);
  // const filteredData = data.map((item) => {
  //   if (item.slots_details === dayForDeletion) {
  //     const filteredSlots = item.slots_details.filter((slot) => {
  //       const slotTime = slot.slots[0].split(" ")[0];
  //       const slotStartTime = slotTime.split(" to ")[0];
  //       const slotEndTime = slotTime.split(" to ")[1];
  //       const isSlotBooked = slotsBooked.some((bookedSlot) => {
  //         return (
  //           bookedSlot.startTime === slotStartTime &&
  //           bookedSlot.endTime === slotEndTime
  //         );
  //       });
  //       return !isSlotBooked;
  //     });
  //     return { ...item, slots_details: filteredSlots };
  //   }
  //   return item;
  // });
  // console.log(filteredData);
  // console.log(data);
  {
    /*
    my data is 
    [
    {
      id: 1,
      slots_details: Array(7) [
        {
          day: 'Sun Feb 11 2024',
          slots: [
            '5:00 to 6:00 --- 2024-02-11T14:14:40.996Z ', '6:00 to 7:00 --- 2024-02-11T14:14:40.996Z '
          ]
        },
        {
          day: 'Mon Feb 12 2024',
          slots: [
            '18:00 to 19:00 --- 2024-02-12T14:14:40.996Z ', '17:00 to 18:00 --- 2024-02-12T14:14:40.996Z '
          ]
        },
        {
          day: 'Tue Feb 13 2024',
          slots: [
            '21:00 to 22:00 --- 2024-02-13T14:14:40.996Z ', '18:00 to 19:00 --- 2024-02-13T14:14:40.996Z '
          ]
        },
        {
          day: 'Wed Feb 14 2024',
          slots: [
            '20:00 to 21:00 --- 2024-02-14T14:14:40.996Z ', '21:00 to 22:00 --- 2024-02-14T14:14:40.996Z '
          ]
        },
        {
          day: 'Thu Feb 15 2024',
          slots: [
            '20:00 to 21:00 --- 2024-02-15T14:14:40.996Z ', '21:00 to 22:00 --- 2024-02-15T14:14:40.996Z '
          ]
        },
        {
          day: 'Fri Feb 16 2024',
          slots: [
            '20:00 to 21:00 --- 2024-02-16T14:14:40.996Z ', '21:00 to 22:00 --- 2024-02-16T14:14:40.996Z '
          ]
        },
        {
          day: 'Sat Feb 17 2024',
          slots: [
            '20:00 to 21:00 --- 2024-02-17T14:14:40.996Z ', '21:00 to 22:00 --- 2024-02-17T14:14:40.996Z '
          ]
        }
      ],

      slot_available: 14,
      session_price: 15,
      discount: 0,
      landingPageId: 2
    }
  ]

  

*/
  }
  return <div>page</div>;
}

export default page;

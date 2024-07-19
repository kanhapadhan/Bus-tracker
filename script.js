const forwardSchedule = [
  { name: "SATPATHY", time: "06:55 - 07:15" },
  { name: "SAMLESWARI", time: "07:00 - 07:20" },
  { name: "MISHRA", time: "07:55 - 08:10" },
  { name: "PRINCE", time: "08:00 - 08:15" },
  { name: "ATULYA", time: "08:00 - 08:10" },
  { name: "SAMLESWARI (O)", time: "08:30 - 08:40" },
  { name: "TARA", time: "08:30 - 08:45" },
  { name: "BHAKTARAM", time: "08:55 - 09:15" },
  { name: "JAY MATADI", time: "10:00 - 10:20" },
  { name: "BHAGYALAXMI", time: "10:55 - 11:15" },
  { name: "SAMLESWARI (O)", time: "11:30 - 11:45" },
  { name: "CHAKADOLA", time: "11:45 - 12:10" },
  { name: "SAMLESWARI", time: "13:00 - 13:15" },
  { name: "PRINCE", time: "13:45 - 14:00" },
  { name: "SAMLESWARI (O)", time: "14:05 - 14:20" },
  { name: "BHAKTARAM", time: "16:00 - 16:20" },
  { name: "BHAKTARAM", time: "16:35 - 16:50" },
  { name: "SAMLESWARI", time: "18:30 - 18:50" }
    ];

const reverseSchedule = [
  { name: "PRINCE", time: "07:45 - 08:05" },
  { name: "SAMLESWARI", time: "07:50 - 08:10" },
  { name: "SAMLESWARI (O)", time: "08:45 - 09:05" },
  { name: "BHANUMATI", time: "08:55 - 10:10" },
  { name: "TARA", time: "10:20 - 10:35" },
  { name: "PRINCE", time: "11:15 - 11:30" },
  { name: "PANI PANI", time: "11:50 - 12:10" },
  { name: "BHAGYALAXMI", time: "12:50 - 13:05" },
  { name: "M/S NAYAK", time: "13:20 - 13:35" },
  { name: "BHAKTARAM", time: "13:50 - 14:00" },
  { name: "TARA", time: "14:55 - 15:05" },
  { name: "SAMLESWARI", time: "15:45 - 16:00" },
  { name: "JAY MATADI", time: "16:00 - 16:30" },
  { name: "PRINCE", time: "16:50 - 17:05" },
  { name: "SAMLESWARI (O)", time: "17:50 - 18:10" },
  { name: "SATPATHY", time: "19:20 - 19:30" },
  { name: "ATULYA", time: "19:50 - 20:00" }
    ];

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("current-time").innerText = formattedTime;
}


function findNextBus(timeArray,currentTimeStr) {
  const currentTime = new Date().getTime() //new Date('18 July 2024 15:00:00').getTime() //parseTime(currentTimeStr);
  const result = [];

  for (let i = 0; i < timeArray.length; i++) {
    const timeRange = timeArray[i].time;
    const [startTimeStr, endTimeStr] = timeRange.split(' - ');
    const startTime = parseTime(startTimeStr);
    const endTime = parseTime(endTimeStr);

    if (currentTime >= startTime && currentTime <= endTime) {
      timeArray[i].index = i
      result.push(timeArray[i]);
      
      if (i + 1 < timeArray.length) {
        timeArray[i + 1].index = i +1
        //console.log(timeArray[i + 1])
        result.push(timeArray[i + 1]);
      }
      return result;
    }

    if (currentTime < startTime) {
      timeArray[i].index = i
      result.push(timeArray[i]);
      return result;
    }
  }

  return result;
}


function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date().setHours(hours, minutes, 0, 0);
}



function updateNextBus() {
  const nextForwardBuses = findNextBus(forwardSchedule);
  const nextReverseBuses = findNextBus(reverseSchedule);
  //console.log(nextForwardBuses, nextReverseBuses)
  
  let nextForwardBusCards = document.querySelector(".forward-path");
  let nextReverseBusCards = document.querySelector(".reverse-path");

  // Clear existing cards
  nextForwardBusCards.innerHTML = '';
  nextReverseBusCards.innerHTML = '';

  // Update forward buses
  if (nextForwardBuses.length) {
    nextForwardBuses.forEach(bus => {
      const card = document.createElement("div");
      card.className = 'next-bus-card';
      card.innerHTML = `<span class="bus-name">${bus.name}</span><span class="time">${bus.time}</span>`;
      nextForwardBusCards.appendChild(card);
    });
  } else {
    const noBusMsg = document.createElement("div");
    noBusMsg.className = 'no-bus-msg';
    noBusMsg.innerHTML = `No forward buses arriving now.`;
    nextForwardBusCards.appendChild(noBusMsg);
  }

  // Update reverse buses
  if (nextReverseBuses.length) {
    nextReverseBuses.forEach(bus => {
      const card = document.createElement("div");
      card.className = 'next-bus-card';
      card.innerHTML = `<span class="bus-name">${bus.name}</span><span class="time">${bus.time}</span>`;
      nextReverseBusCards.appendChild(card);
    });
  } else {
    const noBusMsg = document.createElement("div");
    noBusMsg.className = 'no-bus-msg';
    noBusMsg.innerHTML = `No reverse buses arriving now.`;
    nextReverseBusCards.appendChild(noBusMsg);
  }
}


function displaySchedule() {
  const forwardScheduleElement = document.querySelector("#forward-schedule tbody");
  const reverseScheduleElement = document.querySelector("#reverse-schedule tbody");

  forwardSchedule.forEach((bus,i) => {
    const row = document.createElement("tr");
    
    /* TODO: try different method, outside this function 
    if (bus.time == findNextBus(forwardSchedule).time) {
      row.classList.add('active')
    } */
    row.id = 'forward-bus-'+i
    row.innerHTML = `<td>${bus.name}</td><td>${bus.time}</td>`;
    forwardScheduleElement.appendChild(row);
  });

  reverseSchedule.forEach((bus,i) => {
    const row = document.createElement("tr");
    if (bus.time == findNextBus(reverseSchedule).time) {
      row.classList.add('active')
    }
    row.id = 'reverse-bus-'+i
    row.innerHTML = `<td>${bus.name}</td><td>${bus.time}</td>`;
    reverseScheduleElement.appendChild(row);
  });
  
  
}
function updateActiveBus() {
  const nextForwardBuses = findNextBus(forwardSchedule);
  const nextReverseBuses = findNextBus(reverseSchedule);

  // Clear existing highlights
  document.querySelectorAll(".forward-path .next-bus-card, .reverse-path .next-bus-card").forEach(card => {
    card.classList.remove('active');
  });
  document.querySelectorAll("#forward-schedule tbody tr, #reverse-schedule tbody tr").forEach(row => {
    row.classList.remove('active');
  });

  // Highlight forward buses in table
  nextForwardBuses.forEach(({ index }) => {
    const row = document.getElementById(`forward-bus-${index}`);
    if (row) {
      row.classList.add('active');
    }
  });

  // Highlight reverse buses in table
  nextReverseBuses.forEach(({ index }) => {
    const row = document.getElementById(`reverse-bus-${index}`);
    if (row) {
      row.classList.add('active');
    }
  });
}

let radio_bar = document.querySelector('.radio-toolbar')

radio_bar.addEventListener('input',()=>{
  let checkedValue = radio_bar.querySelector('input[type=radio]:checked').value
// console.log(checkedValue)
 document.querySelectorAll('.schedule').forEach(el => el.style.display = 'none')
 document.getElementById(checkedValue+'-schedule').style.display = 'block'
})



// Update the active bus every second
setInterval(updateActiveBus, 1000);
setInterval(updateTime, 1000);
setInterval(updateNextBus, 1000);
updateTime();
updateNextBus();
displaySchedule();


function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("content");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove('active');
  }

  const tablinks = document.getElementsByClassName("nav-item");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove('active');
  }

  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}
// Format current time as HH:MM AM/PM
function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const mm = minutes.toString().padStart(2, '0');
  return `${hours}:${mm} ${ampm}`;
}

// Set “Last updated” timestamp on load
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lastUpdated').textContent =
    'Last updated: ' + formatTime(new Date());
});

// Nav link placeholders
document.getElementById('navHistory').addEventListener('click', e => {
  e.preventDefault();
  alert('Navigate to History view');
});
document.getElementById('navSettings').addEventListener('click', e => {
  e.preventDefault();
  alert('Navigate to Settings view');
});




/*TQ4.2*/

const topRow = document.getElementById('top-row');
const middleRow = document.getElementById('middle-row');
const bottomRow = document.getElementById('bottom-row');

function getRandomNoiseColor() {
const levels = ['green', 'yellow', 'red'];
return levels[Math.floor(Math.random() * levels.length)];
}

function createRoom(x, y, id) {
const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
group.setAttribute('id', `room-${id}`);
group.setAttribute('class', 'room-group');

const mainCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
mainCircle.setAttribute('cx', x);
mainCircle.setAttribute('cy', y);
mainCircle.setAttribute('r', 15);
mainCircle.setAttribute('class', 'room-circle');
mainCircle.setAttribute('fill', getRandomNoiseColor());

const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
pulse.setAttribute('cx', x);
pulse.setAttribute('cy', y);
pulse.setAttribute('r', 30);
pulse.setAttribute('class', 'pulse-circle');
pulse.setAttribute('fill', mainCircle.getAttribute('fill'));

group.appendChild(pulse);
group.appendChild(mainCircle);
return group;
}

function renderRooms() {
let x = 40;
for (let i = 0; i < 20; i++) {
  topRow.appendChild(createRoom(x, 0, i));
  x += 110;
}

x = 150;
for (let i = 20; i < 30; i++) {
  middleRow.appendChild(createRoom(x, 0, i));
  x += 210;
}

x = 40;
for (let i = 30; i < 50; i++) {
  bottomRow.appendChild(createRoom(x, 0, i));
  x += 110;
}
}

function updateNoiseLevels() {
for (let i = 0; i < 50; i++) {
  const group = document.getElementById(`room-${i}`);
  if (group) {
    const mainCircle = group.querySelector('.room-circle');
    const pulse = group.querySelector('.pulse-circle');
    const newColor = getRandomNoiseColor();

    // animate fill transition
    mainCircle.style.transition = 'fill 3s';
    pulse.style.transition = 'fill 3s';

    mainCircle.setAttribute('fill', newColor);
    pulse.setAttribute('fill', newColor);

    // retrigger animation
    pulse.classList.remove('animate');
    void pulse.offsetWidth; // trigger reflow
    pulse.classList.add('animate');
  }
}
}

renderRooms();
setInterval(updateNoiseLevels, 2000); // update every 2 seconds

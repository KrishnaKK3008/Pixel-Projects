const btn = document.querySelector('button[type="submit"]');
const d = document.querySelector('dialog');
const closeDialog = document.getElementById('closeDialog');
const invite = document.querySelector('.invite');
const container = document.querySelector('.container');

function checkAllDetails() {
    const eventName = document.getElementById('eventName').value.trim();
    const eventDate = document.getElementById('eventDate').value.trim();
    const startTime = document.getElementById('startTime').value.trim();
    const endTime = document.getElementById('endTime').value.trim();
    const eventDescription = document.getElementById('eventDescription').value.trim();
    const location = document.getElementById('location').value.trim();

    return eventName && eventDate && startTime && endTime && eventDescription && location;
}

function populateInvite() {
    const eventDateInput = document.getElementById('eventDate').value;
    const eventDate = new Date(eventDateInput);  

    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('event-name').textContent = document.getElementById('eventName').value;
    invite.querySelector('.date').textContent = formattedDate;
    invite.querySelector('.time').textContent = `${document.getElementById('startTime').value} - ${document.getElementById('endTime').value}`;
    invite.querySelector('.place').textContent = document.getElementById('location').value;
    invite.querySelector('.desc').textContent = document.getElementById('eventDescription').value;

    invite.style.display = 'block';
    container.remove();
}

btn.addEventListener('click', (event) => {
    event.preventDefault();

    if (checkAllDetails()) {
        populateInvite();
        alert("The Event is created successfully!");
    } else {
        d.showModal();
    }
});

closeDialog.addEventListener('click', () => {
    d.close();
});

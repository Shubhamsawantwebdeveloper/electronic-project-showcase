const API_URL = "http://127.0.0.1:8000/api/projects/";

const demoProjects = [
  {id:1,title:"Obstacle Avoiding Robot",category:"Robotics",description:"An autonomous robot that detects obstacles and changes direction using an ultrasonic sensor.",components:"Arduino UNO, HC-SR04, L298N, DC Motors",working:"The ultrasonic sensor measures distance. Arduino processes the reading and controls the motors through the motor driver.",difficulty:"Intermediate",icon:"🤖"},
  {id:2,title:"Smart Home Automation",category:"Home Automation",description:"Control lights and appliances automatically using a microcontroller and relay module.",components:"Arduino UNO, Relay Module, PIR Sensor, Bulb",working:"The PIR sensor detects motion and Arduino switches appliances through relay outputs.",difficulty:"Beginner",icon:"🏠"},
  {id:3,title:"IoT Weather Station",category:"IoT",description:"Monitor temperature and humidity and display the readings on an IoT dashboard.",components:"ESP8266, DHT11, OLED Display",working:"The DHT11 sends environmental readings to the ESP8266, which displays and publishes the data.",difficulty:"Intermediate",icon:"📡"},
  {id:4,title:"Automatic Plant Watering",category:"Sensors",description:"Automatically waters a plant when the soil moisture falls below a selected level.",components:"Arduino, Soil Moisture Sensor, Relay, Water Pump",working:"The moisture sensor measures soil condition and Arduino activates the pump when the soil is dry.",difficulty:"Beginner",icon:"🌱"},
  {id:5,title:"Smart Dustbin",category:"Arduino",description:"A touch-free dustbin that opens its lid when a person brings a hand near it.",components:"Arduino UNO, Ultrasonic Sensor, Servo Motor",working:"The ultrasonic sensor detects a nearby hand and Arduino rotates the servo to open the lid.",difficulty:"Beginner",icon:"🗑️"},
  {id:6,title:"Automatic Street Light",category:"Arduino",description:"Automatically switches street lights on at night using an LDR sensor.",components:"Arduino, LDR, LED, Resistors",working:"The LDR detects ambient light. Arduino turns the light on when the surrounding light becomes low.",difficulty:"Beginner",icon:"💡"}
];

let projects = [];

async function loadProjects() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("API unavailable");
    const data = await response.json();
    projects = Array.isArray(data) ? data : (data.results || []);
  } catch (error) {
    projects = demoProjects;
  }
  renderProjects();
}

function renderProjects() {
  const search = document.getElementById("searchInput").value.toLowerCase().trim();
  const category = document.getElementById("categoryFilter").value;
  const filtered = projects.filter(p => {
    const text = `${p.title} ${p.description} ${p.category}`.toLowerCase();
    return (!search || text.includes(search)) && (category === "All" || p.category === category);
  });

  const grid = document.getElementById("projectGrid");
  const empty = document.getElementById("emptyState");
  empty.classList.toggle("hidden", filtered.length !== 0);

  grid.innerHTML = filtered.map(p => `
    <article class="project-card">
      <div class="project-img">${p.image_url ? `<img src="${p.image_url}" alt="${escapeHtml(p.title)}" style="width:100%;height:100%;object-fit:cover">` : (p.icon || iconFor(p.category))}</div>
      <div class="project-body">
        <span class="tag">${escapeHtml(p.category)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.description)}</p>
        <div class="meta"><span>⚙ ${escapeHtml(p.difficulty || "Beginner")}</span><span>View details →</span></div>
      </div>
    </article>
  `).join("");
}

function iconFor(category) {
  return ({Arduino:"🔌",Robotics:"🤖","Home Automation":"🏠",IoT:"📡",Sensors:"🌡️"})[category] || "⚡";
}
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

document.getElementById("searchInput").addEventListener("input", renderProjects);
document.getElementById("categoryFilter").addEventListener("change", renderProjects);
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("categoryFilter").value = card.dataset.category;
    document.getElementById("projects").scrollIntoView({behavior:"smooth"});
    renderProjects();
  });
});

loadProjects();

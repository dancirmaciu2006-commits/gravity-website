let isOrbiting = false;
let orbitTimer = null;

const bg = document.getElementById("backgroundImage");

const bubble = document.getElementById("speechBubble");
const title = document.getElementById("infoTitle");
const text = document.getElementById("infoText");
const overlay = document.querySelector(".overlayText");

function showInfo(newTitle, newText, newImage, zoomType) {

    const container = document.getElementById("orbitContainer");

    if (container) container.innerHTML = "";

    clearTimeout(orbitTimer);
    isOrbiting = false;

    overlay.classList.remove("show");
    text.style.opacity = "0";

    setTimeout(() => {

        // ✅ 1. Update title
        title.textContent = newTitle;

        // ✅ 2. Split text into clickable words
        text.innerHTML = newText
            .split(" ")
            .map(word => `<span class="word">${word}</span>`)
            .join(" ");

        // ✅ 3. ADD CLICK EVENTS HERE (THIS IS THE IMPORTANT PART)
        document.querySelectorAll(".word").forEach(word => {
            word.addEventListener("click", function (e) {

                e.stopPropagation(); // prevents overlay click interfering

                if (currentSection === "newton") {

                    this.classList.remove("fall");
                    void this.offsetWidth; // reset animation
                    this.classList.add("fall");
                    bubble.classList.remove("show");

                    // optional: random speed (looks cooler)
                    this.style.animationDuration = (0.5 + Math.random()) + "s";
                }
            });
        });

        // ✅ 4. Image reset
        bg.classList.remove("zoom-in", "zoom-out");
        bg.style.opacity = "0";

        setTimeout(() => {
            bg.src = newImage;
            bg.classList.add(zoomType);
            bg.style.opacity = "1";
        }, 250);

        // ✅ 5. Show animation
        overlay.classList.add("show");

        bubble.classList.remove("show");

        // Show only on Newton page after delay
        if (currentSection === "newton") {
            setTimeout(() => {
                bubble.classList.add("show");
        }, 5000); // appears after 5 seconds
    }
    
    // Reset orbit timer
    clearTimeout(orbitTimer);

    // Only schedule orbit on orbits page
    if (currentSection === "orbits") {

        orbitTimer = setTimeout(() => {
            startOrbit();
        }, 8000);

}

    }, 0);
}

document.getElementById("historyBtn").onclick = function() {
    currentSection = "history";

    showInfo(
        "History of Gravity",
        "The Neoplatonic analogy between God and the Sun led to the consideration of the latter as the center of the system, challenging Aristotelianism. In this context, Nicolaus Copernicus hypothesized that gravity was not limited to the Earth, while Johannes Kepler formulated the laws of elliptical orbits, while still maintaining a somewhat animistic view of nature. In the 17th century, a more mechanistic perspective emerged. Galileo Galilei studied the fall of bodies, demonstrating that they all accelerate at the same rate (excluding air resistance) and that the distance traveled depends on the square of time. René Descartes rejected the idea of ​​attraction at a distance and explained planetary motions with vortices of aether based on momentum (mv). Gottfried Wilhelm Leibniz criticized this theory and introduced the concept of energy (vis viva, mv²) as a fundamental quantity. Finally, various scientists began to formulate the idea of ​​attraction between bodies: it was hypothesized that the planets were held by a balance between centripetal and centrifugal forces and that gravity diminished with distance. These theories paved the way for Isaac Newton's law of universal gravitation.",
        "Images/Athens.jpg",
        "zoom-in"
    );
};

document.getElementById("newtonBtn").onclick = function() {
    currentSection = "newton";

    showInfo(
        "Newton's Law",
        "This chapter describes the birth of Isaac Newton's theory of universal gravitation, based on the concept of mass: the more massive a body, the greater its force of attraction. In the Principia (1687), thanks also to the input of Robert Hooke, Newton developed a mathematical explanation of planetary motion, unifying heaven and Earth for the first time. He formulated the law according to which all bodies attract each other with a force proportional to their masses and inversely proportional to the square of their distance. With this theory, he was able to demonstrate Johannes Kepler's laws and explain the phenomena studied by Galileo Galilei, as well as tides, comets, and other celestial movements, also distinguishing between mass and weight. The theory was criticized by René Descartes and Gottfried Wilhelm Leibniz because it was based on action at a distance, but in the eighteenth century it gained ground and was developed by mathematicians such as Leonhard Euler, Joseph-Louis Lagrange, and Pierre-Simon Laplace. Among his successes were the discovery of Neptune and the measurement of gravitation by Henry Cavendish, although some phenomena, such as the orbit of Mercury, still remained unexplained.",
        "Images/IssacNewton.png",
        "zoom-in"
    );
};

document.getElementById("earthBtn").onclick = function() {
    currentSection = "earth";

    showInfo(
        "On Earth",
        "All planetary bodies, including the Earth, have gravitational fields that attract objects. According to Newton's law of universal gravitation, gravity depends on mass and decreases with distance squared. On Earth, gravitational strength equals the acceleration (g), but it varies slightly due to latitude and terrain. The observed gravity is a combination of gravitational attraction and centrifugal force from Earth’s rotation, making it weaker at the equator and stronger at the poles. The text also mentions gravity waves, which occur when gravitational equilibrium in fluids like water or air is disturbed, such as ocean waves or atmospheric waves.",
        "Images/Earther.png",
        "zoom-in"
    );
};

document.getElementById("astroBtn").onclick = function() {
    currentSection = "astro";

    showInfo(
        "Black Holes & Stars",
        "The formation of a star begins when a hydrogen cloud continuously contracts under gravitational forces, counteracted by thermal pressure. As density and temperature rise, the gas cools through radiation, further accelerating the collapse. If insufficient material is present, only a brown dwarf or gas giant will form; if mass is sufficient, the core's extreme heat and pressure trigger nuclear fusion— a star birth. The interior of a star maintains a constant equilibrium between gravitational forces and thermal/radiative pressure, a hydrostatic balance sustained until its fuel is exhausted. Subsequent evolution depends on mass: low-mass stars ultimately become white dwarfs; Sun-like stars undergo a red giant phase before turning into white dwarfs; more massive stars may explode as supernovae after forming an iron core, leaving behind neutron stars, or even collapse into black holes—from which not even light can escape—if their mass is extremely high.",
        "Images/WhatsApp Image 2026-03-10 at 11.23.31 (3).jpeg",
        "zoom-in"
    );
};

document.getElementById("orbitsBtn").onclick = function() {

    // If already on orbits → just reset timer
    if (currentSection === "orbits") {

        // STOP current orbit
        const container = document.getElementById("orbitContainer");
        container.innerHTML = "";

        document.querySelectorAll(".word").forEach(word => {
            word.style.opacity = "1";
        });

        isOrbiting = false;

        // 🔁 restart delay instead of instant animation
        scheduleOrbit();
        return;
    }

    // First time entering page
    currentSection = "orbits";

    showInfo(
        "The Orbit",
        "Planets orbit the Sun along elliptical paths under the influence of universal gravitation, and the Moon and artificial satellites similarly revolve around the Earth. In reality, celestial bodies in orbit would travel in straight lines if not for gravitational pull, which continuously deflects their paths. Due to the pervasive presence of gravity, planets also interact with one another, particularly those with greater mass and proximity, whose influence is more pronounced. Consequently, actual orbits are not idealized simple ellipses but more complex curves.",
        "Images/WhatsApp Image 2026-03-10 at 11.23.31 (4).jpeg",
        "zoom-in"
    );

    scheduleOrbit();
};

document.getElementById("darkmatterBtn").onclick = function() {
    currentSection = "darkmatter";

    showInfo(
        "Dark Matter & Gravity",
        "At the cosmological scale, gravity is the dominant force. Most of the universe’s mass consists of dark matter, which interacts only through gravity. Clusters of dark matter, called dark matter halos, attract hydrogen gas, leading to the formation of stars and galaxies.",
        "Images/darkmatter.png",
        "zoom-in"
    );
};

document.getElementById("anomalyBtn").onclick = function() {
    currentSection = "anomaly";

    showInfo(
        "Anomalies and Discrepancies",
        "Certain astronomical observations reveal anomalies that are not fully explained by current gravitational theory, suggesting either the presence of unseen components of the universe or the need for improved models of gravity. One major example is galaxy rotation curves, where stars at the outer edges of galaxies move faster than predicted by the distribution of visible matter, providing strong evidence for Dark matter. Another phenomenon is the accelerated expansion of the universe, commonly attributed to Dark energy. Additional irregularities, such as the spacecraft flyby anomaly, have also prompted investigation into gravitational dynamics, though some cases have been explained through conventional physics. To describe gravity, physicists employ several mathematical models. The classical model is Isaac Newton’s inverse-square law, which treats gravity as a force acting instantaneously between masses. A more refined approach models gravity as a gravitational field, where each point in space is associated with a force or potential generated by surrounding masses. In Albert Einstein’s general relativity, this concept is extended further: gravity is represented by tensor fields that describe the curvature of spacetime produced by matter and energy.",
        "Images/Anomaly.jpeg",
        "zoom-in"
    );
};

document.getElementById("relativityBtn").onclick = function() {
    currentSection = "relativity";

    showInfo(
        "General Relativity",
        "General Relativity is a theory of gravity developed by Albert Einstein in 1915. It describes gravity not as a force, but as the curvature of spacetime caused by mass and energy. Objects move along curved paths in spacetime due to this distortion. This theory is fundamental to modern physics and is widely used to explain cosmic phenomena such as black holes, gravitational waves, and the evolution of the universe. Despite its success, general relativity is not compatible with Quantum mechanics. General relativity describes gravity as a continuous curvature of spacetime, while quantum mechanics explains forces through particle interactions. Scientists are therefore searching for a unified theory known as quantum gravity.General Relativity reveals that gravity is the geometry of spacetime itself, shaping the motion of planets, light, and galaxies across the universe.",
        "Images/GeneralRelativity.webp",
        "zoom-in"
    );
};

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", resetHintTimer);
});

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

        showInfo(
            "History of Gravity",
            "The Neoplatonic analogy between God and the Sun led to the consideration of the latter as the center of the system, challenging Aristotelianism. In this context, Nicolaus Copernicus hypothesized that gravity was not limited to the Earth, while Johannes Kepler formulated the laws of elliptical orbits, while still maintaining a somewhat animistic view of nature. In the 17th century, a more mechanistic perspective emerged. Galileo Galilei studied the fall of bodies, demonstrating that they all accelerate at the same rate (excluding air resistance) and that the distance traveled depends on the square of time. René Descartes rejected the idea of ​​attraction at a distance and explained planetary motions with vortices of aether based on momentum (mv). Gottfried Wilhelm Leibniz criticized this theory and introduced the concept of energy (vis viva, mv²) as a fundamental quantity. Finally, various scientists began to formulate the idea of ​​attraction between bodies: it was hypothesized that the planets were held by a balance between centripetal and centrifugal forces and that gravity diminished with distance. These theories paved the way for Isaac Newton's law of universal gravitation.",
            "Images/Athens.jpg",
            "zoom-in"
        );

        /* This will start the inactivity timer which will help user. */
        resetHintTimer();

    }, 2000);

});

const toggleBtn = document.getElementById("contrastToggle");

toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-text");
});

let hintTimeout;

const hint = document.getElementById("uiHint");

// Show hint
function showHint() {
    hint.classList.add("show", "flash");

    setTimeout(() => {
        hint.classList.remove("show", "flash");
    }, 3000);
}

// Reset inactivity timer
function resetHintTimer() {
    clearTimeout(hintTimeout);

    hintTimeout = setTimeout(() => {
        showHint();
    }, 10000); // 10 seconds of inactivity
}

let currentSection = "";


function startOrbit() {

    const container = document.getElementById("orbitContainer");
    container.innerHTML = "";
    const words = document.querySelectorAll(".word");

    // 🌞 Create center title (the "sun")
    const centerTitle = document.createElement("div");
    centerTitle.id = "orbitCenter";
    centerTitle.textContent = title.textContent;

    container.appendChild(centerTitle);

    title.style.opacity = "0";

    // 🔴 STOP ORBIT (toggle off)
    if (isOrbiting) {

        // stop timer so it doesn't restart
        clearTimeout(orbitTimer);

        // remove orbit words
        container.innerHTML = "";

        // restore original text
        words.forEach(word => {
            word.style.opacity = "1";
        });

        title.style.opacity = "1";

        isOrbiting = false;
        return;
    
    }

    // 🟢 START ORBIT
    isOrbiting = true;
    container.innerHTML = "";

    words.forEach((word, index) => {

        setTimeout(() => {

            // safety check (if stopped mid-way)
            if (!isOrbiting) return;

            const orbitWord = document.createElement("span");
            orbitWord.className = "orbit-word";
            orbitWord.textContent = word.textContent;

            const radius = 100 + Math.random() * 200;
            const duration = 6 + Math.random() * 6;

            orbitWord.style.setProperty("--radius", radius + "px");
            orbitWord.style.animation = `orbit ${duration}s linear infinite`;

            orbitWord.style.left = "0px";
            orbitWord.style.top = "0px";

            container.appendChild(orbitWord);

            // hide original word
            word.style.opacity = "0";

        }, index * 150);
        

    });
}

function scheduleOrbit() {

    clearTimeout(orbitTimer);

    orbitTimer = setTimeout(() => {
        startOrbit();
    }, 8000);

}
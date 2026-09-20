// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const error = document.getElementById("loginError");

        if (username.length < 3) {
            error.textContent = "Username must contain at least 3 characters.";
            return;
        }

        if (password.length < 4) {
            error.textContent = "Password must contain at least 4 characters.";
            return;
        }

        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", username);

        window.location.href = "dashboard.html";
    });
}


// ===============================
// PROTECTED PAGES
// ===============================

const protectedPages = [
    "dashboard.html",
    "explore.html",
    "saved.html",
    "details.html",
    "profile.html"
];

const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage)) {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
    }
}


// ===============================
// LOGOUT
// ===============================

const logoutButtons = document.querySelectorAll(".logout");

logoutButtons.forEach(button => {
    button.addEventListener("click", function () {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("username");
        window.location.href = "login.html";
    });
});


// ===============================
// USERNAME
// ===============================

const usernameElements = document.querySelectorAll(".user-name");

usernameElements.forEach(element => {
    element.textContent =
        sessionStorage.getItem("username") || "User";
});


// ===============================
// SAVED IDEAS
// ===============================

function getSavedIdeas() {
    return JSON.parse(localStorage.getItem("savedIdeas")) || [];
}

function saveIdea(id) {
    let saved = getSavedIdeas();

    if (!saved.includes(id)) {
        saved.push(id);
    } else {
        saved = saved.filter(item => item !== id);
    }

    localStorage.setItem("savedIdeas", JSON.stringify(saved));

    renderIdeas();
}


// ===============================
// IDEA CARD
// ===============================

function createIdeaCard(idea) {
    const saved = getSavedIdeas();
    const isSaved = saved.includes(idea.id);

    return `
        <div class="idea-card">

            <div class="idea-icon">
                ${idea.icon}
            </div>

            <span class="category">
                ${idea.category}
            </span>

            <h3>${idea.title}</h3>

            <p>${idea.description}</p>

            <div class="idea-info">
                <span>Difficulty: ${idea.difficulty}</span>
                <span>Market: ${idea.market}</span>
            </div>

            <div class="card-buttons">
                <button onclick="openDetails(${idea.id})">
                    View Details
                </button>

                <button
                    class="save-btn"
                    onclick="saveIdea(${idea.id})">
                    ${isSaved ? "★ Saved" : "☆ Save"}
                </button>
            </div>

        </div>
    `;
}


// ===============================
// RENDER IDEAS
// ===============================

function renderIdeas(list = ideas) {

    const container = document.getElementById("ideasContainer");

    if (!container) return;

    if (list.length === 0) {
        container.innerHTML =
            `<p class="empty">No ideas found.</p>`;
        return;
    }

    container.innerHTML = list
        .map(createIdeaCard)
        .join("");
}


// ===============================
// SEARCH
// ===============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const search = this.value.toLowerCase();

        const filtered = ideas.filter(idea =>
            idea.title.toLowerCase().includes(search) ||
            idea.description.toLowerCase().includes(search) ||
            idea.category.toLowerCase().includes(search)
        );

        renderIdeas(filtered);
    });
}


// ===============================
// CATEGORY FILTER
// ===============================

const categoryFilter =
    document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const category = this.value;

        if (category === "all") {
            renderIdeas(ideas);
            return;
        }

        const filtered = ideas.filter(
            idea => idea.category === category
        );

        renderIdeas(filtered);
    });
}


// ===============================
// IDEA DETAILS
// ===============================

function openDetails(id) {
    sessionStorage.setItem("selectedIdea", id);
    window.location.href = "details.html";
}

function showDetails() {

    const container =
        document.getElementById("detailsContainer");

    if (!container) return;

    const id =
        Number(sessionStorage.getItem("selectedIdea"));

    const idea = ideas.find(item => item.id === id);

    if (!idea) {
        container.innerHTML = "<p>Idea not found.</p>";
        return;
    }

    container.innerHTML = `
        <div class="details-box">

            <div class="large-icon">
                ${idea.icon}
            </div>

            <span class="category">
                ${idea.category}
            </span>

            <h1>${idea.title}</h1>

            <p>${idea.fullDescription}</p>

            <div class="detail-grid">

                <div>
                    <strong>Category</strong>
                    <p>${idea.category}</p>
                </div>

                <div>
                    <strong>Difficulty</strong>
                    <p>${idea.difficulty}</p>
                </div>

                <div>
                    <strong>Market Potential</strong>
                    <p>${idea.market}</p>
                </div>

            </div>

            <button onclick="saveIdea(${idea.id})">
                Save Idea
            </button>

        </div>
    `;
}


// ===============================
// SAVED PAGE
// ===============================

function renderSavedIdeas() {

    const container =
        document.getElementById("ideasContainer");

    if (!container) return;

    const saved = getSavedIdeas();

    const savedIdeas = ideas.filter(
        idea => saved.includes(idea.id)
    );

    renderIdeas(savedIdeas);
}


// ===============================
// PROFILE
// ===============================

const profileForm =
    document.getElementById("profileForm");

if (profileForm) {

    const savedName =
        sessionStorage.getItem("username") || "";

    document.getElementById("profileName").value =
        savedName;

    profileForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("profileName").value;

        sessionStorage.setItem("username", name);

        document.getElementById("profileMessage")
            .textContent = "Profile updated successfully!";
    });
}


// ===============================
// PAGE INITIALIZATION
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("ideasContainer")) {

        if (currentPage === "saved.html") {
            renderSavedIdeas();
        } else {
            renderIdeas();
        }
    }

    showDetails();
});
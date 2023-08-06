document
	.getElementById("guestbookForm")
	.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the form from actually submitting

		var name = document.getElementById("name").value;
		var message = document.getElementById("message").value;

		var entryDiv = document.createElement("div");
		entryDiv.className = "guestbook-entry";

		var nameP = document.createElement("p");
		nameP.innerHTML = "<strong>" + name + "</strong>";

		var messageP = document.createElement("p");
		messageP.textContent = message;

		entryDiv.appendChild(nameP);
		entryDiv.appendChild(messageP);

		var entriesDiv = document.querySelector(".guestbook-entries");
		entriesDiv.prepend(entryDiv);

		// Clear the form
		document.getElementById("name").value = "";
		document.getElementById("message").value = "";
	});

let currentPage = 1;
const ENTRIES_PER_PAGE = 5;

function paginateEntries() {
	let entries = document.querySelectorAll(".guestbook-entry");
	let totalPages = Math.ceil(entries.length / ENTRIES_PER_PAGE);

	// Hide all entries
	entries.forEach((entry) => (entry.style.display = "none"));

	// Display only the entries for the current page
	for (
		let i = (currentPage - 1) * ENTRIES_PER_PAGE;
		i < currentPage * ENTRIES_PER_PAGE && i < entries.length;
		i++
	) {
		entries[i].style.display = "block";
	}

	// Update the pagination controls
	let paginationDiv = document.getElementById("pagination");
	paginationDiv.innerHTML = "";
	for (let i = 1; i <= totalPages; i++) {
		let pageButton = document.createElement("button");
		pageButton.innerText = i;
		pageButton.addEventListener("click", function () {
			currentPage = i;
			paginateEntries();
		});
		paginationDiv.appendChild(pageButton);
	}
}

// Call paginateEntries when a new entry is added or when page is loaded
paginateEntries();

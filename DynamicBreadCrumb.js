document.addEventListener("DOMContentLoaded", () => {
    const breadcrumbContainer = document.getElementById("breadcrumb");
    const pageTitle = document.getElementById("page-title");

    // Define page titles based on URL
    const pages = {
        "crops.html": "Timelines",
        "tutos.html": "Tutorials",
       // "crops.html#SpringTimeline": "SpringTimeline",
        //"crops.html#WinterTimeline": "WinterTimeline",
       //"crops.html#SummerTimeline": "SummerTimeline",
       // "crops.html#FallTimeline": "FallTimeline"           
    };

    // Get the current page
    //const currentPage = Object.keys(pages).find(page => window.location.href.includes(page));
   // Extract the filename from the URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);   
    //alert(currentPage);
    if (currentPage) {
        // Set the page title
        //pageTitle.textContent = `Welcome to ${pages[currentPage]}`;

        // Update the breadcrumb
        let breadcrumbTrail = JSON.parse(localStorage.getItem("breadcrumbTrail")) || [];
        //alert(breadcrumbTrail);
        // Add the current page if not already in the trail
        if (!breadcrumbTrail.includes(currentPage)) {
            breadcrumbTrail.push(currentPage);
            localStorage.setItem("breadcrumbTrail", JSON.stringify(breadcrumbTrail));
        }

        // Build the breadcrumb UI
        breadcrumbTrail.forEach((page, index) => {
            const link = document.createElement("a");
            link.href = page;
            link.textContent = pages[page];
            link.style.fontSize="1.2em";
		
		// Add click event listener to remove the clicked page and subsequent pages
            link.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent navigation

                // Remove all pages after and including the clicked page
                breadcrumbTrail = breadcrumbTrail.slice(0, index + 1);
                //alert(index);
                //alert(breadcrumbTrail);
                localStorage.setItem("breadcrumbTrail", JSON.stringify(breadcrumbTrail));

                // Navigate to the clicked page
                window.location.href = page;
            });

            if (page === currentPage) {
                link.classList.add("active");
                link.style.pointerEvents = "none";
            }

            breadcrumbContainer.appendChild(link);

            // Add separator if not the last item
            if (index < breadcrumbTrail.length - 1) {
                const separator = document.createElement("span");
                separator.className = 'fa-solid fa-chevron-right arrow';
                breadcrumbContainer.appendChild(separator);
            }
        });
    } else {
        console.error("Page not recognized.");
    }
});
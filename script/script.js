const links = document.querySelectorAll('.header-nav__links');

    // Loop through the links and add click event listener
    links.forEach(link => {
      link.addEventListener('click', function(event) {
        // Prevent default link behavior
        event.preventDefault();

        // Remove 'active' class from all links
        links.forEach(link => link.classList.remove('active'));

        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('backToTop');

    const toggleVisibility = () => {
        if (window.pageYOffset > 20) {
            backToTopButton.classList.add('show');
            backToTopButton.classList.remove('hide');
        } else {
            backToTopButton.classList.add('hide');
            backToTopButton.classList.remove('show');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    backToTopButton.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', toggleVisibility);
});
// Reveal advantages on scroll
const advantages = document.querySelectorAll('.advantage');

const revealOnScroll = () => {
  advantages.forEach((item, index) => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

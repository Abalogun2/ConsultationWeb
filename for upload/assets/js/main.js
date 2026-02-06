
// Scoped slideshow initialization
// Finds each `.slideshow-container` and wires prev/next buttons to slides inside the same container.
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.slideshow-container').forEach(initSlideshow);
});

function initSlideshow(container) {
	const slides = Array.from(container.querySelectorAll('.slide'));
	if (!slides.length) return;

	// make container focusable for keyboard navigation
	if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '0');

	let idx = 0;

	function show(i) {
		slides.forEach((s, si) => {
			s.style.display = si === i ? 'block' : 'none';
		});
	}

	// initial display
	show(idx);

	const prev = container.querySelector('.prev');
	const next = container.querySelector('.next');

	if (prev) {
		prev.addEventListener('click', () => {
			idx = (idx - 1 + slides.length) % slides.length;
			show(idx);
		});
		// add accessible label if missing
		if (!prev.hasAttribute('aria-label')) prev.setAttribute('aria-label', 'Previous slide');
	}

	if (next) {
		next.addEventListener('click', () => {
			idx = (idx + 1) % slides.length;
			show(idx);
		});
		if (!next.hasAttribute('aria-label')) next.setAttribute('aria-label', 'Next slide');
	}

	// keyboard navigation while container is focused
	container.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			prev && prev.click();
			e.preventDefault();
		} else if (e.key === 'ArrowRight') {
			next && next.click();
			e.preventDefault();
		}
	});
}


// code for the form submission on contact page
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "Put your access key here");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
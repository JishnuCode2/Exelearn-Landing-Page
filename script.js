
document.addEventListener("DOMContentLoaded", () => {
    const courseCards = document.querySelectorAll(".course-card");

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Stagger animation based on card index in the grid
            const cardArray = Array.from(courseCards);
            const index = cardArray.indexOf(entry.target);
            
            setTimeout(() => {
              entry.target.classList.add("pop-in");
            }, (index % 4) * 120); // 120ms delay stagger per column

            // Unobserve after pop-in complete
            observer.unobserve(entry.target);
          }
        });
    }, observerOptions);
 
    courseCards.forEach(card => observer.observe(card));
});

const leadForm = document.getElementById('leadForm');
  const confirmModal = document.getElementById('confirmModal');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const submitBtn = document.getElementById('submitBtn');

  leadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Disable button to prevent double-submits while waiting
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting...';

    const formData = new FormData(leadForm);

    fetch(leadForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Show Popup Modal
        confirmModal.classList.add('active');
        
        // Auto reload after 3.5 seconds if OK isn't clicked
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      } else {
        alert('Form submission failed. Please verify FormSubmit email activation.');
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit';
      }
    })
    .catch(error => {
      alert('Network error. Unable to submit form.');
      submitBtn.disabled = false;
      submitBtn.innerText = 'Submit';
    });
  });

  // Reload page instantly on OK click
  modalOkBtn.addEventListener('click', function () {
    window.location.reload();
  });

const formModalOverlay = document.getElementById('formModalOverlay');
  const closeFormModalBtn = document.getElementById('closeFormModalBtn');
  const viewDetailBtns = document.querySelectorAll('.btn-apply-mini');
  const courseSelect = document.getElementById('courseSelect');

  // Open Form Modal when clicking any "View Details" / "Apply" button
  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      // Automatically pre-select the course if card has a course name
      const card = this.closest('.course-card');
      if (card) {
        const titleEl = card.querySelector('.course-title');
        if (titleEl && courseSelect) {
          const courseName = titleEl.innerText.trim();
          for (let option of courseSelect.options) {
            if (option.value.toLowerCase() === courseName.toLowerCase()) {
              option.selected = true;
              break;
            }
          }
        }
      }

      formModalOverlay.classList.add('active');
    });
  });

  // Function to close form modal
  function closeFormModal() {
    formModalOverlay.classList.remove('active');
  }

  // Close when clicking the Cross (X) button
  closeFormModalBtn.addEventListener('click', closeFormModal);

  // Close when clicking background outside the form card
  formModalOverlay.addEventListener('click', function (e) {
    if (e.target === formModalOverlay) {
      closeFormModal();
    }
  });

  // Close on 'Escape' key press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && formModalOverlay.classList.contains('active')) {
      closeFormModal();
    }
  });

  // AJAX Submission handling
  leadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting...';

    const formData = new FormData(leadForm);

    fetch(leadForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        closeFormModal(); // Hide the form modal
        confirmModal.classList.add('active'); // Show success popup
        
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      } else {
        alert('Form submission failed. Please check FormSubmit email activation.');
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit';
      }
    })
    .catch(error => {
      alert('Network error. Unable to submit form.');
      submitBtn.disabled = false;
      submitBtn.innerText = 'Submit';
    });
  });

  modalOkBtn.addEventListener('click', function () {
    window.location.reload();
  });
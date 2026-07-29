/* ==========================================================================
   CONTACT FORM VALIDATION & FORMSPREE INTEGRATION MODULE
   ========================================================================== */

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (val) => val.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters).'
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (val) => {
        if (!val.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val.trim()) ? '' : 'Please enter a valid email address.';
      }
    },
    subject: {
      input: document.getElementById('subject'),
      error: document.getElementById('subjectError'),
      validate: (val) => val.trim().length >= 3 ? '' : 'Please enter a subject (at least 3 characters).'
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (val) => val.trim().length >= 10 ? '' : 'Please write a message (at least 10 characters).'
    }
  };

  // Real-time validation on user typing / blur
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (!field.input) return;

    field.input.addEventListener('input', () => {
      clearFieldError(field);
    });

    field.input.addEventListener('blur', () => {
      validateSingleField(field);
    });
  });

  function validateSingleField(field) {
    if (!field.input) return true;
    const errorMsg = field.validate(field.input.value);

    if (errorMsg) {
      field.input.classList.add('invalid');
      if (field.error) {
        field.error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMsg}`;
        field.error.classList.add('visible');
      }
      return false;
    } else {
      clearFieldError(field);
      return true;
    }
  }

  function clearFieldError(field) {
    if (field.input) field.input.classList.remove('invalid');
    if (field.error) {
      field.error.classList.remove('visible');
      field.error.textContent = '';
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(fields).forEach(key => {
      const valid = validateSingleField(fields[key]);
      if (!valid) isValid = false;
    });

    if (!isValid) {
      showToast('Please fix the errors in the form before submitting.');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mvzeyqgo', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'var(--accent-emerald)';
        showToast('Thank you! Your message has been sent successfully.');
        form.reset();
        Object.keys(fields).forEach(key => clearFieldError(fields[key]));
      } else {
        const data = await response.json();
        const errorMsg = data.errors ? data.errors.map(err => err.message).join(', ') : 'Form submission failed.';
        showToast('Error: ' + errorMsg);
        btn.innerHTML = original;
      }
    } catch (err) {
      showToast('Network error. Please try again later.');
      btn.innerHTML = original;
    } finally {
      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
      }, 3500);
    }
  });
}

export function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

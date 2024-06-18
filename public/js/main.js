document.addEventListener('DOMContentLoaded', function() {
    // Валидация форм и включение/выключение кнопки отправки
    const forms = document.querySelectorAll('form');
  
    forms.forEach(form => {
      const submitButton = form.querySelector('button[type="submit"]');
  
      const checkValidity = () => {
        const inputs = form.querySelectorAll('input, textarea, select');
        let valid = true;
  
        inputs.forEach(input => {
          if (!input.value) {
            valid = false;
          }
        });
  
        submitButton.disabled = !valid;
      };
  
      form.addEventListener('input', checkValidity);
      checkValidity();
  
      form.addEventListener('submit', function(event) {
        const inputs = form.querySelectorAll('input, textarea, select');
        let valid = true;
  
        inputs.forEach(input => {
          if (!input.value) {
            valid = false;
            input.style.border = '2px solid red';
          } else {
            input.style.border = '1px solid #ddd';
          }
        });
  
        if (!valid) {
          event.preventDefault();
          alert('All fields are required.');
        }
      });
    });
  
    // Скрытие блока информации о проекте
    const projectInfo = document.getElementById('project-info');
    const hideInfoBtn = document.getElementById('hide-info-btn');
  
    hideInfoBtn.addEventListener('click', function() {
      projectInfo.style.display = 'none';
    });
  
    // Фильтрация статей
    const filterInput = document.getElementById('filter-input');
    const filterBtn = document.getElementById('filter-btn');
    const showAllBtn = document.getElementById('show-all-btn');
    const newsArticles = document.querySelectorAll('.news-card');
  
    filterBtn.addEventListener('click', function() {
      const filterValue = filterInput.value.toLowerCase();
  
      newsArticles.forEach(article => {
        const category = article.getAttribute('data-category').toLowerCase();
  
        if (category.includes(filterValue)) {
          article.style.display = 'block';
        } else {
          article.style.display = 'none';
        }
      });
    });
  
    showAllBtn.addEventListener('click', function() {
      filterInput.value = '';
  
      newsArticles.forEach(article => {
        article.style.display = 'block';
      });
    });
  });
  
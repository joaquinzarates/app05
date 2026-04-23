document.addEventListener('DOMContentLoaded', () => {

  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const articleCards = document.querySelectorAll('.article-card');
  const aboutCards = document.querySelectorAll('.about-card');
  const sectionItems = document.querySelectorAll('.section-item');
  const navigationLinks = document.querySelectorAll('nav a');
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  let currentFilter = 'all';
  let searchTerm = '';

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('iacon-theme', theme);
    updateThemeIcon(theme);
  };

  const updateThemeIcon = (theme) => {
    if (themeToggle) {
      const icon = themeToggle.querySelector('span');
      if (theme === 'dark') {
        icon.textContent = '🌙';
      } else {
        icon.textContent = '☀️';
      }
    }
  };

  const savedTheme = localStorage.getItem('iacon-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  } else {
    console.error("No se encontró el elemento 'theme-toggle'. Verificar el ID.");
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        filterArticles();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase();
      filterArticles();
    });
  }

  function filterArticles() {
    if (articleCards.length === 0) return;

    let visibleCount = 0;

    articleCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('h3').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();

      const matchesFilter = currentFilter === 'all' || category === currentFilter;
      const matchesSearch = searchTerm === '' || 
                            title.includes(searchTerm) || 
                            description.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
        
        card.style.animation = 'none';
        setTimeout(() => {
          card.style.animation = 'fadeUp 0.4s ease both';
        }, 10);
      } else {
        card.style.display = 'none';
      }
    });

    if (visibleCount === 0) {
      console.warn('No se encontraron artículos con los criterios especificados.');
    }
  }

  if (articleCards.length > 0) {
    filterArticles();
  }

  document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 50px var(--shadow)';
    } else {
      header.style.boxShadow = '0 1px 30px var(--shadow)';
    }
  });

  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  navigationLinks.forEach(link => {
    link.addEventListener('click', function() {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('#')) {
        console.log(`Navegando a: ${href}`);
      }
    });
  });

  if (aboutCards.length > 0) {
    aboutCards.forEach((card, index) => {
      card.style.animation = `fadeUp 0.5s ${0.2 + index * 0.1}s ease both`;
    });
  }

  if (sectionItems.length > 0) {
    sectionItems.forEach((item, index) => {
      item.style.animation = `fadeUp 0.5s ${0.3 + index * 0.1}s ease both`;
    });
  }

});

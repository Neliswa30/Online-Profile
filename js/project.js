/* ==========================================================================
   Projects page specific JavaScript
   ========================================================================== */

// DOM Elements
const filtersContainer = document.getElementById('filters');
const projectsGrid = document.getElementById('projectsGrid');
const projectCards = document.querySelectorAll('.project-card');

/* ---------- Project Filter Functionality ---------- */
function initializeProjectFilters() {
  if (!filtersContainer) return;
  
  filtersContainer.addEventListener('click', handleFilterClick);
  
  // Add loading animations to project cards
  projectCards.forEach((card, index) => {
    card.classList.add('loading');
    card.style.animationDelay = `${index * 0.1}s`;
  });
}

function handleFilterClick(e) {
  const filterBtn = e.target.closest('.filter-btn');
  if (!filterBtn) return;

  const filter = filterBtn.dataset.filter;
  
  // Update active filter button
  updateActiveFilter(filterBtn);
  
  // Filter project cards
  filterProjects(filter);
}

function updateActiveFilter(activeBtn) {
  // Remove active class from all buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });
  
  // Add active class to clicked button
  activeBtn.classList.add('active');
  activeBtn.setAttribute('aria-selected', 'true');
}

function filterProjects(filter) {
  let visibleCount = 0;
  
  projectCards.forEach(card => {
    const cardType = card.dataset.type;
    const shouldShow = filter === 'all' || cardType === filter;
    
    if (shouldShow) {
      card.style.display = '';
      visibleCount++;
      
      // Add subtle animation when showing
      card.style.animation = 'fadeInUp 0.4s ease forwards';
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show/hide no results message
  toggleNoResultsMessage(visibleCount);
}

function toggleNoResultsMessage(visibleCount) {
  let noResultsMsg = document.getElementById('noResults');
  
  if (!noResultsMsg) {
    noResultsMsg = document.createElement('div');
    noResultsMsg.id = 'noResults';
    noResultsMsg.className = 'no-results hidden';
    noResultsMsg.textContent = 'No projects found matching your selection.';
    projectsGrid.appendChild(noResultsMsg);
  }
  
  if (visibleCount === 0) {
    noResultsMsg.classList.remove('hidden');
  } else {
    noResultsMsg.classList.add('hidden');
  }
}

/* ---------- Card Hover Animations ---------- */
function initializeCardAnimations() {
  projectCards.forEach(card => {
    // Mouse enter animation
    card.addEventListener('mouseenter', () => {
      card.classList.add('hover');
    });
    
    // Mouse leave animation
    card.addEventListener('mouseleave', () => {
      card.classList.remove('hover');
    });
    
    // Keyboard navigation support
    card.addEventListener('focus', () => {
      card.classList.add('hover');
    });
    
    card.addEventListener('blur', () => {
      card.classList.remove('hover');
    });
  });
}

/* ---------- Project Search Functionality ---------- */
function initializeProjectSearch() {
  // You can add search functionality here in the future
  // Example: Add a search input that filters projects by title/description
}

/* ---------- Initialize All Project Page Features ---------- */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Projects page loaded successfully');
  
  initializeProjectFilters();
  initializeCardAnimations();
  initializeProjectSearch();
  
  // Add project type badges dynamically
  addProjectTypeBadges();
});

/* ---------- Add Project Type Badges ---------- */
function addProjectTypeBadges() {
  projectCards.forEach(card => {
    const type = card.dataset.type;
    const title = card.querySelector('h3');
    
    if (title && type) {
      const badge = document.createElement('span');
      badge.className = `project-type ${type}`;
      badge.textContent = type;
      card.insertBefore(badge, title);
    }
  });
}

/* ---------- Export functions for potential module use ---------- */
// Uncomment if using ES6 modules in the future
/*
export {
  initializeProjectFilters,
  filterProjects,
  initializeCardAnimations
};
*/

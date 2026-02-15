document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('prospectus-overlay');
    const backdrop = document.getElementById('prospectus-backdrop');
    const content = document.getElementById('prospectus-content');
    const openBtn = document.getElementById('open-prospectus-btn');
    const closeBtn = document.getElementById('close-prospectus');
    const searchInput = document.getElementById('prospectus-search');
    const defaultView = document.getElementById('default-prospectus-view');
    const searchView = document.getElementById('search-prospectus-view');
    const searchGrid = document.getElementById('search-results-grid');
    const searchCount = document.getElementById('search-count');
    const noResults = document.getElementById('no-results');

    const toggleOverlay = (show) => {
        if (show) {
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                backdrop.classList.add('opacity-100');
                content.classList.remove('translate-y-8', 'opacity-0');
                searchInput.focus();
            }, 10);
        } else {
            backdrop.classList.remove('opacity-100');
            content.classList.add('translate-y-8', 'opacity-0');
            setTimeout(() => {
                overlay.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        }
    };

    const openButtons = [
        document.getElementById('open-prospectus-btn'),
        document.getElementById('open-prospectus-btn-mobile')
    ];
    
    openButtons.forEach(btn => {
        if (btn) btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleOverlay(true);
        });
    });
    if (closeBtn) closeBtn.addEventListener('click', () => toggleOverlay(false));

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
            toggleOverlay(false);
        }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', () => toggleOverlay(false));

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            defaultView.classList.remove('hidden');
            searchView.classList.add('hidden');
            return;
        }

        defaultView.classList.add('hidden');
        searchView.classList.remove('hidden');

        const results = [];
        const courses = window.BETECH_COURSES || {};

        Object.keys(courses).forEach(category => {
            courses[category].forEach(course => {
                if (course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query)) {
                    results.push({ ...course, category });
                }
            });
        });

        renderResults(results, query);
    });

    function renderResults(results, query) {
        searchGrid.innerHTML = '';
        searchCount.innerText = results.length;

        if (results.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');

        results.forEach(course => {
            const card = document.createElement('div');
            card.className = 'glass p-5 rounded-2xl border border-white/5 hover:border-neon-text/30 transition-all group cursor-pointer';
            
            // Basic highlighting
            const highlightedTitle = highlight(course.title, query);
            const highlightedDesc = highlight(course.description, query);
            const isPng = course.image.toLowerCase().endsWith('.png');

            card.innerHTML = `
                <div class="flex gap-4">
                    <div class="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/5 ${isPng ? 'bg-white/10' : ''}">
                        <img src="${course.image}" alt="${course.title}" class="w-full h-full ${isPng ? 'object-contain p-2' : 'object-cover'} group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-start mb-1">
                            <h4 class="font-bold text-white group-hover:text-neon-text transition-colors truncate">${highlightedTitle}</h4>
                            <span class="text-[8px] bg-neon-text/10 text-neon-text px-2 py-0.5 rounded-full border border-neon-text/20 uppercase font-black tracking-tighter shrink-0">
                                ${course.tag}
                            </span>
                        </div>
                        <p class="text-[10px] text-neon-text/60 font-bold uppercase tracking-widest mb-1 italic">${course.category}</p>
                        <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            ${highlightedDesc}
                        </p>
                    </div>
                </div>
            `;

            card.onclick = () => {
                if (typeof window.openCourseDetails === 'function') {
                    window.openCourseDetails(course.title);
                }
            };

            searchGrid.appendChild(card);
        });
    }

    function highlight(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="text-neon-text bg-neon-text/10">$1</span>');
    }
});

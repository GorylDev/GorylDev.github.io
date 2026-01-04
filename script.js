/* =====================================================
   Przykladowa baza danych perfum, bedzie zastapiona API w przyszlosci
   ===================================================== */

const perfumeDatabase = [
    {
        id: 1,
        name: "Midnight Rose",
        brand: "Maison Lumière",
        notes: ["rose", "jasmine", "sandalwood", "vanilla", "musk"],
        occasions: ["evening", "romantic", "date", "formal"],
        description: "An intoxicating blend of Bulgarian rose and jasmine, anchored by warm sandalwood and sensual musk. Perfect for romantic evenings.",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=60",
        altText: "Elegant dark red perfume bottle with romantic rose gold accents against moody background"
    },
    {
        id: 2,
        name: "Citrus Dawn",
        brand: "Azure Fragrances",
        notes: ["bergamot", "lemon", "grapefruit", "neroli", "white musk"],
        occasions: ["daily", "office", "casual", "daytime", "fresh"],
        description: "A vibrant awakening of Italian citrus notes with a clean white musk base. Your everyday confidence booster.",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=60",
        altText: "Fresh bright yellow-toned perfume bottle with citrus and white musk aesthetic"
    },
    {
        id: 3,
        name: "Leather & Oak",
        brand: "Noir Collection",
        notes: ["leather", "oakmoss", "tobacco", "amber", "cedarwood"],
        occasions: ["evening", "business", "formal", "sophisticated", "club"],
        description: "A powerful masculine composition of rich leather and smoky tobacco, grounded in woody amber and cedarwood.",
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=500&q=60",
        altText: "Sophisticated dark brown and black perfume bottle with masculine woody leather tones"
    },
    {
        id: 4,
        name: "Lavender Fields",
        brand: "Provence Naturals",
        notes: ["lavender", "sage", "vetiver", "tonka bean", "coumarin"],
        occasions: ["relaxation", "evening", "casual", "daily"],
        description: "Transport yourself to the purple hills of Provence. Calming lavender meets earthy vetiver in this serene composition.",
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=500&q=60",
        altText: "Serene purple and lavender-toned perfume bottle with natural botanical elements"
    },
    {
        id: 5,
        name: "Sweet Amber Dream",
        brand: "Velvet Scents",
        notes: ["amber", "vanilla", "honey", "patchouli", "benzoin"],
        occasions: ["date", "evening", "romantic", "cozy", "sweet"],
        description: "A gourmand masterpiece blending golden amber with creamy vanilla and sweet honey. Irresistibly warm and comforting.",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=500&q=60",
        altText: "Luxurious golden amber perfume bottle with warm honey and vanilla color palette"
    },
    {
        id: 6,
        name: "Ocean Breeze",
        brand: "Aqua Essence",
        notes: ["sea salt", "marine", "driftwood", "sage", "ambergris"],
        occasions: ["summer", "beach", "casual", "daytime", "fresh"],
        description: "Capture the essence of a coastal morning. Fresh sea salt mingles with aromatic sage and weathered driftwood.",
        image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=500&q=60",
        altText: "Fresh aquatic blue and clear glass perfume bottle with ocean and marine aesthetic"
    },
    {
        id: 7,
        name: "Spiced Oud",
        brand: "Orient Luxe",
        notes: ["oud", "saffron", "cardamom", "rose", "leather"],
        occasions: ["evening", "formal", "luxury", "special", "exotic"],
        description: "An opulent oriental fragrance featuring rare oud wood, precious saffron, and warm spices. Pure luxury.",
        image: "https://images.unsplash.com/photo-1600857062241-98e5e6bad62b?auto=format&fit=crop&w=500&q=60",
        altText: "Opulent deep red and gold oriental perfume bottle with exotic spice elements"
    },
    {
        id: 8,
        name: "Green Tea Garden",
        brand: "Zen Botanicals",
        notes: ["green tea", "bergamot", "jasmine", "white musk", "bamboo"],
        occasions: ["daily", "office", "meditation", "daytime", "fresh"],
        description: "A refreshing blend of Japanese green tea and delicate jasmine. Clean, crisp, and effortlessly elegant.",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=60",
        altText: "Minimalist green and white perfume bottle with zen garden and tea aesthetic"
    },
    {
        id: 9,
        name: "Wild Cherry Blossom",
        brand: "Sakura House",
        notes: ["cherry blossom", "peach", "rose", "musk", "sandalwood"],
        occasions: ["spring", "romantic", "daytime", "feminine", "sweet"],
        description: "Delicate cherry blossoms dance with juicy peach and soft rose petals. Femininity in its purest form.",
        image: "https://images.unsplash.com/photo-1587556930900-4c4fc0e0d643?auto=format&fit=crop&w=500&q=60",
        altText: "Delicate pink and peach-toned perfume bottle with cherry blossom feminine aesthetic"
    },
    {
        id: 10,
        name: "Dark Chocolate & Rum",
        brand: "Gourmand Gallery",
        notes: ["dark chocolate", "rum", "coffee", "vanilla", "tonka bean"],
        occasions: ["evening", "club", "winter", "cozy", "sweet"],
        description: "An indulgent dessert-inspired scent. Rich dark chocolate swirled with aged rum and espresso notes.",
        image: "https://images.unsplash.com/photo-1610457047076-cd71cca79dd4?auto=format&fit=crop&w=500&q=60",
        altText: "Rich dark brown and chocolate-toned perfume bottle with gourmand dessert aesthetic"
    }
];

/* =====================================================
   SEARCH ALGORITHM
   ===================================================== */

/**
 * SearchEngine class - Encapsulates all search logic
 * Designed for easy extension and testing
 * In production: Replace database property with API endpoints
 */
class SearchEngine {
    constructor(database) {
        this.database = database;
        this.weights = {
            noteMatch: 3,        // Note matches are most important
            occasionMatch: 2,    // Occasion matches are secondary
            multiMatch: 1.5      // Bonus for multiple keyword matches
        };
    }
    
    /**
     * Parse user query into searchable tokens
     * @param {string} query - Raw user input
     * @returns {string[]}
     */
    parseQuery(query) {
        if (!query || typeof query !== 'string') return [];
        
        return query
            .toLowerCase()
            .split(/[,;\s]+/)
            .map(token => token.trim())
            .filter(token => token.length > 0);
    }
    
    /**
     * Calculate relevance score for a perfume against search tokens
     * @param {Object} perfume - Perfume object from database
     * @param {string[]} tokens - Search keywords
     * @returns {Object} - Score and matched keywords
     */
    calculateScore(perfume, tokens) {
        let score = 0;
        const matchedNotes = new Set();
        const matchedOccasions = new Set();
        
        tokens.forEach(token => {
            // Check notes (highest)
            perfume.notes.forEach(note => {
                if (note.toLowerCase().includes(token) || token.includes(note.toLowerCase())) {
                    score += this.weights.noteMatch;
                    matchedNotes.add(note);
                }
            });
            
            // Check occasions (medium)
            perfume.occasions.forEach(occasion => {
                if (occasion.toLowerCase().includes(token) || token.includes(occasion.toLowerCase())) {
                    score += this.weights.occasionMatch;
                    matchedOccasions.add(occasion);
                }
            });
            
            // Check name and brand (lower)
            if (perfume.name.toLowerCase().includes(token)) {
                score += 1;
            }
            if (perfume.brand.toLowerCase().includes(token)) {
                score += 1;
            }
        });
        
        // Apply bonus for multiple matches
        const totalMatches = matchedNotes.size + matchedOccasions.size;
        if (totalMatches > 1) {
            score *= (1 + (totalMatches - 1) * 0.1); // 10% bonus per additional match
        }
        
        return {
            score,
            matchedNotes: Array.from(matchedNotes),
            matchedOccasions: Array.from(matchedOccasions)
        };
    }
    
    /**
     * Main search method - Find and rank perfumes
     * @param {string} query - User search query
     * @returns {Object[]} - Array of perfumes with scores, sorted by relevance
     */
    search(query) {
        const tokens = this.parseQuery(query);
        
        // If no valid tokens, return empty array
        if (tokens.length === 0) {
            return [];
        }
        
        // Score perfumes
        const results = this.database
            .map(perfume => {
                const scoreData = this.calculateScore(perfume, tokens);
                return {
                    ...perfume,
                    score: scoreData.score,
                    matchedNotes: scoreData.matchedNotes,
                    matchedOccasions: scoreData.matchedOccasions,
                    // Calculate percentage match for display
                    matchPercentage: Math.min(100, Math.round((scoreData.score / (tokens.length * this.weights.noteMatch)) * 100))
                };
            })
            .filter(perfume => perfume.score > 0)
            // Sort by score descending (highest first)
            .sort((a, b) => b.score - a.score);
        
        return results;
    }
}

/* =====================================================
   UI CONTROLLER - DOM MANIPULATION & STATE MANAGEMENT
   Handles all user interface updates and interactions
   ===================================================== */


class UIController {
    constructor() {
        this.elements = {
            searchForm: document.getElementById('searchForm'),
            searchInput: document.getElementById('searchInput'),
            resultsGrid: document.getElementById('resultsGrid'),
            resultsHeader: document.getElementById('resultsHeader'),
            resultsCount: document.getElementById('resultsCount'),
            loadingState: document.getElementById('loadingState'),
            emptyState: document.getElementById('emptyState'),
            suggestionChips: document.querySelectorAll('.suggestion-chip'),
            themeToggle: document.getElementById('themeToggle')
        };
        
        // Current state
        this.state = {
            isLoading: false,
            currentResults: [],
            theme: localStorage.getItem('theme') || 'light'
        };
        
        this.initializeEventListeners();
        this.initializeTheme();
    }
    
    /**
     * Set up all event listeners
     */
    initializeEventListeners() {
        // Search form submission
        this.elements.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });
        
        // Suggestion chips
        this.elements.suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const query = chip.dataset.query;
                this.elements.searchInput.value = query;
                this.handleSearch();
            });
        });
        
        this.elements.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Real-time search on Enter key (already handled by form submit)
        // Could add debounced search-as-you-type here if desired
    }
    
    initializeTheme() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
    }
    
    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.state.theme);
        localStorage.setItem('theme', this.state.theme);
    }
    
    showLoading() {
        this.state.isLoading = true;
        this.elements.loadingState.hidden = false;
        this.elements.resultsHeader.hidden = true;
        this.elements.emptyState.hidden = true;
        this.elements.resultsGrid.innerHTML = '';
    }
    
    hideLoading() {
        this.state.isLoading = false;
        this.elements.loadingState.hidden = true;
    }
    
    showEmptyState() {
        this.elements.emptyState.hidden = false;
        this.elements.resultsHeader.hidden = true;
        this.elements.resultsGrid.innerHTML = '';
    }
    
    /**
     * Render search results
     * @param {Object[]} results - Array of perfume results
     */
    renderResults(results) {
        this.state.currentResults = results;
        
        if (results.length === 0) {
            this.showEmptyState();
            return;
        }
        
        // Update results
        this.elements.resultsCount.textContent = results.length;
        this.elements.resultsHeader.hidden = false;
        this.elements.emptyState.hidden = true;
        
        const cardsHTML = results.map(perfume => this.createPerfumeCard(perfume)).join('');
        
        // Update DOM
        this.elements.resultsGrid.innerHTML = cardsHTML;
        
        this.elements.resultsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
/**
 * @param {Object} perfume - Perfume object with score data
 * @returns {string}
 */
createPerfumeCard(perfume) {
    // Luxury-themed fallback image matching the app's aesthetic
    const fallbackImage = "https://placehold.co/600x400/1a1a1a/D4AF37?text=Luxury+Perfume&font=source-serif-pro";
    
    return `
        <article class="perfume-card" role="article" aria-label="${perfume.name} by ${perfume.brand}">
            <div class="card-image-wrapper">
                <img 
                    src="${perfume.image}" 
                    alt="${this.escapeHtml(perfume.altText || perfume.name)}" 
                    class="card-image"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='${fallbackImage}';"
                >
                <div class="match-score" aria-label="Match score">
                    ${perfume.matchPercentage}% Match
                </div>
            </div>
            
            <div class="card-content">
                <div class="card-brand">${this.escapeHtml(perfume.brand)}</div>
                <h4 class="card-name">${this.escapeHtml(perfume.name)}</h4>
                <p class="card-description">${this.escapeHtml(perfume.description)}</p>
                
                <div class="card-meta">
                    <div class="card-notes">
                        <span class="meta-label">Notes:</span>
                        ${perfume.notes.map(note => 
                            `<span class="tag ${perfume.matchedNotes.includes(note) ? 'highlight' : ''}">${this.escapeHtml(note)}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="card-occasions">
                        <span class="meta-label">Best for:</span>
                        ${perfume.occasions.map(occasion => 
                            `<span class="tag ${perfume.matchedOccasions.includes(occasion) ? 'highlight' : ''}">${this.escapeHtml(occasion)}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </article>
    `;
}
    
    /**
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Handle search execution
     */
    handleSearch() {
        const query = this.elements.searchInput.value.trim();
        
        if (!query) {
            return;
        }
        
        // Show loading state
        this.showLoading();
        
        // Simulate API delay for realistic UX
        // Replace with actual API call
        setTimeout(() => {
            const results = app.searchEngine.search(query);
            this.hideLoading();
            this.renderResults(results);
        }, 500);
    }
}

/* =====================================================
   APPLICATION INITIALIZATION
   Main app controller that ties everything together
   ===================================================== */

class App {
    constructor() {
        // Initialize search engine with database
        // In production: Pass API service instead
        this.searchEngine = new SearchEngine(perfumeDatabase);
        
        // Initialize UI controller
        this.uiController = new UIController();
        
        console.log('🌸 Essence Finder initialized successfully');
        console.log(`📊 Database loaded: ${perfumeDatabase.length} perfumes`);
    }
    
    /**
     * Public method to search (can be called from console for testing)
     * @param {string} query - Search query
     */
    search(query) {
        this.uiController.elements.searchInput.value = query;
        this.uiController.handleSearch();
    }
}

/* =====================================================
   BOOTSTRAP
   ===================================================== */

let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    try {
        app = new App();
        
        // Expose app to window for debugging/testing
        // Remove in production or add feature flag
        window.essenceFinder = app;
        
    } catch (error) {
        console.error('Failed to initialize Essence Finder:', error);
        
        // Show user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
        `;
        errorMessage.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: #c92a2a;">Initialization Error</h3>
            <p style="margin-bottom: 1rem; color: #666;">Sorry, something went wrong. Please refresh the page.</p>
            <button onclick="location.reload()" style="padding: 0.5rem 1rem; background: #8B7355; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Refresh Page
            </button>
        `;
        document.body.appendChild(errorMessage);
    }
}

/* =====================================================
   FUTURE ENHANCEMENTS & SCALABILITY NOTES
   ===================================================== */

/*
 * PLAN INTEGRACJI API:
 * 
 * 1. Zastąpić perfumeDatabase usługą API:
 *    class APIService {
 *        async fetchPerfumes() { ... }
 *        async searchPerfumes(query) { ... }
 *    }
 * 
 * 2. Dodać warstwę cachowania:
 *    - Cachować wyniki wyszukiwania w SessionStorage
 *    - Wdrożyć wyszukiwanie z debounce'owaniem dla wyników w czasie rzeczywistym
 *    - Dodać service worker dla możliwości offline'owej
 * 
 * 3. Zarządzanie stanem:
 *    - Zintegrować Redux/Zustand dla złożonego stanu
 *    - Dodać parametry URL dla wyników dających się udostępniać
 *    - Wdrożyć historię wyszukiwania
 * 
 * 4. Zaawansowane funkcje:
 *    - Filtry (zakres ceny, marka, dostępność)
 *    - Opcje sortowania (cena, popularność, nazwa)
 *    - Paginacja dla dużych zbiorów wyników
 *    - Funkcjonalność ulubionych/wishlisty
 *    - Autentykacja użytkownika i personalizacja
 * 
 * 5. Analityka:
 *    - Śledzić popularne wyszukiwania
 *    - Monitorować wskaźnik sukcesu wyszukiwania
 *    - Testy A/B różnych algorytmów
 * 
 * 6. Optymalizacja wydajności:
 *    - Wdrożyć wirtualne przewijanie dla dużych list
 *    - Leniwe ładowanie obrazów za pomocą IntersectionObserver
 *    - Podziały kodu dla szybszego wstępnego ładowania
 * 
 * 7. Testowanie:
 *    - Testy jednostkowe dla SearchEngine
 *    - Testy integracyjne dla interakcji UI
 *    - Testy E2E z Playwright/Cypress
 * 
 * 8. Migracja do frameworka:
 *    - Ta architektura mapuje się czystą na komponenty React:
 *      - SearchEngine → Custom Hook (useSearch)
 *      - UIController → Komponenty React ze stanem
 *      - App → Context Provider lub magazyn Redux
 */



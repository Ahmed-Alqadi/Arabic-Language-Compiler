/**
 * JavaScript الرئيسي للموقع التوثيقي - مترجم لغة البرمجة العربية
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight Active Nav Link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Setup Copy Code Buttons
    document.querySelectorAll('.code-block').forEach(block => {
        const header = block.querySelector('.code-header');
        if (header && !header.querySelector('.btn-copy')) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'btn btn-secondary btn-sm btn-copy';
            copyBtn.innerHTML = '📋 نسخ الكود';
            copyBtn.style.padding = '0.2rem 0.6rem';
            copyBtn.style.fontSize = '0.75rem';
            
            copyBtn.addEventListener('click', () => {
                const code = block.querySelector('pre, .code-content')?.innerText || '';
                navigator.clipboard.writeText(code).then(() => {
                    copyBtn.innerHTML = '✅ تم النسخ!';
                    copyBtn.style.color = 'var(--accent-green)';
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋 نسخ الكود';
                        copyBtn.style.color = '';
                    }, 2000);
                });
            });
            header.appendChild(copyBtn);
        }
    });

    // 3. Interactive IDE Mockup Tabs
    const ideTabHeaders = document.querySelectorAll('.ide-tab-header');
    const ideTabContents = document.querySelectorAll('.ide-tab-pane');

    if (ideTabHeaders.length > 0) {
        ideTabHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const targetTab = header.getAttribute('data-tab');
                
                ideTabHeaders.forEach(h => h.classList.remove('active'));
                ideTabContents.forEach(c => c.style.display = 'none');
                
                header.classList.add('active');
                const activeContent = document.getElementById(targetTab);
                if (activeContent) {
                    activeContent.style.display = 'block';
                }
            });
        });
    }

    // 4. Interactive File Filter (for architecture.html)
    const fileSearchInput = document.getElementById('fileSearch');
    if (fileSearchInput) {
        fileSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const fileCards = document.querySelectorAll('.file-detail-card');
            
            fileCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Helper: Show notification modal or alert
function showInfoModal(title, text) {
    alert(`${title}\n\n${text}`);
}

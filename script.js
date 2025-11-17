// 导航栏功能
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 关闭移动端菜单当点击链接时
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 滚动时改变导航栏样式
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 平滑滚动到指定部分
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// 作品集数据管理
class PortfolioManager {
    constructor() {
        this.portfolioData = [];
        this.filteredData = [];
        this.currentCategory = 'all';
        this.currentSearch = '';
        this.currentSort = 'default';
        this.init();
    }

    async init() {
        await this.loadPortfolioData();
        this.renderCategoryButtons();
        this.renderPortfolioGrid();
        this.setupEventListeners();
    }

    async loadPortfolioData() {
        try {
            // 使用实际上传的图片文件
            const actualImages = [
                "public/images/20251117_180014_test-photo.jpg",
                "public/images/20251117_180014_test-icon.png", 
                "public/images/20251117_180014_test-sample.png",
                "public/images/20251117_180014_test-sample.jpg",
                "public/images/20251117_180014_test-image.png"
            ];

            this.portfolioData = [
                {
                    id: 1,
                    title: "摄影作品展示",
                    category: "摄影",
                    image: actualImages[0],
                    description: "高质量的商业摄影作品，展现产品细节和品牌特色，专业摄影技术与艺术审美的完美结合。",
                    techStack: ["专业相机", "灯光设备", "后期处理"],
                    completionDate: "2024-03-15",
                    featured: true,
                    tags: ["商业摄影", "产品展示", "品牌形象"]
                },
                {
                    id: 2,
                    title: "图标设计作品",
                    category: "UI设计", 
                    image: actualImages[1],
                    description: "现代化图标设计系列，简约而不简单，适用于移动应用和网站界面设计。",
                    techStack: ["Figma", "Sketch", "Adobe Illustrator"],
                    completionDate: "2024-02-28",
                    featured: true,
                    tags: ["图标", "UI设计", "界面元素"]
                },
                {
                    id: 3,
                    title: "创意视觉设计",
                    category: "视觉设计",
                    image: actualImages[2],
                    description: "富有创意的视觉设计作品，色彩搭配和谐，视觉冲击力强，适合品牌宣传和推广。",
                    techStack: ["Photoshop", "Illustrator", "色彩理论"],
                    completionDate: "2024-01-20",
                    featured: false,
                    tags: ["创意设计", "色彩", "视觉传达"]
                },
                {
                    id: 4,
                    title: "商业样本设计",
                    category: "品牌设计",
                    image: actualImages[3],
                    description: "专业的商业样本设计，体现品牌价值和企业形象，适合各类商业用途和宣传材料。",
                    techStack: ["InDesign", "品牌策略", "排版设计"],
                    completionDate: "2023-12-10",
                    featured: true,
                    tags: ["商业设计", "品牌推广", "样本"]
                },
                {
                    id: 5,
                    title: "数字艺术创作",
                    category: "数字艺术",
                    image: actualImages[4],
                    description: "数字媒体艺术创作，结合传统艺术理念与现代数字技术，展现独特的艺术风格。",
                    techStack: ["数字绘画", "混合媒体", "艺术创作"],
                    completionDate: "2023-11-25",
                    featured: false,
                    tags: ["数字艺术", "创作", "媒体混合"]
                }
                    completionDate: "2023-12-10",
                    featured: true,
                    tags: ["品牌设计", "视觉识别", "Logo设计", "品牌指南"]
                },
                {
                    id: 6,
                    title: "界面原型设计",
                    category: "UI设计",
                    image: "https://picsum.photos/400/250?random=6",
                    description: "移动应用界面原型设计，注重用户体验和交互流程，提供高保真原型和设计规范。",
                    techStack: ["Figma", "Sketch", "原型设计", "交互设计"],
                    completionDate: "2023-10-18",
                    featured: false,
                    tags: ["原型设计", "交互设计", "移动端"]
                },
                {
                    id: 7,
                    title: "品牌推广设计",
                    category: "品牌设计",
                    image: "https://picsum.photos/400/250?random=7",
                    description: "完整的品牌推广设计方案，包括海报、传单、社交媒体素材等多种宣传物料。",
                    techStack: ["Photoshop", "Illustrator", "品牌策略", "营销设计"],
                    completionDate: "2023-09-22",
                    featured: true,
                    tags: ["品牌推广", "营销物料", "社交媒体"]
                },
                {
                    id: 8,
                    title: "网站界面优化",
                    category: "网页设计",
                    image: "https://picsum.photos/400/250?random=8",
                    description: "对现有网站进行界面优化和用户体验提升，提高页面加载速度和用户转化率。",
                    techStack: ["UI优化", "性能优化", "用户体验", "数据分析"],
                    completionDate: "2023-08-30",
                    featured: false,
                    tags: ["界面优化", "性能提升", "用户体验"]
                }
            ];
            this.filteredData = [...this.portfolioData];
        } catch (error) {
            console.error('加载作品集数据失败:', error);
            this.showErrorMessage('加载作品集数据失败，请刷新页面重试。');
        }
    }

    renderCategoryButtons() {
        const categoryNav = document.getElementById('categoryNav');
        const categories = ['all', ...new Set(this.portfolioData.map(item => item.category))];
        
        categoryNav.innerHTML = categories.map(category => {
            const categoryName = category === 'all' ? '全部作品' : category;
            const isActive = category === this.currentCategory ? 'active' : '';
            return `
                <button class="category-btn ${isActive}" data-category="${category}">
                    ${categoryName}
                </button>
            `;
        }).join('');
    }

    renderPortfolioGrid() {
        const portfolioGrid = document.getElementById('portfolioGrid');
        
        if (this.filteredData.length === 0) {
            portfolioGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; color: #bdc3c7; margin-bottom: 1rem;"></i>
                    <h3>没有找到匹配的作品</h3>
                    <p>请尝试调整搜索关键词或选择其他分类</p>
                </div>
            `;
            return;
        }

        portfolioGrid.innerHTML = this.filteredData.map(item => `
            <div class="portfolio-card fade-in" data-id="${item.id}" data-category="${item.category}">
                <div class="card-image">
                    ${item.title}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <span class="card-category">${item.category}</span>
                    <p class="card-description">${item.description}</p>
                    <div class="tech-stack">
                        ${item.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // 添加点击事件
        portfolioGrid.querySelectorAll('.portfolio-card').forEach(card => {
            card.addEventListener('click', () => {
                const itemId = parseInt(card.getAttribute('data-id'));
                this.openModal(itemId);
            });
        });
    }

    setupEventListeners() {
        // 分类筛选
        document.getElementById('categoryNav').addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                const category = e.target.getAttribute('data-category');
                this.filterByCategory(category);
                
                // 更新按钮状态
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });

        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.currentSearch = e.target.value.trim();
                this.applyFilters();
            }, 300);
        });

        // 排序功能
        const sortSelect = document.getElementById('sortSelect');
        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applyFilters();
        });

        // 模态框关闭
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // 点击模态框外部关闭
        document.getElementById('portfolioModal').addEventListener('click', (e) => {
            if (e.target.id === 'portfolioModal') {
                this.closeModal();
            }
        });
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.applyFilters();
    }

    applyFilters() {
        let filtered = this.portfolioData;

        // 分类筛选
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(item => item.category === this.currentCategory);
        }

        // 搜索筛选
        if (this.currentSearch) {
            const searchTerm = this.currentSearch.toLowerCase();
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.techStack.some(tech => tech.toLowerCase().includes(searchTerm)) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }

        // 排序
        filtered = this.sortData(filtered);

        this.filteredData = filtered;
        this.renderPortfolioGrid();
    }

    sortData(data) {
        switch (this.currentSort) {
            case 'date-desc':
                return data.sort((a, b) => new Date(b.completionDate) - new Date(a.completionDate));
            case 'date-asc':
                return data.sort((a, b) => new Date(a.completionDate) - new Date(b.completionDate));
            case 'title-asc':
                return data.sort((a, b) => a.title.localeCompare(b.title));
            case 'title-desc':
                return data.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return data.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return new Date(b.completionDate) - new Date(a.completionDate);
                });
        }
    }

    openModal(itemId) {
        const item = this.portfolioData.find(item => item.id === itemId);
        if (!item) return;

        const modal = document.getElementById('portfolioModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalImage = document.getElementById('modalImage');
        const modalCategory = document.getElementById('modalCategory');
        const modalDescription = document.getElementById('modalDescription');
        const modalTechStack = document.getElementById('modalTechStack');
        const modalLinks = document.getElementById('modalLinks');

        modalTitle.textContent = item.title;
        modalImage.innerHTML = item.title;
        modalCategory.textContent = item.category;
        modalDescription.textContent = item.description;

        // 技术栈
        modalTechStack.innerHTML = item.techStack.map(tech => 
            `<span class="modal-tech-badge">${tech}</span>`
        ).join('');

        // 链接
        modalLinks.innerHTML = '';
        if (item.demoUrl) {
            modalLinks.innerHTML += `<a href="${item.demoUrl}" target="_blank" class="modal-link demo">查看演示</a>`;
        }
        if (item.githubUrl) {
            modalLinks.innerHTML += `<a href="${item.githubUrl}" target="_blank" class="modal-link">GitHub</a>`;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('portfolioModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    showErrorMessage(message) {
        const portfolioGrid = document.getElementById('portfolioGrid');
        portfolioGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e74c3c; margin-bottom: 1rem;"></i>
                <h3>加载失败</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">重新加载</button>
            </div>
        `;
    }
}

// 技能进度条动画
function animateSkillBars() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.getAttribute('data-width');
                progress.style.width = width + '%';
                observer.unobserve(progress);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillProgresses.forEach(progress => {
        observer.observe(progress);
    });
}

// 表单提交处理
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // 这里可以添加实际的表单提交逻辑
    console.log('表单数据:', data);
    
    // 显示成功消息
    alert('消息发送成功！我会尽快回复您。');
    
    // 重置表单
    this.reset();
});

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化作品集管理器
    new PortfolioManager();
    
    // 初始化技能进度条动画
    animateSkillBars();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 添加滚动监听器用于激活当前部分
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// 性能优化：图片懒加载
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
// ================================================
// DEBAN LP - カスタムJavaScript
// ================================================

(function() {
    'use strict';

    // ================================================
    // DOM要素の取得
    // ================================================
    const floatingCta = document.getElementById('floatingCta');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // ================================================
    // スムーススクロール機能
    // ================================================
    function initSmoothScroll() {
        // すべての内部リンクを取得
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                // #のみの場合はスキップ
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ================================================
    // フローティングCTAボタンの表示/非表示
    // ================================================
    function handleFloatingCta() {
        // フローティングCTA要素の存在確認
        if (!floatingCta) return;
        
        // スクロール位置を取得
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // 画面の高さの半分以上スクロールしたら表示
        if (scrollPosition > windowHeight / 2) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    }

    // ================================================
    // FAQアコーディオン機能
    // ================================================
    function initFaqAccordion() {
        if (!faqItems || faqItems.length === 0) return;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;
            
            question.addEventListener('click', function() {
                // すでにアクティブな場合は閉じる
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                } else {
                    // 他の開いているアイテムを閉じる
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // クリックされたアイテムを開く
                    item.classList.add('active');
                }
            });
        });
    }

    // ================================================
    // CTAボタンのクリック追跡（アナリティクス用）
    // ================================================
    function trackCTAClicks() {
        const ctaButtons = document.querySelectorAll('[href*="trial"], [href*="demo"], [href*="calendly"]');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                const buttonHref = this.getAttribute('href');
                
                console.log('CTA Clicked:', {
                    text: buttonText,
                    href: buttonHref,
                    timestamp: new Date().toISOString()
                });
                
                // Google Analytics や他のアナリティクスツールがある場合はここで追跡
                // 例: gtag('event', 'cta_click', { button_text: buttonText });
            });
        });
    }

    // ================================================
    // スクロールアニメーション（Intersection Observer）
    // ================================================
    function initScrollAnimation() {
        // アニメーション対象の要素を取得
        const animatedElements = document.querySelectorAll('.reason-card, .problem-card, .solution-feature, .flow-step, .faq-item');
        
        // Intersection Observer のオプション
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Intersection Observer のコールバック
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 要素が画面内に入ったらアニメーションを適用
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // 一度アニメーションしたら監視を解除
                    observer.unobserve(entry.target);
                }
            });
        };
        
        // Observer を作成
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // 各要素に初期スタイルを設定し、監視を開始
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // ================================================
    // ヘッダーのスクロール時の影追加
    // ================================================
    function handleHeaderShadow() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    }

    // ================================================
    // フォーム送信の処理（トライアル申し込み）
    // ================================================
    function handleFormSubmit() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                // ここでフォームのバリデーションやデータ送信処理を行う
                console.log('Form submitted:', {
                    form: this,
                    timestamp: new Date().toISOString()
                });
                
                // 実際のフォーム送信処理をここに追加
                // 例: Googleフォーム連携、API呼び出しなど
            });
        });
    }

    // ================================================
    // ページ読み込み完了時の処理
    // ================================================
    function handlePageLoad() {
        // ローディングアニメーションなどがある場合はここで処理
        document.body.classList.add('loaded');
        
        console.log('DEBAN LP Loaded:', {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
    }

    // ================================================
    // デバイス判定
    // ================================================
    function detectDevice() {
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile = /iphone|ipad|ipod|android/.test(userAgent);
        const isTablet = /ipad|android/.test(userAgent) && !/mobile/.test(userAgent);
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
        }
        if (isTablet) {
            document.body.classList.add('tablet-device');
        }
        
        return { isMobile, isTablet };
    }

    // ================================================
    // 外部リンクに rel="noopener" を自動追加
    // ================================================
    function handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            const rel = link.getAttribute('rel') || '';
            if (!rel.includes('noopener')) {
                link.setAttribute('rel', rel + ' noopener noreferrer');
            }
        });
    }

    // ================================================
    // パフォーマンス測定
    // ================================================
    function measurePerformance() {
        if ('performance' in window && 'timing' in performance) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const perfData = performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const connectTime = perfData.responseEnd - perfData.requestStart;
                    const renderTime = perfData.domComplete - perfData.domLoading;
                    
                    console.log('Performance Metrics:', {
                        pageLoadTime: pageLoadTime + 'ms',
                        connectTime: connectTime + 'ms',
                        renderTime: renderTime + 'ms'
                    });
                }, 0);
            });
        }
    }

    // ================================================
    // イベントリスナーの設定
    // ================================================
    function initEventListeners() {
        // スクロールイベント
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            // パフォーマンス最適化のためスロットリング
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(function() {
                handleFloatingCta();
                handleHeaderShadow();
            });
        });
        
        // リサイズイベント
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                console.log('Window resized:', {
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 250);
        });
        
        // ページ読み込み完了イベント
        window.addEventListener('load', handlePageLoad);
    }

    // ================================================
    // お問い合わせフォーム送信処理（Formspree対応）
    // ================================================
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            // デフォルトのsubmitイベントを完全に防止
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                
                // 送信中の表示
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
                
                // FormDataオブジェクトを作成
                const formData = new FormData(contactForm);
                
                // Formspreeに送信
                fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // 送信成功
                        alert('お問い合わせを送信しました。ありがとうございます。\n担当者より折り返しご連絡いたします。');
                        contactForm.reset();
                    } else {
                        // エラー処理
                        response.json().then(data => {
                            if (data.errors) {
                                alert('送信に失敗しました。入力内容をご確認ください。');
                            } else {
                                alert('送信に失敗しました。しばらくしてから再度お試しください。');
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('送信中にエラーが発生しました。インターネット接続をご確認ください。');
                })
                .finally(() => {
                    // ボタンを元に戻す
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                });
                
                // コンソールログ（分析用）
                console.log('Contact form submitted via Formspree');
            }, true);
        }
    }

    // ================================================
    // 初期化処理
    // ================================================
    function init() {
        console.log('Initializing DEBAN LP...');
        
        // 各機能の初期化
        detectDevice();
        initSmoothScroll();
        initFaqAccordion();
        initScrollAnimation();
        trackCTAClicks();
        initContactForm();
        handleExternalLinks();
        initEventListeners();
        measurePerformance();
        
        // 初回実行
        handleFloatingCta();
        handleHeaderShadow();
        
        console.log('DEBAN LP Initialized successfully!');
    }

    // ================================================
    // DOMContentLoaded イベントで初期化
    // ================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOMが既に読み込まれている場合は即座に実行
        init();
    }

})();
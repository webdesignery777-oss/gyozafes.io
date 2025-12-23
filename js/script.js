// ===============================
// トップページ：スクロールでヘッダー出現
// ===============================
document.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero');

  // hero が存在するページ（＝トップページ）のみ処理
  if (hero && header) {
    if (window.scrollY > 200) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }
  }
});

// ===============================
// ハンバーガーメニュー開閉（☰→×）
// ===============================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // ☰ → × に切り替え
    nav.classList.toggle('active');       // メニュー開閉
  });
}

// ===============================
// 下層ページ用：ヘッダー高さに応じて main の余白を自動調整
// （レスポンシブ対応）
// ===============================
function adjustMainPadding() {
  const body = document.body;

  // 下層ページ（body に .subpage が付いている）だけ実行
  if (body.classList.contains('subpage')) {
    const header = document.querySelector('.site-header');
    const main = document.querySelector('main');

    if (header && main) {
      // ヘッダーの高さを取得して main の上余白に反映
      main.style.paddingTop = `${header.offsetHeight}px`;
    }
  }
}

// DOM 読み込み後に初回実行
window.addEventListener('DOMContentLoaded', () => {
  adjustMainPadding();

  // ウィンドウリサイズ時にも再計算
  window.addEventListener('resize', adjustMainPadding);
});

// ===============================
// トップへのボタン
// 
// ===============================
const button = document.querySelector('.pagetop');

button.addEventListener('click', () => {
  window.scroll({ 
    top: 0, 
    behavior: "smooth"
  });
});

window.addEventListener('scroll', () => {
  if(window.scrollY > 100){
    button.classList.add('is-active');
  }else{
    button.classList.remove('is-active');
  }
});

// ===============================
// 日付に日本語の曜日を付与
// 
// ===============================
// 全ての .news-date 要素を取得
  document.querySelectorAll('.news-date').forEach(el => {
    const dateStr = el.getAttribute('datetime'); // "2030-02-16"
    const date = new Date(dateStr);

    // 曜日の配列（0:日〜6:土）
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const day = weekdays[date.getDay()];

    // 表示を「yyyy.mm.dd(曜)」に整形
    const formatted = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${day})`;

    // 要素の中身を更新
    el.textContent = formatted;
  });

// ===============================
// ページ内リンク時にヘッダーの高さをずらす
// 
// ===============================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    const header = document.querySelector('.site-header-height');
    const headerHeight = header ? header.offsetHeight : 0; // ←現在の高さを取得
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  });
});
window.addEventListener('load', () => {
  const hash = location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    const header = document.querySelector('.site-header-height');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

    window.scrollTo({ top: targetTop });
  }
});
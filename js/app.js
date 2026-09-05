/* ============================================================
 * app.js —— 入口：注册 SW、读状态、渲染、定期刷新
 * ============================================================ */
'use strict';
(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const store = window.DM.store;
    store.load();

    if ('serviceWorker' in navigator) {
      // 带随机参数注册：每次访问都检查最新版 SW，防止旧代码缓存残留
      navigator.serviceWorker.register('./sw.js?r=' + Date.now()).catch(() => {});
    }

    window.DM.ui.init();

    // 每分钟刷新一次“天数”，保证跨天/临界状态正确
    setInterval(() => { window.DM.ui.refreshClock(); }, 60000);

    // 提醒调度：打开页面时把清单同步给 SW（并在前台到点直接提醒）
    window.DM.ui.syncReminders();
    setInterval(() => { window.DM.ui.syncReminders(); }, 15 * 60000);
  });
})();

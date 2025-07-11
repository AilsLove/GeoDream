// 初始化地图
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 免费次数跟踪
const MAX_FREE = 3;
let used = parseInt(localStorage.getItem('freeCount') || '0', 10);

// 随机梦境模板
const dreams = [
  coords => `你在(${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)})的星空下漫步，耳边响起远方海浪的回声，梦境开始变得透明又沉重。`,
  coords => `坐标(${coords.lat.toFixed(1)}, ${coords.lng.toFixed(1)})映射出一座遗忘之城，你在迷雾中追寻一个飘渺的低语。`,
  coords => `当经度${coords.lng.toFixed(0)}和纬度${coords.lat.toFixed(0)}交汇，时间停滞，你看见内心深处的光。`,
  coords => `风将(${coords.lat.toFixed(1)}, ${coords.lng.toFixed(1)})的尘埃吹散，留下悬浮的记忆碎片，构成一幅流动的画面。`
];

// 点击记录坐标
let lastCoords = null;
map.on('click', e => {
  lastCoords = e.latlng;
  document.getElementById('result').textContent = '';
});

// 生成梦境
document.getElementById('genBtn').addEventListener('click', () => {
  const res = document.getElementById('result');
  if (!lastCoords) {
    res.textContent = '请先点击地图选取一个坐标。';
    return;
  }
  if (used < MAX_FREE) {
    used++;
    localStorage.setItem('freeCount', used);
    const idx = Math.floor(Math.random() * dreams.length);
    res.textContent = dreams[idx](lastCoords);
  } else {
    res.innerHTML = '免费次数已用完。<br><strong>订阅解锁更多梦境</strong>';
  }
});

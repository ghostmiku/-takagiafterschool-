/* 漫画资源位置：部署后改为你的媒体站或对象存储的 HTTPS 根地址，并保留末尾 /。 */
window.TAKAGI_MEDIA_BASE = 'https://ghostmiku.github.io/takagi-manga-media/';
window.resolveMangaMedia = function(path) {
  const base = new URL(window.TAKAGI_MEDIA_BASE, document.baseURI);
  if (!base.pathname.endsWith('/')) throw new Error('漫画资源根地址必须以 / 结尾');
  return new URL(path, base).href;
};

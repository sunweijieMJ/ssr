// js顺序执行
const loadScript = (container, url, callback) => {
  let script = document.createElement('script');
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => {
      callback();
    };
  }
  script.src = url;
  container.appendChild(script);
};

export {
  loadScript
};

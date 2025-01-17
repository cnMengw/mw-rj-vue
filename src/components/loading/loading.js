import Vue from 'vue';
Vue.directive('loading', {
    bind(el, binding) {
        // 创建加载的 DOM 元素
        const loadingContainer = document.createElement('div');
        loadingContainer.className = 'custom-loading';
        loadingContainer.style.position = 'absolute';
        loadingContainer.style.top = 0;
        loadingContainer.style.left = 0;
        loadingContainer.style.width = '100%';
        loadingContainer.style.height = '100%';
        loadingContainer.style.display = 'flex';
        loadingContainer.style.alignItems = 'center';
        loadingContainer.style.justifyContent = 'center';
        loadingContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        loadingContainer.style.zIndex = 9999;
        loadingContainer.style.pointerEvents = 'none';

        // 加入 vantd 的加载动画
        const spin = document.createElement('div');
        spin.innerHTML = '<a-spin size="large"></a-spin>';
        loadingContainer.appendChild(spin);

        // 初始状态
        el._loading = loadingContainer;
        if (binding.value) {
            el.style.position = 'relative';
            el.appendChild(loadingContainer);
        }
    },
    update(el, binding) {
        if (binding.value) {
            el.style.position = 'relative';
            if (!el.contains(el._loading)) {
                el.appendChild(el._loading);
            }
        } else {
            if (el.contains(el._loading)) {
                el.removeChild(el._loading);
            }
        }
    },
    unbind(el) {
        if (el._loading && el.contains(el._loading)) {
            el.removeChild(el._loading);
        }
        el._loading = null;
    },
});

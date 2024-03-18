// ==UserScript==
// @name         Google Search Helper
// @namespace    http://tampermonkey.net/
// @version      2024-01-21
// @description  try to take over the world!
// @author       松柏
// @match        https://www.google.com/search?*
// @match        https://www.google.com.hk/search?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    let [command, option] = [91, 18];
    let [one, nine] = [49, 57];
    let [j, k] = [74, 75];
    let scrollHeight = window.innerHeight / 300


    //对整个页面监听
    document.onkeydown = function (e) {
        //获取被按下的键值
        let keyNum = window.event ? e.keyCode : e.which;
        // 打开页面
        if (e.metaKey && e.altKey) {
            if (keyNum >= one && keyNum <= nine) {
                // 类名
                let className = 'LC20lb MBeuO DKV0Md';

                const result = Array.from(document.getElementsByClassName(className)).filter(node => node.getBoundingClientRect().top > 0);
                result[keyNum - 49].click()
            }
        } else if (keyNum === j) {
            scrollWithAnimation(scrollHeight)
        } else if (keyNum === k) {
            scrollWithAnimation(-scrollHeight)
        }
    }

    window.addEventListener('scroll', () => {
        refreshIndex()
    });

    refreshIndex();


    function refreshIndex() {
        // 类名
        let className = 'LC20lb MBeuO DKV0Md';

        const result = Array.from(document.getElementsByClassName(className)).filter(node => node.getBoundingClientRect().top > 0);
        for (let i = 0; i < result.length; i++) {
            const node = result[i];
            let newSpan = node.parentNode.getElementsByClassName("p_no")[0];
            if (newSpan) {
                newSpan.remove();
            }
            // 创建一个新的 span 元素
            newSpan = document.createElement("span");
            newSpan.style = 'font-size: 30px;color: skyblue'
            newSpan.className = 'p_no'
            newSpan.innerHTML = i + 1;
            node.parentNode.insertBefore(newSpan, node);// 设置 span 元素的内容
        }
    }

    // 获取当前滚动位置
    function getScrollPosition() {
        return window.scrollY || window.pageYOffset;
    }

    // 实现滚动动画
    function scrollWithAnimation(targetPosition) {
        const startPosition = getScrollPosition();
        // const distance = targetPosition - startPosition;
        const duration = 1500; // 动画持续时间，单位毫秒
        let startTime;

        function step(timestamp) {
            // startTime 开始时间
            // timestamp 当前时间
            if (!startTime) startTime = timestamp;
            // 已执行时间
            const progress = timestamp - startTime;
            // 当前进度， 0 - 1 之间
            const percentage = Math.min(progress / duration, 1);
            const easing = easeOutQuad(percentage);

            window.scrollBy(0, targetPosition * easing);

            if (progress < duration) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    // 线性插值函数
    function easeOutQuad(t) {
        return -1 * t * t + 1;
    }
})();

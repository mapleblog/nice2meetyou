// 功能模块管理
document.addEventListener('DOMContentLoaded', function() {
    // 功能标签切换
    initializeFeatureTabs();

    // 初始化功能标签切换
    function initializeFeatureTabs() {
        const featureTabs = document.querySelectorAll('.feature-tab');
        const featureContents = document.querySelectorAll('.feature-content');
        
        featureTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有标签的活动状态
                featureTabs.forEach(t => t.classList.remove('active'));
                
                // 隐藏所有内容区域
                featureContents.forEach(content => content.classList.remove('active'));
                
                // 激活当前标签
                this.classList.add('active');
                
                // 显示对应的内容区域
                const targetId = this.getAttribute('data-target');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

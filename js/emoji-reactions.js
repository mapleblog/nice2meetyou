/**
 * 留言表情功能模块
 * 支持跨设备同步显示表情反应
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // 立即初始化表情功能模块
    initEmojiReactions();
    
    function initEmojiReactions() {
        // 检查Firebase是否已加载
        if (typeof firebase === 'undefined' || firebase.apps.length === 0) {
            console.error('Firebase未初始化，无法使用表情功能');
            return;
        }
        
        // 获取设备ID
        let deviceId = localStorage.getItem('device_id');
        if (!deviceId) {
            deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('device_id', deviceId);
        }
        
        // 表情选项
        const emojiOptions = [
            { emoji: '👍', name: 'thumbs_up', label: '赞' },
            { emoji: '❤️', name: 'heart', label: '爱心' },
            { emoji: '😄', name: 'smile', label: '笑脸' },
            { emoji: '😮', name: 'wow', label: '哇' },
            { emoji: '😢', name: 'sad', label: '难过' },
            { emoji: '👏', name: 'clap', label: '鼓掌' }
        ];
        
        /**
         * 初始化表情反应功能
         * @param {string} itemType - 项目类型 (MESSAGE, MOOD, WISH)
         * @param {string} itemId - 项目ID
         * @param {HTMLElement} container - 容器元素
         */
        function initEmojiReactions(itemType, itemId, container) {
            
            // 创建表情反应容器
            const reactionsContainer = document.createElement('div');
            reactionsContainer.className = 'emoji-reactions-container';
            reactionsContainer.dataset.itemType = itemType;
            reactionsContainer.dataset.itemId = itemId;
            
            // 直接创建所有表情按钮
            emojiOptions.forEach(option => {
                const emojiButton = document.createElement('button');
                emojiButton.className = 'emoji-button';
                emojiButton.dataset.emoji = option.name;
                emojiButton.title = option.label;
                
                // 只显示表情图标，不显示计数器
                emojiButton.innerHTML = `<span class="emoji">${option.emoji}</span>`;
                
                // 添加点击事件
                emojiButton.addEventListener('click', function() {
                    toggleEmoji(itemType, itemId, option.name, reactionsContainer);
                });
                
                reactionsContainer.appendChild(emojiButton);
            });
            
            // 添加到容器
            container.appendChild(reactionsContainer);
            
            // 加载已有的表情反应
            loadEmojiReactions(itemType, itemId, reactionsContainer);
            
            return reactionsContainer;
        }
        
        /**
         * 加载表情反应
         */
        function loadEmojiReactions(itemType, itemId, container) {
            const db = firebase.database();
            const basePath = `emoji_reactions/${itemType}/${itemId}`;
            
            db.ref(basePath).on('value', snapshot => {
                const data = snapshot.val() || {};
                
                // 更新所有表情按钮的状态
                emojiOptions.forEach(option => {
                    const emojiName = option.name;
                    const emojiData = data[emojiName] || {};
                    const devices = Object.keys(emojiData);
                    
                    // 检查当前设备是否已点击该表情
                    const isActive = devices.includes(deviceId);
                    
                    // 找到对应的按钮并更新状态
                    const button = container.querySelector(`.emoji-button[data-emoji="${emojiName}"]`);
                    if (button) {
                        if (isActive) {
                            button.classList.add('active');
                        } else {
                            button.classList.remove('active');
                        }
                    }
                });
            });
        }
        
        /**
         * 切换表情状态
         */
        function toggleEmoji(itemType, itemId, emojiName, container) {
            const db = firebase.database();
            const path = `emoji_reactions/${itemType}/${itemId}/${emojiName}/${deviceId}`;
            
            // 检查当前状态
            db.ref(path).once('value', snapshot => {
                const exists = snapshot.exists();
                
                if (exists) {
                    // 如果已存在，则移除
                    db.ref(path).remove()
                        .then(() => {
                        })
                        .catch(error => {
                            console.error('移除表情失败:', error);
                        });
                } else {
                    // 如果不存在，则添加
                    db.ref(path).set({
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    })
                        .then(() => {
                            
                            // 添加动画效果
                            const button = container.querySelector(`.emoji-button[data-emoji="${emojiName}"]`);
                            if (button) {
                                button.classList.add('just-clicked');
                                setTimeout(() => {
                                    button.classList.remove('just-clicked');
                                }, 500);
                            }
                        })
                        .catch(error => {
                            console.error('添加表情失败:', error);
                        });
                }
            });
        }
        
        // 导出公共API
        window.EmojiReactionsModule = {
            initEmojiReactions: initEmojiReactions
        };
        
    }
});

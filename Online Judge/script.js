document.addEventListener('DOMContentLoaded', () => {
    // DOM元素引用
    const runBtn = document.querySelector('.btn-run');
    const submitBtn = document.querySelector('.btn-submit');
    const languageSelect = document.querySelector('.language-select');
    const codeEditor = document.querySelector('.code-editor');
    const resultPanel = document.querySelector('.result-panel');
    
    // 预设代码模板
    const codeTemplates = {
        'C++': `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`,
        'Python': `a, b = map(int, input().split())
print(a + b)`,
        'Java': `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}`
    };

    // 语言切换处理
    languageSelect.addEventListener('change', () => {
        codeEditor.value = codeTemplates[languageSelect.value];
        localStorage.setItem('lastCode', codeEditor.value);
    });

    // 本地存储保存代码
    codeEditor.addEventListener('input', () => {
        localStorage.setItem('lastCode', codeEditor.value);
    });

    // 页面加载时恢复代码
    const savedCode = localStorage.getItem('lastCode');
    if (savedCode) {
        codeEditor.value = savedCode;
    } else {
        codeEditor.value = codeTemplates[languageSelect.value];
    }

    // 模拟API请求
    const mockAPICall = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 'completed',
                    testCases: [
                        { status: 'passed', msg: '测试用例1: 通过 ✓ 执行时间: 15ms' },
                        { status: 'failed', msg: '测试用例2: 失败 × 预期: 42 实际: 36' },
                        { status: 'info', msg: '编译信息: 无警告' }
                    ]
                });
            }, 1500);
        });
    };

    // 清除旧结果
    const clearResults = () => {
        resultPanel.innerHTML = '<h4>运行结果</h4>';
    };

    // 添加测试结果
    const addTestCase = (testCase) => {
        const div = document.createElement('div');
        div.className = `test-case ${testCase.status}`;
        div.innerHTML = `<p>${testCase.msg}</p>`;
        resultPanel.appendChild(div);
    };

    // 处理按钮点击
    const handleAction = async (isSubmit) => {
        const buttons = [runBtn, submitBtn];
        
        // 禁用按钮
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.textContent = isSubmit ? '提交中...' : '运行中...';
        });

        clearResults();
        
        try {
            const response = await mockAPICall();
            response.testCases.forEach(addTestCase);
        } finally {
            // 恢复按钮
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.textContent = isSubmit ? '提交代码' : '运行代码';
            });
        }
    };

    // 按钮事件绑定
    runBtn.addEventListener('click', () => handleAction(false));
    submitBtn.addEventListener('click', () => handleAction(true));

    // 代码编辑器基础功能
    codeEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            codeEditor.value = codeEditor.value.substring(0, start) + '    ' + 
                              codeEditor.value.substring(end);
            codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
        }
    });
});

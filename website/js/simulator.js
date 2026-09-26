/**
 * محاكي تفاعلي لمراحل المترجم الست - مترجم لغة البرمجة العربية
 */

const simulatorSamples = {
    sample1: {
        name: "01_طباعة_بسيطة",
        code: `برنامج ترحيب؛
{
    اطبع("مرحباً بكم في لغة البرمجة العربية")؛
    اطبع(2026)؛
}.`,
        tokens: [
            { id: 1, kind: "ProgramKeyword", lexeme: "برنامج", line: 1, col: 1 },
            { id: 2, kind: "IdentifierToken", lexeme: "ترحيب", line: 1, col: 8 },
            { id: 3, kind: "SemicolonToken", lexeme: "؛", line: 1, col: 14 },
            { id: 4, kind: "OpenBraceToken", lexeme: "{", line: 2, col: 1 },
            { id: 5, kind: "PrintKeyword", lexeme: "اطبع", line: 3, col: 5 },
            { id: 6, kind: "OpenParenToken", lexeme: "(", line: 3, col: 9 },
            { id: 7, kind: "StringLiteralToken", lexeme: "\"مرحباً بكم في لغة البرمجة العربية\"", line: 3, col: 10 },
            { id: 8, kind: "CloseParenToken", lexeme: ")", line: 3, col: 46 },
            { id: 9, kind: "SemicolonToken", lexeme: "؛", line: 3, col: 47 },
            { id: 10, kind: "PrintKeyword", lexeme: "اطبع", line: 4, col: 5 },
            { id: 11, kind: "OpenParenToken", lexeme: "(", line: 4, col: 9 },
            { id: 12, kind: "IntegerLiteralToken", lexeme: "2026", line: 4, col: 10 },
            { id: 13, kind: "CloseParenToken", lexeme: ")", line: 4, col: 14 },
            { id: 14, kind: "SemicolonToken", lexeme: "؛", line: 4, col: 15 },
            { id: 15, kind: "CloseBraceToken", lexeme: "}", line: 5, col: 1 },
            { id: 16, kind: "DotToken", lexeme: ".", line: 5, col: 2 },
            { id: 17, kind: "EndOfFileToken", lexeme: "<EOF>", line: 5, col: 3 }
        ],
        ast: `ProgramNode: ترحيب
  Declarations (0)
  Body: BlockStatement
    [1] PrintStatement
        Expression: StringLiteral ("مرحباً بكم في لغة البرمجة العربية")
    [2] PrintStatement
        Expression: IntegerLiteral (2026)`,
        symbols: [
            { name: "ترحيب", kind: "برنامج", type: "void", scope: "عام", line: 1, val: "-" }
        ],
        threeAc: `1: PARAM "مرحباً بكم في لغة البرمجة العربية"
2: CALL اطبع, 1
3: PARAM 2026
4: CALL اطبع, 1
5: HALT`,
        assembly: `.data
    str_0 db "مرحباً بكم في لغة البرمجة العربية", 0
    num_0 dq 2026

.text
global _start
_start:
    lea rcx, [str_0]
    call print_string
    mov rcx, [num_0]
    call print_int
    mov rax, 60
    xor rdi, rdi
    syscall`,
        output: `مرحباً بكم في لغة البرمجة العربية\n2026\n\n[تم التنفيذ بنجاح في 12ms]`
    },
    sample2: {
        name: "02_متغيرات_وحساب",
        code: `برنامج حساب؛
{
    ثابت زيادة = 5؛
    متغير س، حاصل: صحيح؛
    س = 10؛
    حاصل = س + زيادة؛
    اطبع(حاصل)؛
}.`,
        tokens: [
            { id: 1, kind: "ProgramKeyword", lexeme: "برنامج", line: 1, col: 1 },
            { id: 2, kind: "IdentifierToken", lexeme: "حساب", line: 1, col: 8 },
            { id: 3, kind: "SemicolonToken", lexeme: "؛", line: 1, col: 12 },
            { id: 4, kind: "ConstantKeyword", lexeme: "ثابت", line: 3, col: 5 },
            { id: 5, kind: "IdentifierToken", lexeme: "زيادة", line: 3, col: 10 },
            { id: 6, kind: "EqualsToken", lexeme: "=", line: 3, col: 16 },
            { id: 7, kind: "IntegerLiteralToken", lexeme: "5", line: 3, col: 18 }
        ],
        ast: `ProgramNode: حساب
  Declarations (2):
    - ConstantDeclaration: زيادة = 5 (صحيح)
    - VariableDeclaration: س، حاصل: صحيح
  Body: BlockStatement:
    [1] AssignmentStatement: س = 10
    [2] AssignmentStatement: حاصل = (س + زيادة)
    [3] PrintStatement: Expression: Identifier (حاصل)`,
        symbols: [
            { name: "زيادة", kind: "ثابت", type: "صحيح", scope: "عام", line: 3, val: "5" },
            { name: "س", kind: "متغير", type: "صحيح", scope: "عام", line: 4, val: "0" },
            { name: "حاصل", kind: "متغير", type: "صحيح", scope: "عام", line: 4, val: "0" }
        ],
        threeAc: `1: س = 10
2: ت1 = س + 5
3: حاصل = ت1
4: PARAM حاصل
5: CALL اطبع, 1
6: HALT`,
        assembly: `.data
    var_س dq 0
    var_حاصل dq 0
    const_زيادة dq 5

.text
global _start
_start:
    mov qword [var_س], 10
    mov rax, [var_س]
    add rax, 5
    mov [var_حاصل], rax
    mov rcx, [var_حاصل]
    call print_int
    mov rax, 60
    syscall`,
        output: `15\n\n[تم التنفيذ بنجاح في 15ms]`
    }
};

let currentSampleKey = "sample1";
let currentStageIndex = 0;

const stages = [
    { key: "tokens", name: "1. التحليل المعجمي (Tokens)", icon: "🔍" },
    { key: "ast", name: "2. التحليل النحوي (AST)", icon: "🌲" },
    { key: "symbols", name: "3. جدول الرموز (Symbols)", icon: "📊" },
    { key: "threeAc", name: "4. الكود الوسيط (3AC)", icon: "⚙️" },
    { key: "assembly", name: "5. لغة التجميع (Assembly)", icon: "💻" },
    { key: "output", name: "6. التنفيذ والآلة الافتراضية (VM)", icon: "🚀" }
];

function renderSimulator() {
    const sample = simulatorSamples[currentSampleKey];
    if (!sample) return;

    // 1. Update source code display
    const codeEl = document.getElementById('simSourceCode');
    if (codeEl) {
        codeEl.textContent = sample.code;
    }

    // 2. Update active stage circle
    document.querySelectorAll('.sim-stage-item').forEach((item, idx) => {
        if (idx === currentStageIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 3. Update stage title
    const stageTitle = document.getElementById('simStageTitle');
    if (stageTitle) {
        stageTitle.textContent = stages[currentStageIndex].name;
    }

    // 4. Update stage output view
    const outputContainer = document.getElementById('simStageOutput');
    if (!outputContainer) return;

    outputContainer.innerHTML = '';

    const currentStageKey = stages[currentStageIndex].key;

    if (currentStageKey === 'tokens') {
        let table = `<table class="data-table">
            <thead>
                <tr><th>#</th><th>نوع الرمز (Kind)</th><th>النص (Lexeme)</th><th>السطر</th><th>العمود</th></tr>
            </thead>
            <tbody>`;
        sample.tokens.forEach(t => {
            table += `<tr>
                <td><span class="badge badge-primary">${t.id}</span></td>
                <td><code>${t.kind}</code></td>
                <td><strong style="color: var(--accent-green);">${t.lexeme}</strong></td>
                <td>${t.line}</td>
                <td>${t.col}</td>
            </tr>`;
        });
        table += `</tbody></table>`;
        outputContainer.innerHTML = table;
    } else if (currentStageKey === 'ast') {
        outputContainer.innerHTML = `<pre style="color: var(--accent-green); font-size: 0.95rem; line-height: 1.6;">${sample.ast}</pre>`;
    } else if (currentStageKey === 'symbols') {
        let table = `<table class="data-table">
            <thead>
                <tr><th>الاسم</th><th>الفئة</th><th>النوع</th><th>النطاق</th><th>السطر</th><th>القيمة</th></tr>
            </thead>
            <tbody>`;
        sample.symbols.forEach(s => {
            table += `<tr>
                <td><strong>${s.name}</strong></td>
                <td><span class="badge badge-purple">${s.kind}</span></td>
                <td><span class="badge badge-warning">${s.type}</span></td>
                <td>${s.scope}</td>
                <td>${s.line}</td>
                <td><code>${s.val}</code></td>
            </tr>`;
        });
        table += `</tbody></table>`;
        outputContainer.innerHTML = table;
    } else if (currentStageKey === 'threeAc') {
        outputContainer.innerHTML = `<pre style="color: var(--accent-blue); font-size: 1rem; line-height: 1.8;">${sample.threeAc}</pre>`;
    } else if (currentStageKey === 'assembly') {
        outputContainer.innerHTML = `<pre style="color: var(--accent-mauve); font-size: 0.95rem; line-height: 1.6;">${sample.assembly}</pre>`;
    } else if (currentStageKey === 'output') {
        outputContainer.innerHTML = `<div style="background: #000; padding: 1.5rem; border-radius: 8px; border: 1px solid var(--accent-green); color: var(--accent-green); font-size: 1.1rem; font-family: 'Fira Code', monospace; white-space: pre-wrap;">${sample.output}</div>`;
    }
}

function selectStage(index) {
    currentStageIndex = index;
    renderSimulator();
}

function selectSample(sampleKey) {
    currentSampleKey = sampleKey;
    currentStageIndex = 0;
    renderSimulator();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('simStageOutput')) {
        renderSimulator();
    }
});

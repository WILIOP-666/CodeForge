// CodeForge Application JavaScript

// Initialize all CodeMirror editors when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    initTabs();
    
    // Initialize all code editors
    initCodeEditors();
    
    // Set up event listeners for buttons
    setupEventListeners();
});

// Function to initialize tab switching
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Function to initialize all CodeMirror editors
function initCodeEditors() {
    // Source editor for code conversion
    window.sourceEditor = CodeMirror(document.getElementById('source-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true
    });
    
    // Target editor for code conversion (read-only)
    window.targetEditor = CodeMirror(document.getElementById('target-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        readOnly: true,
        lineWrapping: true
    });
    
    // Optimization editor
    window.optimizeEditor = CodeMirror(document.getElementById('optimize-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true
    });
    
    // Playground editor
    window.playgroundEditor = CodeMirror(document.getElementById('playground-editor'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true
    });
    
    // Set default content for editors
    setDefaultEditorContent();
}

// Function to set default content for editors
function setDefaultEditorContent() {
    // Default JavaScript example
    const jsExample = `// JavaScript Example
function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * calculateFactorial(n - 1);
}

// Calculate factorial of 5
const result = calculateFactorial(5);
console.log("Factorial of 5 is: " + result);`;
    
    // Set default content
    window.sourceEditor.setValue(jsExample);
    window.optimizeEditor.setValue(jsExample);
    window.playgroundEditor.setValue(jsExample);
}

// Function to set up event listeners for buttons
function setupEventListeners() {
    // Language selectors change events
    document.getElementById('source-language').addEventListener('change', function() {
        updateEditorMode(window.sourceEditor, this.value);
    });
    
    document.getElementById('target-language').addEventListener('change', function() {
        updateEditorMode(window.targetEditor, this.value);
    });
    
    document.getElementById('optimize-language').addEventListener('change', function() {
        updateEditorMode(window.optimizeEditor, this.value);
    });
    
    document.getElementById('playground-language').addEventListener('change', function() {
        updateEditorMode(window.playgroundEditor, this.value);
    });
    
    // Convert button click event
    document.getElementById('convert-btn').addEventListener('click', convertCode);
    
    // Optimize button click event
    document.getElementById('optimize-btn').addEventListener('click', optimizeCode);
    
    // Run code button click event
    document.getElementById('run-code-btn').addEventListener('click', runCode);
    
    // Disassemble button click event
    document.getElementById('disassemble-btn').addEventListener('click', disassembleCode);
    
    // File upload event for disassembler
    document.getElementById('binary-file').addEventListener('change', function() {
        // Enable disassemble button when file is selected
        document.getElementById('disassemble-btn').disabled = !this.files.length;
    });
}


// Function to update CodeMirror editor mode based on language selection
function updateEditorMode(editor, language) {
    let mode;
    switch(language) {
        case 'javascript':
            mode = 'javascript';
            break;
        case 'php':
            mode = 'php';
            break;
        case 'lua':
            mode = 'lua';
            break;
        case 'bash':
            mode = 'shell';
            break;
        default:
            mode = 'javascript';
    }
    editor.setOption('mode', mode);
    
    // Update example code based on selected language
    if (editor === window.sourceEditor || editor === window.optimizeEditor || editor === window.playgroundEditor) {
        setExampleCode(editor, language);
    }
}

// Function to set example code based on language
function setExampleCode(editor, language) {
    let exampleCode = '';
    
    switch(language) {
        case 'javascript':
            exampleCode = `// JavaScript Example
function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * calculateFactorial(n - 1);
}

// Calculate factorial of 5
const result = calculateFactorial(5);
console.log("Factorial of 5 is: " + result);`;
            break;
        case 'php':
            exampleCode = `<?php
// PHP Example
function calculateFactorial($n) {
    if ($n === 0 || $n === 1) {
        return 1;
    }
    return $n * calculateFactorial($n - 1);
}

// Calculate factorial of 5
$result = calculateFactorial(5);
echo "Factorial of 5 is: " . $result;`;
            break;
        case 'lua':
            exampleCode = `-- Lua Example
function calculateFactorial(n)
    if n == 0 or n == 1 then
        return 1
    end
    return n * calculateFactorial(n - 1)
end

-- Calculate factorial of 5
local result = calculateFactorial(5)
print("Factorial of 5 is: " .. result)`;
            break;
        case 'bash':
            exampleCode = `#!/bin/bash
# Bash Example
calculate_factorial() {
    if [ $1 -eq 0 ] || [ $1 -eq 1 ]; then
        echo 1
    else
        local prev=$(calculate_factorial $(($1 - 1)))
        echo $(($1 * $prev))
    fi
}

# Calculate factorial of 5
result=$(calculate_factorial 5)
echo "Factorial of 5 is: $result"`;
            break;
    }
    
    editor.setValue(exampleCode);
}

// Function to convert code between languages
function convertCode() {
    const sourceLanguage = document.getElementById('source-language').value;
    const targetLanguage = document.getElementById('target-language').value;
    const sourceCode = window.sourceEditor.getValue();
    
    if (sourceLanguage === targetLanguage) {
        window.targetEditor.setValue(sourceCode);
        return;
    }
    
    // In a real application, this would call an API or use a more sophisticated conversion logic
    // For this demo, we'll use a simple conversion approach
    const convertedCode = performCodeConversion(sourceCode, sourceLanguage, targetLanguage);
    window.targetEditor.setValue(convertedCode);
}

// Function to optimize code
function optimizeCode() {
    const language = document.getElementById('optimize-language').value;
    const code = window.optimizeEditor.getValue();
    const outputDiv = document.getElementById('optimization-output');
    
    // Clear previous results
    outputDiv.innerHTML = '';
    
    // Perform simple code analysis
    const analysis = analyzeCode(code, language);
    
    // Display analysis results
    outputDiv.innerHTML = `<h4>Analisis Kode:</h4>
        <ul>
            ${analysis.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <h4>Kode yang Dioptimasi:</h4>
        <pre>${analysis.optimizedCode || code}</pre>`;
}

// Function to analyze code and suggest optimizations
function analyzeCode(code, language) {
    const analysis = [];
    let optimizedCode = code;
    
    // Check for common issues based on language
    switch(language) {
        case 'javascript':
            // Check for console.log statements
            if (code.includes('console.log')) {
                analysis.push('⚠️ Ditemukan pernyataan console.log() yang mungkin perlu dihapus di kode produksi.');
            }
            
            // Check for var usage instead of let/const
            if (code.match(/\bvar\s+/g)) {
                analysis.push('🔄 Pertimbangkan untuk menggunakan let/const daripada var untuk deklarasi variabel.');
                optimizedCode = optimizedCode.replace(/\bvar\s+/g, 'const ');
            }
            
            // Check for potential memory leaks with event listeners
            if (code.includes('addEventListener') && !code.includes('removeEventListener')) {
                analysis.push('⚠️ Event listener ditambahkan tanpa removeEventListener yang sesuai, berpotensi menyebabkan memory leak.');
            }
            
            // Check for inefficient loops
            if (code.includes('for (') && code.includes('.length')) {
                analysis.push('🔄 Pertimbangkan untuk menyimpan panjang array dalam variabel sebelum loop untuk meningkatkan performa.');
            }
            break;
            
        case 'php':
            // Check for echo vs print
            if (code.includes('print ')) {
                analysis.push('🔄 Pertimbangkan untuk menggunakan echo daripada print untuk output yang lebih cepat.');
                optimizedCode = optimizedCode.replace(/print\s+/g, 'echo ');
            }
            
            // Check for unnecessary variable declarations
            if (code.match(/\$[a-zA-Z0-9_]+\s*=\s*['"]['"];/g)) {
                analysis.push('⚠️ Ditemukan variabel string kosong yang mungkin tidak diperlukan.');
            }
            break;
            
        case 'lua':
            // Check for global variables
            const localVarCount = (code.match(/\blocal\s+/g) || []).length;
            const potentialGlobalVarCount = (code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\s*=/g) || []).length - localVarCount;
            
            if (potentialGlobalVarCount > 0) {
                analysis.push(`⚠️ Ditemukan ${potentialGlobalVarCount} kemungkinan variabel global. Pertimbangkan untuk menggunakan 'local'.`);
            }
            break;
            
        case 'bash':
            // Check for echo vs printf
            if (code.includes('echo') && !code.includes('printf')) {
                analysis.push('🔄 Pertimbangkan untuk menggunakan printf daripada echo untuk kontrol format yang lebih baik.');
            }
            
            // Check for potential command injection vulnerabilities
            if (code.includes('eval')) {
                analysis.push('⚠️ Penggunaan eval dapat menyebabkan kerentanan injeksi perintah.');
            }
            break;
    }
    
    // General analysis for all languages
    
    // Check for commented out code
    const commentedCodeLines = (code.match(/^\s*(\/\/|#|--|\*).*\w+.*$/gm) || []).length;
    if (commentedCodeLines > 3) {
        analysis.push(`⚠️ Ditemukan ${commentedCodeLines} baris kode yang dikomentari. Pertimbangkan untuk membersihkannya.`);
    }
    
    // Check for long functions
    const lines = code.split('\n');
    if (lines.length > 30) {
        analysis.push('⚠️ Kode cukup panjang. Pertimbangkan untuk memecahnya menjadi fungsi yang lebih kecil.');
    }
    
    // If no issues found
    if (analysis.length === 0) {
        analysis.push('✅ Tidak ada masalah optimasi yang ditemukan dalam kode ini.');
    }
    
    // Add optimized code to the analysis result
    analysis.optimizedCode = optimizedCode;
    
    return analysis;
}

// Function to run code in the playground
function runCode() {
    const language = document.getElementById('playground-language').value;
    const code = window.playgroundEditor.getValue();
    const outputDiv = document.getElementById('code-output');
    
    // Clear previous output
    outputDiv.innerHTML = '<p>Menjalankan kode...</p>';
    
    // In a real application, this would send the code to a backend for execution
    // For this demo, we'll simulate execution with some basic functionality
    setTimeout(() => {
        let output = '';
        
        try {
            // Simple execution simulation based on language
            switch(language) {
                case 'javascript':
                    // Create a sandbox for JavaScript execution
                    const sandbox = {
                        console: {
                            log: function(msg) {
                                output += msg + '<br>';
                            }
                        }
                    };
                    
                    // Execute the code in the sandbox
                    const scriptFn = new Function('console', `${code}`);
                    scriptFn(sandbox.console);
                    break;
                    
                case 'php':
                    output = '<p>Simulasi output PHP:</p>';
                    // Extract echo statements for simulation
                    const echoMatches = code.match(/echo\s+([^;]+);/g);
                    if (echoMatches) {
                        echoMatches.forEach(match => {
                            const content = match.replace(/echo\s+/, '').replace(/;$/, '');
                            output += `<p>${content}</p>`;
                        });
                    } else {
                        output += '<p>Tidak ada output yang terdeteksi. Gunakan echo untuk menghasilkan output.</p>';
                    }
                    break;
                    
                case 'lua':
                    output = '<p>Simulasi output Lua:</p>';
                    // Extract print statements for simulation
                    const printMatches = code.match(/print\s*\(([^)]+)\)/g);
                    if (printMatches) {
                        printMatches.forEach(match => {
                            const content = match.replace(/print\s*\(/, '').replace(/\)$/, '');
                            output += `<p>${content}</p>`;
                        });
                    } else {
                        output += '<p>Tidak ada output yang terdeteksi. Gunakan print() untuk menghasilkan output.</p>';
                    }
                    break;
                    
                case 'bash':
                    output = '<p>Simulasi output Bash:</p>';
                    // Extract echo statements for simulation
                    const bashEchoMatches = code.match(/echo\s+([^\n]+)/g);
                    if (bashEchoMatches) {
                        bashEchoMatches.forEach(match => {
                            const content = match.replace(/echo\s+/, '');
                            output += `<p>${content}</p>`;
                        });
                    } else {
                        output += '<p>Tidak ada output yang terdeteksi. Gunakan echo untuk menghasilkan output.</p>';
                    }
                    break;
            }
        } catch (error) {
            output = `<p class="error">Error: ${error.message}</p>`;
        }
        
        outputDiv.innerHTML = output || '<p>Tidak ada output yang dihasilkan.</p>';
    }, 500); // Simulate processing delay
}

// Function to disassemble binary code
function disassembleCode() {
    const fileInput = document.getElementById('binary-file');
    const outputDiv = document.getElementById('assembly-code');
    
    // Check if a file is selected
    if (!fileInput.files.length) {
        outputDiv.innerHTML = '<p class="error">Silakan pilih file terlebih dahulu.</p>';
        return;
    }
    
    const file = fileInput.files[0];
    outputDiv.innerHTML = '<p>Memproses file...</p>';
    
    // In a real application, this would send the file to a backend for disassembly
    // For this demo, we'll simulate disassembly with some mock output
    setTimeout(() => {
        // Generate mock assembly output based on file type
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let assemblyOutput = '';
        
        switch(fileExtension) {
            case 'exe':
            case 'dll':
                assemblyOutput = generateMockWindowsAssembly(file.name);
                break;
            case 'so':
                assemblyOutput = generateMockLinuxAssembly(file.name);
                break;
            default:
                assemblyOutput = generateMockGenericAssembly(file.name);
        }
        
        outputDiv.innerHTML = `<pre class="assembly">${assemblyOutput}</pre>`;
    }, 1000); // Simulate processing delay
}

// Function to generate mock Windows assembly output
function generateMockWindowsAssembly(fileName) {
    return `; Disassembly of ${fileName}

.text:00401000 ; =============== S U B R O U T I N E =======================================
.text:00401000 _main           proc near
.text:00401000                 push    ebp
.text:00401001                 mov     ebp, esp
.text:00401003                 sub     esp, 8
.text:00401006                 push    offset aHelloWorld ; "Hello, World!"
.text:0040100B                 call    _printf
.text:00401010                 add     esp, 4
.text:00401013                 xor     eax, eax
.text:00401015                 leave
.text:00401016                 retn
.text:00401016 _main           endp

.data:00403000 aHelloWorld     db 'Hello, World!', 0

; Anotasi:
; 00401000: Awal fungsi main
; 00401000-00401003: Setup frame stack
; 00401006: Push string "Hello, World!" ke stack
; 0040100B: Panggil fungsi printf
; 00401010-00401013: Cleanup dan set return value 0
; 00401015-00401016: Restore stack dan return`;
}

// Function to generate mock Linux assembly output
function generateMockLinuxAssembly(fileName) {
    return `; Disassembly of ${fileName}

0000000000001040 <main>:
    1040:       55                      push   rbp
    1041:       48 89 e5                mov    rbp, rsp
    1044:       48 83 ec 10             sub    rsp, 0x10
    1048:       48 8d 3d b5 0f 00 00    lea    rdi, [rip+0xfb5] # 2004 <_IO_stdin_used+0x4>
    104f:       e8 dc ff ff ff          call   1030 <puts@plt>
    1054:       b8 00 00 00 00          mov    eax, 0x0
    1059:       c9                      leave
    105a:       c3                      ret

0000000000002004 <.rodata>:
    2004:       48 65 6c 6c 6f 2c 20    "Hello, World!"
    200b:       57 6f 72 6c 64 21 00

; Anotasi:
; 1040-1044: Setup frame stack
; 1048: Load alamat string "Hello, World!"
; 104f: Panggil fungsi puts
; 1054-105a: Set return value 0 dan return`;
}

// Function to generate mock generic assembly output
function generateMockGenericAssembly(fileName) {
    return `; Disassembly of ${fileName}

00000000 <.header>:
   0:   7f 45 4c 46 02 01 01 00   Magic bytes (ELF header)
   8:   00 00 00 00 00 00 00 00   ...

00000100 <main>:
   100:   push   rbp
   101:   mov    rbp, rsp
   104:   sub    rsp, 16
   108:   mov    edi, offset aHelloWorld
   10d:   call   printf
   112:   xor    eax, eax
   114:   leave
   115:   ret

00000200 <data>:
   200:   48 65 6c 6c 6f 2c 20 57   "Hello, World!"
   208:   6f 72 6c 64 21 00

; Anotasi:
; File ini tampaknya berisi program sederhana yang mencetak "Hello, World!"
; Fungsi main dimulai pada offset 0x100
; String "Hello, World!" disimpan pada offset 0x200`;
}

// Function to perform code conversion (simplified for demo)
function performCodeConversion(sourceCode, sourceLanguage, targetLanguage) {
    // This is a simplified conversion logic for demonstration purposes
    // In a real application, you would use a more sophisticated approach or API
    
    let convertedCode = "// Converted from " + sourceLanguage + " to " + targetLanguage + "\n\n";
    
    // If source and target languages are the same, return the original code
    if (sourceLanguage === targetLanguage) {
        return sourceCode;
    }
    
    // Get example code for the target language as a base
    switch(targetLanguage) {
        case 'javascript':
            if (sourceLanguage === 'php') {
                // Simple PHP to JavaScript conversion
                convertedCode += sourceCode
                    .replace(/\$([a-zA-Z0-9_]+)/g, '$1') // Replace PHP variables
                    .replace(/echo\s+(.+);/g, 'console.log($1);') // Replace echo with console.log
                    .replace(/\.\s*\./g, ' + ') // Replace string concatenation
                    .replace(/<\?php|\?>/g, '') // Remove PHP tags
                    .trim();
            } else if (sourceLanguage === 'lua') {
                // Simple Lua to JavaScript conversion
                convertedCode += sourceCode
                    .replace(/local\s+([a-zA-Z0-9_]+)/g, 'let $1') // Replace local with let
                    .replace(/function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g, 'function $1($2)') // Function declaration
                    .replace(/end/g, '}') // Replace end with }
                    .replace(/then/g, '{') // Replace then with {
                    .replace(/elseif/g, '} else if') // Replace elseif
                    .replace(/if\s+(.+)\s+{/g, 'if ($1) {') // Add parentheses to if conditions
                    .replace(/print\s*\((.+)\)/g, 'console.log($1);') // Replace print with console.log
                    .replace(/\.\.\s*/g, ' + ') // Replace string concatenation
                    .replace(/--\s+/g, '// ') // Replace comments
                    .trim();
            } else if (sourceLanguage === 'bash') {
                // Simple Bash to JavaScript conversion
                convertedCode += sourceCode
                    .replace(/^#!.*\n/, '') // Remove shebang
                    .replace(/#\s+/g, '// ') // Replace comments
                    .replace(/function\s+([a-zA-Z0-9_]+)\s*\(\)\s*{/g, 'function $1() {') // Function declaration
                    .replace(/\$\(\((.+)\)\)/g, '($1)') // Arithmetic expansion
                    .replace(/\$([a-zA-Z0-9_]+)/g, '$1') // Replace variables
                    .replace(/echo\s+(.+)/g, 'console.log($1);') // Replace echo with console.log
                    .replace(/if\s+\[\s+(.+)\s+\]\s*;\s*then/g, 'if ($1) {') // if statements
                    .replace(/fi/g, '}') // Replace fi with }
                    .replace(/else/g, '} else {') // Replace else
                    .trim();
            }
            break;
            
        case 'php':
            if (sourceLanguage === 'javascript') {
                // Simple JavaScript to PHP conversion
                convertedCode += "<?php\n" + sourceCode
                    .replace(/const\s+|let\s+|var\s+/g, '$') // Replace variable declarations
                    .replace(/console\.log\s*\((.+)\);/g, 'echo $1;') // Replace console.log with echo
                    .replace(/\+\s+/g, ' . ') // Replace string concatenation
                    .replace(/\/\/\s+/g, '// ') // Keep comments
                    .trim() + "\n?>";
            } else if (sourceLanguage === 'lua') {
                // Simple Lua to PHP conversion
                convertedCode += "<?php\n" + sourceCode
                    .replace(/local\s+([a-zA-Z0-9_]+)/g, '$$$1') // Replace local with $
                    .replace(/function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g, 'function $1($2)') // Function declaration
                    .replace(/end/g, '}') // Replace end with }
                    .replace(/then/g, '{') // Replace then with {
                    .replace(/elseif/g, '} elseif') // Replace elseif
                    .replace(/if\s+(.+)\s+{/g, 'if ($1) {') // Add parentheses to if conditions
                    .replace(/print\s*\((.+)\)/g, 'echo $1;') // Replace print with echo
                    .replace(/\.\.\s*/g, ' . ') // Replace string concatenation
                    .replace(/--\s+/g, '// ') // Replace comments
                    .trim() + "\n?>";
            } else if (sourceLanguage === 'bash') {
                // Simple Bash to PHP conversion
                convertedCode += "<?php\n" + sourceCode
                    .replace(/^#!.*\n/, '') // Remove shebang
                    .replace(/#\s+/g, '// ') // Replace comments
                    .replace(/function\s+([a-zA-Z0-9_]+)\s*\(\)\s*{/g, 'function $1() {') // Function declaration
                    .replace(/\$\(\((.+)\)\)/g, '($1)') // Arithmetic expansion
                    .replace(/echo\s+(.+)/g, 'echo $1;') // Keep echo
                    .replace(/if\s+\[\s+(.+)\s+\]\s*;\s*then/g, 'if ($1) {') // if statements
                    .replace(/fi/g, '}') // Replace fi with }
                    .replace(/else/g, '} else {') // Replace else
                    .trim() + "\n?>";
            }
            break;
            
        case 'lua':
            if (sourceLanguage === 'javascript') {
                // Simple JavaScript to Lua conversion
                convertedCode += sourceCode
                    .replace(/const\s+|let\s+|var\s+/g, 'local ') // Replace variable declarations
                    .replace(/console\.log\s*\((.+)\);/g, 'print($1)') // Replace console.log with print
                    .replace(/\+\s+/g, ' .. ') // Replace string concatenation
                    .replace(/\/\/\s+/g, '-- ') // Replace comments
                    .replace(/function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*{/g, 'function $1($2)') // Function declaration
                    .replace(/if\s*\((.+)\)\s*{/g, 'if $1 then') // if statements
                    .replace(/}\s*else\s*{/g, 'else') // Replace else
                    .replace(/}/g, 'end') // Replace } with end
                    .trim();
            } else if (sourceLanguage === 'php') {
                // Simple PHP to Lua conversion
                convertedCode += sourceCode
                    .replace(/\$([a-zA-Z0-9_]+)/g, 'local $1') // Replace PHP variables
                    .replace(/echo\s+(.+);/g, 'print($1)') // Replace echo with print
                    .replace(/\.\s*\./g, ' .. ') // Replace string concatenation
                    .replace(/<\?php|\?>/g, '') // Remove PHP tags
                    .replace(/if\s*\((.+)\)\s*{/g, 'if $1 then') // if statements
                    .replace(/}\s*else\s*{/g, 'else') // Replace else
                    .replace(/}/g, 'end') // Replace } with end
                    .trim();
            } else if (sourceLanguage === 'bash') {
                // Simple Bash to Lua conversion
                convertedCode += sourceCode
                    .replace(/^#!.*\n/, '') // Remove shebang
                    .replace(/#\s+/g, '-- ') // Replace comments
                    .replace(/function\s+([a-zA-Z0-9_]+)\s*\(\)\s*{/g, 'function $1()') // Function declaration
                    .replace(/\$\(\((.+)\)\)/g, '($1)') // Arithmetic expansion
                    .replace(/\$([a-zA-Z0-9_]+)/g, '$1') // Replace variables
                    .replace(/echo\s+(.+)/g, 'print($1)') // Replace echo with print
                    .replace(/if\s+\[\s+(.+)\s+\]\s*;\s*then/g, 'if $1 then') // if statements
                    .replace(/fi/g, 'end') // Replace fi with end
                    .replace(/else/g, 'else') // Keep else
                    .trim();
            }
            break;
            
        case 'bash':
            if (sourceLanguage === 'javascript') {
                // Simple JavaScript to Bash conversion
                convertedCode += "#!/bin/bash\n\n" + sourceCode
                    .replace(/const\s+|let\s+|var\s+/g, '') // Remove variable declarations
                    .replace(/console\.log\s*\((.+)\);/g, 'echo $1') // Replace console.log with echo
                    .replace(/\+\s+/g, ' ') // Replace string concatenation
                    .replace(/\/\/\s+/g, '# ') // Replace comments
                    .replace(/function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*{/g, '$1() {') // Function declaration
                    .replace(/if\s*\((.+)\)\s*{/g, 'if [ $1 ]; then') // if statements
                    .replace(/}\s*else\s*{/g, 'else') // Replace else
                    .replace(/}/g, 'fi') // Replace } with fi for if statements
                    .trim();
            } else if (sourceLanguage === 'php') {
                // Simple PHP to Bash conversion
                convertedCode += "#!/bin/bash\n\n" + sourceCode
                    .replace(/\$([a-zA-Z0-9_]+)/g, '$1') // Keep PHP variables
                    .replace(/echo\s+(.+);/g, 'echo $1') // Keep echo
                    .replace(/\.\s*\./g, ' ') // Replace string concatenation
                    .replace(/<\?php|\?>/g, '') // Remove PHP tags
                    .replace(/if\s*\((.+)\)\s*{/g, 'if [ $1 ]; then') // if statements
                    .replace(/}\s*else\s*{/g, 'else') // Replace else
                    .replace(/}/g, 'fi') // Replace } with fi
                    .trim();
            } else if (sourceLanguage === 'lua') {
                // Simple Lua to Bash conversion
                convertedCode += "#!/bin/bash\n\n" + sourceCode
                    .replace(/local\s+([a-zA-Z0-9_]+)/g, '$1=') // Replace local with variable assignment
                    .replace(/function\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/g, '$1() {') // Function declaration
                    .replace(/end/g, '}') // Replace end with }
                    .replace(/then/g, '; then') // Replace then
                    .replace(/elseif/g, 'elif') // Replace elseif
                    .replace(/if\s+(.+)\s+;\s+then/g, 'if [ $1 ]; then') // if statements
                    .replace(/print\s*\((.+)\)/g, 'echo $1') // Replace print with echo
                    .replace(/\.\.\s*/g, '') // Replace string concatenation
                    .replace(/--\s+/g, '# ') // Replace comments
                    .trim();
            }
            break;
    }
    
    return convertedCode;
}
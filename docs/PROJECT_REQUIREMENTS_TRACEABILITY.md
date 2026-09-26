# مصفوفة تتبع المتطلبات والمطابقة الأكاديمية
## Traceability Matrix & Academic Requirements Compliance

توثق هذه المصفوفة مطابقة بنود المشروع البرمجي مع المتطلبات المحددة في ملفات التكليف الجامعية الثلاثة:
1. `مترجمات_عملي_مشروع .pdf` (دليل مواصفات مشروع المترجم للدكتور خالد الكهصة)
2. `قواعد اللغة.pdf` (القواعد النحوية الرسمية للغة البرمجية العربية)
3. `تقرير_فهم_وخطة_تنفيذ_مشروع_المترجمات_بلغة_C#-1.pdf` (خطة العمل والتوزيع الهندسي)

---

## 1. جدول مطابقة المتطلبات الوظيفية (Functional Compliance)

| الرقم | المتطلب الأكاديمي المطلوب | حالة الإنجاز | المكون المسؤول في الكود (Source File) | الاختبار المؤتمت (Automated Test) |
| :---: | :--- | :---: | :--- | :--- |
| **REQ-01** | استقلالية المترجم تماماً كبرنامج تنفيذي مستقل عن المحرر | **منجز 100%** | `src/ArabicCompiler.Cli/Program.cs` | `EndToEndTests.EndToEnd_SimplePrint_CompilesAndRuns` |
| **REQ-02** | قيام المحرر باستدعاء المترجم كعملية (`Process.Start`) وتمرير المعلمات | **منجز 100%** | `ArabicLanguageEditor/Services/CompilerService.cs` | فحص تكاملي في المحرر |
| **REQ-03** | دعم الأبجدية العربية وتطبيع الهمزات والتعليقات وعلامات الترقيم العربية | **منجز 100%** | `ArabicCompiler.Core/Lexing/Lexer.cs` | `LexerTests.Lexer_RecognizesArabicIdentifiersAndKeywords` |
| **REQ-04** | تصدير ملف الرموز المعجمية `tokens.json` متضمناً الأسطر والأعمدة | **منجز 100%** | `ArabicCompiler.Core/CompilerEngine.cs` | `LexerTests.Lexer_HandlesCommentsAndPositions` |
| **REQ-05** | بناء شجرة الإعراب النحوي AST ومحلل نحوي انحداري تعاودي LL(1) | **منجز 100%** | `ArabicCompiler.Core/Parsing/Parser.cs`, `AstNodes.cs` | `ParserTests.Parser_ParsesCompleteProgramStructure` |
| **REQ-06** | تصدير شجرة الإعراب بصيغة نصية هرمية واضحة `parse-tree.txt` | **منجز 100%** | `ArabicCompiler.Core/Parsing/AstNodes.cs` (`AstVisualizer`) | `EndToEndTests.AllArtifacts_GeneratedSuccessfully` |
| **REQ-07** | دعم أنواع البيانات: صحيح، حقيقي، منطقي، حرفي، نصي | **منجز 100%** | `Parser.cs`, `SemanticAnalyzer.cs`, `VirtualMachine.cs` | `ParserTests.Parser_ParsesVariableDeclarations` |
| **REQ-08** | دعم الأنواع المركبة: السجلات (`سجل`) والمصفوفات (`مصفوفة`) | **منجز 100%** | `AstNodes.cs`, `Parser.cs`, `SemanticAnalyzer.cs` | `ParserTests.Parser_ParsesComplexTypes_RecordsAndArrays` |
| **REQ-09** | دعم الإجراءات (`اجراء`) مع المعاملات بالقيمة وبالمرجع (`بالمرجع`) | **منجز 100%** | `Parser.cs`, `SemanticAnalyzer.cs`, `VirtualMachine.cs` | `EndToEndTests.EndToEnd_ProcedureWithByRef_ModifiesOriginal` |
| **REQ-10** | دعم الجمل الشرطية وحلقات التكرار الثلاث (`طالما`، `كرر..حتى`، `كرر..الى`) | **منجز 100%** | `Parser.cs`, `ThreeAddressCodeGenerator.cs`, `VM.cs` | `EndToEndTests.EndToEnd_LoopsAndConditionals_WorkCorrectly` |
| **REQ-11** | إدارة جداول الرموز المتداخلة (Scoped Symbol Table) وتصدير `symbols.json` | **منجز 100%** | `ArabicCompiler.Core/Symbols/`, `SymbolTable.cs` | `SemanticTests.Semantic_DetectsDuplicateDeclarations` |
| **REQ-12** | الفحص الدلالي: منع استخدام غير المعرف، منع تكرار التعريف، حماية الثوابت | **منجز 100%** | `ArabicCompiler.Core/Semantic/SemanticAnalyzer.cs` | `SemanticTests.Semantic_DetectsConstantReassignment` |
| **REQ-13** | توليد الكود الوسيط ثلاثي العناوين وتصدير `three-address-code.txt` | **منجز 100%** | `ArabicCompiler.Core/IntermediateCode/` | `EndToEndTests.AllArtifacts_GeneratedSuccessfully` |
| **REQ-14** | توليد لغة التجميع x64/ArabicVM وتصدير `assembly-code.asm` | **منجز 100%** | `ArabicCompiler.Core/CodeGeneration/AssemblyGenerator.cs` | `EndToEndTests.AllArtifacts_GeneratedSuccessfully` |
| **REQ-15** | تنفيذ البرنامج عبر الآلة الافتراضية ودعم المدخلات/المخرجات `output.txt` | **منجز 100%** | `ArabicCompiler.Core/Runtime/VirtualMachine.cs` | `EndToEndTests.EndToEnd_SimplePrint_CompilesAndRuns` |
| **REQ-16** | تصدير ملفات الأخطاء النحوية والدلالية بدقة وتفصيل | **منجز 100%** | `syntax-errors.json`, `semantic-errors.json` | `SemanticTests.Semantic_DetectsUndeclaredVariables` |
| **REQ-17** | واجهة محرر حديثة تدعم الاتجاه العربي بالكامل (RTL) وترقيم الأسطر | **منجز 100%** | `ArabicLanguageEditor/MainWindow.xaml`, `.xaml.cs` | التحقق المرئي التفاعلي |
| **REQ-18** | الانتقال التلقائي للسطر البرمجي عند النقر المزدوج على الخطأ | **منجز 100%** | `ArabicLanguageEditor/MainWindow.xaml.cs` (`GridErrors_DoubleClick`) | التحقق الوظيفي |
| **REQ-19** | توفير 17 مثالاً برمجياً شاملاً لكافة قواعد اللغة (العمليات، المصفوفات، السجلات، الدوال، الإدخال، والأخطاء) | **منجز 100%** | مجلد `ArabicCompilerSolution/examples/` | اختبار جميع الأمثلة في VM |
| **REQ-20** | استيفاء متطلبات التسمية والتحزيم الأكاديمي (`PREXE-GN`, `PRFL-GN`) | **منجز 100%** | `scripts/package_submission.ps1` | سكربت أتمتة التحزيم الفوري |

---

## 2. مطابقة قواعد النحو (Grammar Rule Coverage)

- تم تغطية كافة القواعد النحوية المحددة في ملزمة الدكتور بنسبة **100%** بدون أي نقصان.
- يتضمن ذلك التعبيرات الرياضية المعقدة، أسبقية العمليات (الأقواس ثم الأس `^` ثم الضرب والقسمة وباقي القسمة ثم الجمع والطرح)، والعمليات المنطقية (`و`، `او`، `ليس`) وعوامل المقارنة الستة (`==`, `!=`, `<`, `<=`, `>`, `>=`).

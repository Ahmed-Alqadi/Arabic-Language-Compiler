# قواعد اللغة البرمجية العربية ومواصفات المحلل النحوي
## Formal Grammar Specification (EBNF & BNF)

---

## 1. الكلمات المحجوزة والرموز المعجمية (Reserved Keywords & Tokens)

### أ. الكلمات المفتاحية الأساسية:
| الكلمة العربية | المكافئ بالإنجليزية | الاستخدام |
| :--- | :--- | :--- |
| `برنامج` | `program` | رأس البرنامج وتسميته |
| `ثابت` | `const` | التصريح عن الثوابت غير القابلة للتغيير |
| `نوع` | `type` | التصريح عن الأنواع الجديدة المركبة (السجلات والمصفوفات) |
| `متغير` | `var` | التصريح عن المتغيرات |
| `اجراء` | `procedure` | تعريف الإجراءات والوظائف |
| `بالمرجع` | `byref` | تمرير المعامل في الإجراء بالمرجع لتعديل قيمته |
| `سجل` | `record` | نوع بيانات مركب يحتوي حقولاً داخلية |
| `مصفوفة` | `array` | نوع بيانات يمثل مصفوفة ذات نطاق محدد |
| `من` | `of` | تحديد نوع عناصر المصفوفة |
| `صحيح` | `integer` | نوع البيانات الصحيح |
| `حقيقي` | `real` | نوع البيانات الحقيقي (العشري) |
| `منطقي` | `boolean` | نوع البيانات المنطقي (`صحيح` أو `خطا`) |
| `حرفي` | `char` | محرف مفرد |
| `نصي` | `string` | سلسلة نصية |
| `اذا` | `if` | بداية جملة الشرط |
| `حينئذ` | `then` | فرع تحقق الشرط |
| `والا` | `else` | فرع عدم تحقق الشرط |
| `طالما` | `while` | بداية حلقة الفحص المسبق |
| `كرر` | `repeat / loop` | بداية حلقة الفحص اللاحق أو حلقة كرر العددية |
| `حتى` | `until` | شرط نهاية حلقة كرر ... حتى |
| `الى` | `to` | الحد الأعلى لحلقة كرر العددية |
| `خطوة` | `step` | مقدار الزيادة أو النقصان في حلقة كرر العددية |
| `اعد` | `repeat` | صيغة بديلة لحلقة التكرار |
| `اقرا` | `read` | أمر إدخال البيانات |
| `اطبع` | `print` | أمر طباعة البيانات والمخرجات |
| `نهاية` | `end` | إنهاء الجمل المركبة أو الإجراء |

---

### ب. العوامل والرموز الخاصة:
| الرمز | الاسم بالعربية | الاستخدام |
| :--- | :--- | :--- |
| `؛` أو `;` | فاصلة منقوطة | إنهاء الجمل والعبارات |
| `،` أو `,` | فاصلة عادية | الفصل بين المعاملات والمتغيرات |
| `:` | نقطتان رأسيتان | تحديد نوع المتغير أو المعامل |
| `.` | نقطة | إنهاء البرنامج أو الوصول لحقل السجل |
| `..` | نقطتان متتاليتان | تحديد نطاق حدود المصفوفة مثل `[1..10]` |
| `=` | يساوي | عامل الإسناد والتعيين، وتحديد قيم الثوابت |
| `+`, `-`, `*`, `/` | العمليات الحسابية | جمع، طرح، ضرب، قسمة |
| `^` | الأس | رفع إلى القوة الحسابية |
| `%` | باقي القسمة | حساب باقي القسمة الحسابي (Modulo) |
| `==`, `!=` | التساوي واللاتساوي | مقارنة التساوي وعدم التساوي |
| `<`, `<=`, `>`, `>=` | المقارنات | أصغر، أصغر أو يساوي، أكبر، أكبر أو يساوي |
| `و` | عامل العطف المنطقي | AND المنطقية |
| `او` | عامل الفصل المنطقي | OR المنطقية |
| `ليس` | عامل النفي المنطقي | NOT المنطقية |
| `(` و `)` | أقواس دائرية | التجميع وأقواس استدعاء الإجراءات |
| `[` و `]` | أقواس مربعة | فهرسة المصفوفات |
| `{` و `}` | أقواس معقوفة | كتل البداية والنهاية للمجموعات البرمجية |

---

## 2. الصياغة النحوية الرسمية بنموذج (Extended BNF Grammar)

```ebnf
(* البرنامج الرئيسي *)
Program ::= "برنامج" Identifier "؛" Declarations Block "."

(* قسم التصريحات *)
Declarations ::= [ ConstantSection ] [ TypeSection ] [ VariableSection ] { ProcedureDeclaration }

(* تصريحات الثوابت *)
ConstantSection ::= "ثابت" Identifier "=" Literal { "،" Identifier "=" Literal } "؛"

(* تصريحات الأنواع *)
TypeSection ::= "نوع" Identifier "=" TypeDefinition "؛" { Identifier "=" TypeDefinition "؛" }
TypeDefinition ::= RecordType | ArrayType | PrimitiveType

RecordType ::= "سجل" "{" { VariableDeclaration "؛" } "}"
ArrayType ::= "مصفوفة" "[" IntegerLiteral ".." IntegerLiteral "]" "من" PrimitiveType
PrimitiveType ::= "صحيح" | "حقيقي" | "منطقي" | "حرفي" | "نصي"

(* تصريحات المتغيرات *)
VariableSection ::= { VariableDeclaration "؛" }
VariableDeclaration ::= "متغير" IdentifierList ":" TypeSpecifier
IdentifierList ::= Identifier { "،" Identifier }
TypeSpecifier ::= PrimitiveType | Identifier

(* تصريحات الإجراءات *)
ProcedureDeclaration ::= "اجراء" Identifier [ "(" ParameterList ")" ] "؛" 
                         [ VariableSection ] Block "؛"
ParameterList ::= Parameter { "؛" Parameter }
Parameter ::= [ "بالمرجع" ] IdentifierList ":" TypeSpecifier

(* الكتلة البرمجية *)
Block ::= "{" StatementList "}"
StatementList ::= { Statement "؛" }

(* الجمل والعبارات البرمجية *)
Statement ::= AssignmentStatement
            | ProcedureCallStatement
            | IfStatement
            | WhileStatement
            | RepeatUntilStatement
            | ForLoopStatement
            | ReadStatement
            | PrintStatement
            | Block

(* جملة الإسناد *)
AssignmentStatement ::= Selector "=" Expression
Selector ::= Identifier { "." Identifier | "[" Expression "]" }

(* استدعاء الإجراء *)
ProcedureCallStatement ::= Identifier [ "(" ArgumentList ")" ]
ArgumentList ::= Expression { "،" Expression }

(* جملة الشرط *)
IfStatement ::= "اذا" Expression "حينئذ" Statement [ "والا" Statement ] [ "نهاية" ]

(* حلقات التكرار *)
WhileStatement ::= "طالما" Expression "كرر" Statement
RepeatUntilStatement ::= ( "كرر" | "اعد" ) StatementList "حتى" Expression
ForLoopStatement ::= "كرر" Identifier "=" Expression "الى" Expression [ "خطوة" Expression ] Statement

(* جمل الإدخال والإخراج *)
ReadStatement ::= "اقرا" "(" Selector { "،" Selector } ")"
PrintStatement ::= "اطبع" "(" PrintableList ")"
PrintableList ::= Expression { "،" Expression }

(* التعبيرات الرياضية والمنطقية وأسبقيتها *)
Expression ::= LogicalOrExpression
LogicalOrExpression ::= LogicalAndExpression { "او" LogicalAndExpression }
LogicalAndExpression ::= EqualityExpression { "و" EqualityExpression }
EqualityExpression ::= RelationalExpression { ( "==" | "!=" ) RelationalExpression }
RelationalExpression ::= AdditiveExpression { ( "<" | "<=" | ">" | ">=" ) AdditiveExpression }
AdditiveExpression ::= MultiplicativeExpression { ( "+" | "-" ) MultiplicativeExpression }
MultiplicativeExpression ::= PowerExpression { ( "*" | "/" | "%" ) PowerExpression }
PowerExpression ::= UnaryExpression [ "^" PowerExpression ]
UnaryExpression ::= ( "+" | "-" | "ليس" ) UnaryExpression | PrimaryExpression

PrimaryExpression ::= Literal
                    | Selector
                    | "(" Expression ")"

Literal ::= IntegerLiteral | RealLiteral | StringLiteral | CharLiteral | BooleanLiteral
BooleanLiteral ::= "صحيح" | "خطا"
```

---

## 3. كتالوج رموز الأخطاء (Compiler Error Catalog)

### أ. الأخطاء النحوية (Syntax Errors - `SYN`):
| رمز الخطأ | الوصف باللغة العربية | الحالة |
| :--- | :--- | :--- |
| `SYN001` | رمز غير متوقع أو غير معروف في الموضع المحدد | وجود محرف شاذ لا ينتمي لأبجدية اللغة |
| `SYN002` | اسم البرنامج متوقع بعد الكلمة المفتاحية `برنامج` | عدم كتابة اسم المعرف للبرنامج |
| `SYN003` | الفاصلة المنقوطة `؛` مفقودة | نسيان إنهاء الجملة أو التصريح بالفاصلة المنقوطة |
| `SYN004` | كتلة البداية `{` مفقودة | نسيان فتح قوس الكتلة البرمجية |
| `SYN005` | كتلة النهاية `}` مفقودة | نسيان إغلاق الكتلة البرمجية |
| `SYN006` | النقطة النهائية `.` مفقودة في نهاية البرنامج | البرنامج يجب أن يختتم بنقطة بعد القوس `}.` |
| `SYN007` | الكلمة المفتاحية `حينئذ` مفقودة بعد شرط `اذا` | صياغة شرطية غير مكتملة |
| `SYN008` | الكلمة المفتاحية `كرر` مفقودة في جملة `طالما` | صياغة حلقة فحص مسبق غير مكتملة |
| `SYN009` | الكلمة المفتاحية `حتى` مفقودة في جملة `كرر ... حتى` | صياغة حلقة فحص لاحق غير مكتملة |
| `SYN010` | عامل الإسناد `=` مفقود في جملة التعيين | نسيان إسناد قيمة للمتغير |

---

### ب. الأخطاء الدلالية (Semantic Errors - `SEM`):
| رمز الخطأ | الوصف باللغة العربية | الحالة |
| :--- | :--- | :--- |
| `SEM001` | المعرف غير معرّف (Undeclared Identifier) | استخدام متغير أو إجراء دون التصريح عنه مسبقاً |
| `SEM002` | إعادة تعريف المعرف في نفس النطاق (Duplicate Declaration) | التصريح عن نفس الاسم مرتين في ذات المجال |
| `SEM003` | محاولة تعديل قيمة ثابت (Constant Reassignment) | إسناد قيمة جديدة لمعرف تم التصريح عنه كـ `ثابت` |
| `SEM004` | عدم تطابق في الأنواع (Type Mismatch) | محاولة جمع أو إسناد نص إلى عدد صحيح مثلاً |
| `SEM005` | شرط غير منطقي (Non-Boolean Condition) | تعبير الشرط في `اذا` أو `طالما` لا ينتج قيمة منطقية |
| `SEM006` | عدم تطابق في عدد المعاملات (Parameter Count Mismatch) | استدعاء إجراء بعدد معاملات يختلف عن تصريحه |
| `SEM007` | عدم تطابق في نوع المعامل (Parameter Type Mismatch) | تمرير قيمة بنوع يختلف عن نوع المعامل المطلوب |
| `SEM008` | المعامل بالمرجع يتطلب متغيراً قابلاً للتعديل (ByRef Requires Variable) | تمرير قيمة ثابتة أو تعبير حسابي لمعامل معرّف `بالمرجع` |
| `SEM009` | الحقل غير موجود في السجل (Record Field Not Found) | محاولة قراءة أو إسناد حقل غير موجود في تعريف الـ `سجل` |
| `SEM010` | فهرس المصفوفة يجب أن يكون عدداً صحيحاً (Array Index Must Be Integer) | استخدام قيمة نصية أو حقيقية كفهرس للمصفوفة |

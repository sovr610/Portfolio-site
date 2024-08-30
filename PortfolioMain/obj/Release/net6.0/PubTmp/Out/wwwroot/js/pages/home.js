var c = document.getElementById("c");
var ctx = c.getContext("2d");
const token = sessionStorage.getItem("jwtToken");
console.log("token: ", token);
var startedMusic = false;
var songIndex = 0;
const cursorPath = 'assets/Cursors/catppuccin-frappe-red-cursors/';

// Making the canvas full screen
c.height = window.innerHeight;
c.width = window.innerWidth;


document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector('.progress-zz');
    const percentageText = document.querySelector('.percentage-zz');
    const loadingScreen = document.getElementById('loading-screen-zz');
    const content = document.getElementById('content');

    let assetsLoaded = 0;
    let totalAssets = 0;
    let estimatedSpeed = 1; // Default speed factor

    // Function to update the progress bar
    function updateProgressBar() {
        const progress = (assetsLoaded / totalAssets) * 100;
        progressBar.style.width = `${progress}%`;
        percentageText.textContent = `${Math.floor(progress)}%`;

        // Hide the loading screen once everything is loaded
        if (progress >= 100) {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                content.style.display = 'block';
            }, 500); // Small delay to make sure the last 100% is displayed
        }
    }

    // Function to estimate internet speed
    function estimateSpeed() {
        const startTime = new Date().getTime();
        const image = new Image();
        const testImage = "https://via.placeholder.com/500"; // URL of a known-size image
        image.src = testImage + "?t=" + startTime; // Cache-busting query string

        image.onload = function () {
            const endTime = new Date().getTime();
            const duration = (endTime - startTime) / 1000; // Time in seconds
            const imageSize = 500 * 500 * 3; // Estimate for a 500x500 image, assuming 3 bytes per pixel (RGB)
            const speedBps = (imageSize * 8) / duration; // Speed in bits per second
            const speedMbps = speedBps / (1024 * 1024); // Convert to Mbps

            // Adjust speed factor based on speed estimation
            estimatedSpeed = Math.min(Math.max(speedMbps / 5, 0.5), 2); // Normalize between 0.5x and 2x
        };
    }

    // Observe loading of resources
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntriesByType('resource');
        totalAssets += entries.length;
        entries.forEach((entry) => {
            assetsLoaded++;
            updateProgressBar();
        });
    });

    observer.observe({ entryTypes: ['resource'] });

    // Fallback for when the window load event fires (ensures all resources are accounted for)
    window.addEventListener('load', function () {
        assetsLoaded++;
        totalAssets++;
        updateProgressBar();

        observer.disconnect();
    });

    // Simulate asset loading progress based on estimated speed
    function simulateLoading() {
        let simulatedProgress = 0;
        const interval = setInterval(() => {
            simulatedProgress += estimatedSpeed; // Adjust based on estimated speed
            if (simulatedProgress >= 100) {
                simulatedProgress = 100;
                clearInterval(interval);
            }

            progressBar.style.width = `${simulatedProgress}%`;
            percentageText.textContent = `${Math.floor(simulatedProgress)}%`;

            if (simulatedProgress >= 100) {
                loadingScreen.style.display = 'none';
                content.style.display = 'block';
            }
        }, 100);
    }

    // Start speed estimation and simulate loading based on the result
    estimateSpeed();
    setTimeout(simulateLoading, 1000); // Simulate loading after speed estimation
});






function reloadScript(scriptId, scriptSrc) {
    const oldScript = document.getElementById(scriptId);
    if (oldScript) {
        oldScript.parentNode.removeChild(oldScript);
    }

    const newScript = document.createElement('script');
    newScript.id = scriptId;
    newScript.src = scriptSrc;
    newScript.onload = function () {
        console.log(`${scriptSrc} reloaded.`);
    };

    document.body.appendChild(newScript);
}

// Chinese characters - taken from the unicode charset
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
// Converting the string into an array of single characters
matrix = matrix.split("");

function openModal() {
    
    document.getElementById('modalOverlay-webxr').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay-webxr').style.display = 'none';
}

function openModalLLM() {

    document.getElementById('modalOverlay-LLM').style.display = 'flex';
}

function closeModalLLM() {
    document.getElementById('modalOverlay-LLM').style.display = 'none';
}

var font_size = 10;
var columns = c.width / font_size; // Number of columns for the rain
// An array of drops - one per column
var drops = [];
// x below is the x coordinate
// 1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++) drops[x] = 1;
var worldCreated = false;
function safeExecute(func) {
    try {
        func();
    } catch (error) {
        console.error('Error in execution:', error);
    }
}

function openSkillsetModal(title) {
    populateSkillsetModal(title);
    document.getElementById('modalOverlay-Skillset').style.display = 'flex';
}

// Existing close modal function
function closeModalSkillset() {
    document.getElementById('modalOverlay-Skillset').style.display = 'none';
}



const skillsets = [
    {
        title: "C#",
        description: `    <div class="cs-container">
        <h1 class="cs-heading-main">Introduction to C#</h1>
        <p><strong>C#</strong> (pronounced "C-sharp") is a modern, object-oriented programming language developed by Microsoft. It is part of the .NET framework and is widely used for developing a variety of applications, including web, desktop, mobile, cloud, and game development. C# is designed to be simple, powerful, and flexible, making it a popular choice among developers.</p>

        <div class="cs-key-features">
            <h2 class="cs-heading-sub">Key Features of C#</h2>
            <ul class="cs-list">
                <li><strong>Object-Oriented:</strong> C# supports the principles of object-oriented programming, such as encapsulation, inheritance, and polymorphism, which helps in creating modular and reusable code.</li>
                <li><strong>Strongly Typed:</strong> C# is a statically typed language, meaning that type checking is done at compile-time, which reduces runtime errors and improves code stability.</li>
                <li><strong>Garbage Collection:</strong> C# automatically manages memory through garbage collection, reducing the risk of memory leaks and improving the overall performance of applications.</li>
                <li><strong>Interoperability:</strong> C# can easily interact with other languages, especially those in the .NET ecosystem, such as Visual Basic and F#.</li>
                <li><strong>Modern Language Features:</strong> C# includes modern programming constructs like generics, LINQ (Language-Integrated Query), asynchronous programming with async/await, and more.</li>
            </ul>
        </div>

        <div class="cs-history">
            <h2 class="cs-heading-sub">History of C#</h2>
            <p>C# has evolved significantly since its inception:</p>
            <ul class="cs-list">
                <li><strong>Early Development (Late 1990s):</strong> C# was developed by Microsoft as part of its .NET initiative, which aimed to create a unified framework for building various types of applications. The language was designed by Anders Hejlsberg, who had previously worked on Turbo Pascal and Delphi.</li>
                <li><strong>Release (2000):</strong> C# was officially introduced to the public in 2000, alongside the first version of the .NET framework. It was positioned as a language that combines the power of C++ with the simplicity of Visual Basic, making it accessible to a broad range of developers.</li>
                <li><strong>Evolution and Versions:</strong> 
                    <ul class="cs-list">
                        <li><strong>C# 2.0 (2005):</strong> Introduced features like generics, nullable types, and anonymous methods.</li>
                        <li><strong>C# 3.0 (2007):</strong> Introduced LINQ, lambda expressions, and extension methods, which greatly enhanced the language's expressiveness and functionality.</li>
                        <li><strong>C# 4.0 (2010):</strong> Brought dynamic typing with the <code>dynamic</code> keyword, named and optional arguments, and more.</li>
                        <li><strong>C# 5.0 (2012):</strong> Introduced asynchronous programming with async/await, simplifying the writing of asynchronous code.</li>
                        <li><strong>C# 6.0 (2015):</strong> Added features like expression-bodied members, string interpolation, and null-conditional operators.</li>
                        <li><strong>C# 7.0 and Beyond (2017-2020):</strong> Continued to introduce modern language features such as pattern matching, tuples, local functions, and more.</li>
                    </ul>
                </li>
                <li><strong>Cross-Platform Development (2016):</strong> With the release of .NET Core, C# became truly cross-platform, allowing developers to build and run C# applications on Windows, Linux, and macOS. This greatly expanded the reach and versatility of the language.</li>
                <li><strong>Present and Future:</strong> C# continues to be actively developed, with new versions regularly adding features that keep it relevant in the rapidly changing world of software development.</li>
            </ul>
        </div>
    </div>`,
        icon: "csharp-icon.png"
    },
    {
        title: "VB.NET",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to VB.NET</h1>
        <div class="cs-content-cyber">
            <p><strong>VB.NET</strong> (Visual Basic .NET) is an object-oriented programming language developed by Microsoft. It is an evolution of the classic Visual Basic (VB) language and is fully integrated into the .NET framework. VB.NET is designed to be simple and easy to use, making it accessible to beginners while still being powerful enough for advanced developers.</p>

            <h2 class="cs-heading-main-cyber">Key Features of VB.NET</h2>
            <ul class="cs-list-cyber">
                <li><strong>Object-Oriented:</strong> Like C#, VB.NET supports object-oriented programming principles, enabling developers to create modular and reusable code.</li>
                <li><strong>Strongly Typed:</strong> VB.NET is a statically typed language, ensuring type safety and reducing runtime errors by catching issues at compile-time.</li>
                <li><strong>Easy to Learn:</strong> VB.NET retains many features of the classic VB language, making it easier for developers familiar with VB6 to transition to the .NET framework.</li>
                <li><strong>Interoperability:</strong> VB.NET can interact seamlessly with other .NET languages like C# and F#, making it versatile in mixed-language projects.</li>
                <li><strong>Rapid Application Development:</strong> VB.NET is well-suited for rapid application development (RAD) with features like automatic code formatting, a rich set of libraries, and a powerful integrated development environment (IDE).</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of VB.NET</h2>
            <p>VB.NET has a rich history rooted in the classic Visual Basic language:</p>
            <ul class="cs-list-cyber">
                <li><strong>Evolution from Visual Basic:</strong> VB.NET was introduced in 2002 as a successor to Visual Basic 6.0. It was a significant shift as it introduced developers to the .NET framework, bringing with it object-oriented features and a more modern programming model.</li>
                <li><strong>Initial Release (2002):</strong> The first version of VB.NET was released with .NET Framework 1.0. This version brought many changes, including full object-oriented support, garbage collection, and a powerful standard library.</li>
                <li><strong>Further Developments:</strong> 
                    <ul class="cs-list-cyber">
                        <li><strong>VB.NET 2003:</strong> Improved on the original release with better performance and new features, including support for the .NET Compact Framework.</li>
                        <li><strong>VB.NET 2005:</strong> Introduced features such as generics, partial classes, and the My namespace, which provided easy access to common tasks.</li>
                        <li><strong>VB.NET 2008:</strong> Brought LINQ (Language-Integrated Query), enabling powerful data manipulation directly within the language.</li>
                        <li><strong>VB.NET 2010:</strong> Introduced dynamic language runtime (DLR) features, allowing for dynamic programming capabilities.</li>
                    </ul>
                </li>
                <li><strong>Integration with .NET Core:</strong> With the advent of .NET Core, VB.NET gained cross-platform capabilities, allowing applications to run on Windows, Linux, and macOS.</li>
                <li><strong>Present and Future:</strong> VB.NET remains a key language in the .NET ecosystem, especially for developers maintaining legacy VB code or those who prefer its syntax. It continues to evolve alongside the .NET platform.</li>
            </ul>
        </div>
    </div>`,
        icon: "vbnet-icon.png"
    },
    {
        title: "Java",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Java</h1>
        <div class="cs-content-cyber">
            <p><strong>Java</strong> is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Java</h2>
            <ul class="cs-list-cyber">
                <li><strong>Platform Independence:</strong> Java is platform-independent at both the source and binary levels, thanks to the Java Virtual Machine (JVM) which allows Java programs to run on any device that has a JVM installed.</li>
                <li><strong>Object-Oriented:</strong> Java is an object-oriented programming language, which means it is based on the concepts of objects and classes, promoting modular, flexible, and reusable code.</li>
                <li><strong>Robust and Secure:</strong> Java provides strong memory management, exception handling, and a security model that makes it a robust and secure language for enterprise applications.</li>
                <li><strong>Multithreaded:</strong> Java has built-in support for multithreading, allowing developers to build applications that can perform multiple tasks simultaneously, improving performance and resource utilization.</li>
                <li><strong>Rich API:</strong> Java comes with a vast standard library (API) that provides many ready-made functionalities for handling everything from data structures and networking to user interfaces and cryptography.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Java</h2>
            <p>Java has a rich history, starting from its inception in the early 1990s:</p>
            <ul class="cs-list-cyber">
                <li><strong>Early Development:</strong> Java was originally developed by James Gosling at Sun Microsystems, and it was released in 1995 as a core component of Sun Microsystems' Java platform. The language was initially called Oak, but it was renamed Java after a type of coffee from Indonesia.</li>
                <li><strong>Initial Release (1995):</strong> The first public implementation was Java 1.0, and it promised the WORA (Write Once, Run Anywhere) capability, with a major focus on ensuring that Java programs could run on any operating system without modification.</li>
                <li><strong>Major Versions:</strong>
                    <ul class="cs-list-cyber">
                        <li><strong>Java 2 (1998):</strong> This major release introduced significant updates, including the Swing graphical user interface (GUI) toolkit, and it divided the platform into three editions: Standard Edition (SE), Enterprise Edition (EE), and Micro Edition (ME).</li>
                        <li><strong>Java 5 (2004):</strong> Introduced important features like generics, enhanced for loop, metadata, and auto-boxing/unboxing.</li>
                        <li><strong>Java 8 (2014):</strong> Brought major language enhancements, including lambda expressions, the Stream API, and the new Date-Time API.</li>
                        <li><strong>Java 9 (2017):</strong> Introduced the module system (Project Jigsaw) and other improvements such as the JShell interactive tool.</li>
                    </ul>
                </li>
                <li><strong>Oracle Acquisition (2010):</strong> After Oracle Corporation acquired Sun Microsystems in 2010, Java's development continued under Oracle's stewardship, leading to the release of subsequent versions and ensuring the language's ongoing evolution.</li>
                <li><strong>Present and Future:</strong> Java remains one of the most popular programming languages in the world, widely used in enterprise environments, Android app development, and many other domains. It continues to evolve, with regular updates and a strong community driving its future.</li>
            </ul>
        </div>
    </div>`,
        icon: "java-icon.png"
    },
    {
        title: "JavaScript",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to JavaScript</h1>
        <div class="cs-content-cyber">
            <p><strong>JavaScript</strong> is a versatile, high-level programming language that is widely used for web development. It was initially created to add interactivity to websites and is now a core technology of the World Wide Web, alongside HTML and CSS. JavaScript is known for being lightweight, dynamic, and event-driven, making it ideal for client-side scripting.</p>

            <h2 class="cs-heading-main-cyber">Key Features of JavaScript</h2>
            <ul class="cs-list-cyber">
                <li><strong>Interpreted Language:</strong> JavaScript is an interpreted language, meaning it is executed directly by the web browser without the need for prior compilation, allowing for dynamic and interactive web pages.</li>
                <li><strong>Dynamic Typing:</strong> JavaScript is dynamically typed, meaning variable types are determined at runtime, providing flexibility in coding but requiring careful handling to avoid errors.</li>
                <li><strong>Event-Driven:</strong> JavaScript is inherently event-driven, which makes it well-suited for responding to user actions, such as clicks, mouse movements, or keystrokes, enhancing the interactivity of web applications.</li>
                <li><strong>Prototype-Based Object Orientation:</strong> Unlike classical object-oriented languages, JavaScript uses prototypes rather than classes for inheritance, offering a different approach to object-oriented programming.</li>
                <li><strong>Wide Ecosystem:</strong> JavaScript has a vast ecosystem, with numerous libraries and frameworks (like React, Angular, and Vue.js) that extend its functionality and make development faster and more efficient.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of JavaScript</h2>
            <p>JavaScript has evolved significantly since its creation:</p>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (1995):</strong> JavaScript was created by Brendan Eich at Netscape Communications in just 10 days. It was originally called Mocha, then LiveScript, and finally renamed JavaScript to capitalize on the popularity of Java at the time, though the two languages are not related.</li>
                <li><strong>Standardization (1997):</strong> JavaScript was officially standardized as ECMAScript by the European Computer Manufacturers Association (ECMA). This standardization allowed different browsers to implement the language consistently.</li>
                <li><strong>Major Versions:</strong>
                    <ul class="cs-list-cyber">
                        <li><strong>ECMAScript 3 (1999):</strong> This version introduced regular expressions, better string handling, and other features that made JavaScript more powerful and versatile.</li>
                        <li><strong>ECMAScript 5 (2009):</strong> Introduced strict mode, JSON support, and other enhancements that improved performance and security.</li>
                        <li><strong>ECMAScript 6 (2015):</strong> Also known as ECMAScript 2015 or ES6, this version brought significant improvements, including classes, modules, arrow functions, and template literals, making JavaScript more modern and easier to use.</li>
                    </ul>
                </li>
                <li><strong>Node.js (2009):</strong> The introduction of Node.js allowed JavaScript to be used for server-side development, greatly expanding its capabilities and making it a full-stack language.</li>
                <li><strong>Present and Future:</strong> JavaScript continues to evolve with annual ECMAScript updates. It remains one of the most popular and essential languages for web development, with a thriving community and a vast ecosystem of tools and libraries.</li>
            </ul>
        </div>
    </div>`,
        icon: "js-icon.png"
    },
    {
        title: "TypeScript",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to TypeScript</h1>
        <div class="cs-content-cyber">
            <p><strong>TypeScript</strong> is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It was developed and is maintained by Microsoft. TypeScript is a superset of JavaScript, meaning that any valid JavaScript code is also valid TypeScript code. TypeScript is designed to improve the development experience by adding static typing and other features that help catch errors early during the development process.</p>

            <h2 class="cs-heading-main-cyber">Key Features of TypeScript</h2>
            <ul class="cs-list-cyber">
                <li><strong>Static Typing:</strong> TypeScript introduces optional static typing to JavaScript. This allows developers to define the types of variables, function parameters, and return values, helping to catch type-related errors at compile time.</li>
                <li><strong>Type Inference:</strong> TypeScript can automatically infer the type of a variable or expression, reducing the need for explicit type annotations while still providing the benefits of type checking.</li>
                <li><strong>Compatibility with JavaScript:</strong> TypeScript is a strict superset of JavaScript, meaning all JavaScript code is valid TypeScript. This allows developers to gradually adopt TypeScript in existing JavaScript projects.</li>
                <li><strong>Enhanced Tooling:</strong> TypeScript improves the development experience with features like code completion, navigation, and refactoring tools in editors and IDEs that support TypeScript.</li>
                <li><strong>Modern JavaScript Features:</strong> TypeScript supports the latest JavaScript features, including ECMAScript modules, async/await, and decorators, making it a future-proof choice for development.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of TypeScript</h2>
            <p>TypeScript has become increasingly popular since its inception:</p>
            <ul class="cs-list-cyber">
                <li><strong>Initial Release (2012):</strong> TypeScript was first released in October 2012. It was created by Anders Hejlsberg, a lead architect of C#, with the goal of improving large-scale JavaScript application development by introducing static typing and other features.</li>
                <li><strong>Adoption and Growth:</strong> TypeScript quickly gained popularity among developers, especially those working on large-scale web applications. It became particularly popular in the enterprise sector due to its ability to catch errors early in the development process.</li>
                <li><strong>Key Versions:</strong>
                    <ul class="cs-list-cyber">
                        <li><strong>TypeScript 1.0 (2014):</strong> The first stable version of TypeScript was released, bringing features like classes, modules, and interfaces to JavaScript developers.</li>
                        <li><strong>TypeScript 2.0 (2016):</strong> Introduced major features like non-nullable types, control flow analysis, and the ability to handle dynamically typed code more effectively.</li>
                        <li><strong>TypeScript 3.0 (2018):</strong> Added features like project references, tuple types, and advanced type system capabilities, making it easier to manage large projects.</li>
                        <li><strong>TypeScript 4.0 (2020):</strong> Continued to enhance the language with new syntax features, improved tooling, and better type-checking capabilities.</li>
                    </ul>
                </li>
                <li><strong>Integration with Frameworks:</strong> TypeScript is widely adopted in modern front-end frameworks such as Angular, React, and Vue.js. Many of these frameworks now offer first-class TypeScript support, making it easier for developers to use TypeScript in their projects.</li>
                <li><strong>Present and Future:</strong> TypeScript continues to evolve with frequent updates. It remains a popular choice for developers who want the flexibility of JavaScript combined with the safety of static typing, making it a strong tool for modern web development.</li>
            </ul>
        </div>
    </div>`,
        icon: "typescript-icon.png"
    },
    {
        title: "Python",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Python</h1>
        <div class="cs-content-cyber">
            <p><strong>Python</strong> is a high-level, interpreted programming language known for its readability and simplicity. It was created by Guido van Rossum and first released in 1991. Python's design philosophy emphasizes code readability with its notable use of significant indentation. It supports multiple programming paradigms, including procedural, object-oriented, and functional programming.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Python</h2>
            <ul class="cs-list-cyber">
                <li><strong>Readability:</strong> Python's syntax is clear and concise, making it easier to read and write code. This is especially beneficial for beginners and for maintaining complex projects.</li>
                <li><strong>Interpreted Language:</strong> Python is an interpreted language, meaning that code is executed line by line, which makes debugging easier and allows for rapid development.</li>
                <li><strong>Extensive Standard Library:</strong> Python comes with a rich standard library that supports many common programming tasks, including file handling, internet protocols, and data manipulation.</li>
                <li><strong>Cross-Platform Compatibility:</strong> Python is cross-platform, meaning it runs on various operating systems, including Windows, macOS, and Linux, without requiring modification.</li>
                <li><strong>Large Ecosystem:</strong> Python has a vast ecosystem of libraries and frameworks, such as Django, Flask, NumPy, and Pandas, making it suitable for web development, data science, automation, and more.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Python</h2>
            <p>Python has evolved significantly since its inception:</p>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (1989-1991):</strong> Python was conceived in the late 1980s by Guido van Rossum at the Centrum Wiskunde & Informatica (CWI) in the Netherlands. It was first released in 1991 as Python 0.9.0.</li>
                <li><strong>Python 1.0 (1994):</strong> Python 1.0 was released in January 1994, featuring major new functionalities like lambda, map, filter, and reduce.</li>
                <li><strong>Key Versions:</strong>
                    <ul class="cs-list-cyber">
                        <li><strong>Python 2.0 (2000):</strong> Introduced many significant changes, including list comprehensions and garbage collection via reference counting. Python 2.x became widely adopted and remained in use for many years.</li>
                        <li><strong>Python 3.0 (2008):</strong> A major, backwards-incompatible release that aimed to fix fundamental design flaws in the language. Python 3.x introduced features like improved Unicode support, a new I/O system, and better consistency across the language.</li>
                        <li><strong>Python 3.6 (2016):</strong> Introduced formatted string literals (f-strings), asynchronous generators, and other modern language features that have since become widely used.</li>
                        <li><strong>Python 3.9 (2020):</strong> Added new syntax features like the assignment expression (also known as the "walrus operator") and updated the standard library with more modern features.</li>
                    </ul>
                </li>
                <li><strong>Widespread Adoption:</strong> Python has become one of the most popular programming languages in the world, particularly in data science, machine learning, web development, and automation.</li>
                <li><strong>Present and Future:</strong> Python continues to evolve with regular updates, a thriving community, and a vast ecosystem of libraries and tools that make it suitable for a wide range of applications, from web development to artificial intelligence.</li>
            </ul>
        </div>
    </div>`,
        icon: "python-icon.png"
    },
    {
        title: "HTML/CSS",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to HTML and CSS</h1>
        <div class="cs-content-cyber">
            <h2 class="cs-heading-main-cyber">HTML</h2>
            <p><strong>HTML</strong> (HyperText Markup Language) is the standard markup language used to create web pages. It forms the basic structure of web pages by defining elements like headings, paragraphs, links, images, and more. HTML is the foundation of web development and is used in conjunction with CSS and JavaScript to create fully functional web applications.</p>

            <h3 class="cs-heading-main-cyber">Key Features of HTML</h3>
            <ul class="cs-list-cyber">
                <li><strong>Markup Language:</strong> HTML uses tags to define the structure and content of a webpage. Each element is represented by a tag that indicates its role on the page, such as <code>&lt;h1&gt;</code> for headings and <code>&lt;p&gt;</code> for paragraphs.</li>
                <li><strong>Semantic Structure:</strong> HTML5 introduced semantic elements like <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, and <code>&lt;article&gt;</code> to improve the clarity and accessibility of web content.</li>
                <li><strong>Hyperlinks:</strong> HTML allows the creation of hyperlinks, which enable users to navigate between different pages or sections of a webpage, forming the backbone of the web's interconnected nature.</li>
                <li><strong>Media Integration:</strong> HTML supports the embedding of multimedia elements such as images, videos, and audio files, making web pages more dynamic and interactive.</li>
                <li><strong>Cross-Browser Compatibility:</strong> HTML is designed to be compatible across all major web browsers, ensuring that web pages are accessible to users regardless of their browser choice.</li>
            </ul>

            <h3 class="cs-heading-main-cyber">History of HTML</h3>
            <ul class="cs-list-cyber">
                <li><strong>Creation (1989-1991):</strong> HTML was developed by Tim Berners-Lee, a British computer scientist, in 1989 while working at CERN. The first version of HTML was released in 1991, consisting of 18 tags, including basic elements like headings, paragraphs, and links.</li>
                <li><strong>HTML 2.0 (1995):</strong> The first standardized version of HTML, HTML 2.0, was released in 1995. It added more tags and features, standardizing the way HTML documents were structured.</li>
                <li><strong>Key Versions:</strong>
                    <ul class="cs-list-cyber">
                        <li><strong>HTML 3.2 (1997):</strong> Introduced new elements like tables, applets, and more styling options, marking significant progress in the development of HTML.</li>
                        <li><strong>HTML 4.01 (1999):</strong> Standardized elements like forms and introduced support for CSS, enabling better styling and layout control.</li>
                        <li><strong>HTML5 (2014):</strong> HTML5 is the current major version, introducing a host of new features such as semantic elements, multimedia support, and APIs for offline web applications. It has become the standard for modern web development.</li>
                    </ul>
                </li>
                <li><strong>Present and Future:</strong> HTML continues to be the fundamental technology for web development. It evolves alongside other web standards, maintaining its critical role in building the structure and content of the web.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">CSS</h2>
            <p><strong>CSS</strong> (Cascading Style Sheets) is a style sheet language used to describe the presentation of a document written in HTML or XML. CSS controls the layout, colors, fonts, and overall visual appearance of web pages. It is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript, enabling developers to create visually appealing and responsive web designs.</p>

            <h3 class="cs-heading-main-cyber">Key Features of CSS</h3>
            <ul class="cs-list-cyber">
                <li><strong>Separation of Content and Style:</strong> CSS allows developers to separate the visual presentation of a web page from its content, making it easier to maintain and update.</li>
                <li><strong>Selectors and Properties:</strong> CSS uses selectors to target HTML elements and apply styles to them. Properties define the specific style, such as <code>color</code>, <code>font-size</code>, or <code>margin</code>.</li>
                <li><strong>Responsive Design:</strong> CSS enables responsive design, allowing web pages to adapt to different screen sizes and devices, providing a consistent user experience across platforms.</li>
                <li><strong>Layout Control:</strong> CSS provides advanced layout control through techniques like Flexbox, Grid, and positioning, allowing developers to create complex and adaptive layouts.</li>
                <li><strong>Animation and Transitions:</strong> CSS supports animations and transitions, enabling developers to create smooth and dynamic visual effects without the need for JavaScript.</li>
            </ul>

            <h3 class="cs-heading-main-cyber">History of CSS</h3>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (1996):</strong> CSS was first proposed by Håkon Wium Lie and Bert Bos in 1996 to address the need for a language that could style web documents. CSS1 was the first version and introduced basic styling capabilities.</li>
                <li><strong>CSS2 (1998):</strong> CSS2 expanded on the first version, introducing features like absolute, relative, and fixed positioning, as well as support for media-specific style sheets.</li>
                <li><strong>CSS3 (1999-present):</strong> CSS3 was divided into modules, allowing for more rapid and independent development of new features. It introduced many modern features such as Flexbox, Grid, transitions, animations, and media queries for responsive design.</li>
                <li><strong>Present and Future:</strong> CSS continues to evolve, with new features being added regularly. It remains an essential technology for web development, allowing developers to create rich and responsive user interfaces.</li>
            </ul>
        </div>
    </div>
</body>
</html>
Explanation:
Combined Content: The content for both HTML and CSS is combined into a single webpage.
Reused CSS Classes: The HTML structure uses the same CSS classes (.cs-container-cyber, .cs-heading-main-cyber, .cs-content-cyber, and .cs-list-cyber) as in the previous examples to maintain visual consistency.
Content Structure: The content is divided into sections for HTML and CSS, each with key features and a







`,
        icon: "html-css-icon.png"
    },
    {
        title: "ColdFusion",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to ColdFusion</h1>
        <div class="cs-content-cyber">
            <p><strong>ColdFusion</strong> is a commercial rapid web application development platform created by J.J. Allaire in 1995. It was originally designed to make it easier to connect simple HTML pages to a database. Over the years, ColdFusion has evolved into a full-fledged platform for building dynamic web applications, featuring a scripting language known as ColdFusion Markup Language (CFML).</p>

            <h2 class="cs-heading-main-cyber">Key Features of ColdFusion</h2>
            <ul class="cs-list-cyber">
                <li><strong>Rapid Development:</strong> ColdFusion simplifies the development of web applications by providing built-in functions for tasks like database access, form validation, and session management.</li>
                <li><strong>CFML (ColdFusion Markup Language):</strong> ColdFusion uses its own tag-based scripting language, CFML, which is easy to learn and use, allowing developers to quickly build complex web applications.</li>
                <li><strong>Integration Capabilities:</strong> ColdFusion offers excellent integration with various systems and services, including databases, email servers, and web services, making it a versatile platform for enterprise applications.</li>
                <li><strong>Scalability:</strong> ColdFusion is designed to scale with your needs, offering support for load balancing, clustering, and distributed caching, which makes it suitable for both small and large applications.</li>
                <li><strong>Security Features:</strong> ColdFusion includes built-in security features such as SQL injection protection, cross-site scripting (XSS) defense, and user authentication mechanisms.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of ColdFusion</h2>
            <p>ColdFusion has a long history of development and adoption:</p>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (1995):</strong> ColdFusion was created by J.J. Allaire and first released in 1995 by Allaire Corporation. It was one of the first platforms to simplify the process of developing dynamic, database-driven web applications.</li>
                <li><strong>Macromedia Acquisition (2001):</strong> In 2001, Allaire Corporation was acquired by Macromedia, which continued to develop ColdFusion, adding new features and improving its performance and security.</li>
                <li><strong>Adobe Acquisition (2005):</strong> Adobe Systems acquired Macromedia in 2005 and took over the development of ColdFusion. Under Adobe's stewardship, ColdFusion has continued to evolve, adding support for modern web standards and new features.</li>
                <li><strong>Key Versions:</strong>
                    <ul class="cs-list-cyber">
                        <li><strong>ColdFusion MX (2002):</strong> Marked a significant rewrite of the platform, introducing Java as the underlying technology, which greatly enhanced performance and scalability.</li>
                        <li><strong>ColdFusion 8 (2007):</strong> Introduced features like server monitoring, PDF generation, and AJAX integration, making it a more powerful tool for web development.</li>
                        <li><strong>ColdFusion 10 (2012):</strong> Added support for HTML5, RESTful web services, and improved security features, keeping ColdFusion relevant in the modern web development landscape.</li>
                        <li><strong>ColdFusion 2021:</strong> The latest version continues to add new features, including cloud deployment support, modularization, and improved API management tools.</li>
                    </ul>
                </li>
                <li><strong>Present and Future:</strong> ColdFusion remains a popular choice for enterprises that require a robust, secure, and scalable platform for building web applications. Adobe continues to support and develop ColdFusion, ensuring its relevance in the ever-evolving world of web development.</li>
            </ul>
        </div>
    </div>`,
        icon: "coldfusion-icon.png"
    },
    {
        title: ".NET Webform/MVC",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to .NET WebForms and MVC</h1>
        <div class="cs-content-cyber">
            <h2 class="cs-heading-main-cyber">.NET WebForms</h2>
            <p><strong>.NET WebForms</strong> is a web application framework developed by Microsoft as part of the .NET framework. Introduced in 2002, it allows developers to build dynamic websites using a drag-and-drop, event-driven model, similar to Windows Forms applications. WebForms abstracts much of the complexity of web development by providing a rich set of controls and components that automatically handle common tasks like form submission, state management, and page rendering.</p>

            <h3 class="cs-heading-main-cyber">Key Features of .NET WebForms</h3>
            <ul class="cs-list-cyber">
                <li><strong>Event-Driven Programming:</strong> WebForms uses an event-driven programming model, similar to desktop applications, where user actions trigger server-side events.</li>
                <li><strong>State Management:</strong> WebForms provides built-in state management, allowing developers to maintain the state of web controls across postbacks without manual intervention.</li>
                <li><strong>Rich Server Controls:</strong> WebForms offers a wide variety of server controls, such as grids, forms, and data controls, that encapsulate complex HTML and JavaScript, making development faster and easier.</li>
                <li><strong>ViewState:</strong> ViewState is a mechanism in WebForms that allows the state of controls to be preserved across HTTP requests, providing a smooth user experience.</li>
                <li><strong>Drag-and-Drop Design:</strong> Visual Studio provides a drag-and-drop design surface for WebForms, allowing developers to build UIs quickly without writing extensive HTML or JavaScript.</li>
            </ul>

            <h3 class="cs-heading-main-cyber">History of .NET WebForms</h3>
            <ul class="cs-list-cyber">
                <li><strong>Introduction (2002):</strong> .NET WebForms was introduced as part of the first version of the .NET Framework in 2002. It quickly became popular for building enterprise-level web applications due to its ease of use and integration with other .NET technologies.</li>
                <li><strong>Evolution:</strong> Over the years, WebForms evolved with new features, including improved state management, AJAX support, and enhanced controls, keeping it relevant in the changing web development landscape.</li>
                <li><strong>WebForms vs. MVC:</strong> As web development practices shifted towards more control over HTML and separation of concerns, Microsoft introduced ASP.NET MVC, which eventually gained popularity over WebForms for new projects.</li>
                <li><strong>Present and Future:</strong> While WebForms is still supported and used in many legacy applications, new development has largely shifted towards MVC and other modern frameworks like ASP.NET Core.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">.NET MVC</h2>
            <p><strong>.NET MVC</strong> (Model-View-Controller) is a web application framework developed by Microsoft, introduced in 2009. It is part of the ASP.NET framework and follows the MVC design pattern, which separates an application into three main components: the Model, the View, and the Controller. This separation of concerns makes MVC a more flexible and testable framework compared to WebForms, allowing developers more control over HTML, JavaScript, and CSS.</p>

            <h3 class="cs-heading-main-cyber">Key Features of .NET MVC</h3>
            <ul class="cs-list-cyber">
                <li><strong>MVC Design Pattern:</strong> The MVC pattern divides an application into three interconnected components: Model (data), View (UI), and Controller (business logic). This separation facilitates cleaner, more maintainable code.</li>
                <li><strong>Full Control Over HTML:</strong> Unlike WebForms, MVC gives developers complete control over the generated HTML, making it easier to adhere to modern web standards and optimize for performance.</li>
                <li><strong>Routing:</strong> ASP.NET MVC includes a powerful routing engine that allows for clean, SEO-friendly URLs and flexible URL mapping to controller actions.</li>
                <li><strong>Testability:</strong> The separation of concerns in MVC makes it easier to write unit tests for individual components, improving the overall testability of the application.</li>
                <li><strong>Extensibility:</strong> MVC is highly extensible, allowing developers to customize or replace many of the framework's components, such as routing, view engines, and model binding.</li>
            </ul>

            <h3 class="cs-heading-main-cyber">History of .NET MVC</h3>
            <ul class="cs-list-cyber">
                <li><strong>Introduction (2009):</strong> .NET MVC was introduced by Microsoft as an alternative to WebForms, catering to developers who wanted more control over HTML and better adherence to the principles of the MVC pattern.</li>
                <li><strong>ASP.NET MVC 3 (2011):</strong> Introduced Razor, a new view engine that made it easier to write HTML with embedded C# code, improving developer productivity and code readability.</li>
                <li><strong>ASP.NET MVC 4 (2012):</strong> Added support for Web API, allowing developers to easily build RESTful services, as well as support for mobile web applications.</li>
                <li><strong>ASP.NET MVC 5 (2013):</strong> Brought in features like attribute routing, ASP.NET Identity, and better integration with modern web standards such as HTML5 and CSS3.</li>
                <li><strong>ASP.NET Core MVC (2016):</strong> ASP.NET Core unified the MVC and Web API frameworks and introduced cross-platform support, making it possible to develop and run MVC applications on Windows, macOS, and Linux.</li>
                <li><strong>Present and Future:</strong> ASP.NET Core MVC continues to be the preferred framework for new .NET web applications, with ongoing updates and improvements that keep it aligned with modern web development practices.</li>
            </ul>
        </div>
    </div>`,
        icon: "dotnet-icon.png"
    },
    {
        title: "Blazor",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Blazor (.NET)</h1>
        <div class="cs-content-cyber">
            <p><strong>Blazor</strong> is a web framework developed by Microsoft that allows developers to build interactive web applications using C# and .NET. Blazor enables full-stack web development using .NET, where the same language, libraries, and frameworks can be used for both client-side and server-side development. Blazor applications run in the browser via WebAssembly or server-side, with client-side interactivity powered by SignalR.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Blazor</h2>
            <ul class="cs-list-cyber">
                <li><strong>Single-Language Full-Stack Development:</strong> Blazor allows developers to use C# and .NET across the entire application stack, eliminating the need to use JavaScript for client-side interactivity.</li>
                <li><strong>WebAssembly Support:</strong> Blazor WebAssembly allows C# code to run directly in the browser via WebAssembly, enabling rich client-side applications without relying on JavaScript.</li>
                <li><strong>Component-Based Architecture:</strong> Blazor applications are built using reusable components, which encapsulate UI logic and rendering, promoting modularity and reusability.</li>
                <li><strong>Real-Time Web Applications:</strong> Blazor Server allows the creation of real-time web applications using SignalR for communication between the server and the client, providing a responsive user experience.</li>
                <li><strong>Seamless Integration with .NET:</strong> Blazor integrates seamlessly with existing .NET libraries, tools, and frameworks, allowing developers to leverage their existing .NET skills and code.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Blazor</h2>
            <ul class="cs-list-cyber">
                <li><strong>Introduction (2018):</strong> Blazor was first introduced as an experimental project by Microsoft in 2018. It was initially envisioned as a way to run .NET applications in the browser using WebAssembly.</li>
                <li><strong>Blazor Server (2019):</strong> With the release of .NET Core 3.0 in 2019, Blazor Server became generally available, allowing developers to build interactive web applications with a server-side hosting model.</li>
                <li><strong>Blazor WebAssembly (2020):</strong> Blazor WebAssembly was officially released in May 2020 with .NET 5.0, allowing developers to build fully client-side applications that run in the browser using WebAssembly.</li>
                <li><strong>Integration with .NET 6 (2021):</strong> Blazor continued to evolve with the release of .NET 6, introducing new features like hot reload, improved performance, and enhanced tooling support for both Blazor Server and Blazor WebAssembly.</li>
                <li><strong>Present and Future:</strong> Blazor is actively developed and maintained by Microsoft, with ongoing improvements and new features that align with the broader .NET ecosystem. It is increasingly used for building modern, interactive web applications within the .NET community.</li>
            </ul>
        </div>
    </div>`,
        icon: "blazor-icon.png"
    },
    {
        title: "Blazor MAUI",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Blazor MAUI (.NET)</h1>
        <div class="cs-content-cyber">
            <p><strong>Blazor MAUI</strong> is a part of the .NET Multi-platform App UI (MAUI) framework, which allows developers to build native cross-platform applications using .NET and C#. Blazor MAUI specifically enables developers to use Blazor's component-based web UI framework to build native desktop and mobile apps. This integration allows developers to leverage their existing Blazor skills to create apps that run on Android, iOS, Windows, and macOS, all from a single codebase.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Blazor MAUI</h2>
            <ul class="cs-list-cyber">
                <li><strong>Cross-Platform Development:</strong> Blazor MAUI enables the creation of applications that run on multiple platforms (Android, iOS, Windows, macOS) using a single codebase, reducing the effort needed to develop and maintain apps for different platforms.</li>
                <li><strong>Blazor Integration:</strong> Blazor MAUI allows developers to reuse Blazor components and logic in native mobile and desktop apps, bringing the benefits of web development into the realm of native app development.</li>
                <li><strong>Native Access:</strong> Blazor MAUI provides access to native device features and APIs through .NET MAUI, allowing developers to create fully-featured native apps that interact with the underlying hardware and OS features.</li>
                <li><strong>Single Project Structure:</strong> Blazor MAUI uses a single project structure that simplifies app development by consolidating platform-specific code and resources, making it easier to manage and deploy apps.</li>
                <li><strong>Hot Reload:</strong> Blazor MAUI supports hot reload, allowing developers to see changes in the UI in real-time as they edit their code, speeding up the development process.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Blazor MAUI</h2>
            <ul class="cs-list-cyber">
                <li><strong>Introduction of .NET MAUI (2021):</strong> .NET MAUI was introduced as the evolution of Xamarin.Forms, offering a unified framework for building cross-platform apps. With .NET 6, Microsoft integrated Blazor into .NET MAUI, enabling developers to use Blazor for building native apps.</li>
                <li><strong>Blazor MAUI with .NET 6 (2021):</strong> Blazor MAUI was officially released as part of .NET 6, providing developers with the tools to build cross-platform apps using Blazor's familiar web-based UI components.</li>
                <li><strong>Rapid Adoption:</strong> Since its release, Blazor MAUI has gained traction among developers who appreciate the ability to reuse Blazor code across web, desktop, and mobile platforms, streamlining the development process.</li>
                <li><strong>Integration with .NET Ecosystem:</strong> Blazor MAUI seamlessly integrates with other parts of the .NET ecosystem, including libraries, tools, and cloud services, making it a powerful option for cross-platform development.</li>
                <li><strong>Present and Future:</strong> Blazor MAUI is actively developed and maintained by Microsoft, with ongoing improvements and new features that continue to expand its capabilities and ease of use, making it a key tool for .NET developers building cross-platform applications.</li>
            </ul>
        </div>
    </div>`,
        icon: "blazor-maui-icon.png"
    },
    {
        title: "Spring Boot/Maven",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Spring Boot and Maven</h1>
        <div class="cs-content-cyber">
            <h2 class="cs-heading-main-cyber">Spring Boot</h2>
            <p><strong>Spring Boot</strong> is an open-source, microservice-based Java framework used to create stand-alone, production-grade Spring-based applications. It is part of the larger Spring Framework ecosystem and is designed to simplify the development of new Spring applications by providing defaults for many configuration settings and eliminating the need for much boilerplate code. Spring Boot allows developers to build microservices quickly and efficiently by providing a suite of tools, libraries, and templates.</p>

            <h3 class="cs-heading-main-cyber">Key Features of Spring Boot</h3>
            <ul class="cs-list-cyber">
                <li><strong>Auto-Configuration:</strong> Spring Boot automatically configures your application based on the dependencies you have included in your project, reducing the need for manual configuration.</li>
                <li><strong>Standalone Applications:</strong> Spring Boot applications can be run as standalone Java applications without the need for a traditional Java EE application server, simplifying deployment and management.</li>
                <li><strong>Embedded Servers:</strong> Spring Boot includes embedded servers like Tomcat, Jetty, and Undertow, allowing applications to be self-contained and easily deployable as JAR or WAR files.</li>
                <li><strong>Spring Initializr:</strong> Spring Boot provides a web-based tool called Spring Initializr, which allows developers to quickly generate a new Spring Boot project with pre-configured settings and dependencies.</li>
                <li><strong>Production-Ready Features:</strong> Spring Boot includes many features that make applications production-ready, such as metrics, health checks, and externalized configuration, out of the box.</li>
            </ul>

            <h3 class="cs-heading-main-cyber">History of Spring Boot</h3>
            <ul class="cs-list-cyber">
                <li><strong>Introduction (2014):</strong> Spring Boot was first introduced by the Pivotal team in 2014 as a way to simplify the development of Spring applications, particularly for microservices architecture.</li>
                <li><strong>Rapid Adoption:</strong> Since its release, Spring Boot has been widely adopted by the Java development community due to its ease of use, flexibility, and powerful features. It has become the de facto standard for developing Spring applications.</li>
                <li><strong>Integration with Cloud Technologies:</strong> As cloud computing became more prevalent, Spring Boot evolved to include features for building cloud-native applications, integrating with platforms like Spring Cloud, Kubernetes, and Docker.</li>
                <li><strong>Ongoing Development:</strong> Spring Boot continues to be actively developed, with regular releases that introduce new features, improve performance, and enhance developer productivity.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">Maven</h2>
            <p><strong>Apache Maven</strong> is a build automation and project management tool primarily used for Java projects. It provides a uniform build system, a large repository of libraries, and a clear project structure that allows developers to manage dependencies, compile code, and package applications consistently. Maven is one of the most popular tools in the Java ecosystem and is widely used in conjunction with Spring Boot for managing project dependencies and build processes.</p>

            <h3 class="cs-heading-main-cyber">Key Features of Maven</h3>
            <ul class="cs-list-cyber">
                <li><strong>Dependency Management:</strong> Maven manages project dependencies through a centralized repository, allowing developers to easily include third-party libraries and keep them up-to-date.</li>
                <li><strong>Project Structure:</strong> Maven enforces a standard directory layout and project structure, making it easier for developers to navigate and manage large projects.</li>
                <li><strong>Build Automation:</strong> Maven automates the build process, including tasks like compilation, packaging, testing, and deployment, reducing the manual effort required to manage the build lifecycle.</li>
                <li><strong>Plugins:</strong> Maven has a plugin-based architecture that allows developers to extend its functionality. There are plugins available for tasks like code analysis, documentation generation, and deployment.</li>
                <li><strong>Maven Central Repository:</strong> Maven connects to a vast repository of libraries and artifacts, known as Maven Central, where developers can find and download nearly any Java library they need.</li>
            </ul>

            <h3 class="cs-heading-main-cyber">History of Maven</h3>
            <ul class="cs-list-cyber">
                <li><strong>Introduction (2004):</strong> Maven was introduced by the Apache Software Foundation in 2004 as a replacement for Apache Ant, with the goal of providing a more standardized and comprehensive build management system.</li>
                <li><strong>Widespread Adoption:</strong> Maven quickly became popular among Java developers due to its powerful dependency management, consistent project structure, and comprehensive build capabilities. It became the standard build tool for many Java projects.</li>
                <li><strong>Integration with IDEs:</strong> Maven is integrated with major Java IDEs like Eclipse, IntelliJ IDEA, and NetBeans, providing seamless support for building and managing Maven projects directly within the development environment.</li>
                <li><strong>Ongoing Development:</strong> Maven continues to be actively developed and maintained by the Apache Software Foundation, with regular updates and improvements that keep it relevant in modern Java development.</li>
            </ul>
        </div>
    </div>`,
        icon: "spring-maven-icon.png"
    },
    {
        title: "Node.js",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Node.js</h1>
        <div class="cs-content-cyber">
            <p><strong>Node.js</strong> is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code on the server side. Built on Chrome's V8 JavaScript engine, Node.js is designed for building scalable, high-performance network applications, particularly web servers. Since its release, Node.js has become a fundamental part of modern web development, enabling JavaScript to be used for both client-side and server-side programming.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Node.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Asynchronous and Event-Driven:</strong> Node.js uses an event-driven, non-blocking I/O model, which makes it efficient and scalable for handling multiple concurrent connections without the need for multiple threads.</li>
                <li><strong>Single Programming Language:</strong> With Node.js, developers can use JavaScript for both client-side and server-side code, simplifying the development process and reducing the need to learn multiple languages.</li>
                <li><strong>High Performance:</strong> Node.js is built on the V8 JavaScript engine, which compiles JavaScript into native machine code, resulting in fast execution and high performance.</li>
                <li><strong>NPM (Node Package Manager):</strong> Node.js comes with a built-in package manager, NPM, which provides access to a vast repository of open-source libraries and tools, making it easy to extend and enhance Node.js applications.</li>
                <li><strong>Extensive Ecosystem:</strong> The Node.js ecosystem is vast and growing, with thousands of modules available to perform almost any task, from database integration to API development and more.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Node.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2009):</strong> Node.js was created by Ryan Dahl in 2009, with the goal of building real-time, high-performance web applications. The initial release focused on simplifying the development of web servers by using a non-blocking I/O model.</li>
                <li><strong>Initial Adoption and Growth:</strong> Node.js quickly gained popularity among developers due to its simplicity and performance. Companies like LinkedIn, PayPal, and Netflix began adopting Node.js for their backend services, leading to rapid growth in the Node.js community.</li>
                <li><strong>NPM and Ecosystem Expansion:</strong> NPM (Node Package Manager) was introduced as the default package manager for Node.js, providing developers with a centralized repository of libraries and tools. NPM has since become one of the largest software registries in the world.</li>
                <li><strong>Node.js Foundation (2015):</strong> To ensure the long-term stability and growth of Node.js, the Node.js Foundation was established in 2015 as a project of the Linux Foundation. This helped formalize the development process and attract more contributors.</li>
                <li><strong>Present and Future:</strong> Node.js continues to be a dominant force in web development, with ongoing improvements and a vibrant community that drives innovation. It remains a critical tool for building scalable, high-performance applications in the modern web ecosystem.</li>
            </ul>
        </div>
    </div>`,
        icon: "nodejs-icon.png"
    },
    {
        title: "Angular",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Angular Framework</h1>
        <div class="cs-content-cyber">
            <p><strong>Angular</strong> is a popular open-source web application framework developed and maintained by Google. It is a complete rewrite of AngularJS, and it was designed to build dynamic, single-page web applications (SPAs) with an emphasis on modularity, testability, and maintainability. Angular uses TypeScript, a superset of JavaScript, to provide strong typing and improved tooling, making it a powerful framework for building complex web applications.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Angular</h2>
            <ul class="cs-list-cyber">
                <li><strong>Component-Based Architecture:</strong> Angular applications are built using components, which encapsulate the HTML, CSS, and JavaScript needed to render a piece of the user interface. This promotes code reuse and modularity.</li>
                <li><strong>Two-Way Data Binding:</strong> Angular's two-way data binding feature automatically synchronizes data between the model and the view, simplifying the development of dynamic and interactive user interfaces.</li>
                <li><strong>Dependency Injection:</strong> Angular has a built-in dependency injection system that allows developers to manage service instances and dependencies in a clean and efficient manner, improving testability and code maintainability.</li>
                <li><strong>Routing:</strong> Angular includes a powerful routing module that enables developers to create single-page applications with multiple views and navigation paths, making it easier to manage complex UIs.</li>
                <li><strong>RxJS and Reactive Programming:</strong> Angular leverages RxJS, a library for reactive programming using observables, to handle asynchronous data streams, making it easier to work with complex data flows.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Angular</h2>
            <ul class="cs-list-cyber">
                <li><strong>Introduction of AngularJS (2010):</strong> The original AngularJS was released by Google in 2010 as a framework for building dynamic web applications. It introduced concepts like two-way data binding and dependency injection, which were revolutionary at the time.</li>
                <li><strong>Angular 2 and Beyond (2016):</strong> Angular (often referred to as Angular 2+) was released in 2016 as a complete rewrite of AngularJS. It introduced a component-based architecture, TypeScript support, and other modern web development practices. Subsequent versions of Angular have continued to build on this foundation, adding new features and improvements.</li>
                <li><strong>Versioning and Updates:</strong> Angular follows a regular release cycle, with major updates every six months. This ensures that the framework remains up-to-date with the latest web standards and developer needs.</li>
                <li><strong>Community and Ecosystem:</strong> Angular has a large and active community, as well as a rich ecosystem of third-party libraries, tools, and extensions that enhance its capabilities and streamline development.</li>
                <li><strong>Present and Future:</strong> Angular remains one of the most widely used frameworks for building web applications, with ongoing development and support from Google. It continues to evolve to meet the demands of modern web development, making it a reliable choice for developers building enterprise-grade applications.</li>
            </ul>
        </div>
    </div>`,
        icon: "angular-icon.png"
    },
    {
        title: "React",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to React Framework</h1>
        <div class="cs-content-cyber">
            <p><strong>React</strong> is a popular open-source JavaScript library for building user interfaces, particularly single-page applications where data is dynamically updated without reloading the page. Developed and maintained by Facebook, React has gained widespread adoption in the web development community due to its simplicity, flexibility, and efficiency. React's component-based architecture and virtual DOM make it easy to create interactive and responsive UIs.</p>

            <h2 class="cs-heading-main-cyber">Key Features of React</h2>
            <ul class="cs-list-cyber">
                <li><strong>Component-Based Architecture:</strong> React encourages building UIs using reusable components, which encapsulate their own logic, state, and presentation. This modular approach makes it easier to manage and maintain large applications.</li>
                <li><strong>Virtual DOM:</strong> React uses a virtual DOM to improve performance. Instead of updating the real DOM directly, React creates a virtual copy of the DOM and applies changes there first. It then efficiently updates the real DOM by applying only the necessary changes.</li>
                <li><strong>Declarative Syntax:</strong> React uses a declarative syntax, meaning developers describe what the UI should look like, and React handles the updates when the underlying data changes. This approach makes code more predictable and easier to debug.</li>
                <li><strong>JSX:</strong> JSX is a syntax extension for JavaScript that looks similar to HTML. It allows developers to write HTML-like code directly within JavaScript, making it easier to create and manage UI components.</li>
                <li><strong>Strong Community and Ecosystem:</strong> React has a large and active community, with a vast ecosystem of tools, libraries, and extensions that make development faster and more efficient. This includes popular tools like React Router for navigation and Redux for state management.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of React</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Release (2013):</strong> React was developed by Jordan Walke, a software engineer at Facebook, and was first released to the public in 2013. It was initially used by Facebook for their own internal projects, including the news feed and Instagram.</li>
                <li><strong>Initial Adoption:</strong> React quickly gained popularity due to its novel approach to building UIs and its performance benefits. It was embraced by developers looking for a more efficient way to build dynamic web applications.</li>
                <li><strong>React Native (2015):</strong> In 2015, Facebook introduced React Native, a framework for building native mobile applications using React. This allowed developers to use the same React principles and components to create apps for iOS and Android.</li>
                <li><strong>Ongoing Evolution:</strong> React has continued to evolve with regular updates that introduce new features and optimizations. Notable improvements include the introduction of hooks in React 16.8, which simplified state management and component lifecycle methods.</li>
                <li><strong>Present and Future:</strong> React remains one of the most widely used and supported frameworks for building web applications. It is continuously updated by Facebook and the open-source community, ensuring it stays at the forefront of web development technologies.</li>
            </ul>
        </div>
    </div>`,
        icon: "react-icon.png"
    },
    {
        title: "Knockout.js",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Knockout.js</h1>
        <div class="cs-content-cyber">
            <p><strong>Knockout.js</strong> is a standalone JavaScript library that helps developers create rich, responsive user interfaces by using the Model-View-ViewModel (MVVM) design pattern. It provides a simple way to manage complex data-driven interfaces by keeping your data and UI in sync. Knockout.js uses declarative bindings to connect the UI with the underlying data model, making it easy to build dynamic, interactive web applications.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Knockout.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Declarative Bindings:</strong> Knockout.js allows developers to use declarative bindings in HTML to connect UI elements directly to data models. This simplifies the process of updating the UI when the underlying data changes.</li>
                <li><strong>Two-Way Data Binding:</strong> Knockout.js provides automatic synchronization between the data model and the UI, ensuring that changes to the data are immediately reflected in the UI, and vice versa.</li>
                <li><strong>Dependency Tracking:</strong> Knockout.js automatically tracks dependencies between data and UI elements, so the UI is automatically updated when data changes, reducing the need for manual DOM manipulation.</li>
                <li><strong>Extensibility:</strong> Knockout.js is highly extensible, allowing developers to create custom bindings, components, and utilities to enhance the functionality of their applications.</li>
                <li><strong>Lightweight and Framework-Agnostic:</strong> Knockout.js is a lightweight library that can be used with any existing web application or framework, making it easy to integrate into projects without requiring significant changes to the existing codebase.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Knockout.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Release (2010):</strong> Knockout.js was created by Steve Sanderson, a developer at Microsoft, and was first released in 2010. It was designed to simplify the process of building dynamic and responsive user interfaces using the MVVM pattern.</li>
                <li><strong>Adoption and Usage:</strong> Knockout.js quickly gained popularity among developers for its simplicity and ease of use. It was widely adopted in projects where developers needed a straightforward way to manage data-driven interfaces without the complexity of larger frameworks.</li>
                <li><strong>Integration with Other Technologies:</strong> While Knockout.js is framework-agnostic, it is often used in conjunction with other JavaScript libraries and frameworks, such as jQuery, to enhance web applications.</li>
                <li><strong>Knockout.js Today:</strong> While newer frameworks like Angular, React, and Vue.js have become more popular, Knockout.js is still maintained and used in many legacy projects and applications that require its specific features.</li>
                <li><strong>Present and Future:</strong> Knockout.js continues to be a reliable choice for developers looking for a lightweight, easy-to-use library for managing dynamic UIs. Its simplicity and flexibility make it a valuable tool in certain contexts, even as the web development landscape evolves.</li>
            </ul>
        </div>
    </div>`,
        icon: "knockoutjs-icon.png"
    },
    {
        title: "TensorFlow",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to TensorFlow</h1>
        <div class="cs-content-cyber">
            <p><strong>TensorFlow</strong> is an open-source machine learning framework developed by the Google Brain team. It is designed to make the implementation of machine learning algorithms, particularly deep learning models, more accessible and efficient. TensorFlow provides a comprehensive ecosystem of tools, libraries, and community resources to help developers and researchers build and deploy machine learning models across a variety of platforms.</p>

            <h2 class="cs-heading-main-cyber">Key Features of TensorFlow</h2>
            <ul class="cs-list-cyber">
                <li><strong>Flexible and Scalable:</strong> TensorFlow is designed to be flexible and scalable, allowing developers to build and train models on a variety of devices, from mobile phones to large-scale distributed systems in the cloud.</li>
                <li><strong>Comprehensive Ecosystem:</strong> TensorFlow provides a wide range of tools and libraries, including TensorFlow Hub, TensorFlow Lite, and TensorFlow Extended (TFX), to support various aspects of machine learning, from model development to deployment.</li>
                <li><strong>Support for Deep Learning:</strong> TensorFlow is widely used for building deep learning models, such as neural networks for image recognition, natural language processing, and more. It supports both high-level APIs like Keras and low-level operations for greater control.</li>
                <li><strong>Cross-Platform Deployment:</strong> TensorFlow models can be deployed on various platforms, including mobile devices (via TensorFlow Lite), web browsers (via TensorFlow.js), and edge devices (via TensorFlow Extended), making it a versatile tool for AI development.</li>
                <li><strong>Strong Community and Support:</strong> TensorFlow has a large and active community, with extensive documentation, tutorials, and pre-trained models available to help developers get started quickly and efficiently.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of TensorFlow</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Release (2015):</strong> TensorFlow was released by Google in November 2015 as an open-source project. It was the successor to DistBelief, an earlier machine learning system developed by Google. TensorFlow was designed to be more flexible, allowing it to be used in a wider range of applications.</li>
                <li><strong>Rapid Adoption:</strong> TensorFlow quickly became one of the most popular machine learning frameworks in the world. Its ease of use, flexibility, and strong community support contributed to its widespread adoption in both academia and industry.</li>
                <li><strong>Introduction of TensorFlow 2.0 (2019):</strong> TensorFlow 2.0 was released in 2019 with significant improvements, including easier model building with Keras, eager execution by default, and better support for deployment in production environments.</li>
                <li><strong>Expansion of Ecosystem:</strong> Over the years, Google has expanded the TensorFlow ecosystem with additional tools like TensorFlow Lite for mobile and embedded devices, TensorFlow.js for JavaScript development, and TensorFlow Extended (TFX) for production machine learning pipelines.</li>
                <li><strong>Present and Future:</strong> TensorFlow continues to evolve, with ongoing contributions from Google and the open-source community. It remains a leading framework for machine learning and AI development, with a focus on making advanced machine learning accessible to developers worldwide.</li>
            </ul>
        </div>
    </div>`,
        icon: "tensorflow-icon.png"
    },
    {
        title: "WebXR",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to WebXR, A-Frame, and Three.js</h1>
        <div class="cs-content-cyber">
            <p><strong>WebXR</strong> is a powerful API that enables developers to create immersive experiences, such as Virtual Reality (VR) and Augmented Reality (AR), directly within web browsers. It is the successor to the WebVR API and is designed to work across a wide range of devices, including VR headsets, AR glasses, and mobile devices. WebXR provides a standardized way to access and interact with VR and AR hardware, making it easier to develop cross-platform immersive applications.</p>

            <h2 class="cs-heading-main-cyber">Key Features of WebXR</h2>
            <ul class="cs-list-cyber">
                <li><strong>Cross-Platform Compatibility:</strong> WebXR is designed to work on a variety of devices, from high-end VR headsets to smartphones, allowing developers to create experiences that can reach a broad audience.</li>
                <li><strong>Standardized API:</strong> WebXR provides a unified API for accessing VR and AR hardware, simplifying the development process and reducing the need for platform-specific code.</li>
                <li><strong>Rich Interactivity:</strong> WebXR supports advanced interaction methods, such as hand tracking, gaze-based navigation, and controller input, enabling the creation of immersive and interactive environments.</li>
                <li><strong>Seamless Integration with Web Technologies:</strong> WebXR integrates seamlessly with existing web technologies, such as HTML, CSS, and JavaScript, allowing developers to leverage their existing skills and tools to build immersive experiences.</li>
                <li><strong>Future-Ready:</strong> WebXR is designed to evolve with the rapidly changing landscape of immersive technologies, ensuring that it remains relevant and capable of supporting new devices and interaction methods.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">A-Frame and Three.js</h2>
            <p>To simplify the development of 3D and immersive experiences using WebXR, developers often use frameworks like <strong>A-Frame</strong> and <strong>Three.js</strong>.</p>

            <h3 class="cs-heading-main-cyber">A-Frame</h3>
            <p><strong>A-Frame</strong> is an open-source web framework for building VR experiences that work across all platforms. Built on top of Three.js, A-Frame abstracts much of the complexity of 3D programming by providing a simple, HTML-like syntax for creating 3D scenes. This makes it accessible to developers with limited experience in 3D programming, while still being powerful enough for more advanced use cases.</p>

            <h3 class="cs-heading-main-cyber">Three.js</h3>
            <p><strong>Three.js</strong> is a powerful JavaScript library that allows developers to create 3D graphics in the browser. It provides a comprehensive set of features for creating and rendering complex 3D scenes, including support for WebGL, lighting, materials, and animations. Three.js is often used as the underlying engine for more specialized frameworks like A-Frame, but it can also be used directly for more fine-grained control over 3D content.</p>

            <h2 class="cs-heading-main-cyber">History of WebXR, A-Frame, and Three.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Introduction of WebXR (2018):</strong> WebXR was first introduced as the successor to WebVR, with the goal of creating a more comprehensive API that could support both VR and AR experiences. It was officially released in 2018, and has since become the standard for immersive web applications.</li>
                <li><strong>Development of A-Frame (2015):</strong> A-Frame was created by Mozilla in 2015 as an easy-to-use framework for building VR experiences on the web. It quickly gained popularity due to its simplicity and the ability to create VR content with just HTML.</li>
                <li><strong>Evolution of Three.js (2010):</strong> Three.js was created by Ricardo Cabello in 2010 as a lightweight 3D engine for the web. Over the years, it has evolved into a powerful library that supports a wide range of 3D graphics capabilities, becoming a cornerstone of web-based 3D development.</li>
                <li><strong>Ongoing Development:</strong> WebXR, A-Frame, and Three.js continue to be actively developed and maintained by their respective communities. These technologies are constantly evolving to keep pace with the latest advancements in VR and AR, ensuring they remain at the forefront of immersive web development.</li>
                <li><strong>Present and Future:</strong> As VR and AR technologies continue to grow in popularity, WebXR, A-Frame, and Three.js will play increasingly important roles in the development of immersive web applications. These tools provide a solid foundation for building the next generation of web experiences, from interactive 3D environments to fully immersive virtual worlds.</li>
            </ul>
        </div>
    </div>`,
        icon: "webxr-icon.png"
    },
    {
        title: "Telerik Reporting",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Telerik Reporting</h1>
        <div class="cs-content-cyber">
            <p><strong>Telerik Reporting</strong> is a reporting solution designed for .NET developers to create, view, and export reports from their web, desktop, and cloud applications. It is part of the Telerik suite of developer tools and provides a comprehensive set of components that make it easy to generate and manage reports. Telerik Reporting is widely used in enterprise environments where detailed and dynamic reports are required.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Telerik Reporting</h2>
            <ul class="cs-list-cyber">
                <li><strong>Report Designer:</strong> Telerik Reporting includes a powerful, intuitive Report Designer that allows developers and end-users to create complex reports with ease. It supports drag-and-drop functionality, making report creation accessible even to those without extensive coding experience.</li>
                <li><strong>Rich Data Visualization:</strong> Telerik Reporting provides a wide range of data visualization components, including charts, graphs, maps, and gauges, allowing for the creation of visually appealing and informative reports.</li>
                <li><strong>Cross-Platform Support:</strong> Telerik Reporting supports various platforms, including web (ASP.NET, Blazor), desktop (WinForms, WPF), and cloud, making it easy to integrate reports into different types of applications.</li>
                <li><strong>Exporting and Printing:</strong> Reports created with Telerik Reporting can be exported to multiple formats, including PDF, Excel, Word, and CSV. The solution also provides robust printing capabilities, ensuring that reports look great on paper.</li>
                <li><strong>Interactive Reports:</strong> Telerik Reporting supports interactive features like drill-down, drill-through, sorting, and document map, enabling users to interact with the report data directly within the viewer.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">Telerik Reporting Components</h2>
            <p>Telerik Reporting offers a comprehensive set of components that make it easy to build, manage, and deliver reports in .NET applications.</p>

            <h3 class="cs-heading-main-cyber">Report Viewer Components</h3>
            <p><strong>Report Viewers</strong> are essential components that allow users to view and interact with reports directly within their applications. Telerik Reporting provides several types of viewers for different platforms, including:</p>
            <ul class="cs-list-cyber">
                <li><strong>Web Report Viewer:</strong> An ASP.NET and Blazor-based component that allows reports to be viewed within web applications. It supports all major browsers and provides a responsive interface for a seamless user experience.</li>
                <li><strong>Desktop Report Viewer:</strong> Components for WinForms and WPF applications that enable desktop users to view and interact with reports. These viewers are fully customizable and can be integrated into existing desktop applications.</li>
                <li><strong>Mobile Report Viewer:</strong> A viewer designed specifically for mobile devices, providing a touch-friendly interface for viewing reports on smartphones and tablets.</li>
            </ul>

            <h3 class="cs-heading-main-cyber">Report Designer</h3>
            <p>The <strong>Report Designer</strong> is a key component of Telerik Reporting, allowing developers and users to create and modify reports using a visual interface. The designer supports a wide range of data sources, including SQL databases, JSON, XML, and RESTful services. It also includes tools for adding parameters, expressions, and custom logic to reports.</p>

            <h3 class="cs-heading-main-cyber">Data Visualization Components</h3>
            <p>Telerik Reporting includes a rich set of <strong>data visualization components</strong> that enhance the quality and readability of reports:</p>
            <ul class="cs-list-cyber">
                <li><strong>Charts:</strong> A wide variety of chart types, including bar, line, pie, and area charts, that can be customized to fit the needs of the report.</li>
                <li><strong>Maps:</strong> Support for geographical data representation, allowing for the creation of heat maps, choropleth maps, and other geographic visualizations.</li>
                <li><strong>Gauges:</strong> Radial and linear gauges that are useful for displaying key performance indicators (KPIs) and other critical metrics.</li>
                <li><strong>Tables and Lists:</strong> Components that make it easy to organize and display large sets of data in a structured format.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Telerik Reporting</h2>
            <ul class="cs-list-cyber">
                <li><strong>Initial Release (2006):</strong> Telerik Reporting was first released in 2006 as part of the Telerik suite of tools for .NET developers. It quickly gained popularity for its ease of use and powerful features.</li>
                <li><strong>Integration with Telerik UI (2010):</strong> In 2010, Telerik Reporting was integrated with the broader Telerik UI components, allowing developers to create cohesive and consistent user interfaces and reports within their applications.</li>
                <li><strong>Ongoing Development:</strong> Telerik Reporting has seen continuous development and improvement, with regular updates that add new features, enhance performance, and ensure compatibility with the latest .NET technologies.</li>
                <li><strong>Present and Future:</strong> Telerik Reporting remains a leading solution for .NET developers who need to create and manage reports within their applications. With a strong focus on usability, flexibility, and performance, Telerik Reporting continues to evolve to meet the needs of modern software development.</li>
            </ul>
        </div>
    </div>`,
        icon: "telerik-icon.png"
    },
    {
        title: "jQuery",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to jQuery</h1>
        <div class="cs-content-cyber">
            <p><strong>jQuery</strong> is a fast, small, and feature-rich JavaScript library that simplifies HTML document traversal and manipulation, event handling, animation, and Ajax interactions for rapid web development. Created to make JavaScript programming easier, jQuery is designed to work across a multitude of browsers, abstracting many of the complexities of traditional JavaScript. It has been widely used for over a decade and continues to be a vital tool in web development, despite the rise of modern frameworks like React, Angular, and Vue.js.</p>

            <h2 class="cs-heading-main-cyber">Key Features of jQuery</h2>
            <ul class="cs-list-cyber">
                <li><strong>DOM Manipulation:</strong> jQuery provides an easy-to-use API for selecting, traversing, and manipulating DOM elements. Its powerful selector engine allows developers to select elements with complex rules and chain methods to modify them.</li>
                <li><strong>Event Handling:</strong> jQuery simplifies the process of handling events like clicks, form submissions, and mouse movements, ensuring consistent behavior across different browsers.</li>
                <li><strong>Animations and Effects:</strong> jQuery includes a wide array of built-in animations and effects, such as fading, sliding, and custom animations, allowing developers to create interactive and visually appealing user interfaces with minimal code.</li>
                <li><strong>Ajax Support:</strong> jQuery makes it easier to send and receive data asynchronously using Ajax, enabling dynamic content updates without requiring a full page reload.</li>
                <li><strong>Cross-Browser Compatibility:</strong> jQuery is designed to work consistently across major browsers, abstracting away the inconsistencies between them and allowing developers to write code that runs smoothly on all platforms.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of jQuery</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Release (2006):</strong> jQuery was created by John Resig and was first released in January 2006. It quickly gained popularity due to its simplicity and ability to solve common JavaScript problems, particularly those related to cross-browser compatibility.</li>
                <li><strong>Rapid Adoption:</strong> By 2011, jQuery had become the most popular JavaScript library in use, being adopted by millions of websites and developers worldwide. It became a standard tool for web development during the early days of the Web 2.0 era.</li>
                <li><strong>jQuery UI and Plugins:</strong> The jQuery ecosystem expanded with the introduction of jQuery UI, a library of user interface components, and a vast collection of plugins created by the community, further extending the capabilities of jQuery.</li>
                <li><strong>Integration with CMS Platforms:</strong> jQuery was integrated into major content management systems (CMS) like WordPress and Drupal, cementing its place as a go-to tool for web developers across various platforms.</li>
                <li><strong>Present and Future:</strong> While modern JavaScript frameworks have become more prevalent, jQuery remains widely used in many existing projects and continues to be maintained and updated. It serves as a foundational tool for many developers and is often included in legacy systems and smaller projects where its simplicity and efficiency are still valued.</li>
            </ul>
        </div>
    </div>`,
        icon: "jquery-icon.png"
    },
    {
        title: "Bootstrap",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Bootstrap CSS</h1>
        <div class="cs-content-cyber">
            <p><strong>Bootstrap</strong> is a popular open-source CSS framework originally developed by Twitter. It is designed to facilitate the development of responsive, mobile-first web applications by providing a collection of CSS and JavaScript components. Bootstrap is widely used for building websites and web applications due to its ease of use, extensive documentation, and robust set of pre-built components. It simplifies the process of creating aesthetically pleasing and consistent user interfaces across different devices and screen sizes.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Bootstrap</h2>
            <ul class="cs-list-cyber">
                <li><strong>Responsive Grid System:</strong> Bootstrap provides a responsive, mobile-first grid system that allows developers to create layouts that automatically adjust to different screen sizes. This ensures that web pages look great on all devices, from smartphones to desktops.</li>
                <li><strong>Pre-Built Components:</strong> Bootstrap includes a wide variety of pre-built components, such as buttons, forms, navigation bars, modals, and carousels. These components can be easily customized and integrated into web applications, saving development time.</li>
                <li><strong>CSS Utility Classes:</strong> Bootstrap comes with a set of utility classes that make it easy to apply common styling rules, such as margins, padding, colors, and typography. These classes help developers quickly adjust the appearance of elements without writing custom CSS.</li>
                <li><strong>JavaScript Plugins:</strong> Bootstrap includes a collection of JavaScript plugins that add interactivity and dynamic behavior to web pages. These plugins, such as modals, dropdowns, and tooltips, are easy to use and integrate with Bootstrap's CSS components.</li>
                <li><strong>Cross-Browser Compatibility:</strong> Bootstrap is designed to work consistently across all major web browsers, ensuring a uniform appearance and behavior for web applications regardless of the user's browser choice.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Bootstrap</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Release (2011):</strong> Bootstrap was originally developed by Mark Otto and Jacob Thornton at Twitter and was released as an open-source project in August 2011. It was created to address inconsistencies in design and development across different devices and platforms.</li>
                <li><strong>Rapid Adoption:</strong> Bootstrap quickly gained popularity due to its simplicity, comprehensive documentation, and the ability to create responsive designs with minimal effort. It became one of the most widely used front-end frameworks in the world.</li>
                <li><strong>Bootstrap 3 (2013):</strong> Released in 2013, Bootstrap 3 introduced a mobile-first approach, making responsive design a central focus of the framework. This version also included significant improvements to the grid system and typography.</li>
                <li><strong>Bootstrap 4 (2018):</strong> Bootstrap 4 brought major updates, including a switch from LESS to Sass as the preprocessor, improved grid system, new utility classes, and a flexbox-based layout. It also introduced more customizable options for developers.</li>
                <li><strong>Bootstrap 5 (2021):</strong> Bootstrap 5 removed jQuery as a dependency, introduced new components, updated form controls, and improved accessibility features. It also made further refinements to the grid system and utility classes, keeping Bootstrap relevant in modern web development.</li>
                <li><strong>Present and Future:</strong> Bootstrap continues to be actively developed and maintained, with a large community of contributors. It remains a cornerstone of front-end development, helping developers build responsive and visually appealing web applications efficiently.</li>
            </ul>
        </div>
    </div>`,
        icon: "bootstrap-icon.png"
    },
    {
        title: "Tailwind CSS",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Tailwind CSS</h1>
        <div class="cs-content-cyber">
            <p><strong>Tailwind CSS</strong> is a utility-first CSS framework that enables developers to build custom designs directly in their markup by using pre-defined classes. Unlike traditional CSS frameworks that offer pre-styled components, Tailwind provides low-level utility classes that can be combined to create unique and highly customizable user interfaces. This approach offers more flexibility and control over the design, making it a popular choice for modern web development.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Tailwind CSS</h2>
            <ul class="cs-list-cyber">
                <li><strong>Utility-First Approach:</strong> Tailwind CSS provides a vast array of utility classes for common CSS properties like margin, padding, color, font size, and more. These classes can be combined to create complex designs without writing custom CSS.</li>
                <li><strong>Customization:</strong> Tailwind is highly customizable, allowing developers to easily override or extend the default design system to fit their specific needs. The configuration file lets you define custom colors, spacing, fonts, and more.</li>
                <li><strong>Responsive Design:</strong> Tailwind makes it easy to build responsive layouts by providing utilities for different screen sizes. Developers can apply styles conditionally based on the device's screen width using built-in responsive modifiers.</li>
                <li><strong>Component-Friendly:</strong> Tailwind's utility-first approach works seamlessly with component-based frameworks like React, Vue, and Angular, allowing for reusable and consistent design patterns across the application.</li>
                <li><strong>Performance Optimization:</strong> Tailwind CSS includes tools like PurgeCSS that help remove unused CSS, reducing the overall file size and improving load times for production websites.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Tailwind CSS</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Release (2017):</strong> Tailwind CSS was created by Adam Wathan and was first released in November 2017. It was designed to provide developers with more flexibility and control over their designs, addressing some of the limitations of traditional component-based CSS frameworks.</li>
                <li><strong>Growing Popularity:</strong> Since its release, Tailwind CSS has gained a large following among developers due to its utility-first approach, which allows for rapid development of custom user interfaces. The framework's flexibility and ease of use have contributed to its widespread adoption in the web development community.</li>
                <li><strong>Integration with Modern Tools:</strong> Tailwind CSS is often used in conjunction with modern JavaScript frameworks and build tools like Webpack, PostCSS, and Laravel Mix. It also integrates well with popular CMS platforms like WordPress, enabling developers to build responsive and custom-tailored themes.</li>
                <li><strong>Tailwind CSS 2.0 (2020):</strong> In November 2020, Tailwind CSS 2.0 was released, introducing new features like extended color palettes, enhanced typography, and improved support for dark mode. This version solidified Tailwind's position as a leading utility-first CSS framework.</li>
                <li><strong>Present and Future:</strong> Tailwind CSS continues to evolve with regular updates and a growing ecosystem of tools and plugins. Its utility-first philosophy and emphasis on customization have made it a preferred choice for developers who want to create unique and responsive web designs efficiently.</li>
            </ul>
        </div>
    </div>`,
        icon: "tailwindcss-icon.png"
    },
    {
        title: "Webpack",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Webpack</h1>
        <div class="cs-content-cyber">
            <p><strong>Webpack</strong> is a powerful and popular JavaScript module bundler that is used to manage and optimize the assets in modern web applications. It takes modules with dependencies and generates static assets that represent those modules, allowing developers to manage JavaScript, CSS, images, and other assets more efficiently. Webpack is a key tool in the modern front-end development workflow, enabling developers to build complex applications with modular code, reduce file sizes, and improve load times.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Webpack</h2>
            <ul class="cs-list-cyber">
                <li><strong>Module Bundling:</strong> Webpack bundles all JavaScript modules and their dependencies into a single or multiple output files, reducing the number of HTTP requests and improving load times. It supports various module formats, including CommonJS, AMD, and ES6 modules.</li>
                <li><strong>Code Splitting:</strong> Webpack enables code splitting, which allows developers to break up their codebase into smaller chunks. This improves performance by loading only the necessary code when it is needed, reducing the initial load time.</li>
                <li><strong>Loaders:</strong> Webpack uses loaders to preprocess files before bundling them. Loaders can transform files, such as compiling TypeScript to JavaScript, converting Sass to CSS, or optimizing images, making Webpack highly versatile.</li>
                <li><strong>Plugins:</strong> Webpack's plugin system allows developers to extend its functionality. Plugins can be used for tasks such as optimizing bundles, injecting environment variables, or performing custom actions during the build process.</li>
                <li><strong>Hot Module Replacement (HMR):</strong> Webpack supports Hot Module Replacement, which allows developers to update modules in a running application without a full page reload. This speeds up development by allowing changes to be reflected in real-time.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Webpack</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Release (2012):</strong> Webpack was created by Tobias Koppers and was first released in 2012. It was designed to address the growing complexity of web applications and the need for a tool that could manage and bundle assets more effectively.</li>
                <li><strong>Adoption and Growth:</strong> Webpack quickly gained popularity as developers began adopting it for its powerful module bundling capabilities. It became an essential tool in the JavaScript ecosystem, particularly with the rise of modern front-end frameworks like React, Angular, and Vue.js.</li>
                <li><strong>Webpack 2 and 3:</strong> Webpack 2, released in 2017, introduced features like native ES6 module support and tree-shaking, which allowed for more efficient bundling by removing unused code. Webpack 3, released later that year, introduced scope hoisting to further optimize bundle sizes.</li>
                <li><strong>Webpack 4 (2018):</strong> Webpack 4, also known as "Webpack 4: The Dawn," was released in 2018 with significant improvements in speed and performance. It introduced a new default configuration, making it easier for developers to get started, and added support for JavaScript's ES modules.</li>
                <li><strong>Webpack 5 (2020):</strong> Webpack 5, released in 2020, brought major updates, including improved caching, faster builds, better tree-shaking, and support for module federation, which allows code to be dynamically loaded from another Webpack build.</li>
                <li><strong>Present and Future:</strong> Webpack continues to evolve, with ongoing updates and contributions from the community. It remains a crucial tool for modern web development, enabling developers to build, optimize, and manage complex web applications with ease.</li>
            </ul>
        </div>
    </div>`,
        icon: "webpack-icon.png"
    },
    {
        title: "Vite",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Vite</h1>
        <div class="cs-content-cyber">
            <p><strong>Vite</strong> is a modern front-end build tool that focuses on providing a fast and lean development experience for modern web projects. Created by Evan You, the developer behind Vue.js, Vite is designed to improve the speed of development workflows by leveraging native ES modules in the browser during development, and bundling your code for production using a faster build process. Vite supports not only Vue.js but also React, Preact, Svelte, and other frameworks, making it a versatile tool for front-end developers.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Vite</h2>
            <ul class="cs-list-cyber">
                <li><strong>Instant Server Start:</strong> Vite provides an instant dev server start time by serving native ES modules directly, without needing to bundle the entire application upfront. This allows developers to see changes almost immediately, significantly speeding up the feedback loop.</li>
                <li><strong>Hot Module Replacement (HMR):</strong> Vite offers fast and reliable Hot Module Replacement (HMR), enabling developers to see changes in real-time without refreshing the entire page. This is particularly useful for maintaining application state during development.</li>
                <li><strong>Optimized Build Process:</strong> For production builds, Vite uses Rollup to bundle the code, with optimizations like tree-shaking, code splitting, and minification, ensuring that the final output is optimized for performance.</li>
                <li><strong>Framework Agnostic:</strong> While Vite was initially developed with Vue.js in mind, it is framework-agnostic and supports a wide range of frameworks, including React, Preact, Svelte, and others, making it a flexible choice for modern web projects.</li>
                <li><strong>Rich Plugin Ecosystem:</strong> Vite has a robust plugin system that allows developers to extend its functionality. Many popular tools and libraries have official Vite plugins, enabling seamless integration with existing workflows.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Vite</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Initial Release (2020):</strong> Vite was created by Evan You and was first released in 2020. It was designed as a next-generation front-end tool to address the performance challenges posed by traditional bundlers, especially in development environments.</li>
                <li><strong>Growing Popularity:</strong> Vite quickly gained popularity among developers for its simplicity, speed, and flexibility. Its ability to provide a faster development experience resonated with those working on modern web applications, leading to widespread adoption.</li>
                <li><strong>Vite 2.0 (2021):</strong> Released in February 2021, Vite 2.0 introduced significant improvements, including better support for non-Vue frameworks, an enhanced plugin system, and more robust handling of static assets. This version solidified Vite's position as a general-purpose build tool for the web.</li>
                <li><strong>Integration with Modern Frameworks:</strong> Vite has been embraced by many popular frameworks and libraries, with official integrations available for Vue.js, React, Preact, Svelte, and others. This has made Vite a go-to choice for developers looking to streamline their development process.</li>
                <li><strong>Present and Future:</strong> Vite continues to evolve rapidly, with ongoing updates and contributions from the community. It remains at the forefront of modern web development tools, offering a faster and more efficient alternative to traditional bundlers like Webpack.</li>
            </ul>
        </div>
    </div>`,
        icon: "vite-icon.png"
    },
    {
        title: "SQL Server",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Microsoft SQL Server</h1>
        <div class="cs-content-cyber">
            <p><strong>Microsoft SQL Server</strong> is a relational database management system (RDBMS) developed by Microsoft. It is designed to store, retrieve, and manage data in a structured format using SQL (Structured Query Language). SQL Server is widely used in enterprise environments for its robustness, scalability, and comprehensive set of tools and features that support a wide range of data management, analytics, and business intelligence tasks.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Microsoft SQL Server</h2>
            <ul class="cs-list-cyber">
                <li><strong>High Performance and Scalability:</strong> SQL Server is designed to handle large volumes of data and high transaction rates, making it suitable for enterprise-level applications. It supports both on-premises and cloud-based deployments, allowing for flexible scalability.</li>
                <li><strong>Advanced Security Features:</strong> SQL Server includes built-in security features like encryption, role-based access control, and auditing, which help protect sensitive data and ensure compliance with regulatory requirements.</li>
                <li><strong>Comprehensive Data Tools:</strong> SQL Server provides a wide array of tools for data management, including SQL Server Management Studio (SSMS), SQL Server Data Tools (SSDT), and SQL Server Integration Services (SSIS), which help developers and administrators manage, develop, and deploy databases effectively.</li>
                <li><strong>Business Intelligence and Analytics:</strong> SQL Server includes features like SQL Server Reporting Services (SSRS), SQL Server Analysis Services (SSAS), and Power BI integration, enabling users to perform advanced analytics and generate reports from their data.</li>
                <li><strong>Support for Various Data Types:</strong> SQL Server supports a variety of data types, including structured, semi-structured (JSON, XML), and unstructured data, making it versatile for different types of applications.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Microsoft SQL Server</h2>
            <ul class="cs-list-cyber">
                <li><strong>Initial Release (1989):</strong> Microsoft SQL Server was first released in 1989 as a collaboration between Microsoft, Sybase, and Ashton-Tate. It was initially designed for OS/2, but later versions were developed for the Windows operating system, aligning with Microsoft’s strategic shift to Windows.</li>
                <li><strong>SQL Server 7.0 (1998):</strong> The release of SQL Server 7.0 marked a significant milestone, as it was the first version of SQL Server to be developed independently by Microsoft, featuring a complete rewrite of the database engine.</li>
                <li><strong>SQL Server 2005:</strong> This version introduced several new features, including the SQL Server Integration Services (SSIS), SQL Server Reporting Services (SSRS), and SQL Server Management Studio (SSMS), which enhanced the platform’s capabilities in data management, analysis, and business intelligence.</li>
                <li><strong>SQL Server 2012 and 2016:</strong> These versions introduced advanced features such as Always On Availability Groups, Columnstore indexes, In-Memory OLTP, and enhanced security features, further cementing SQL Server’s position as a leading enterprise database solution.</li>
                <li><strong>SQL Server 2017 and Beyond:</strong> SQL Server 2017 marked the first time SQL Server was made available on Linux, expanding its reach to a broader range of environments. Subsequent versions have continued to focus on performance, security, and integration with cloud services, particularly Microsoft Azure.</li>
                <li><strong>Present and Future:</strong> Microsoft SQL Server continues to evolve with regular updates and new features that cater to the growing demands of data management, analytics, and business intelligence. It remains a cornerstone of Microsoft's data platform, providing robust solutions for enterprises worldwide.</li>
            </ul>
        </div>
    </div>`,
        icon: "sqlserver-icon.png"
    },
    {
        title: "SQLite",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to SQLite</h1>
        <div class="cs-content-cyber">
            <p><strong>SQLite</strong> is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. It is the most widely deployed database engine in the world, found in applications ranging from embedded systems and mobile apps to desktop software. Unlike traditional database management systems, SQLite is serverless, meaning it does not require a separate server process and reads and writes directly to ordinary disk files. This makes SQLite an ideal choice for small to medium-sized applications, especially where simplicity, portability, and minimal setup are key requirements.</p>

            <h2 class="cs-heading-main-cyber">Key Features of SQLite</h2>
            <ul class="cs-list-cyber">
                <li><strong>Serverless Architecture:</strong> SQLite is serverless, meaning it does not require a separate server process. This simplifies deployment and reduces the overhead associated with traditional database management systems.</li>
                <li><strong>Self-Contained:</strong> SQLite is a self-contained database engine, meaning that it has no external dependencies. All necessary components are included within a single library file, making it easy to embed SQLite in applications.</li>
                <li><strong>Lightweight:</strong> SQLite has a small footprint, with the library typically being less than 1 MB in size. This makes it suitable for use in embedded systems, mobile devices, and other resource-constrained environments.</li>
                <li><strong>ACID Compliance:</strong> Despite its simplicity and small size, SQLite is fully ACID-compliant, ensuring that transactions are processed reliably and that the database remains consistent even in the event of a failure.</li>
                <li><strong>Cross-Platform:</strong> SQLite is cross-platform, meaning it can be used on virtually any operating system, including Windows, macOS, Linux, Android, and iOS, without modification.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of SQLite</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Release (2000):</strong> SQLite was created by D. Richard Hipp in 2000. It was designed as a lightweight, embeddable database engine to be used in devices with limited resources. The goal was to create a simple, yet powerful, database engine that could be easily integrated into other software.</li>
                <li><strong>Adoption and Growth:</strong> SQLite quickly gained popularity due to its simplicity, portability, and ease of use. It became the go-to database engine for embedded systems, mobile apps, and small to medium-sized applications, with widespread adoption across various industries.</li>
                <li><strong>Integration with Major Platforms:</strong> SQLite is integrated into many major platforms and technologies, including Android, iOS, Mozilla Firefox, Google Chrome, and more. It is also used as the underlying database engine for many other software products and services.</li>
                <li><strong>Ongoing Development:</strong> SQLite continues to be actively developed and maintained, with regular updates that introduce new features, improve performance, and enhance security. The project remains open-source, with contributions from a large community of developers.</li>
                <li><strong>Present and Future:</strong> SQLite remains one of the most widely used database engines in the world, with billions of deployments across a wide range of applications. Its simplicity, reliability, and versatility ensure that it will continue to be a key tool in software development for years to come.</li>
            </ul>
        </div>
    </div>`,
        icon: "sqlite-icon.png"
    },
    {
        title: "PostgreSQL",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to PostgreSQL</h1>
        <div class="cs-content-cyber">
            <p><strong>PostgreSQL</strong> is a powerful, open-source relational database management system (RDBMS) known for its advanced features, robustness, and extensibility. It supports both SQL (relational) and JSON (non-relational) querying, making it a versatile tool for modern applications. PostgreSQL is widely used in production environments for a variety of applications, ranging from small projects to large-scale, complex systems requiring high reliability and data integrity.</p>

            <h2 class="cs-heading-main-cyber">Key Features of PostgreSQL</h2>
            <ul class="cs-list-cyber">
                <li><strong>Advanced Data Types and Extensions:</strong> PostgreSQL supports a wide range of advanced data types, including arrays, hstore (key-value pairs), JSON, and XML. Additionally, it offers a robust extension system, allowing developers to add custom functions, data types, and operators.</li>
                <li><strong>ACID Compliance and Data Integrity:</strong> PostgreSQL is fully ACID-compliant, ensuring that transactions are processed reliably, with full data integrity. It includes features like foreign keys, joins, views, triggers, and stored procedures, making it suitable for complex and mission-critical applications.</li>
                <li><strong>Full-Text Search and Indexing:</strong> PostgreSQL offers powerful full-text search capabilities, along with a variety of indexing techniques, such as B-tree, hash, GiST, SP-GiST, and GIN indexes. This enables efficient querying and retrieval of data, even in large datasets.</li>
                <li><strong>Concurrency and Performance:</strong> PostgreSQL uses a Multi-Version Concurrency Control (MVCC) system, which allows for high concurrency and performance by ensuring that transactions do not block each other. It also supports advanced performance optimization features like query planning, indexing, and parallel processing.</li>
                <li><strong>Extensibility and Customization:</strong> PostgreSQL is highly extensible, allowing developers to create custom data types, operators, and functions. Its modular architecture enables the addition of new features through extensions, making it adaptable to a wide range of use cases.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of PostgreSQL</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (1986-1996):</strong> PostgreSQL's origins trace back to the POSTGRES project at the University of California, Berkeley, led by Professor Michael Stonebraker in 1986. The project aimed to develop an advanced RDBMS that could handle more complex data types and relationships. The first version, POSTGRES, was released in 1989, and it evolved into PostgreSQL in 1996, when SQL support was added.</li>
                <li><strong>Open Source Release (1996):</strong> PostgreSQL was released as an open-source project in 1996, marking the beginning of its evolution as a community-driven database system. This move allowed developers worldwide to contribute to its development, leading to rapid improvements and widespread adoption.</li>
                <li><strong>Major Releases and Features:</strong> Over the years, PostgreSQL has seen numerous major releases, each introducing significant features and enhancements. Notable versions include PostgreSQL 8.0 (2005), which introduced native Windows support, and PostgreSQL 9.0 (2010), which added streaming replication and hot standby for high availability.</li>
                <li><strong>PostgreSQL 10 and Beyond:</strong> PostgreSQL 10 (2017) introduced declarative partitioning, logical replication, and improved parallelism, further enhancing its scalability and performance. Subsequent versions have continued to focus on performance, scalability, and ease of use, with PostgreSQL 13 (2020) and PostgreSQL 14 (2021) introducing additional features and optimizations.</li>
                <li><strong>Present and Future:</strong> PostgreSQL remains one of the most popular and reliable open-source databases, known for its stability, extensibility, and active community support. It is widely used in both enterprise and open-source environments, and it continues to evolve to meet the needs of modern data-driven applications.</li>
            </ul>
        </div>
    </div>`,
        icon: "postgresql-icon.png"
    },
    {
        title: "Oracle Database",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Oracle Database</h1>
        <div class="cs-content-cyber">
            <p><strong>Oracle Database</strong> is a multi-model database management system developed by Oracle Corporation. It is one of the most widely used enterprise databases in the world, known for its robustness, scalability, and comprehensive feature set. Oracle Database is designed to handle a wide range of data types and workloads, making it suitable for everything from small applications to large-scale enterprise systems that require high availability, security, and performance.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Oracle Database</h2>
            <ul class="cs-list-cyber">
                <li><strong>High Availability and Scalability:</strong> Oracle Database offers advanced features like Real Application Clusters (RAC), Automatic Storage Management (ASM), and Data Guard for high availability and disaster recovery. These features ensure that databases remain available even in the event of hardware or software failures.</li>
                <li><strong>Comprehensive Security:</strong> Oracle Database includes a robust set of security features, such as Transparent Data Encryption (TDE), Data Redaction, and Virtual Private Database (VPD), which help protect sensitive data and ensure compliance with regulatory requirements.</li>
                <li><strong>Advanced Analytics:</strong> Oracle Database provides built-in analytics capabilities, including support for SQL-based analytics, machine learning algorithms, and in-database processing. These features enable users to perform complex data analysis directly within the database.</li>
                <li><strong>Multi-Model Database:</strong> Oracle supports multiple data models, including relational, JSON, XML, and spatial data, allowing users to manage diverse data types within a single database system. This versatility makes it easier to handle a wide range of application requirements.</li>
                <li><strong>Cloud Integration:</strong> Oracle Database is fully integrated with Oracle Cloud, providing options for deploying databases in the cloud, on-premises, or in a hybrid environment. This flexibility enables organizations to choose the deployment model that best suits their needs.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Oracle Database</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (1977-1980):</strong> Oracle Database was founded by Larry Ellison, Bob Miner, and Ed Oates in 1977 as a project to build a relational database management system (RDBMS) based on the SQL language. The first version, Oracle v2, was released in 1979, becoming the first commercially available RDBMS to use SQL.</li>
                <li><strong>Growth and Expansion (1980s-1990s):</strong> Throughout the 1980s and 1990s, Oracle Database grew rapidly, adding support for new features like distributed databases, clustering, and online transaction processing (OLTP). It became a dominant player in the enterprise database market, known for its scalability and reliability.</li>
                <li><strong>Oracle 9i and 10g (2000s):</strong> The 2000s saw the release of Oracle 9i and 10g, which introduced major innovations such as Real Application Clusters (RAC), automated database management, and support for grid computing. These features helped Oracle maintain its leadership in the database market.</li>
                <li><strong>Oracle 11g and 12c (2010s):</strong> Oracle 11g and 12c introduced features like Automatic Storage Management (ASM), advanced compression, and multi-tenant architecture, enabling organizations to consolidate databases and optimize resource usage. Oracle 12c was particularly notable for its cloud capabilities, paving the way for database-as-a-service (DBaaS) offerings.</li>
                <li><strong>Present and Future:</strong> Oracle Database continues to evolve, with recent versions like Oracle 19c and 21c offering enhancements in performance, security, and cloud integration. Oracle's focus on autonomous databases, which leverage machine learning to automate database management tasks, represents the future direction of the platform.</li>
            </ul>
        </div>
    </div>`,
        icon: "oracle-icon.png"
    },
    {
        title: "MongoDB",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to MongoDB</h1>
        <div class="cs-content-cyber">
            <p><strong>MongoDB</strong> is a popular open-source NoSQL database that is designed for storing, retrieving, and managing large volumes of unstructured or semi-structured data. Unlike traditional relational databases that use tables and rows, MongoDB uses a flexible, document-oriented data model, which allows data to be stored in JSON-like BSON (Binary JSON) format. This flexibility makes MongoDB an ideal choice for modern applications that require scalability, performance, and the ability to handle diverse data types.</p>

            <h2 class="cs-heading-main-cyber">Key Features of MongoDB</h2>
            <ul class="cs-list-cyber">
                <li><strong>Document-Oriented Storage:</strong> MongoDB stores data in flexible, JSON-like documents that can vary in structure, allowing for a more dynamic and agile data model. This makes it easier to work with complex data and evolving schemas.</li>
                <li><strong>Scalability:</strong> MongoDB is designed to scale horizontally through sharding, which allows data to be distributed across multiple servers or clusters. This enables MongoDB to handle large datasets and high-traffic applications effectively.</li>
                <li><strong>High Availability:</strong> MongoDB supports replica sets, which provide automatic failover and data redundancy. This ensures that the database remains available even in the event of hardware or network failures.</li>
                <li><strong>Indexing and Querying:</strong> MongoDB supports a rich set of indexing options and powerful query capabilities, allowing developers to efficiently retrieve and manipulate data. It also supports geospatial indexing, text search, and aggregation frameworks for complex queries.</li>
                <li><strong>Aggregation Framework:</strong> MongoDB includes a powerful aggregation framework that allows developers to process and analyze data in real-time. It supports operations like filtering, grouping, and transforming data within the database itself, reducing the need for external processing.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of MongoDB</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2007-2009):</strong> MongoDB was created by Dwight Merriman, Eliot Horowitz, and Kevin Ryan in 2007 while they were building an online advertising platform called DoubleClick. They needed a database that could handle large volumes of unstructured data, which led to the development of MongoDB. The first public release of MongoDB was in 2009 as an open-source project.</li>
                <li><strong>Rapid Adoption and Growth:</strong> MongoDB quickly gained popularity due to its flexibility, ease of use, and ability to handle large, unstructured datasets. It became a preferred choice for developers working on web applications, big data projects, and real-time analytics.</li>
                <li><strong>MongoDB, Inc. and Commercial Success:</strong> In 2010, the creators of MongoDB founded MongoDB, Inc. (originally named 10gen) to provide commercial support, services, and products around MongoDB. The company later rebranded to MongoDB, Inc. and has since become a major player in the database market.</li>
                <li><strong>Major Releases and Features:</strong> Over the years, MongoDB has seen several major releases, each introducing new features and improvements. Notable versions include MongoDB 2.2 (2012), which introduced the aggregation framework, and MongoDB 3.0 (2015), which introduced the WiredTiger storage engine for improved performance and scalability.</li>
                <li><strong>Present and Future:</strong> MongoDB continues to evolve with regular updates and enhancements, including the introduction of multi-document ACID transactions in MongoDB 4.0 (2018). It remains one of the most popular NoSQL databases in the world, used by organizations of all sizes to power a wide range of applications.</li>
            </ul>
        </div>
    </div>`,
        icon: "mongodb-icon.png"
    },
    {
        title: "Redis",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Redis</h1>
        <div class="cs-content-cyber">
            <p><strong>Redis</strong> (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports various data structures, such as strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, and geospatial indexes. Redis is known for its speed, flexibility, and versatility, making it a popular choice for applications that require real-time data processing, caching, and messaging. Redis operates entirely in memory, providing extremely low-latency access to data, which makes it suitable for high-performance scenarios.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Redis</h2>
            <ul class="cs-list-cyber">
                <li><strong>In-Memory Storage:</strong> Redis stores data in memory, which enables it to achieve lightning-fast read and write operations. This makes Redis ideal for use cases that require real-time data processing, such as caching, session management, and leaderboards.</li>
                <li><strong>Rich Data Structures:</strong> Redis supports a variety of data structures, including strings, lists, hashes, sets, and sorted sets. This flexibility allows developers to model their data in ways that are efficient and optimized for specific use cases.</li>
                <li><strong>Persistence Options:</strong> Although Redis operates in memory, it provides persistence options that allow data to be saved to disk, ensuring that it can be recovered in case of a server restart. Redis supports both point-in-time snapshots and append-only file (AOF) persistence methods.</li>
                <li><strong>Replication and High Availability:</strong> Redis supports master-slave replication, enabling data to be replicated across multiple servers for high availability and redundancy. Redis Sentinel provides automatic failover and monitoring for Redis clusters, ensuring that the system remains highly available.</li>
                <li><strong>Pub/Sub Messaging:</strong> Redis includes a built-in publish/subscribe messaging system that allows messages to be sent and received between clients in real-time. This feature is commonly used for event-driven architectures, real-time analytics, and chat applications.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Redis</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2009):</strong> Redis was created by Salvatore Sanfilippo in 2009 while working on a real-time web analytics solution. Frustrated with the limitations of existing databases, he developed Redis as a fast, in-memory key-value store that could handle high-throughput workloads. The first version of Redis was released in April 2009.</li>
                <li><strong>Rapid Adoption and Growth:</strong> Redis quickly gained popularity due to its speed, simplicity, and versatility. It was adopted by developers and organizations around the world for a wide range of use cases, from caching and session management to real-time analytics and messaging.</li>
                <li><strong>Open Source and Community Support:</strong> Redis is an open-source project, and its development is driven by a strong community of contributors. Over the years, the Redis ecosystem has grown to include a wide range of tools, libraries, and extensions that enhance its functionality and usability.</li>
                <li><strong>Redis Enterprise and Commercial Support:</strong> Redis Labs (now Redis, Inc.) was founded in 2011 to provide commercial support, managed services, and enterprise-grade features for Redis. Redis Enterprise offers advanced features like Redis Cluster, Redis on Flash, and integrated security, making it suitable for large-scale, mission-critical deployments.</li>
                <li><strong>Present and Future:</strong> Redis continues to be one of the most popular in-memory data stores in the world, with widespread adoption across industries. It is actively developed and maintained, with new features and improvements being added regularly. Redis remains a key tool for building high-performance, real-time applications.</li>
            </ul>
        </div>
    </div>`,
        icon: "redis-icon.png"
    },
    {
        title: "Redgate",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Redgate Tools for Microsoft SQL Server</h1>
        <div class="cs-content-cyber">
            <p><strong>Redgate</strong> is a leading provider of software tools for database management, development, and operations, with a strong focus on Microsoft SQL Server. Redgate tools are widely used by SQL Server professionals to manage their databases efficiently, ensuring high performance, reliability, and security. The suite of tools provided by Redgate covers a range of tasks, including database development, version control, backup, and monitoring, making it an essential toolkit for SQL Server administrators and developers.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Redgate Tools for Microsoft SQL Server</h2>
            <ul class="cs-list-cyber">
                <li><strong>SQL Compare:</strong> SQL Compare is one of Redgate's flagship products, used for comparing and synchronizing SQL Server database schemas. It helps developers and DBAs ensure that databases are consistent across environments, making it easier to deploy changes from development to production.</li>
                <li><strong>SQL Data Compare:</strong> SQL Data Compare allows users to compare and synchronize the data in SQL Server databases. This is particularly useful for transferring data between environments, ensuring that test or staging databases have the same data as production.</li>
                <li><strong>SQL Monitor:</strong> SQL Monitor provides real-time monitoring and alerting for SQL Server environments. It tracks key metrics like performance, resource usage, and query execution times, helping DBAs identify and resolve issues before they impact users.</li>
                <li><strong>SQL Backup:</strong> SQL Backup automates the process of backing up SQL Server databases, ensuring that data is protected and recoverable. It offers features like compression, encryption, and scheduling, making it easier to manage backups across multiple servers.</li>
                <li><strong>SQL Prompt:</strong> SQL Prompt is a productivity tool for SQL Server Management Studio (SSMS) and Visual Studio that provides intelligent code completion, formatting, and refactoring. It helps developers write SQL code faster and with fewer errors.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Redgate Tools</h2>
            <ul class="cs-list-cyber">
                <li><strong>Foundation and Early Development (1999):</strong> Redgate was founded in 1999 by Neil Davidson and Simon Galbraith in Cambridge, UK. The company initially focused on building tools to help developers manage SQL Server databases, with SQL Compare being one of its first products.</li>
                <li><strong>Expansion of Product Suite (2000s):</strong> Throughout the 2000s, Redgate expanded its product offerings, adding tools like SQL Data Compare, SQL Backup, and SQL Monitor. These tools were quickly adopted by SQL Server professionals, establishing Redgate as a leading provider of database tools.</li>
                <li><strong>Focus on SQL Server Ecosystem:</strong> Redgate continued to focus on the SQL Server ecosystem, developing tools that addressed the needs of database developers, administrators, and operations teams. The company also introduced tools for version control, continuous integration, and DevOps practices, helping organizations streamline their database workflows.</li>
                <li><strong>Community Engagement and Support:</strong> Redgate has always placed a strong emphasis on community engagement, offering free tools, sponsoring SQL Server events, and contributing to open-source projects. This commitment to the community has helped Redgate build a loyal customer base and a strong reputation in the industry.</li>
                <li><strong>Present and Future:</strong> Redgate continues to innovate, expanding its product suite to support cloud-based databases, automation, and advanced analytics. The company remains focused on helping organizations manage their SQL Server environments efficiently, with a continued emphasis on ease of use, reliability, and customer support.</li>
            </ul>
        </div>
    </div>`,
        icon: "redgate-icon.png"
    },
    {
        title: "Visual Studio",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Visual Studio IDE</h1>
        <div class="cs-content-cyber">
            <p><strong>Visual Studio</strong> is an integrated development environment (IDE) from Microsoft that is used to develop computer programs, websites, web apps, web services, and mobile apps. It supports a wide array of programming languages and development platforms, making it one of the most versatile and widely used IDEs in the world. Visual Studio is known for its robust features, including debugging, IntelliSense code completion, refactoring, and version control, making it an essential tool for professional developers working on Windows, web, and cloud-based applications.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Visual Studio IDE</h2>
            <ul class="cs-list-cyber">
                <li><strong>Comprehensive Language Support:</strong> Visual Studio supports a wide range of programming languages, including C#, C++, Visual Basic, F#, JavaScript, Python, TypeScript, and more. It also provides tools and frameworks for web, desktop, cloud, and mobile development.</li>
                <li><strong>IntelliSense:</strong> IntelliSense is an advanced code completion feature that provides suggestions and context-aware help as developers type. It significantly enhances productivity by reducing the amount of manual coding and helping prevent syntax errors.</li>
                <li><strong>Integrated Debugging:</strong> Visual Studio offers powerful debugging tools that allow developers to step through code, set breakpoints, watch variables, and inspect the state of applications during runtime. This helps in identifying and resolving issues more efficiently.</li>
                <li><strong>Source Control Integration:</strong> Visual Studio integrates seamlessly with source control systems like Git and Azure DevOps, allowing developers to manage version control, collaborate on code, and track changes directly within the IDE.</li>
                <li><strong>Extensibility:</strong> Visual Studio is highly extensible, with a large ecosystem of plugins and extensions available through the Visual Studio Marketplace. Developers can customize their IDE to fit their specific workflows and enhance their productivity with additional tools and features.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Visual Studio</h2>
            <ul class="cs-list-cyber">
                <li><strong>Initial Release (1997):</strong> Visual Studio was first released in 1997 as a suite of development tools for building Windows applications. The initial version, Visual Studio 97, included separate tools for different languages, such as Visual Basic, Visual C++, and Visual J++.</li>
                <li><strong>Evolution and Integration (2000s):</strong> Over the years, Visual Studio evolved into a more integrated development environment. The release of Visual Studio .NET in 2002 marked a significant shift, as it introduced support for the .NET Framework, enabling developers to create applications for Windows, web, and services using a unified platform.</li>
                <li><strong>Support for Web and Cloud Development:</strong> With the rise of web and cloud computing, Visual Studio expanded its capabilities to include robust tools for web development, including ASP.NET, and later, cloud services with integration for Azure. This made Visual Studio a key tool for modern application development.</li>
                <li><strong>Cross-Platform Development (2015 Onwards):</strong> Visual Studio 2015 introduced support for cross-platform mobile development with tools for Android, iOS, and Windows using Xamarin and Apache Cordova. Visual Studio Code, a lightweight, cross-platform code editor, was also released around this time, further expanding the Visual Studio ecosystem.</li>
                <li><strong>Present and Future:</strong> Visual Studio continues to evolve with each new version, adding features that cater to the latest trends in software development, such as AI-assisted coding, containerization, and cloud-native applications. The introduction of Visual Studio 2022 brought a 64-bit architecture, enhancing performance for large projects and modern development environments.</li>
            </ul>
        </div>
    </div>`,
        icon: "visualstudio-icon.png"
    },
    {
        title: "SQL Server Management Studio",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to SQL Server Management Studio (SSMS)</h1>
        <div class="cs-content-cyber">
            <p><strong>SQL Server Management Studio (SSMS)</strong> is an integrated environment developed by Microsoft for managing SQL Server databases. It provides a graphical interface for configuring, managing, and administering SQL Server instances and databases, making it a powerful tool for database administrators and developers. SSMS includes a variety of features for writing and executing SQL queries, managing database objects, configuring security settings, and monitoring server performance, among others.</p>

            <h2 class="cs-heading-main-cyber">Key Features of SQL Server Management Studio (SSMS)</h2>
            <ul class="cs-list-cyber">
                <li><strong>Query Editor:</strong> SSMS provides a powerful query editor that allows users to write, execute, and debug T-SQL queries. The editor includes features like syntax highlighting, IntelliSense, and query execution plans, which help developers write efficient queries and optimize database performance.</li>
                <li><strong>Object Explorer:</strong> The Object Explorer in SSMS gives users a hierarchical view of their SQL Server instances, databases, and objects such as tables, views, stored procedures, and triggers. This makes it easy to navigate through the database structure and perform administrative tasks.</li>
                <li><strong>Performance Monitoring and Tuning:</strong> SSMS includes tools for monitoring and tuning SQL Server performance, such as the Activity Monitor and Database Engine Tuning Advisor. These tools help administrators identify performance bottlenecks and optimize server performance.</li>
                <li><strong>Security Management:</strong> SSMS provides robust security management features, allowing administrators to configure user roles, permissions, and authentication settings. It also includes tools for auditing and compliance, ensuring that databases meet security and regulatory requirements.</li>
                <li><strong>Backup and Restore:</strong> SSMS makes it easy to manage database backups and restores. Users can schedule regular backups, configure backup options, and perform point-in-time restores, ensuring that data is protected and recoverable in case of failure.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of SQL Server Management Studio (SSMS)</h2>
            <ul class="cs-list-cyber">
                <li><strong>Introduction and Early Versions (2005):</strong> SSMS was first introduced with SQL Server 2005, replacing the older Enterprise Manager as the primary tool for managing SQL Server instances. It brought together a range of management and development tools into a single, integrated environment, making it easier for users to manage SQL Server databases.</li>
                <li><strong>Continuous Improvement:</strong> Since its initial release, SSMS has undergone continuous improvement with each new version of SQL Server. Microsoft has added new features and enhancements, such as improved query performance analysis, extended support for new SQL Server features, and better integration with other Microsoft tools like Azure Data Studio.</li>
                <li><strong>Standalone Releases (2016 Onwards):</strong> Starting with SQL Server 2016, SSMS became a standalone application that is updated independently of SQL Server. This allows Microsoft to release updates and new features for SSMS more frequently, ensuring that users always have access to the latest tools and improvements.</li>
                <li><strong>Integration with Azure:</strong> In recent years, SSMS has expanded its capabilities to include integration with Azure SQL Database and Azure SQL Managed Instance. This allows users to manage cloud-based SQL Server instances using the same tools and interface they are familiar with, making it easier to work in hybrid and cloud environments.</li>
                <li><strong>Present and Future:</strong> SQL Server Management Studio continues to be the primary tool for managing SQL Server instances, both on-premises and in the cloud. Microsoft is committed to enhancing SSMS with new features and capabilities, ensuring that it remains a powerful and essential tool for SQL Server professionals.</li>
            </ul>
        </div>
    </div>`,
        icon: "ssms-icon.png"
    },
    {
        title: "GitHub",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to GitHub</h1>
        <div class="cs-content-cyber">
            <p><strong>GitHub</strong> is a web-based platform used for version control, collaboration, and code management. It is built on Git, a distributed version control system created by Linus Torvalds, and provides a graphical interface, as well as various collaboration features such as pull requests, code reviews, and issue tracking. GitHub is one of the most popular platforms for developers to host, share, and collaborate on code, making it a central hub for open-source and enterprise projects alike.</p>

            <h2 class="cs-heading-main-cyber">Key Features of GitHub</h2>
            <ul class="cs-list-cyber">
                <li><strong>Version Control with Git:</strong> GitHub leverages Git to provide powerful version control, enabling developers to track changes to their codebase, revert to previous versions, and collaborate with others. Branching and merging are core features, allowing for parallel development and experimentation.</li>
                <li><strong>Collaboration Tools:</strong> GitHub includes collaboration tools such as pull requests, where developers can submit changes for review before they are merged into the main codebase. It also supports code reviews, comments, and discussions, fostering collaboration among team members.</li>
                <li><strong>Issue and Project Management:</strong> GitHub offers integrated issue tracking and project management features. Teams can create, assign, and track issues, as well as organize work into projects with Kanban-style boards, making it easier to manage development workflows.</li>
                <li><strong>GitHub Actions:</strong> GitHub Actions is a CI/CD (Continuous Integration and Continuous Deployment) tool that allows developers to automate workflows directly within GitHub. It supports building, testing, and deploying code automatically when changes are pushed to a repository.</li>
                <li><strong>Open Source Community:</strong> GitHub is home to millions of open-source projects, and its platform is designed to facilitate collaboration among developers from around the world. It provides tools for maintaining open-source repositories, managing contributors, and ensuring code quality.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of GitHub</h2>
            <ul class="cs-list-cyber">
                <li><strong>Foundation and Early Growth (2008):</strong> GitHub was founded in 2008 by Tom Preston-Werner, Chris Wanstrath, PJ Hyett, and Scott Chacon as a platform to simplify and enhance collaboration on software development projects using Git. It quickly gained popularity within the developer community, becoming a central hub for open-source development.</li>
                <li><strong>Rapid Adoption and Expansion:</strong> GitHub's user base grew rapidly, attracting both individual developers and large organizations. Its user-friendly interface and powerful collaboration features made it the preferred platform for version control and project management.</li>
                <li><strong>Acquisition by Microsoft (2018):</strong> In 2018, Microsoft acquired GitHub for $7.5 billion, signaling its commitment to supporting the open-source community and developer tools. Since the acquisition, GitHub has continued to operate independently, while benefiting from Microsoft's resources and expertise.</li>
                <li><strong>Introduction of GitHub Actions and Packages:</strong> GitHub introduced GitHub Actions in 2019, adding CI/CD capabilities directly into the platform. This was followed by GitHub Packages, a package management service integrated with GitHub, enabling developers to publish and share packages easily.</li>
                <li><strong>Present and Future:</strong> GitHub continues to evolve with new features and improvements, such as Codespaces for cloud-based development environments and Copilot, an AI-powered coding assistant. GitHub remains the leading platform for developers worldwide, fostering innovation and collaboration in the software development community.</li>
            </ul>
        </div>
    </div>`,
        icon: "github-icon.png"
    },
    {
        title: "JIRA",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to JIRA</h1>
        <div class="cs-content-cyber">
            <p><strong>JIRA</strong> is a widely used project management and issue tracking software developed by Atlassian. It is designed to help teams plan, track, and manage their work, particularly in software development. JIRA supports Agile methodologies, including Scrum and Kanban, and offers a range of tools for tracking tasks, bugs, features, and other work items. Its flexibility, powerful features, and integration capabilities make JIRA a popular choice for teams of all sizes, from small startups to large enterprises.</p>

            <h2 class="cs-heading-main-cyber">Key Features of JIRA</h2>
            <ul class="cs-list-cyber">
                <li><strong>Agile Project Management:</strong> JIRA provides comprehensive tools for managing Agile projects, including Scrum boards, Kanban boards, and backlogs. These tools help teams organize and prioritize work, track progress, and ensure timely delivery of projects.</li>
                <li><strong>Issue and Task Tracking:</strong> JIRA allows teams to create, assign, and track issues, tasks, and bugs throughout the development lifecycle. Each issue can be customized with fields, workflows, and permissions, enabling teams to adapt JIRA to their specific needs.</li>
                <li><strong>Custom Workflows:</strong> JIRA offers flexible workflow customization, allowing teams to define the stages that issues go through from creation to completion. Workflows can be tailored to fit different processes, ensuring that JIRA aligns with the team's way of working.</li>
                <li><strong>Reporting and Analytics:</strong> JIRA includes a variety of reporting and analytics tools, such as burndown charts, velocity charts, and cumulative flow diagrams. These tools help teams monitor progress, identify bottlenecks, and make data-driven decisions to improve performance.</li>
                <li><strong>Integration and Automation:</strong> JIRA integrates with a wide range of tools and services, including Confluence, Bitbucket, GitHub, Slack, and more. JIRA Automation allows teams to automate repetitive tasks and workflows, increasing efficiency and reducing manual effort.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of JIRA</h2>
            <ul class="cs-list-cyber">
                <li><strong>Initial Release (2002):</strong> JIRA was first released in 2002 by Atlassian as a simple issue tracking tool for software developers. The name "JIRA" is derived from "Gojira," the Japanese word for "Godzilla," reflecting its creators' ambitions to make it a powerful tool in the software development landscape.</li>
                <li><strong>Adoption and Growth:</strong> JIRA quickly gained popularity among development teams for its flexibility and ease of use. Over time, Atlassian expanded JIRA's capabilities to include project management features, making it a comprehensive tool for managing software projects.</li>
                <li><strong>Introduction of Agile Tools (2010s):</strong> In response to the growing adoption of Agile methodologies, Atlassian introduced dedicated Agile tools within JIRA, such as Scrum and Kanban boards. These features made JIRA the go-to tool for Agile teams, helping them manage sprints, backlogs, and workflows effectively.</li>
                <li><strong>Cloud and Enterprise Offerings:</strong> As cloud computing gained traction, Atlassian launched JIRA Cloud, offering a hosted version of JIRA with the same powerful features as the on-premises version. JIRA also evolved to meet the needs of large enterprises with JIRA Data Center, providing high availability and scalability.</li>
                <li><strong>Present and Future:</strong> JIRA continues to evolve with new features and enhancements aimed at improving team collaboration and productivity. It remains a cornerstone of Atlassian's product suite, widely used by development teams and organizations around the world for managing projects, tracking issues, and delivering software efficiently.</li>
            </ul>
        </div>
    </div>`,
        icon: "jira-icon.png"
    },
    {
        title: "ZenHub",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Zenhub</h1>
        <div class="cs-content-cyber">
            <p><strong>Zenhub</strong> is a project management and collaboration tool designed specifically for software development teams using GitHub. It integrates directly with GitHub, enabling teams to manage projects, track issues, and collaborate on code without leaving the GitHub interface. Zenhub provides a range of features tailored to Agile and DevOps workflows, making it a popular choice for development teams looking to enhance their productivity and streamline their processes.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Zenhub</h2>
            <ul class="cs-list-cyber">
                <li><strong>GitHub Integration:</strong> Zenhub integrates seamlessly with GitHub, allowing teams to manage projects and track progress directly within GitHub repositories. This integration eliminates the need to switch between different tools, keeping development work and project management in one place.</li>
                <li><strong>Agile Project Management:</strong> Zenhub provides tools for managing Agile workflows, including Kanban and Scrum boards, sprints, and epics. Teams can create and manage tasks, track progress, and ensure that projects are delivered on time.</li>
                <li><strong>Workspaces and Multi-Repo Boards:</strong> Zenhub's workspaces allow teams to create custom views of their work, while multi-repo boards enable tracking issues across multiple repositories. This is particularly useful for large projects that span several codebases.</li>
                <li><strong>Roadmaps and Reporting:</strong> Zenhub includes features for creating project roadmaps and generating reports on team performance. These tools help teams plan for the future, monitor progress, and make data-driven decisions to improve efficiency.</li>
                <li><strong>Automation and Workflows:</strong> Zenhub offers automation features to streamline repetitive tasks and workflows. This includes automated issue tracking, status updates, and integrations with other tools like Slack and Jira, making it easier to keep projects on track.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Zenhub</h2>
            <ul class="cs-list-cyber">
                <li><strong>Founding and Early Development (2014):</strong> Zenhub was founded in 2014 by Matt Butler, Aaron Upright, and Cameron McKay as a solution to improve project management directly within GitHub. Recognizing the need for better project tracking tools for developers, they built Zenhub to integrate seamlessly with GitHub, providing a more efficient way to manage software projects.</li>
                <li><strong>Growth and Adoption:</strong> Zenhub quickly gained traction among development teams, especially those already using GitHub for version control. Its deep integration with GitHub and focus on developer-centric workflows made it a preferred choice for Agile teams.</li>
                <li><strong>Feature Expansion:</strong> Over the years, Zenhub has expanded its feature set to include support for multi-repository boards, advanced reporting, and roadmap planning. These enhancements have made Zenhub a comprehensive project management tool for development teams of all sizes.</li>
                <li><strong>Enterprise and Open Source Offerings:</strong> Zenhub introduced enterprise-level features to cater to large organizations, including advanced security, compliance, and customization options. They also launched initiatives to support open-source projects, providing free access to Zenhub's tools for open-source maintainers.</li>
                <li><strong>Present and Future:</strong> Zenhub continues to evolve, with a focus on improving team productivity and collaboration within GitHub. The platform remains committed to integrating new technologies and responding to the needs of the developer community, ensuring that it stays relevant in the fast-paced world of software development.</li>
            </ul>
        </div>
    </div>`,
        icon: "zenhub-icon.png"
    },
    {
        title: "SonarQube",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to SonarQube</h1>
        <div class="cs-content-cyber">
            <p><strong>SonarQube</strong> is an open-source platform developed by SonarSource for continuous inspection of code quality. It performs automatic reviews with static code analysis to detect bugs, code smells, and security vulnerabilities in over 25 programming languages. SonarQube is used by development teams to ensure the maintainability, reliability, and security of their codebases. It integrates seamlessly into CI/CD pipelines, making it a vital tool in modern software development processes.</p>

            <h2 class="cs-heading-main-cyber">Key Features of SonarQube</h2>
            <ul class="cs-list-cyber">
                <li><strong>Code Quality Analysis:</strong> SonarQube analyzes code for various quality metrics, including maintainability, reliability, and security. It identifies issues such as bugs, vulnerabilities, and code smells, helping teams improve the overall quality of their codebase.</li>
                <li><strong>Support for Multiple Languages:</strong> SonarQube supports over 25 programming languages, including Java, C#, JavaScript, Python, PHP, and more. This makes it a versatile tool for teams working with diverse technology stacks.</li>
                <li><strong>Integration with CI/CD Pipelines:</strong> SonarQube integrates seamlessly with continuous integration and continuous deployment (CI/CD) pipelines. This allows code quality checks to be automated, ensuring that only high-quality code is deployed to production.</li>
                <li><strong>Security Vulnerability Detection:</strong> SonarQube includes security rules to detect vulnerabilities such as SQL injection, cross-site scripting (XSS), and other common security issues. This helps teams identify and fix security flaws early in the development process.</li>
                <li><strong>Technical Debt Management:</strong> SonarQube provides insights into technical debt, helping teams understand the cost of poor code quality. It offers tools to prioritize and manage technical debt, ensuring that it is addressed before it becomes a major issue.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of SonarQube</h2>
            <ul class="cs-list-cyber">
                <li><strong>Initial Release (2007):</strong> SonarQube, originally known as Sonar, was first released in 2007 by SonarSource. It was created to provide a comprehensive tool for managing code quality and ensuring that software development teams could maintain high standards throughout the development lifecycle.</li>
                <li><strong>Growth and Adoption:</strong> SonarQube quickly gained popularity due to its powerful analysis capabilities and ease of integration into existing development workflows. It became widely adopted by teams looking to improve their code quality and maintainability.</li>
                <li><strong>Rebranding to SonarQube (2013):</strong> In 2013, Sonar was rebranded as SonarQube to reflect its evolution into a fully-fledged platform for continuous inspection of code quality. The rebranding also coincided with the introduction of new features and expanded language support.</li>
                <li><strong>Integration with DevOps Tools:</strong> Over the years, SonarQube has expanded its integration capabilities, becoming a key component in DevOps pipelines. It now integrates with popular CI/CD tools like Jenkins, Azure DevOps, GitLab CI, and others, enabling automated code quality checks as part of the development process.</li>
                <li><strong>Present and Future:</strong> SonarQube continues to evolve, with a focus on enhancing its security analysis capabilities and expanding support for new languages and frameworks. It remains a critical tool for teams committed to maintaining high code quality and ensuring the security of their software.</li>
            </ul>
        </div>
    </div>`,
        icon: "sonarqube-icon.png"
    },
    {
        title: "Snyk",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Snyk</h1>
        <div class="cs-content-cyber">
            <p><strong>Snyk</strong> is a developer-first security platform that helps teams find, fix, and monitor vulnerabilities in their code, dependencies, containers, and infrastructure as code. Snyk integrates seamlessly into the development process, enabling developers to identify and address security issues early in the software development lifecycle (SDLC). By focusing on empowering developers, Snyk ensures that security is embedded into the DevOps workflow, fostering a culture of secure coding practices and reducing the risk of vulnerabilities in production.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Snyk</h2>
            <ul class="cs-list-cyber">
                <li><strong>Vulnerability Scanning:</strong> Snyk provides comprehensive vulnerability scanning for open-source libraries, container images, and infrastructure as code. It identifies known vulnerabilities in dependencies and suggests remediation steps to fix them.</li>
                <li><strong>Developer Integration:</strong> Snyk integrates with popular development tools and environments, including GitHub, GitLab, Bitbucket, Jenkins, and IDEs like Visual Studio Code and IntelliJ. This allows developers to find and fix vulnerabilities directly within their existing workflows.</li>
                <li><strong>Automated Remediation:</strong> Snyk offers automated remediation through pull requests, suggesting upgrades or patches for vulnerable dependencies. This helps developers quickly address security issues without disrupting their development process.</li>
                <li><strong>Container Security:</strong> Snyk scans container images for vulnerabilities and provides actionable insights to improve the security of containerized applications. It also integrates with container orchestration platforms like Kubernetes to ensure security throughout the container lifecycle.</li>
                <li><strong>Continuous Monitoring:</strong> Snyk continuously monitors projects for new vulnerabilities, alerting developers when new issues are discovered in their dependencies or code. This proactive approach ensures that teams stay on top of security risks as they evolve.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Snyk</h2>
            <ul class="cs-list-cyber">
                <li><strong>Founding and Early Development (2015):</strong> Snyk was founded in 2015 by Guy Podjarny, Danny Grander, and Assaf Hefetz with the mission to make security accessible to developers. Recognizing the growing importance of security in the DevOps world, they created a platform that integrates security into the development process, allowing developers to take ownership of their code's security.</li>
                <li><strong>Growth and Adoption:</strong> Snyk quickly gained traction among development teams and organizations due to its developer-first approach and seamless integration with existing tools. The platform's ability to automate security checks and provide actionable remediation made it a popular choice for companies adopting DevSecOps practices.</li>
                <li><strong>Expansion of Features:</strong> Over the years, Snyk has expanded its feature set to cover a broader range of security needs, including container security, infrastructure as code, and continuous monitoring. These enhancements have made Snyk a comprehensive security platform for modern development teams.</li>
                <li><strong>Funding and Global Reach:</strong> Snyk has raised significant funding from leading venture capital firms, allowing it to expand its global presence and invest in product development. The company has opened offices worldwide and continues to grow its customer base across various industries.</li>
                <li><strong>Present and Future:</strong> Snyk remains committed to empowering developers to secure their code and applications. The platform continues to evolve, with a focus on integrating security into every stage of the development lifecycle. Snyk's emphasis on developer-friendly tools and automation ensures that it will play a key role in the future of DevSecOps.</li>
            </ul>
        </div>
    </div>`,
        icon: "snyk-icon.png"
    },
    {
        title: "IIS",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Microsoft IIS</h1>
        <div class="cs-content-cyber">
            <p><strong>Microsoft Internet Information Services (IIS)</strong> is a flexible, secure, and manageable web server for hosting anything on the web. From media streaming to web applications, IIS’s scalable and open architecture is ready to handle the most demanding tasks. IIS is an integral part of the Windows Server operating system, offering a powerful, extensible platform for websites, services, and applications.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Microsoft IIS</h2>
            <ul class="cs-list-cyber">
                <li><strong>Integrated Web Server:</strong> IIS provides a robust and integrated web server that supports HTTP, HTTPS, FTP, FTPS, SMTP, and NNTP. This versatility allows it to serve a wide range of content, including static websites, dynamic applications, and media streaming.</li>
                <li><strong>Scalability and Performance:</strong> IIS is designed to scale, supporting small websites as well as large, high-traffic web applications. Features like dynamic content compression, output caching, and WebSockets ensure high performance and efficient resource use.</li>
                <li><strong>Security Features:</strong> IIS includes a comprehensive set of security features, such as URL authorization, request filtering, and SSL/TLS support. These features help protect applications from common web threats and ensure secure communications.</li>
                <li><strong>Extensibility:</strong> IIS is highly extensible, allowing developers to add custom modules and handlers to extend its functionality. Microsoft also provides a wide range of built-in modules for tasks such as authentication, logging, and URL rewriting.</li>
                <li><strong>Management Tools:</strong> IIS offers a range of management tools, including the IIS Manager GUI, command-line utilities, and PowerShell cmdlets. These tools make it easy to configure, monitor, and manage web servers, applications, and services.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Microsoft IIS</h2>
            <ul class="cs-list-cyber">
                <li><strong>Initial Release (1995):</strong> Microsoft IIS was first released as a free add-on for Windows NT 3.51 in 1995. It was developed to compete with other web servers like Apache and to provide a native web server solution for the Windows platform.</li>
                <li><strong>Evolution with Windows Server:</strong> Over the years, IIS has evolved alongside Windows Server, with each new version introducing additional features, performance improvements, and security enhancements. Major updates included IIS 5.0 with Windows 2000, IIS 6.0 with Windows Server 2003, and IIS 7.0 with Windows Server 2008.</li>
                <li><strong>IIS 7 and Modular Architecture:</strong> IIS 7.0, released with Windows Server 2008, introduced a completely modular architecture, allowing administrators to install only the components they needed. This version also included a new user interface and enhanced security features, marking a significant shift in IIS's design and capabilities.</li>
                <li><strong>IIS 8 and 10:</strong> IIS 8.0, released with Windows Server 2012, introduced support for WebSockets, SNI (Server Name Indication), and improved performance for multicore processors. IIS 10.0, included with Windows Server 2016 and Windows 10, added support for HTTP/2, enhancing the speed and efficiency of web communications.</li>
                <li><strong>Present and Future:</strong> IIS continues to be a critical component of the Windows Server ecosystem, providing a reliable and scalable platform for web hosting and application deployment. Microsoft continues to update IIS with new features and improvements, ensuring it remains a competitive solution for modern web hosting needs.</li>
            </ul>
        </div>
    </div>`,
        icon: "iis-icon.png"
    },
    {
        title: "Linux Server",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Linux Server</h1>
        <div class="cs-content-cyber">
            <p><strong>Linux Server</strong> refers to a server powered by the Linux operating system, an open-source, Unix-like system known for its robustness, security, and flexibility. Linux servers are widely used in enterprise environments, web hosting, cloud infrastructure, and supercomputing due to their stability, performance, and scalability. Linux servers can run a variety of services, including web servers, database servers, email servers, and more, making them a cornerstone of modern IT infrastructure.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Linux Server</h2>
            <ul class="cs-list-cyber">
                <li><strong>Open Source and Free:</strong> Linux is open-source, meaning its source code is freely available for anyone to use, modify, and distribute. This makes Linux an attractive option for organizations looking to reduce licensing costs while maintaining control over their software environment.</li>
                <li><strong>Stability and Performance:</strong> Linux is known for its stability and ability to run for long periods without needing a reboot. It efficiently manages system resources, making it suitable for both high-performance computing and low-resource environments.</li>
                <li><strong>Security:</strong> Linux has a strong security model, with built-in features such as user privileges, file permissions, and SELinux (Security-Enhanced Linux) for enforcing security policies. Its open-source nature also allows for continuous security audits by the global community.</li>
                <li><strong>Scalability:</strong> Linux servers can scale from small personal projects to large-scale enterprise applications. It supports multi-core processors, large amounts of RAM, and distributed computing, making it ideal for cloud computing and data centers.</li>
                <li><strong>Extensive Software Ecosystem:</strong> Linux has a vast ecosystem of open-source software, including web servers (Apache, Nginx), databases (MySQL, PostgreSQL), programming languages (Python, PHP, Ruby), and more. This allows organizations to build, deploy, and manage applications with a wide range of tools and technologies.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Linux Server</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (1991):</strong> Linux was created by Linus Torvalds in 1991 as a free and open-source operating system kernel. Initially developed as a hobby project, Linux quickly gained popularity among developers and grew into a fully-fledged operating system with contributions from programmers around the world.</li>
                <li><strong>Adoption by Enterprises and Web Hosting (1990s-2000s):</strong> In the mid-1990s, Linux began to be adopted by enterprises and web hosting companies due to its stability, security, and cost-effectiveness. The availability of Linux distributions, such as Red Hat, Debian, and SUSE, made it easier to deploy and manage Linux servers in production environments.</li>
                <li><strong>Growth of the Linux Ecosystem:</strong> The Linux ecosystem continued to expand with the development of new distributions and the emergence of key open-source projects like the Apache web server, MySQL database, and PHP programming language. These projects helped solidify Linux's position as a dominant platform for web hosting and enterprise applications.</li>
                <li><strong>Linux in the Cloud and Supercomputing:</strong> With the rise of cloud computing, Linux became the operating system of choice for many cloud service providers, including AWS, Google Cloud, and Microsoft Azure. Additionally, Linux powers the majority of the world's supercomputers, thanks to its performance, scalability, and flexibility.</li>
                <li><strong>Present and Future:</strong> Linux continues to evolve with contributions from the global open-source community. It remains a leading platform for servers, cloud computing, and supercomputing, and is increasingly being used in emerging areas such as IoT, edge computing, and containerization with technologies like Docker and Kubernetes.</li>
            </ul>
        </div>
    </div>`,
        icon: "linux-icon.png"
    },
    {
        title: "Windows Server",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Windows Server</h1>
        <div class="cs-content-cyber">
            <p><strong>Windows Server</strong> is a group of server operating systems developed by Microsoft that supports enterprise-level management, data storage, applications, and communications. Designed to handle demanding workloads, Windows Server provides a robust, scalable, and secure environment for running business-critical applications, hosting websites, managing networks, and more. It is widely used in organizations of all sizes due to its deep integration with Microsoft's ecosystem, ease of management, and comprehensive set of features.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Windows Server</h2>
            <ul class="cs-list-cyber">
                <li><strong>Active Directory:</strong> Windows Server includes Active Directory (AD), a powerful directory service for managing and securing network resources. AD provides centralized authentication, authorization, and management of user accounts, devices, and services across an organization.</li>
                <li><strong>Hyper-V Virtualization:</strong> Windows Server comes with Hyper-V, a built-in virtualization platform that allows organizations to create and manage virtual machines (VMs) on their servers. Hyper-V supports both Windows and Linux VMs, enabling efficient resource utilization and consolidation.</li>
                <li><strong>File and Storage Services:</strong> Windows Server provides advanced file and storage management capabilities, including support for Storage Spaces Direct, which enables high-availability storage solutions. It also offers robust file sharing, backup, and recovery options.</li>
                <li><strong>Networking and Remote Access:</strong> Windows Server includes a comprehensive set of networking tools, such as DNS, DHCP, and VPN services, that allow organizations to manage their network infrastructure effectively. Remote Desktop Services (RDS) enable secure remote access to applications and desktops.</li>
                <li><strong>Security Features:</strong> Windows Server includes advanced security features, such as Windows Defender, BitLocker, and Shielded VMs, to protect data and applications. It also supports role-based access control (RBAC) and Just Enough Administration (JEA) for fine-grained security management.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Windows Server</h2>
            <ul class="cs-list-cyber">
                <li><strong>Initial Release (1993):</strong> The first version of Windows Server was released in 1993 as Windows NT 3.1 Advanced Server. It was designed to provide a secure and reliable operating system for enterprise environments, laying the foundation for future Windows Server releases.</li>
                <li><strong>Growth and Expansion (2000s):</strong> Throughout the 2000s, Windows Server evolved with major releases, including Windows Server 2000, which introduced Active Directory, and Windows Server 2003, which added significant improvements in scalability, security, and performance. These versions solidified Windows Server's position as a leading server operating system.</li>
                <li><strong>Introduction of Hyper-V (2008):</strong> Windows Server 2008 introduced Hyper-V, Microsoft's entry into the virtualization market. Hyper-V allowed organizations to run multiple virtual machines on a single physical server, enabling more efficient use of hardware resources.</li>
                <li><strong>Windows Server 2012 and 2016:</strong> Windows Server 2012 brought major enhancements, including the introduction of Storage Spaces and improved cloud integration. Windows Server 2016 continued this trend with the addition of Nano Server, Shielded VMs, and deep integration with Azure, reflecting the growing importance of cloud computing.</li>
                <li><strong>Present and Future:</strong> Windows Server remains a cornerstone of Microsoft's enterprise offerings, with ongoing updates and new features that support hybrid and cloud environments. The latest versions, such as Windows Server 2019 and 2022, continue to focus on security, cloud integration, and performance, ensuring that Windows Server remains a top choice for organizations worldwide.</li>
            </ul>
        </div>
    </div>`,
        icon: "windowsserver-icon.png"
    },
    {
        title: "Docker",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Docker</h1>
        <div class="cs-content-cyber">
            <p><strong>Docker</strong> is an open-source platform designed to automate the deployment, scaling, and management of applications within lightweight, portable containers. Containers encapsulate an application and its dependencies into a single package, enabling consistent execution across different environments. Docker has revolutionized the way developers build, ship, and run applications by simplifying the process of deploying code in any environment, whether it's on a developer's laptop, a data center, or the cloud.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Docker</h2>
            <ul class="cs-list-cyber">
                <li><strong>Containerization:</strong> Docker allows applications to be packaged with all their dependencies, libraries, and configuration files into a standardized unit called a container. Containers are lightweight and can run on any platform that supports Docker, ensuring consistent behavior across different environments.</li>
                <li><strong>Isolation and Security:</strong> Docker containers provide isolation between applications, preventing conflicts and enhancing security. Each container runs in its own isolated environment, with resources like CPU and memory being allocated separately, ensuring that applications do not interfere with each other.</li>
                <li><strong>Portability:</strong> Docker containers are highly portable, meaning they can run on any machine that supports Docker, regardless of the underlying infrastructure. This portability makes it easy to move applications between development, testing, and production environments.</li>
                <li><strong>Efficient Resource Utilization:</strong> Docker containers are lightweight compared to traditional virtual machines, as they share the host system's kernel. This allows for more efficient use of system resources, enabling higher density of applications per server.</li>
                <li><strong>Integration with CI/CD Pipelines:</strong> Docker integrates seamlessly with continuous integration and continuous deployment (CI/CD) pipelines, allowing developers to automate the building, testing, and deployment of containers. This integration accelerates the software delivery process and ensures consistency across all stages of development.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Docker</h2>
            <ul class="cs-list-cyber">
                <li><strong>Founding and Early Development (2013):</strong> Docker was founded by Solomon Hykes in 2013 as a project within dotCloud, a platform-as-a-service (PaaS) company. The idea behind Docker was to create a standardized way to deploy applications in isolated environments. Docker's first public release, Docker 0.1, was launched in March 2013, quickly gaining attention for its simplicity and potential to transform software deployment.</li>
                <li><strong>Rapid Adoption and Growth:</strong> Docker's ease of use, coupled with its powerful features, led to rapid adoption by developers and organizations worldwide. By 2014, Docker had become a key tool in DevOps, cloud computing, and microservices architectures, with major companies adopting it to streamline their development processes.</li>
                <li><strong>Expansion of the Docker Ecosystem:</strong> As Docker grew in popularity, the Docker ecosystem expanded with the introduction of tools like Docker Compose, Docker Swarm, and Docker Hub. These tools provided additional functionality for managing multi-container applications, orchestrating containers, and sharing container images.</li>
                <li><strong>Open Source Community and Industry Support:</strong> Docker's open-source nature and strong community support have been instrumental in its success. Many organizations, including major cloud providers like AWS, Google Cloud, and Microsoft Azure, have integrated Docker into their platforms, further solidifying its role in modern application development.</li>
                <li><strong>Present and Future:</strong> Docker continues to be a leading platform for containerization, with ongoing developments focused on enhancing security, performance, and integration with emerging technologies. Docker remains at the forefront of the container revolution, playing a critical role in the DevOps and cloud-native ecosystems.</li>
            </ul>
        </div>
    </div>`,
        icon: "docker-icon.png"
    },
    {
        title: "Azure DevOps",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Azure DevOps</h1>
        <div class="cs-content-cyber">
            <p><strong>Azure DevOps</strong> is a set of development tools and services provided by Microsoft that facilitate collaboration, planning, development, delivery, and continuous improvement in software projects. Azure DevOps supports the entire DevOps lifecycle, integrating with a wide range of tools and services to provide an end-to-end solution for modern software development. It includes services like Azure Repos, Azure Pipelines, Azure Boards, Azure Artifacts, and Azure Test Plans, all of which help teams deliver high-quality software more efficiently.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Azure DevOps</h2>
            <ul class="cs-list-cyber">
                <li><strong>Azure Repos:</strong> Azure Repos provides Git repositories or Team Foundation Version Control (TFVC) for source control of your code. It supports pull requests, code reviews, and branching strategies, enabling collaborative development and version control.</li>
                <li><strong>Azure Pipelines:</strong> Azure Pipelines is a CI/CD service that allows you to build, test, and deploy applications to any platform or cloud. It supports a wide range of languages and frameworks and integrates with other CI/CD tools, enabling automated workflows.</li>
                <li><strong>Azure Boards:</strong> Azure Boards provides tools for agile planning, tracking, and project management. It includes Kanban boards, backlogs, sprint planning tools, and customizable dashboards, helping teams stay organized and deliver on time.</li>
                <li><strong>Azure Artifacts:</strong> Azure Artifacts allows teams to create, host, and share packages, such as NuGet, npm, Maven, and Python packages, from public and private sources. It integrates with Azure Pipelines to automate package management.</li>
                <li><strong>Azure Test Plans:</strong> Azure Test Plans provides tools for testing and quality assurance, including manual and exploratory testing, automated test management, and continuous testing integration, ensuring that your software meets the highest standards of quality.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Azure DevOps</h2>
            <ul class="cs-list-cyber">
                <li><strong>Origins as Team Foundation Server (2005):</strong> Azure DevOps originated as Team Foundation Server (TFS), first released by Microsoft in 2005. TFS was designed to support version control, work item tracking, and project management, primarily for enterprise software development teams.</li>
                <li><strong>Transition to the Cloud (2013):</strong> In 2013, Microsoft introduced Visual Studio Online (later renamed Visual Studio Team Services, or VSTS), a cloud-based version of TFS. This transition marked the beginning of Microsoft's focus on cloud-based DevOps tools, offering greater flexibility and scalability to teams.</li>
                <li><strong>Rebranding as Azure DevOps (2018):</strong> In 2018, Microsoft rebranded VSTS as Azure DevOps, reflecting the evolution of the platform into a comprehensive suite of DevOps tools. The rebranding included the introduction of distinct services (Repos, Pipelines, Boards, Artifacts, Test Plans), making it easier for teams to adopt and integrate these tools.</li>
                <li><strong>Adoption and Growth:</strong> Azure DevOps quickly gained popularity among development teams, particularly those already using the Azure cloud platform. Its integration with other Microsoft services, as well as third-party tools, made it a powerful choice for organizations looking to streamline their DevOps processes.</li>
                <li><strong>Present and Future:</strong> Azure DevOps continues to evolve, with ongoing improvements in performance, security, and integration. Microsoft remains committed to enhancing the platform to support the latest DevOps practices, ensuring that Azure DevOps stays at the forefront of modern software development.</li>
            </ul>
        </div>
    </div>`,
        icon: "azuredevops-icon.png"
    },
    {
        title: "GitHub Actions",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to GitHub Actions</h1>
        <div class="cs-content-cyber">
            <p><strong>GitHub Actions</strong> is a powerful feature of GitHub that enables users to automate, customize, and execute software development workflows directly within their repositories. With GitHub Actions, developers can build, test, and deploy their code in response to various events, such as pushing code to a repository, creating pull requests, or scheduling tasks. This integration of CI/CD (Continuous Integration and Continuous Deployment) capabilities within GitHub has made it an essential tool for modern DevOps practices.</p>

            <h2 class="cs-heading-main-cyber">Key Features of GitHub Actions</h2>
            <ul class="cs-list-cyber">
                <li><strong>Workflow Automation:</strong> GitHub Actions allows users to automate workflows by defining actions in YAML files, which can be triggered by specific events in the repository. These workflows can include tasks such as running tests, deploying applications, or automating code reviews.</li>
                <li><strong>Continuous Integration and Continuous Deployment (CI/CD):</strong> GitHub Actions provides built-in CI/CD capabilities, enabling developers to automatically build, test, and deploy code to various environments. This integration ensures that code changes are continuously validated and delivered quickly and reliably.</li>
                <li><strong>Custom Actions and Marketplace:</strong> Developers can create custom actions to extend the functionality of GitHub Actions. Additionally, the GitHub Marketplace offers a wide range of pre-built actions contributed by the community, making it easy to incorporate common tasks into workflows.</li>
                <li><strong>Matrix Builds:</strong> GitHub Actions supports matrix builds, allowing developers to run tests across multiple environments, such as different operating systems or language versions. This ensures that code works consistently across various platforms.</li>
                <li><strong>Secrets and Environment Variables:</strong> GitHub Actions provides secure storage for secrets and environment variables, allowing sensitive data, such as API keys and passwords, to be safely used in workflows without exposing them in the code.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of GitHub Actions</h2>
            <ul class="cs-list-cyber">
                <li><strong>Launch and Early Development (2018):</strong> GitHub Actions was first announced by GitHub in October 2018 as a beta feature. The initial release allowed developers to automate tasks directly within their GitHub repositories, marking a significant step towards integrating DevOps practices into the GitHub platform.</li>
                <li><strong>General Availability (2019):</strong> In November 2019, GitHub Actions became generally available, offering a fully-featured CI/CD platform that could be used to automate almost any part of the development process. The release included support for Docker containers, making it possible to run workflows in isolated environments.</li>
                <li><strong>Adoption and Growth:</strong> GitHub Actions quickly gained popularity due to its seamless integration with GitHub repositories and its flexibility in supporting a wide range of workflows. Many organizations adopted GitHub Actions for their CI/CD pipelines, leveraging its automation capabilities to improve development efficiency.</li>
                <li><strong>Expansion of Features:</strong> Since its launch, GitHub Actions has continuously evolved with new features, including support for self-hosted runners, enhanced security features, and integration with GitHub Packages. These updates have made it a versatile tool for automating complex workflows in diverse environments.</li>
                <li><strong>Present and Future:</strong> GitHub Actions remains at the forefront of CI/CD and workflow automation, with ongoing improvements and new integrations. It continues to be a key part of the GitHub ecosystem, enabling developers to streamline their development processes and deliver high-quality software faster.</li>
            </ul>
        </div>
    </div>`,
        icon: "github-actions-icon.png"
    },
    {
        title: "Jenkins",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Jenkins</h1>
        <div class="cs-content-cyber">
            <p><strong>Jenkins</strong> is an open-source automation server used to automate various tasks related to building, testing, and deploying software. As one of the most popular CI/CD (Continuous Integration and Continuous Deployment) tools, Jenkins helps developers implement DevOps practices by providing a platform for continuous integration and delivery. Jenkins is highly extensible, supporting a wide range of plugins that enable integration with other tools and services, making it a versatile solution for automating software development workflows.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Jenkins</h2>
            <ul class="cs-list-cyber">
                <li><strong>Continuous Integration:</strong> Jenkins enables continuous integration by automatically building and testing code changes whenever they are committed to the version control system. This ensures that code is always in a deployable state and helps catch issues early in the development process.</li>
                <li><strong>Pipeline as Code:</strong> Jenkins supports defining build pipelines as code using Jenkinsfile, a text file that specifies the build process in a declarative or scripted format. This allows for version control of the pipeline configuration and makes it easier to manage complex CI/CD workflows.</li>
                <li><strong>Extensibility with Plugins:</strong> Jenkins has a vast ecosystem of plugins that extend its capabilities, enabling integration with tools for version control, code quality, security scanning, deployment, and more. These plugins allow Jenkins to adapt to various use cases and integrate seamlessly into existing workflows.</li>
                <li><strong>Distributed Builds:</strong> Jenkins supports distributed builds across multiple nodes, allowing workloads to be spread across different machines. This enables parallel execution of builds, reducing build times and improving resource utilization.</li>
                <li><strong>Security and Access Control:</strong> Jenkins provides robust security features, including role-based access control (RBAC), authentication integration with LDAP and OAuth, and encrypted credentials. These features help protect the integrity of the CI/CD process and ensure that only authorized users can access sensitive information.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Jenkins</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2004):</strong> Jenkins was originally developed by Kohsuke Kawaguchi in 2004 as an internal project at Sun Microsystems under the name "Hudson." It was created to automate the build and testing processes of software projects, helping developers catch issues early in the development cycle.</li>
                <li><strong>Open Source and Community Growth:</strong> Hudson quickly became popular among developers and was released as an open-source project. It gained a large community of contributors, leading to rapid development and the addition of new features and plugins.</li>
                <li><strong>Fork and Renaming to Jenkins (2011):</strong> In 2011, a disagreement between the Hudson community and Oracle, which had acquired Sun Microsystems, led to a fork of the project. The forked version was renamed Jenkins and continued to be developed by the community, while Hudson remained under Oracle's control.</li>
                <li><strong>Jenkins as a CI/CD Leader:</strong> Since the fork, Jenkins has grown to become the de facto standard for CI/CD automation. Its extensive plugin ecosystem, active community, and flexibility have made it a popular choice for organizations of all sizes, supporting a wide range of software development processes.</li>
                <li><strong>Present and Future:</strong> Jenkins continues to evolve with a focus on improving user experience, scalability, and integration with modern DevOps tools and practices. The introduction of Jenkins X, a cloud-native version of Jenkins, reflects the project's commitment to adapting to emerging trends in software development and deployment.</li>
            </ul>
        </div>
    </div>`,
        icon: "jenkins-icon.png"
    },
    {
        title: "Jest",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Jest</h1>
        <div class="cs-content-cyber">
            <p><strong>Jest</strong> is an open-source testing framework developed by Facebook, designed primarily for testing JavaScript and React applications. Jest is known for its simplicity, speed, and built-in features that make it easy to write and run tests. It provides an all-in-one solution for unit testing, integration testing, and snapshot testing, making it a popular choice among developers who want to ensure the correctness of their code without the need for extensive setup or configuration.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Jest</h2>
            <ul class="cs-list-cyber">
                <li><strong>Zero Configuration:</strong> Jest is designed to work out of the box with minimal configuration, allowing developers to start testing their applications immediately. It automatically finds tests, runs them in parallel, and provides detailed results without requiring extensive setup.</li>
                <li><strong>Snapshot Testing:</strong> Jest supports snapshot testing, a feature that allows developers to capture the output of a component or function and compare it against a saved snapshot. This is particularly useful for testing UI components, ensuring that they render consistently over time.</li>
                <li><strong>Mocking and Spying:</strong> Jest includes powerful tools for mocking functions, modules, and timers, as well as spying on function calls. This enables developers to isolate units of code and test them independently, simulating various scenarios and inputs.</li>
                <li><strong>Fast and Isolated Testing:</strong> Jest runs tests in parallel using workers, ensuring that they execute quickly and do not interfere with each other. This isolation guarantees that tests are independent and do not have side effects that could impact other tests.</li>
                <li><strong>Integration with CI/CD Pipelines:</strong> Jest integrates seamlessly with continuous integration and continuous deployment (CI/CD) pipelines, allowing developers to automate testing as part of their development workflow. It also provides detailed test coverage reports, helping teams identify untested code.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Jest</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2014):</strong> Jest was originally developed by Facebook in 2014 as a testing framework for React applications. It was created to address the need for a simple, yet powerful, testing tool that could handle the unique requirements of modern JavaScript applications.</li>
                <li><strong>Adoption and Growth:</strong> Jest quickly gained popularity within the JavaScript community due to its ease of use and comprehensive feature set. Its ability to run tests with zero configuration, along with its snapshot testing capabilities, made it a preferred choice for many developers.</li>
                <li><strong>Expansion of Features:</strong> Over the years, Jest has expanded its feature set to include support for TypeScript, Babel, and other JavaScript frameworks beyond React. This versatility has contributed to its widespread adoption across various types of projects.</li>
                <li><strong>Community and Ecosystem:</strong> Jest has a strong and active community of users and contributors, which has led to the development of a rich ecosystem of plugins and integrations. These contributions have helped extend Jest's capabilities and ensure that it remains a cutting-edge testing tool.</li>
                <li><strong>Present and Future:</strong> Jest continues to be a leading testing framework for JavaScript, with ongoing improvements and new features being added regularly. Its focus on simplicity, performance, and ease of use ensures that it remains a valuable tool for developers who want to maintain the quality of their code.</li>
            </ul>
        </div>
    </div>`,
        icon: "jest-icon.png"
    },
    {
        title: "Mocha",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Mocha.js</h1>
        <div class="cs-content-cyber">
            <p><strong>Mocha.js</strong> is a feature-rich JavaScript testing framework that runs on Node.js and in the browser. It is designed to be a flexible, extensible, and simple way to write and run tests, making it a popular choice for developers who need to ensure the correctness of their JavaScript code. Mocha supports both behavior-driven development (BDD) and test-driven development (TDD) styles, offering developers the flexibility to choose the best approach for their project. Mocha is often paired with assertion libraries like Chai to provide a complete testing solution.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Mocha.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Asynchronous Testing:</strong> Mocha has built-in support for asynchronous testing, allowing developers to test asynchronous code with ease. It provides flexible ways to handle callbacks, promises, and async/await, ensuring that tests are both reliable and easy to write.</li>
                <li><strong>Flexible Test Configuration:</strong> Mocha allows developers to configure their test environment according to their needs. It supports multiple interfaces, including BDD, TDD, exports, and QUnit, giving developers the freedom to write tests in the style that best suits their project.</li>
                <li><strong>Rich Plugin Ecosystem:</strong> Mocha's extensibility is one of its key strengths. With a wide range of plugins and integrations available, developers can easily extend Mocha's functionality to include custom reporters, assertion libraries, and coverage tools.</li>
                <li><strong>Customizable Reporting:</strong> Mocha provides a variety of built-in reporters that display test results in different formats, including spec, dot matrix, and JSON. Developers can also create custom reporters to fit their specific requirements.</li>
                <li><strong>Broad Compatibility:</strong> Mocha is compatible with various JavaScript environments, including Node.js, browser environments, and headless browsers like PhantomJS. This compatibility makes Mocha a versatile tool for testing both server-side and client-side code.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Mocha.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2011):</strong> Mocha.js was created by TJ Holowaychuk in 2011. It was developed as a response to the need for a more flexible and comprehensive testing framework for Node.js. Mocha quickly gained popularity due to its simplicity and powerful feature set.</li>
                <li><strong>Growth and Community Support:</strong> Mocha's open-source nature and active community of contributors have been key to its success. Over the years, it has received numerous contributions from developers around the world, helping to expand its capabilities and improve its performance.</li>
                <li><strong>Adoption by the JavaScript Community:</strong> Mocha has become one of the most widely used testing frameworks in the JavaScript ecosystem. Its flexibility, coupled with the ability to integrate with various tools and libraries, has made it a go-to choice for both individual developers and large teams.</li>
                <li><strong>Expansion of Features:</strong> Mocha has continuously evolved, adding support for new JavaScript features, improved error handling, and enhanced reporting. Its ongoing development ensures that it remains relevant and effective in modern JavaScript development.</li>
                <li><strong>Present and Future:</strong> Mocha continues to be actively maintained and widely used in the JavaScript community. Its combination of flexibility, extensibility, and ease of use ensures that it will remain a key tool for developers looking to maintain high-quality code in their projects.</li>
            </ul>
        </div>
    </div>`,
        icon: "mocha-icon.png"
    },
    {
        title: "xUnit",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to xUnit</h1>
        <div class="cs-content-cyber">
            <p><strong>xUnit</strong> is a popular open-source testing framework for .NET, used for writing unit tests for C# and other .NET languages. It is the latest technology in the family of unit testing frameworks that includes NUnit and MSTest, and it was developed with a focus on extensibility, performance, and ease of use. xUnit is particularly known for its lightweight design, as well as its support for parallel test execution, making it a preferred choice for many .NET developers who want to write fast, reliable, and maintainable tests.</p>

            <h2 class="cs-heading-main-cyber">Key Features of xUnit</h2>
            <ul class="cs-list-cyber">
                <li><strong>Extensibility:</strong> xUnit is designed to be highly extensible, allowing developers to write custom attributes, data sources, and even their own test runners. This flexibility makes it easy to tailor the testing framework to specific project needs.</li>
                <li><strong>Parallel Test Execution:</strong> xUnit supports parallel test execution out of the box, which can significantly reduce the time it takes to run large test suites. This feature makes it ideal for modern development environments where speed is crucial.</li>
                <li><strong>Data-Driven Testing:</strong> xUnit provides robust support for data-driven testing through the use of "Theory" attributes and inline data, making it easy to run the same test with multiple sets of data. This helps ensure that code behaves correctly under various conditions.</li>
                <li><strong>Minimalist Design:</strong> xUnit was created with a minimalist philosophy, removing many of the attributes and features that were present in older frameworks like NUnit. This results in a cleaner, more focused framework that is easier to learn and use.</li>
                <li><strong>Integration with .NET Tools:</strong> xUnit integrates seamlessly with .NET development tools, including Visual Studio, Azure DevOps, and popular CI/CD pipelines. It also supports integration with other testing tools and frameworks, enhancing its versatility.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of xUnit</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2007):</strong> xUnit was created by Brad Wilson and Jim Newkirk in 2007 as a successor to NUnit. The framework was designed to address some of the limitations of earlier unit testing frameworks and to take advantage of modern programming practices in the .NET ecosystem.</li>
                <li><strong>Adoption and Growth:</strong> xUnit quickly gained popularity within the .NET community due to its simplicity and powerful features. Its focus on performance and extensibility made it a popular choice for developers who needed a testing framework that could keep up with the demands of modern software development.</li>
                <li><strong>Integration with .NET Core:</strong> With the release of .NET Core, xUnit became one of the first testing frameworks to fully support the new cross-platform runtime. This ensured that xUnit remained a relevant and widely used tool in the evolving .NET ecosystem.</li>
                <li><strong>Continuous Evolution:</strong> xUnit has continued to evolve, with regular updates and new features being added to address the needs of developers. Its active community and ongoing development ensure that it remains a cutting-edge tool for unit testing in .NET.</li>
                <li><strong>Present and Future:</strong> xUnit continues to be one of the most popular testing frameworks for .NET, with widespread adoption across the industry. Its emphasis on simplicity, performance, and extensibility ensures that it remains a valuable tool for developers looking to maintain the quality of their codebases.</li>
            </ul>
        </div>
    </div>`,
        icon: "xunit-icon.png"
    },
    {
        title: "Cypress",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Cypress.js</h1>
        <div class="cs-content-cyber">
            <p><strong>Cypress.js</strong> is a modern, open-source testing framework designed specifically for web applications. It is known for its fast, reliable, and easy-to-use testing environment that enables developers to write end-to-end tests, integration tests, and unit tests for web applications. Cypress is built to handle the challenges of testing modern web applications, offering features that make it easy to set up, run, and debug tests. Unlike other testing frameworks, Cypress runs directly in the browser, providing a more accurate and efficient testing experience.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Cypress.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Real-Time Reloading:</strong> Cypress automatically reloads tests in real-time as developers make changes, providing instant feedback and accelerating the development process. This feature allows for a highly interactive testing experience, making it easier to identify and fix issues quickly.</li>
                <li><strong>Time Travel Debugging:</strong> One of Cypress's standout features is its ability to "time travel" through tests. Developers can pause tests at any point, inspect the state of the application, and view snapshots of how the application looked at each step, making debugging more intuitive.</li>
                <li><strong>Automatic Waiting:</strong> Cypress automatically waits for elements to appear, animations to complete, and network requests to finish before continuing with the test. This eliminates the need for adding manual waits or delays, leading to more stable and reliable tests.</li>
                <li><strong>Built-In Assertion Library:</strong> Cypress includes a built-in assertion library, Chai, which allows developers to write expressive and readable tests. It supports a wide range of assertions, making it easy to verify the behavior of web applications.</li>
                <li><strong>Cross-Browser Testing:</strong> While Cypress is known for its fast execution in Chrome, it also supports cross-browser testing, including Firefox and Edge. This ensures that applications are tested across multiple browsers, enhancing compatibility and reliability.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Cypress.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2014):</strong> Cypress was founded by Brian Mann in 2014 with the goal of creating a testing framework that addressed the shortcomings of existing tools. The initial version of Cypress focused on providing a seamless developer experience, with features like real-time reloading and time travel debugging setting it apart from other frameworks.</li>
                <li><strong>Public Launch (2017):</strong> Cypress was officially launched to the public in 2017. Its innovative approach to testing, combined with its ease of use, quickly attracted attention from the developer community. Within a short time, it became a popular choice for testing modern web applications.</li>
                <li><strong>Growth and Adoption:</strong> Cypress's popularity grew rapidly, driven by its robust feature set and active community. Developers appreciated its ability to simplify the testing process, leading to widespread adoption by teams of all sizes, from startups to large enterprises.</li>
                <li><strong>Expansion of Features:</strong> Over the years, Cypress has continued to evolve, adding support for cross-browser testing, improved integration with CI/CD pipelines, and enhanced debugging tools. These updates have ensured that Cypress remains a cutting-edge tool for web application testing.</li>
                <li><strong>Present and Future:</strong> Cypress continues to be one of the leading tools for web application testing, with a strong focus on developer experience and testing efficiency. The team behind Cypress is committed to expanding its capabilities, ensuring that it remains a top choice for developers seeking a reliable and user-friendly testing framework.</li>
            </ul>
        </div>
    </div>`,
        icon: "cypress-icon.png"
    },
    {
        title: "Chai",
        description: `    <div class="cs-container-cyber">
        <h1 class="cs-heading-main-cyber">Introduction to Chai.js</h1>
        <div class="cs-content-cyber">
            <p><strong>Chai.js</strong> is a popular assertion library for JavaScript that is used in conjunction with testing frameworks like Mocha, Jasmine, and others. It provides developers with a set of expressive and readable assertions to validate the behavior of their code. Chai supports three different assertion styles—assert, expect, and should—allowing developers to choose the style that best fits their coding preferences. Chai is highly flexible and can be extended with plugins to accommodate various testing needs, making it a staple in the JavaScript testing ecosystem.</p>

            <h2 class="cs-heading-main-cyber">Key Features of Chai.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Three Assertion Styles:</strong> Chai supports three assertion styles: assert (TDD style), expect (BDD style), and should (BDD style with fluent interface). This versatility allows developers to choose the style that best suits their testing approach, whether it's test-driven development (TDD) or behavior-driven development (BDD).</li>
                <li><strong>Readable and Expressive Syntax:</strong> Chai's syntax is designed to be human-readable and expressive, making tests easier to write and understand. The fluent interface provided by the expect and should styles allows for chaining of assertions, leading to more concise and intuitive test code.</li>
                <li><strong>Extensibility with Plugins:</strong> Chai is highly extensible and supports a wide range of plugins that add additional assertions, enhance functionality, or integrate with other tools. Developers can also create custom plugins to extend Chai's capabilities to meet specific project needs.</li>
                <li><strong>Seamless Integration with Testing Frameworks:</strong> Chai integrates seamlessly with popular testing frameworks like Mocha, Jasmine, and others. This makes it easy to incorporate Chai into existing test suites and leverage its powerful assertion capabilities.</li>
                <li><strong>Support for Asynchronous Testing:</strong> Chai provides built-in support for testing asynchronous code. Developers can use Chai's eventually keyword with promises to assert the expected outcomes of asynchronous operations, ensuring that tests remain reliable and easy to manage.</li>
            </ul>

            <h2 class="cs-heading-main-cyber">History of Chai.js</h2>
            <ul class="cs-list-cyber">
                <li><strong>Creation and Early Development (2011):</strong> Chai.js was created by Jake Luer in 2011 as a response to the need for a more flexible and expressive assertion library for JavaScript. The initial version of Chai introduced the expect and should styles, which were designed to be more intuitive and readable compared to the traditional assert style.</li>
                <li><strong>Adoption and Growth:</strong> Chai quickly gained popularity within the JavaScript community due to its ease of use and versatility. Its ability to work seamlessly with various testing frameworks made it a go-to choice for developers looking to write clear and maintainable tests.</li>
                <li><strong>Expansion of Features:</strong> Over the years, Chai has continued to evolve, with new features and plugins being added to enhance its functionality. The introduction of support for asynchronous testing and the development of a rich ecosystem of plugins have made Chai an even more powerful tool for developers.</li>
                <li><strong>Integration with Modern JavaScript Tools:</strong> Chai has kept pace with the evolving JavaScript ecosystem, integrating with modern tools and frameworks. Its compatibility with newer testing frameworks and build tools ensures that it remains relevant in today's development environment.</li>
                <li><strong>Present and Future:</strong> Chai remains one of the most widely used assertion libraries in the JavaScript world. Its emphasis on flexibility, readability, and extensibility ensures that it will continue to be a key tool for developers looking to maintain high-quality code through effective testing.</li>
            </ul>
        </div>
    </div>`,
        icon: "chai-icon.png"
    }
];


function createSkillsetElement(skillset) {
    const skillsetDiv = document.createElement('div');
    skillsetDiv.className = 'skillset';

    skillsetDiv.innerHTML = `
    <h3>${skillset.title}</h3>
    ${skillset.description}
  `;

    //     <img src="${skillset.icon}" alt="${skillset.title} icon" class="skillset-icon"><br/>


    return skillsetDiv;
}

// Function to populate the modal with skillsets
function populateSkillsetModal(skillsetItm) {
    const skillsetExplainDiv = document.getElementById('skillsetexplain');
    skillsetExplainDiv.innerHTML = ''; // Clear existing content

    skillsets.forEach(skillset => {
        if (skillsetItm == skillset.title) {
            const skillsetElement = createSkillsetElement(skillset);
            skillsetExplainDiv.appendChild(skillsetElement);
        }
    });
}

const cursors = {
    default: 'default.svg',
    pointer: 'pointer.svg',
    text: 'text.svg',
    wait: 'wait-01.svg',
    crosshair: 'crosshair.svg',
    'not-allowed': 'not-allowed.svg',
    grab: 'openhand.svg',
    grabbing: 'dnd-move.svg',
    'zoom-in': 'zoom-in.svg',
    'zoom-out': 'zoom-out.svg',
    // Add more cursor definitions as needed
};

function applyCursor($element, cursorType, size = '') {
    const svgFile = size === '24' ? cursors[cursorType].replace('.svg', '_24.svg') : cursors[cursorType];
    $element.css('cursor', `url(${cursorPath}${svgFile}), ${cursorType}`);
}

// Function to apply animated cursor (progress or wait)
function applyAnimatedCursor($element, cursorType, size = '') {
    const frames = 12;
    let currentFrame = 1;

    function updateCursor() {
        const svgFile = `${cursorType}-${String(currentFrame).padStart(2, '0')}${size === '24' ? '_24' : ''}.svg`;
        $element.css('cursor', `url(${cursorPath}${svgFile}), ${cursorType}`);
        currentFrame = currentFrame % frames + 1;
    }

    updateCursor();
    return setInterval(updateCursor, 1000 / frames);
}

// Drawing the characters
function draw() {
    // Black BG for the canvas
    // Translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#f4427d"; // Green text
    ctx.font = font_size + "px arial";
    // Looping over drops
    for (var i = 0; i < drops.length; i++) {
        // A random chinese character to print
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        // x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        // Sending the drop back to the top randomly after it has crossed the screen
        // Adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;

        // Incrementing Y coordinate
        drops[i]++;
    }
}

setInterval(draw, 35);

function setTheme(themeId) {
    if (themeId == 1) {
        $("body").find("#c").show();
        $("body").find("#cyberpunk_img").hide();
        $("body").find("#grass_img").hide();
        $("body").find("#solarpunk_img").hide();
    }

    if (themeId == 2) {
        $("body").find("#c").hide();
        $("body").find("#cyberpunk_img").show();
        $("body").find("#grass_img").hide();
        $("body").find("#solarpunk_img").hide();
    }

    if (themeId == 3) {
        $("body").find("#c").hide();
        $("body").find("#cyberpunk_img").hide();
        $("body").find("#grass_img").show();
        $("body").find("#solarpunk_img").hide();
    }

    if (themeId == 0) {
        $("body").find("#c").hide();
        $("body").find("#cyberpunk_img").hide();
        $("body").find("#grass_img").hide();
        $("body").find("#solarpunk_img").show();
    }
}

$(document).ready(function () {
    const flash = document.querySelector('.flash');
    const tear = document.querySelector('.tear');
    let modalEle = `#modalOverlay-LLM .modal-cybermodal-rag .modal-content-cybermodal-rag`


    const volumeControl = document.getElementById('volume-control');
    const volumeIcon = document.getElementById('volume-icon');
    let isMuted = false;



    volumeControl.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }

        if (isMuted) {
            document.getElementById('music').pause();
        } else {
            if (startedMusic) {
                document.getElementById('music').play();
            }
        }
    });



    let pythonCode = $('body').find('#pythonexample').get(0);
    hljs.highlightElement(pythonCode);
    //rag stuff
    function createArrow(from, to) {
        let modalEle = `#modalOverlay-LLM .modal-cybermodal-rag .modal-content-cybermodal-rag`
        const arrow = document.createElement('div');
        arrow.className = 'rag-arrow';
        document.querySelector(`${modalEle} .rag-container`).appendChild(arrow);

        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();
        const containerRect = document.querySelector(`${modalEle} .rag-container`).getBoundingClientRect();

        const fromX = fromRect.left + fromRect.width / 2 - containerRect.left;
        const fromY = fromRect.top + fromRect.height / 2 - containerRect.top;
        const toX = toRect.left + toRect.width / 2 - containerRect.left;
        const toY = toRect.top + toRect.height / 2 - containerRect.top;

        const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
        const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;

        arrow.style.width = '0px';
        arrow.style.height = '2px';
        arrow.style.left = `${fromX}px`;
        arrow.style.top = `${fromY}px`;
        arrow.style.transform = `rotate(${angle}deg)`;
        arrow.style.zIndex = 10000000;

        return { arrow, length };
    }



    const arrowData = [
        createArrow(document.querySelector(`${modalEle} .rag-query`), document.querySelector(`${modalEle} .rag-promptBuilder`)),
        createArrow(document.querySelector(`${modalEle} .rag-promptBuilder`), document.querySelector(`${modalEle} .rag-llm`)),
        createArrow(document.querySelector(`${modalEle} .rag-llm`), document.querySelector(`${modalEle} .rag-retriever`)),
        createArrow(document.querySelector(`${modalEle} .rag-retriever`), document.querySelector(`${modalEle} .rag-vectorDB`)),
        createArrow(document.querySelector(`${modalEle} .rag-retriever`), document.querySelector(`${modalEle} .rag-sqlDB`)),
        createArrow(document.querySelector(`${modalEle} .rag-retriever`), document.querySelector(`${modalEle} .rag-wolframAlpha`)),
        createArrow(document.querySelector(`${modalEle} .rag-retriever`), document.querySelector(`${modalEle} .rag-googleSearch`)),
        createArrow(document.querySelector(`${modalEle} .rag-retriever`), document.querySelector(`${modalEle} .rag-knowledgeBase`)),
        createArrow(document.querySelector(`${modalEle} .rag-vectorDB`), document.querySelector(`${modalEle} .rag-llm`)),
        createArrow(document.querySelector(`${modalEle} .rag-sqlDB`), document.querySelector(`${modalEle} .rag-llm`)),
        createArrow(document.querySelector(`${modalEle} .rag-wolframAlpha`), document.querySelector(`${modalEle} .rag-llm`)),
        createArrow(document.querySelector(`${modalEle} .rag-googleSearch`), document.querySelector(`${modalEle} .rag-llm`)),
        createArrow(document.querySelector(`${modalEle} .rag-knowledgeBase`), document.querySelector(`${modalEle} .rag-llm`)),
        createArrow(document.querySelector(`${modalEle} .rag-llm`), document.querySelector(`${modalEle} .rag-response`))
    ];

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    const nodes = [
        'rag-query', 'rag-promptBuilder', 'rag-llm', 'rag-retriever', 'rag-vectorDB', 'rag-sqlDB',
        'rag-wolframAlpha', 'rag-googleSearch', 'rag-knowledgeBase', 'rag-response'
    ];

    const explanations = [
        "1. User submits a query",
        "2. Prompt builder formats the query",
        "3. LLM processes the formatted query",
        "4. Retriever searches for relevant information",
        "5. Information is gathered from various sources",
        "6. Retrieved information is sent back to the LLM",
        "7. LLM generates a response using the query and retrieved information"
    ];

    tl.to(`${modalEle} #rag-explanation`, { duration: 1, text: explanations[0] })
        .to(`${modalEle} #rag-query`, { duration: 0.5, scale: 1.1, yoyo: true, repeat: 1 })
        .to(arrowData[0].arrow, { duration: 0.5, width: arrowData[0].length })

        .to(`${modalEle} #rag-explanation`, { duration: 1, text: explanations[1] })
        .to(`${modalEle} #rag-promptBuilder`, { duration: 0.5, scale: 1.1, yoyo: true, repeat: 1 })
        .to(arrowData[1].arrow, { duration: 0.5, width: arrowData[1].length })

        .to(`${modalEle} #rag-explanation`, { duration: 1, text: explanations[2] })
        .to(`${modalEle} #rag-llm`, { duration: 0.5, scale: 1.1, yoyo: true, repeat: 1 })
        .to(arrowData[2].arrow, { duration: 0.5, width: arrowData[2].length })

        .to(`${modalEle} #rag-explanation`, { duration: 1, text: explanations[3] })
        .to(`${modalEle} #rag-retriever`, { duration: 0.5, scale: 1.1, yoyo: true, repeat: 1 })
        .to([arrowData[3].arrow, arrowData[4].arrow, arrowData[5].arrow, arrowData[6].arrow, arrowData[7].arrow],
            { duration: 0.5, width: (i, target) => arrowData[i + 3].length, stagger: 0.2 })

        .to(`${modalEle} #rag-explanation`, { duration: 1, text: explanations[4] })
        .to([`${modalEle} #rag-vectorDB`, `${modalEle} #rag-sqlDB`, `${modalEle} #rag-wolframAlpha`, `${modalEle} #rag-googleSearch`, `${modalEle} #rag-knowledgeBase`], { duration: 0.5, scale: 1.1, yoyo: true, repeat: 1, stagger: 0.2 })

        .to(`${modalEle} #rag-explanation`, { duration: 1, text: explanations[5] })
        .to([arrowData[8].arrow, arrowData[9].arrow, arrowData[10].arrow, arrowData[11].arrow, arrowData[12].arrow],
            { duration: 0.5, width: (i, target) => arrowData[i + 8].length, stagger: 0.2 })
        .to("#rag-llm", { duration: 0.5, scale: 1.1, yoyo: true, repeat: 1 })

        .to(`${modalEle} #rag-explanation`, { duration: 1, text: explanations[6] })
        .to(arrowData[13].arrow, { duration: 0.5, width: arrowData[13].length })
        .to(`${modalEle} #rag-response`, { duration: 0.5, scale: 1.1, yoyo: true, repeat: 1 })

        .to(`${modalEle} .rag-arrow`, { duration: 0.5, width: 0, delay: 1 });




    const matrixBg = $('.matrix-bg-intro');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const columns = Math.floor(matrixBg.width() / 20);

    for (let i = 0; i < columns; i++) {
        const column = $('<div class="matrix-column-intro"></div>');
        column.css('left', i * 20 + 'px');
        column.css('animation-delay', Math.random() * 20 + 's');

        for (let j = 0; j < 50; j++) {
            column.append(characters[Math.floor(Math.random() * characters.length)]);
        }

        matrixBg.append(column);
    }

    // PDF.js viewer code
    let pdfDoc = null,
        pageNum = 1,
        pageRendering = false,
        pageNumPending = null,
        scale = 1.5,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    document.getElementById('pdf-container-intro').appendChild(canvas);

    const topLeftButton = document.getElementById('top-left-button');

    topLeftButton.addEventListener('click', () => {
        openModalLLM();
    });

    function renderPage(num) {
        pageRendering = true;
        pdfDoc.getPage(num).then(function (page) {
            let viewport = page.getViewport({ scale: scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            let renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            let renderTask = page.render(renderContext);

            renderTask.promise.then(function () {
                pageRendering = false;
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            });
        });

        document.getElementById('page-num-intro').textContent = num;
    }

    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }

    function onPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    }

    function onNextPage() {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    }

    function onZoomIn() {
        scale *= 1.2;
        queueRenderPage(pageNum);
    }

    function onZoomOut() {
        scale /= 1.2;
        queueRenderPage(pageNum);
    }

    pdfjsLib.getDocument('assets/resume-current.pdf').promise.then(function (pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('page-count-intro').textContent = pdfDoc.numPages;

        renderPage(pageNum);
    });

    document.getElementById('prev-page-intro').addEventListener('click', onPrevPage);
    document.getElementById('next-page-intro').addEventListener('click', onNextPage);
    document.getElementById('zoom-in-intro').addEventListener('click', onZoomIn);
    document.getElementById('zoom-out-intro').addEventListener('click', onZoomOut);
    document.getElementById('download-pdf-intro').addEventListener('click', function () {
        window.open('assets/resume-current.pdf', '_blank');
    });
    var crtToggle = true;




    (function () {
        // ... (other encapsulated code)
        let rightPanel = document.getElementById('sidePanelContent');

        const toggleSettings = {
            crt: ['On', 'Off'],
            smoothLighting: ['Maximum', 'Minimum', 'OFF'],
            '3dAnaglyph': ['OFF', 'ON'],
            viewBobbing: ['OFF', 'ON'],
            advancedOpenGL: ['ON', 'OFF'],
            clouds: ['ON', 'OFF'],
            serverTextures: ['ON', 'OFF'],
            fullscreen: ['OFF', 'ON'],
            vsync: ['OFF', 'ON']
        };

        document.querySelectorAll('.setting-misc[data-setting]').forEach(setting => {
            setting.addEventListener('click', function () {
                const settingName = this.getAttribute('data-setting');
                const span = this.querySelector('span');
                const currentValue = span.textContent;
                const options = toggleSettings[settingName];
                const nextIndex = (options.indexOf(currentValue) + 1) % options.length;

               

                if (settingName === 'crt') {
                    if (currentValue == 'On') {
                        $('body').find('#crt-container').removeClass('crt');
                    }
                    else {
                        $('body').find('#crt-container').addClass('crt');
                    }
                }

                span.textContent = options[nextIndex];
            });
        });

        // Prevent text selection on double-click
        document.querySelectorAll('.setting, .done-button').forEach(element => {
            element.addEventListener('mousedown', function (e) {
                e.preventDefault();
            });
        });

        $('body').find('#legacy-site').on('click', () => {
            window.location = 'Legacy/oled_glasses'
        });

        const container = document.getElementById('container-misc');
        const buttons = document.querySelectorAll('.button-misc');
        const defaultColor = '#3a6ea5';

        buttons.forEach(button => {
            button.addEventListener('mouseover', () => {
                const color = button.getAttribute('data-color');
                button.style.backgroundColor = color;
                container.style.background = `linear-gradient(45deg, ${color}22, ${color}11)`;
            });

            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = defaultColor;
                container.style.background = 'rgba(255, 255, 255, 0.9)';
            });
        });

        function initTabs() {
            const tabButtons = rightPanel.querySelectorAll('.tab-button');
            const tabContents = rightPanel.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.getAttribute('data-tab');

                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));

                    button.classList.add('active');
                    rightPanel.querySelector('#' + tabId).classList.add('active');
                });
            });
        }

        //rightPanel.addEventListener('load', function (e) {
        //    alert('howdy');
            initTabs();
        //});

        // ... (rest of the encapsulated code)
    })();

    // Reset animations
    flash.style.animation = 'none';
    tear.style.animation = 'none';

    flash.offsetHeight; // Trigger reflow
    tear.offsetHeight; // Trigger reflow

    // Start animations
    flash.style.animation = null;
    tear.style.animation = null;

       // applyCursor($('body'), 'pointer');

    $("body").find("#btnMusic").on("click", () => {
        let songSrc = null;
        if (songIndex == 0) {
            songSrc = "assets/music/intro.mp3";
        }
        if (songIndex == 1) {
            songSrc = "assets/music/Sunlit Serenade.mp3";
        }
        if (songIndex == 2) {
            songSrc = "assets/music/cyberpunk-calm.mp3";
        }
        if (songIndex == 3) {
            songSrc = "assets/music/calm cyberpunk 2.mp3";
        }
        if (songIndex == 4) {
            songSrc = "assets/music/blade-runner.mp3";
        }
        if (songIndex == 5) {
            songSrc = "assets/music/Heros Rise.mp3";
        }

        songIndex++;

        if (songIndex > 5) {
            songIndex = 0;
        }

        document.getElementById("music").src = songSrc;
        document.getElementById("music").play();
        startedMusic = true;
    });

        if (token !== "null" && token !== null && token !== undefined && token !== "") {
            $("body").find("#btnLogin").hide();
            $("body").find("#btnRegister").hide();
            $("body").find("#btnLogout").show();
        } else {
            $("body").find("#btnLogin").show();
            $("body").find("#btnRegister").show();
            $("body").find("#btnLogout").hide();
        }


        let themeStored = localStorage.getItem("theme_home");
        var theme = 1;
        $("body").find("#cyberpunk_img").hide();
        $("body").find("#grass_img").hide();
        $("body").find("#solarpunk_img").hide();
        $("body").find("#btnVerse").prop("disabled", "true");
        $("body").find("#c").hide();
        if (themeStored != null) {
            //theme = themeStored; //removed due to time it takes for images to be loaded.
        }

        setTheme(theme);

    $("body").find("#btnTheme").on("click", () => {
        theme++;

        if (theme > 3) {
            theme = 0;
        }
        localStorage.setItem("theme_home", theme);
        setTheme(theme);
    });

    $("body").find("#btnLogout").on("click", () => {
        sessionStorage.setItem("jwtToken", null);
        sessionStorage.getItem("username", null);
        location.reload();
    });

    $(".menu-button").not("#btnTheme").not("#btnMusic").not("#btnLogout").not("#btnWebXR").click(function () {
        var $clickedButton = $(this);
        var preventAnimation = $clickedButton.data('prevent-animation');

        if (!preventAnimation) {
            // Gradually change the background to black
            $("body").css("background-color", "black");

            // Make other buttons shake and then fly off
            $(".menu-button").not($clickedButton).not("[data-prevent-animation='true']").each(function (index) {
                var $button = $(this);
                var rect = $button[0].getBoundingClientRect();

                // Add shake effect
                $button.addClass("shake");

                // After shaking, make the button fly off
                setTimeout(function () {
                    $button.css({
                        position: "fixed",
                        left: rect.left + "px",
                        top: rect.top + "px",
                        width: rect.width + "px",
                        height: rect.height + "px",
                        margin: "0",
                    }).addClass("fly-off");

                    var angle = (index / 5) * 2 * Math.PI;
                    var distance = Math.max(window.innerWidth, window.innerHeight);
                    var x = Math.cos(angle) * distance;
                    var y = Math.sin(angle) * distance;

                    setTimeout(function () {
                        $button.css({
                            transform: "translate(" + x + "px, " + y + "px) rotate(720deg)",
                            opacity: "0",
                        });
                    }, 50);
                }, 1000);
            });
        }

        // Show side panel
        $("#sidePanel").addClass("active");

        // Add content to the side panel based on the clicked button
        getSidePanelContent($clickedButton.attr("id"));

        // Handle navigation if needed
        handleNavigation($clickedButton.attr("id"));
    });

    function runProjects() {

    }

    function getSidePanelContent(buttonId) {
        const baseUrl = '/content/'; // Adjust this path to match your file structure
        let fileName;

        switch (buttonId) {
            case "btnIntroduction":
                $('body').find('#Introduction').show();
                $('body').find('#project-main').hide();
                $('body').find('#LLM').hide();
                $('body').find('#WebXR').hide();
                $('body').find('#components').hide();
                $('body').find('#Misc').hide();
                break;
            case "btnProjects":
                $('body').find('#Introduction').hide();
                $('body').find('#project-main').show();
                $('body').find('#LLM').hide();
                $('body').find('#WebXR').hide();
                $('body').find('#components').hide();
                $('body').find('#Misc').hide();

                break;
            case "btnLLM":
                $('body').find('#Introduction').hide();
                $('body').find('#project-main').hide();
                $('body').find('#LLM').show();
                $('body').find('#WebXR').hide();
                $('body').find('#components').hide();
                $('body').find('#Misc').hide();
                break;
            case "btnComponents":
                let weber = document.getElementById('WebXR');
                weber.innerHTML = '';
                let components = document.getElementById('components');
                components.innerHTML = '';
                components.innerHTML = `
                                        <a href="content/angular-components.zip" download="Angular-components.zip" class="cyberpunk-button-download">
                            Download Angular Components
                        </a>
                        <a href="content/react-components.zip" download="React-components.zip" class="cyberpunk-button-download">
                            Download React Components
                        </a>
                        <a href="https://github.com/sovr610/react-angular-tool" target="_blank" class="cyberpunk-button-download">
                            Angular-React Tool Github
                        </a><br/>
                        <div class="main-div"><div><div id="react-root"></div></div><div><app-root></app-root></div></div>
                `;
                reloadScript('bundlescript', './js/lib/bundle-components.js');

                $('body').find('#Introduction').hide();
                $('body').find('#project-main').hide();
                $('body').find('#LLM').hide();
                $('body').find('#WebXR').hide();
                $('body').find('#components').show();
                $('body').find('#Misc').hide();
                break;
            case "btnMisc":
                $('body').find('#Introduction').hide();
                $('body').find('#project-main').hide();
                $('body').find('#LLM').hide();
                $('body').find('#WebXR').hide();
                $('body').find('#components').hide();
                $('body').find('#Misc').show();
                break;

            
        }

    }

        function handleNavigation(buttonId) {
            // Add navigation logic here if needed
            console.log("Navigation for: " + buttonId);
        }
    
});


function buildWorld() {
    safeExecute(() => {
        const world = new MinecraftWorld.default({
            chunkSize: 24,
            worldHeight: 128,
            renderDistance: 12,
            blockSize: 1,
            updateInterval: 1000,
            baseElevation: 32,
            mountainElevation: 16,
            seed: Math.random() * 1000000
        });

        world.addBlockType({
            name: 'GRASS',
            material: { color: '#3cba54' }
        });
        world.addBlockType({
            name: 'DIRT',
            material: { color: '#795548' }
        });
        world.addBlockType({
            name: 'STONE',
            material: { color: '#9e9e9e' }
        });
        world.addBlockType({
            name: 'WATER',
            material: { color: '#2196f3', opacity: 0.8 }
        });
        world.addBlockType({
            name: 'SAND',
            material: { color: '#fdd835' }
        });
        world.addBlockType({
            name: 'SNOW',
            material: { color: '#ffffff' }
        });

        world.addBlockType({
            name: 'IRON_ORE',
            material: { src: 'assets/block_textures/IRON_ORE.png' }
        });

        world.addBlockType({
            name: 'GOLD_ORE',
            material: { src: 'assets/block_textures/GOLD_ORE.png' }
        });

        world.addBlockType({
            name: 'DIAMOND_ORE',
            material: { src: 'assets/block_textures/DIAMOND_ORE.png' }
        });

        world.addBlockType({
            name: 'LAVA',
            material: { src: 'assets/block_textures/LAVA_TEXTURE.png' }
        });

        world.addBlockType({
            name: 'STALACTITE',
            material: { src: 'assets/block_textures/STALACTITE_TEXTURE.png' }
        });

        world.init();

        const rig = document.querySelector('#rig');
        let lastPosition = { x: 0, y: 0, z: 0 };

        function gameLoop() {
            safeExecute(() => {
                const position = rig.getAttribute('position');

                if (position.x !== lastPosition.x || position.y !== lastPosition.y || position.z !== lastPosition.z) {
                    console.log('Player moving to position:', position);
                    try {
                        world.updatePlayerPosition(position.x, position.y, position.z);
                    } catch (error) {
                        console.error('Error updating player position:', error);
                    }
                    lastPosition = { ...position };
                }

                requestAnimationFrame(gameLoop);
            });
        }

        gameLoop();

        const worldContainer = document.querySelector('#world-container');
        worldContainer.addEventListener('click', function (event) {
            safeExecute(() => {
                if (event.detail.intersection) {
                    const point = event.detail.intersection.point;
                    const normal = event.detail.intersection.face.normal;

                    const placementPoint = {
                        x: Math.floor(point.x + normal.x * 0.5),
                        y: Math.floor(point.y + normal.y * 0.5),
                        z: Math.floor(point.z + normal.z * 0.5)
                    };

                    world.setBlock(placementPoint.x, placementPoint.y, placementPoint.z, 'STONE');
                }
            });
        });

        console.log('Minecraft world initialized and game loop started');
    });
}
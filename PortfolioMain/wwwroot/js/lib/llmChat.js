const chatArea = document.getElementById('chat-area');
const promptInput = document.getElementById('prompt-input');
const submitButton = document.getElementById('submit-button');
const sidePanelContainer = document.getElementById('side-panel-container');
const sidePanelToggle = document.getElementById('side-panel-toggle');
const sidePanelContent = document.getElementById('side-panel-content');
const speechCheckbox = document.getElementById('speech-checkbox');

const languageKeywords = {
    javascript: ['function', 'var', 'let', 'const', 'console.log', 'return', 'if', 'else', 'for', 'while'],
    python: ['def', 'import', 'from', 'if', 'elif', 'else', 'for', 'while', 'print', 'return'],
    java: ['public', 'class', 'static', 'void', 'int', 'String', 'System.out.println', 'return'],
    cpp: ['#include', 'using namespace', 'int main()', 'cout', 'cin', 'vector', 'auto'],
    ruby: ['def', 'end', 'puts', 'require', 'class', 'module', 'attr_accessor'],
    php: ['<?php', 'function', 'echo', '$', 'foreach', 'array', 'public function'],
    html: ['<!DOCTYPE html>', '<html>', '<head>', '<body>', '<div>', '<span>', '<p>'],
    css: ['body', 'margin', 'padding', 'background-color', 'font-family', 'color', '.class', '#id'],
    csharp: ['using System', 'namespace', 'class', 'public', 'private', 'static', 'void', 'string', 'int', 'Console.WriteLine'],
    typescript: ['interface', 'type', 'enum', 'as', 'implements', 'declare', 'readonly', 'namespace', 'abstract', 'public'],
    bash: ['#!/bin/bash', 'echo', 'if', 'then', 'else', 'fi', 'for', 'in', 'do', 'done', 'case', 'esac'],
    markdown: ['#', '##', '###', '- ', '1. ', '```', '**', '*', '>', '[', '](', '![', '](']
};

function predictLanguage(code, userInput) {
    const languageScores = {};

    // Initialize scores based on user input
    for (const lang in languageKeywords) {
        languageScores[lang] = languageKeywords[lang].filter(keyword =>
            userInput.toLowerCase().includes(keyword.toLowerCase())
        ).length;
    }

    // Update scores based on code content
    for (const lang in languageKeywords) {
        languageScores[lang] += languageKeywords[lang].filter(keyword =>
            code.toLowerCase().includes(keyword.toLowerCase())
        ).length;
    }

    // Find the language with the highest score
    const predictedLanguage = Object.keys(languageScores).reduce((a, b) =>
        languageScores[a] > languageScores[b] ? a : b
    );

    return predictedLanguage;
}

function addMessage(message, isUser = true) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'ai-message');
    messageElement.textContent = isUser ? `You: ${message}` : 'AI: ';
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight;

    if (!isUser) {
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        messageElement.appendChild(cursor);
        typeMessage(message, messageElement, cursor, promptInput.value);
    }
}

function typeMessage(message, element, cursor, userInput) {
    let i = 0;
    let textToSpeak = '';
    const typingInterval = setInterval(() => {
        if (i < message.length) {
            if (message.substring(i).startsWith('```')) {
                const codeEnd = message.indexOf('```', i + 3);
                if (codeEnd !== -1) {
                    const codeBlock = document.createElement('pre');
                    const code = document.createElement('code');
                    codeBlock.classList.add('code-block');
                    codeBlock.appendChild(code);
                    element.insertBefore(codeBlock, cursor);

                    const languageMatch = message.substring(i + 3).match(/^\w+/);
                    let language = languageMatch ? languageMatch[0] : '';

                    const codeContent = message.substring(i + 3 + language.length, codeEnd).trim();

                    if (!language) {
                        language = predictLanguage(codeContent, userInput);
                    }

                    code.className = language;
                    code.textContent = codeContent;

                    hljs.highlightElement(code);
                    i = codeEnd + 3;
                    textToSpeak += ' Code block ';
                }
            } else {
                element.insertBefore(document.createTextNode(message[i]), cursor);
                textToSpeak += message[i];
                i++;
            }
            chatArea.scrollTop = chatArea.scrollHeight;
        } else {
            clearInterval(typingInterval);
            element.removeChild(cursor);
            if (speechCheckbox.checked) {
                speakText(textToSpeak);
            }
        }
    }, 50);
}

function speakText(text) {
    speak(text).then(result => {
        console.log('AJAX call success:', result);
    }).catch(error => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
    });
}

async function sendPromptToBackend(prompt) {
    console.log('prompt: ', prompt);
    try {
        const response = await fetch('/langchain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phrase: prompt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.result.response.output;
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, there was an error processing your request.';
    }
}

async function handleSubmit() {
    const prompt = promptInput.value.trim();
    
    if (prompt) {
        addMessage(prompt);
        promptInput.value = '';

        try {
            const response = await sendPromptToBackend(prompt);
            addMessage(response, false);
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, there was an error processing your request.', false);
        }
    }
}

submitButton.addEventListener('click', handleSubmit);
promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    }
});

function q(selector) {
    return document.querySelector(selector);
}
function speak(phrase) {
    try {
        alert(phrase)
        // Wrap the AJAX call in a Promise
        return new Promise((resolve, reject) => {
            var dataTest = {
                data: phrase,
            };
            $.ajax({
                method: "POST",
                data: phrase,
                url: "/TTS",
                contentType: "application/json; charset=utf-8",
                timeout: 300000,
                success: function (e) {
                    var file = e.data;
                    var blob = b64toBlob(e.data);
                    let ios = false;

                    if (ios == false) {
                        let blobObj = URL.createObjectURL(blob);
                        q('#audio').src = blobObj;
                        $('body').find('#audio').trigger('play');
                        //playSoundFromBlob(blob, position, onEnd);
                    } else {
                        //q('#ios_aud').src = URL.createObjectURL(blob);
                        //$('body').find('#ios_aud').trigger('play');
                    }

                    // Resolve the promise with true on success
                    resolve(true);
                },
                failure: function (response) {
                    alert(response.d);
                    // Reject the promise with false on failure
                    reject(false);
                },
                error: (a, b, c) => {
                    console.error(c);
                    listening = true;
                    // Reject the promise with false on error
                    reject(false);
                },
            });
        });
    } catch (e) {
        console.error(e);
        return Promise.reject(false); // Return a rejected promise with false in case of error
    }
}


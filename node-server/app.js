const { ChatOpenAI } = require("@langchain/openai");
const {
    BufferMemory,
    CombinedMemory,
    ConversationSummaryMemory,
} = require("langchain/memory");
const { pull } = require("langchain/hub");
const { Calculator } = require('@langchain/community/tools/calculator');
const { PromptTemplate } = require("@langchain/core/prompts");
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { initializeAgentExecutorWithOptions } = require('langchain/agents');
const { SerpAPI } = require('@langchain/community/tools/serpapi')
const { ChainTool } = require('langchain/tools')
const { WolframAlphaTool } = require('@langchain/community/tools/wolframalpha')
const { DynamicTool
} = require('langchain/tools');
const { AgentExecutor, createOpenAIToolsAgent } = require("langchain/agents");
const CustomHandler = require('./CustomHandler')
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const nlp = require('natural');
const classifier = new nlp.BayesClassifier();
require('dotenv').config(); // Loads environment variables from .env file


async function main() {
    var myCustomHandler = new CustomHandler();
    const bufferMemory = new BufferMemory({
        memoryKey: "chat_history_lines",
        inputKey: "input",
    });

    const llm = new ChatOpenAI({ modelName: "gpt-4", verbose: true, temperature: 0, apiKey: process.env.OPENAI_API_KEY })

    // summary memory
    const summaryMemory = new ConversationSummaryMemory({
        llm: llm,
        inputKey: "input",
        memoryKey: "conversation_summary",
    });

    //
    const memory = new CombinedMemory({
        memories: [bufferMemory, summaryMemory],
    });

    const tools = [
        new SerpAPI(process.env.SERPAPI_API_KEY, {
            location: 'Austin,Texas,United States',
            hl: 'en',
            gl: 'us',
        }),
        new WolframAlphaTool({
            appid: process.env.WOLFRAM_APP_ID,
        }),
        new Calculator(),
    ];

    //train nlp natural classifier libnrary
    classifier.addDocument('the app keeps crashing every time I try to open it.', 'software');
    classifier.addDocument('the graphics driver is outdated.', 'hardware');
    classifier.addDocument('there’s a glitch in the video rendering module.', 'software');
    classifier.addDocument('the motherboard overheated and the system shut down.', 'hardware');
    classifier.addDocument('my unit-tests failed.', 'software');
    classifier.addDocument('tried the program, but it was buggy.', 'software');
    classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
    classifier.addDocument('i need a new power supply.', 'hardware');
    classifier.addDocument('the software failed to update properly.', 'software');
    classifier.addDocument('the printer is not recognized by the system.', 'hardware');
    classifier.addDocument('the user interface is not intuitive.', 'software');
    classifier.addDocument('the keyboard keys are sticking.', 'hardware');
    classifier.addDocument('the database keeps timing out during queries.', 'software');
    classifier.addDocument('the cooling fan is making too much noise.', 'hardware');
    classifier.addDocument('the email client won’t sync with the server.', 'software');
    classifier.addDocument('the RAM needs upgrading to improve performance.', 'hardware');
    classifier.addDocument('the operating system crashes frequently.', 'software');
    classifier.addDocument('the scanner won’t connect to the PC.', 'hardware');
    classifier.addDocument('the game’s frame rate drops significantly on high settings.', 'software');
    classifier.addDocument('the wireless router keeps disconnecting.', 'hardware');
    classifier.addDocument('there are frequent software updates that disrupt work.', 'software');
    classifier.addDocument('the monitor displays a flickering image.', 'hardware');
    classifier.addDocument('the application requires administrator permissions.', 'software');
    classifier.addDocument('the external hard drive is not ejecting properly.', 'hardware');
    classifier.addDocument('the software installation wizard is confusing.', 'software');
    classifier.addDocument('the microphone does not pick up sound.', 'hardware');
    classifier.addDocument('the antivirus program detected a virus.', 'software');
    classifier.addDocument('the battery dies quickly after charging.', 'hardware');
    classifier.addDocument('the coding environment has syntax highlighting issues.', 'software');
    classifier.addDocument('the camera resolution is below expectations.', 'hardware');
    classifier.addDocument('the API integration is producing errors.', 'software');
    classifier.addDocument('the touchpad is unresponsive.', 'hardware');
    classifier.addDocument('the configuration files are corrupted.', 'software');
    classifier.addDocument('the USB ports are not working.', 'hardware');
    classifier.addDocument('the software license has expired.', 'software');
    classifier.addDocument('the speaker volume is too low.', 'hardware');
    classifier.addDocument('there are too many bugs in the beta release.', 'software');
    classifier.addDocument('the new motherboard is not compatible with the old case.', 'hardware');
    classifier.addDocument('the mobile app crashes on login.', 'software');
    classifier.addDocument('the laptop overheats during normal use.', 'hardware');
    classifier.addDocument('the cloud storage sync is slow.', 'software');
    classifier.addDocument('the projector bulb needs replacement.', 'hardware');
    classifier.addDocument('the file compression tool is inefficient.', 'software');
    classifier.addDocument('the fitness tracker does not record steps correctly.', 'hardware');
    classifier.addDocument('the software API lacks documentation.', 'software');
    classifier.addDocument('the drone’s GPS is not accurate.', 'hardware');
    classifier.addDocument('the photo editing software requires more memory.', 'software');
    classifier.addDocument('the smartwatch band is breaking.', 'hardware');
    classifier.addDocument('the video conferencing software frequently drops calls.', 'software');
    classifier.addDocument('the CPU socket pins are bent.', 'hardware');

    classifier.train();

    //const chain = new ConversationChain({ llm: model, memory, prompt: PROMPT });
    const prompt = await pull("hwchase17/openai-tools-agent");

    const agent = await createOpenAIToolsAgent({
        llm,
        tools,
        prompt
    });

    var agentExecutor = new AgentExecutor({
        agent,
        tools,
    });

    // Create the Express app
    const app = express();

    // Middleware
    app.use(helmet()); // Adds some security best practices
    app.use(cors()); // Enables CORS
    app.use(express.json()); // Parses incoming requests with JSON payloads
    app.use(morgan('dev')); // Logging middleware

    // Basic route
    app.get('/', (req, res) => {
        res.status(200).send('Hello World!');
    });

    app.post('/llm', async (req, res) => {
        try {
            console.log(req.body)
            let prompt = req.body.input;
            console.log('prompt: ', prompt);
            //let response = await executor.call(prompt, [myCustomHandler]);
            let response = await agentExecutor.invoke({
                input: prompt,
            }, [myCustomHandler]);
            res.send({
                result: response
            });
        } catch (e) {
            console.error % (e);
            res.send({
                result: e.message
            })
        }
    });

    app.post('/nlp', async (req, res) => {
        let phrase = req.body.input;
        let response = classifier.classify(phrase);
        res.json({
            result: response
        });
    })

    // Catch 404 and forward to error handler
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });

    // Error handler
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: {
                message: err.message
            }
        });
    });

    // Set the port
    const PORT = process.env.PORT || 3500;

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
main();
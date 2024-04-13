const { BaseCallbackHandler } = require('langchain/callbacks');


/**
 * @class CustomHandler
 * @description - class to handle the custom handler
 * @extends BaseCallbackHandler
 */
class CustomHandler extends BaseCallbackHandler {
    /**
     * @constructor - constructor for the custom handler
     */
    constructor() {
        super();
        this.name = 'custom_handler';
    }

    /**
     * @description - function to handle the new token
     * @param {*} token
     */
    handleLLMNewToken(token) {
        console.log('token', { token });
    }

    handleLLMStart(llm, _prompts) {
        console.log('handleLLMStart', { llm });
    }

    handleChainStart(chain) {
        console.log('handleChainStart', { chain });
    }

    handleAgentAction(action) {
        console.log('handleAgentAction', action);
    }

    handleToolStart(tool) {
        console.log('handleToolStart', { tool });
    }
}

module.exports = CustomHandler;
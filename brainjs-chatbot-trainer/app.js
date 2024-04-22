const brain = require('brain.js');
const fs = require('fs');

const network = new brain.recurrent.LSTM({
    hiddenLayers: [10, 20,10],  // More complex model
    activation: 'sigmoid',      // Experiment with ReLU for potentially better performance
    learningRate: 0.01,      // Lower starting learning rate
    leakyReluAlpha: 0.01,    // Leaky ReLU to prevent dying ReLU
    regularization: { type: 'L2', lambda: 0.01 },
    gpu: true
});

const trainingData = fs.readFileSync('train-data.json', 'utf8');
let dataObj = JSON.parse(trainingData);

network.train(dataObj, {
    iterations: 200,        // More iterations for deeper learning
    errorThresh: 0.005,     // Same error threshold for fine-tuning
    log: true,              // Enable logging to monitor training progress
    logPeriod: 10,          // Log every 10 iterations
    learningRate: 0.01      // Consistent learning rate
});

const modelJson = network.toJSON();
fs.writeFileSync('chatbot-model.json', JSON.stringify(modelJson), 'utf8');

console.log('Model trained and saved.');
'use stricconst brain = require('brain.js');
const fs = require('fs');  // Required for file system access

// Initialize the neural network
const network = new brain.recurrent.LSTM({
    hiddenLayers: [5, 5], // Example of a more complex model that might benefit from GPU acceleration
    activation: 'sigmoid',  // Using sigmoid activation function
    learningRate: 0.01,     // Setting learning rate
    regularization: { type: 'L2', lambda: 0.01 },
    gpu: true               // Enable GPU processing
});

// Define the training data
const trainingData = fs.readFileSync('train-data.json', 'utf8');
let dataObj = JSON.parse(trainingData)
// Train the network
network.train(dataObj, {
    iterations: 50,
    errorThresh: 0.005,
    log: true,
    logPeriod: 1,
    learningRate: 0.3
});

// Save the model to a file
const modelJson = network.toJSON();
fs.writeFileSync('chatbot-model.json', JSON.stringify(modelJson), 'utf8');

console.log('Model trained and saved.');
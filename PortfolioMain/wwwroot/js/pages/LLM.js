var config = {
    binaryThresh: 0.5,
    hiddenLayers: [5,5], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

var net = new brain.recurrent.LSTM();
var ajax = new AjaxCaller();
async function loadModel() {
    let model = await fetch('models/brainjs/chatbot-model.json');
    return model;
}

async function main() {
    fetch('models/brainjs/chatbot-model.json')
        //.then(response => response.json())
        .then((model) => {
            console.log(model);
            net.fromJSON(model);
            
            //displayModel(model);
            $('body').find('#brainjsBtn').on('click', function (e) {
                let prompt = $('body').find('#brainjsTxt').val();
                let response = net.run(prompt);
                $('body').find('#brainjsChatLog').append(`<p>${response}</p><br/>`)
            });

            $('body').find('#chatGPTBtn').on('click', function (e) {
                let prompt = $('body').find('#chatGPTtxt').val();
                ajax.performCall('POST', '/langchain', { phrase: prompt }).then((data) => {
                    console.log('langchain data: ', data);
                })
                    .catch((err) => { 
                        console.error(err);
                    })
            });
        });
}


main();
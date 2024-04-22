var net = new brain.recurrent.LSTM({
    hiddenLayers: [10, 20, 10],  
    learningRate: 0.01,      
    decayRate: 0.999,        
    errorThresh: 0.005       
});
var ajax = new AjaxCaller();

async function main() {
    $.ajax({
        url: '/brainjs-model', 
        type: 'GET',           
        dataType: 'json',      
        contentType: 'application/json',
        success: function (model) {
            console.log(model);
            net.fromJSON(model);

            document.getElementById('result').innerHTML = brain.utilities.toSVG(
                net,
                {
                    height: '1000',
                    width: '1000',
                    radius: '5',
                    line: {
                        width: '0.2',
                        color: 'rgba(100,149,237,0.5)'
                    }
                    /*inputs:{
                       */
                }
            );

            $('body').find('#brainjsBtn').on('click', function (e) {
                let prompt = $('body').find('#brainjsTxt').val();
                let response = net.run(prompt);
                $('body').find('#brainjsChatLog').append(`${response}<br/>`);
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
        },
        error: function (a, b, c) {
            console.log(a);
            console.log(b);
        }
    });

}


main();
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require('twilio')(accountSid, authToken);

exports.makeCall = (req : any, res: any) => {
    const { makeChoice } = req.body;
    if(makeChoice === 1){
        res.send(callToPersonalPhone())
    }
    else {
        res.type('text/xml');
        res.send(recordCallPhone().toString());
    }
};

const recordCallPhone =  () => {
    try {
        const twiml = new VoiceResponse();
        twiml.say('Hello. Please leave a message after the beep.');
            // Use <Record> to record the caller's message
        twiml.record({
            action: '/call-exit',
            timeout: '5',
            transcribe: 'true',
            transcribeCallback: '/transcribe-title'
        }); // End the call with <Hangup>
        twiml.hangup();
        // Render the response as XML in reply to the webhook request
        return twiml
    }
    catch(error){
        console.log(error)
    }
}

const callToPersonalPhone = () => {
    try {
        client.calls
            .create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: '+923355743163',
            from: '+12392914001'
        }, function (err : Error, call: any) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(call)
                return call;
            }
        });
    }
    catch(error){
        console.log(error)
    }
}
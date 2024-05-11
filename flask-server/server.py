
from flask import Flask, request, jsonify
from flask_cors import CORS
import deepl


app = Flask(__name__)
CORS(app)


@app.route('/send-message', methods=['POST'])
def receive_message():
    if request.method == 'POST':
        data = request.json
        message = data.get('message')
        display_name = data.get('displayName')
        uid = data.get('uid')
        
        DEEPL_API_KEY = "4f50da36-2758-43d2-a887-77cc7a06db8c:fx"

        translator = deepl.Translator(DEEPL_API_KEY)

        # Process the message data here as needed
        print("Received message from React:", message)
        print("Display Name:", display_name)
        print("User ID:", uid)
        
        if (message.isascii()):
            source="EN"
            target="JA"
            
        else:
            source="JA"
            target="EN-US"
        


        translation_text = translator.translate_text(message, source_lang=source , target_lang=target)
        print(translation_text)
        
        translation_text=translation_text.text
        
        
        response_data = {'message': translation_text}

        # Optionally, you can send a response back to the React frontend
        return jsonify(response_data)

  


        # # Optionally, you can send a response back to the React frontend
        # return jsonify({'message':message})

if __name__ == '__main__':
    app.run(debug=True)









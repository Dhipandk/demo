from flask import Flask, request, jsonify
from flask_cors import CORS
import deepl

app = Flask(__name__)
CORS(app)

# Replace 'YOUR_DEEPL_API_KEY' with your actual Deepl API key
auth_key = "4f50da36-2758-43d2-a887-77cc7a06db8c:fx"
translator = deepl.Translator(auth_key)

@app.route('/translate', methods=['GET'])
def translate():
    data = request.get_json()
    text = data.get('text')
    source_lang = data.get('source_lang')
    target_lang = data.get('target_lang')

    try:
        if source_lang == "auto":
            detection = translator.detect_language(text)
            source_lang = detection.lang

        result = translator.translate_text(text, source_lang=source_lang, target_lang=target_lang)
        translated_text = result.text
        return jsonify({'translated_text': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

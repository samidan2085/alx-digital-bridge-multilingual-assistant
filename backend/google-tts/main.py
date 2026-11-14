import os

from flask import Flask, Response, jsonify, request
from google.api_core.exceptions import GoogleAPICallError, InvalidArgument
from google.cloud import texttospeech
from werkzeug.exceptions import BadRequest

app = Flask(__name__)
tts_client = texttospeech.TextToSpeechClient()

ALLOWED_LANGUAGES = {"en-US", "am-ET", "om-ET", "ti-ET", "so-SO", "ar-XA"}
MAX_TEXT_LENGTH = 3000


def allowed_origins():
    return {
        origin.strip().rstrip("/")
        for origin in os.environ.get("ALLOWED_ORIGINS", "").split(",")
        if origin.strip()
    }


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin", "")
    if origin in allowed_origins():
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Max-Age"] = "3600"
        response.headers["Vary"] = "Origin"
    return response


@app.route("/synthesize", methods=["POST", "OPTIONS"])
def synthesize():
    origin = request.headers.get("Origin", "")
    if origin not in allowed_origins():
        return jsonify(error="This website origin is not allowed."), 403

    if request.method == "OPTIONS":
        return Response(status=204)
    if not request.is_json:
        return jsonify(error="Send a JSON request."), 415

    try:
        payload = request.get_json()
    except BadRequest:
        return jsonify(error="The request body must be valid JSON."), 400

    if not isinstance(payload, dict):
        return jsonify(error="The request body must be a JSON object."), 400

    text = payload.get("text")
    language = payload.get("language")
    if not isinstance(text, str) or not text.strip() or len(text) > MAX_TEXT_LENGTH:
        return jsonify(error="Text must contain 1 to 3000 characters."), 400
    if language not in ALLOWED_LANGUAGES:
        return jsonify(error="The selected language is not supported by this endpoint."), 400

    try:
        voices = tts_client.list_voices(language_code=language).voices
        voice = next(
            (candidate for candidate in voices if language in candidate.language_codes),
            None,
        )
        if voice is None:
            return jsonify(error="Google Cloud TTS does not provide a voice for this language."), 422

        result = tts_client.synthesize_speech(
            input=texttospeech.SynthesisInput(text=text),
            voice=texttospeech.VoiceSelectionParams(
                language_code=language,
                name=voice.name,
            ),
            audio_config=texttospeech.AudioConfig(
                audio_encoding=texttospeech.AudioEncoding.MP3,
            ),
        )
    except InvalidArgument:
        return jsonify(error="Google Cloud TTS does not provide a voice for this language or text."), 422
    except GoogleAPICallError:
        app.logger.exception("Google Cloud Text-to-Speech request failed.")
        return jsonify(error="Google Cloud TTS is temporarily unavailable."), 502

    if not result.audio_content:
        return jsonify(error="Google Cloud TTS returned no audio."), 502

    return Response(
        result.audio_content,
        mimetype="audio/mpeg",
        headers={"Cache-Control": "no-store"},
    )

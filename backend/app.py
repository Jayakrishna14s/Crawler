from flask import Flask, request, jsonify
from flask_cors import CORS
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import uuid
import os
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Cloudinary config
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

PDF_DIR = "generated_pdfs"
os.makedirs(PDF_DIR, exist_ok=True)

def process_message(message, history):
    response_text = f"Processed: {message}. History length: {len(history)}"
    need_pdf = "pdf" in message.lower() or "report" in message.lower()
    return response_text, need_pdf

def generate_pdf(response_text):
    pdf_id = str(uuid.uuid4())
    pdf_path = os.path.join(PDF_DIR, f"{pdf_id}.pdf")

    doc = SimpleDocTemplate(pdf_path)
    styles = getSampleStyleSheet()
    content = [Paragraph(response_text, styles["Normal"])]
    doc.build(content)

    return pdf_path

def upload_pdf_to_cloudinary(local_pdf_path):
    result = cloudinary.uploader.upload(
        local_pdf_path,
        resource_type="raw",
        folder=os.getenv("CLOUDINARY_UPLOAD_FOLDER", "CRAWLER_REPORTS"),
        public_id=str(uuid.uuid4())
    )
    return result["secure_url"]

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message")
    history = data.get("history", [])

    response_text, need_pdf = process_message(message, history)

    media_link = None
    if need_pdf:
        pdf_path = generate_pdf(response_text)
        media_link = upload_pdf_to_cloudinary(pdf_path)
        
        try:
            os.remove(pdf_path)
        except Exception as e:
            print("Error deleting file:", e)

    return jsonify({
        "reply": response_text,
        "media": media_link,
    })

@app.route("/test", methods=["GET"]) 
def test():
    return jsonify({"message": "Hello World from Flask!"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

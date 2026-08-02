import fitz
import os
from docx import Document


def extract_text(filepath: str):

    extension = os.path.splitext(filepath)[1].lower()

    if extension == ".pdf":
        return extract_pdf(filepath)

    elif extension == ".docx":
        return extract_docx(filepath)

    elif extension == ".txt":
        return extract_txt(filepath)

    return ""


def extract_pdf(filepath):

    text = ""

    pdf = fitz.open(filepath)

    for page in pdf:

        text += page.get_text()

    pdf.close()

    return text


from docx import Document

def extract_docx(filepath):

    doc = Document(filepath)

    text = []

    # Paragraphs
    for paragraph in doc.paragraphs:
        if paragraph.text.strip():
            text.append(paragraph.text)

    # Tables
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                if cell.text.strip():
                    text.append(cell.text)

    return "\n".join(text)


def extract_txt(filepath):

    with open(filepath, "r", encoding="utf-8") as f:

        return f.read()
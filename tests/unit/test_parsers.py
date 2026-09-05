"""
Unit Tests for HTML and PDF Document Parsers
"""
from services.ingestion.parser import parse_html_document, clean_extracted_text


def test_clean_extracted_text():
    raw = "  This   is \n\n\n a   test \t string. \r\n Another line. "
    cleaned = clean_extracted_text(raw)
    assert "This is" in cleaned
    assert "\n\n" in cleaned
    assert "\r" not in cleaned


def test_parse_html_document():
    html = """
    <html>
      <head><title>Scheme Notice</title></head>
      <body>
        <nav><a href="#">Home</a></nav>
        <main>
          <h1>Moovalur Ramamirtham Scheme</h1>
          <p>Government of Tamil Nadu provides Rs 1,000 monthly allowance to girl students.</p>
          <h2>Eligibility Criteria</h2>
          <p>Must have studied from 6th to 12th standard in Govt schools.</p>
          <table>
            <tr><th>Level</th><th>Assistance</th></tr>
            <tr><td>Undergraduate</td><td>Rs. 1,000 / month</td></tr>
          </table>
        </main>
        <footer><p>Official footer info</p></footer>
      </body>
    </html>
    """
    pages = parse_html_document(html)
    assert len(pages) > 0
    full_text = " ".join([p.text for p in pages])
    assert "Moovalur Ramamirtham Scheme" in full_text
    assert "Rs 1,000" in full_text
    assert "Undergraduate | Rs. 1,000 / month" in full_text
    assert "Official footer info" not in full_text  # stripped footer

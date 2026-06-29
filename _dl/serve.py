"""Local static preview server that serves .webp with the correct MIME type.

Windows' default `python -m http.server` reads MIME types from the registry and
often labels .webp as application/octet-stream, which can make images appear
broken in local preview. GitHub Pages serves the right type in production; this
just makes local dev match. Usage: python _dl/serve.py [port]   (default 8766)
"""
import http.server
import mimetypes
import sys

mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
http.server.test(HandlerClass=http.server.SimpleHTTPRequestHandler, port=port, bind="127.0.0.1")

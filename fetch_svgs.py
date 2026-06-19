import urllib.request
import os

files = ['uc_user', 'uc_calc', 'uc_ai', 'uc_high_level', 'deployment']

for f in files:
    with open(f"docs/uml/{f}.puml", "rb") as file:
        data = file.read()
    
    req = urllib.request.Request(
        "https://kroki.io/plantuml/svg", 
        data=data, 
        headers={
            'Content-Type': 'text/plain',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    )
    try:
        with urllib.request.urlopen(req) as response:
            svg_data = response.read()
            
        with open(f"docs/uml/{f}.svg", "wb") as out_file:
            out_file.write(svg_data)
        print(f"Generated {f}.svg")
    except Exception as e:
        print(f"Failed {f}: {e}")

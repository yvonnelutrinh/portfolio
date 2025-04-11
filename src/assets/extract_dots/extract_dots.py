from PIL import Image
import numpy as np
import json

img = Image.open("./src/assets/extract_dots/point-portrait.png").convert("RGB")
img = img.resize((512, 512))

spacing = 6
dot_data = []

pixels = np.array(img)

for y in range(0, pixels.shape[0], spacing):
    for x in range(0, pixels.shape[1], spacing):
        r, g, b = pixels[y, x]
        if r + g + b < 720:
            dot_data.append({
                "x": x,
                "y": y,
                "color": f"rgb({r},{g},{b})",
                "radius": 1.5
            })

with open("public/dot-map.json", "w") as f:
    json.dump(dot_data, f, indent=2)
from io import BytesIO
from PIL import Image

async def convert_to_webp(image_bytes: bytes, quality: int = 80) -> bytes:
    image = Image.open(BytesIO(image_bytes))
    output = BytesIO()
    
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")
    
    image.save(output, format="WEBP", quality=quality, optimize=True, lossless=False,)
    return output.getvalue()
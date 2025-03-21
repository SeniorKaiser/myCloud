import io
from PIL import Image

async def convert_to_webp(image_bytes: bytes) -> bytes:
    """Конвертирует изображение в WebP"""
    image = Image.open(io.BytesIO(image_bytes))
    webp_buffer = io.BytesIO()
    image.save(webp_buffer, format="WEBP", quality=80)
    return webp_buffer.getvalue()